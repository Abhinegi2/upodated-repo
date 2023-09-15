import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { whatsappBroadcastingModel } from '../whatsapp-broadcasting.model';
import { whatsappBroadcastingService } from '../whatsapp-broadcasting.service';
import { RouteConstants } from 'app/constants/route.constant';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SearchFilterModel } from 'app/models/search.filter.model';
export interface PeriodicElement {
  name: string;
  Description: number;
}
@Component({
  selector: 'app-create-whatsapp-brodcasting',
  templateUrl: './create-whatsapp-brodcasting.component.html',
  styleUrls: ['./create-whatsapp-brodcasting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class CreateWhatsappBrodcastingComponent extends BaseComponent<whatsappBroadcastingModel> implements OnInit {
  messageTemplateForm: FormGroup;
  messageTemplateModel: whatsappBroadcastingModel;
  messageTypeList: [DropdownModel];
  filteredMessageVariablesItems: any;
  gifictemplate: any;
  templateId: any;
  userType: any;
  glificAccessToken: any;
  glificMessage: string = "";
  messagepreview: string = "";
  variables: string[] = [];
  fields: any[] = [];
  variableCount: number = 0;
  selection = new SelectionModel<PeriodicElement>(true, []);
  idToLabelMap: Record<string, string> = {};

  tableDataSource: MatTableDataSource<Element>;
  displayedColumns: string[];
  SearchBy: SearchFilterModel;

  @ViewChild(MatPaginator)
  ListPaginator: MatPaginator;

  @ViewChild(MatSort)
  ListSort: MatSort;

  userTypeList: string[] = ['PMU', 'VT', 'VC', 'VTP', 'Students'];
  conditionList: string[] = ['All PMU', 'All VT', 'All VC', 'All VTP', 'All Students'];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  dropdownFields: string []= [
    '@contact.name', '@contact.uuid',
  ];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private messageTemplatesService: whatsappBroadcastingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);
    this.tableDataSource = new MatTableDataSource<Element>();
    this.SearchBy = new SearchFilterModel(this.UserModel);
    this.messageTemplateModel = new whatsappBroadcastingModel();
    this.messageTemplateForm = this.createMessageTemplateForm();
  }

  ngOnInit(): void {
    this.messageTemplatesService.getDropdownforMessageTemplate(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.messageTypeList = results[0].Results;
      }
      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed
      this.generateTable();

      // var campainID: string = '1';
      //Load initial messageTemplates data
      this.messageTemplatesService.getGlificTemplate()
        .subscribe((response: any) => {
          const data = JSON.parse(response);
          this.gifictemplate = data.data.sessionTemplates;
        })
        this.messageTemplatesService.GetAccessToken().subscribe((response: any) => {
          console.log(response,"pom")
          this.glificAccessToken = response;
        });
      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');
          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.messageTemplateModel = new whatsappBroadcastingModel();
          } else {
            var campainID: string = params.get('CampainID');
            console.log(params, "campainID")
            this.messageTemplatesService.getMessageTemplateById(campainID)
              .subscribe((response: any) => {
                // Populate the mapping when fetching data

                this.messageTemplateModel = response.Result;
                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.messageTemplateModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.messageTemplateModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
              });
          }
        }
      });
      if (this.messageTemplateForm.controls.UserType.value) {
        // Assign paginator only if UserType value is truthy
        this.tableDataSource.paginator = this.ListPaginator;

        // Set initial paginator properties
        this.ListPaginator.pageIndex = this.SearchBy.PageIndex;
        this.ListPaginator.length = this.SearchBy.TotalResults;
      }
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }
  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;
    this.generateTable();
  }
  generateTable(): any {
    this.messageTemplatesService.getVtData().subscribe(response => {
      this.displayedColumns = ['select', 'Name', 'Description'];
      const modifiedData = response.Results.slice(1); // Get data from index 1 onwards

      this.tableDataSource.data = modifiedData;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.tableDataSource.paginator = this.ListPaginator;
      this.SearchBy.TotalResults = response.TotalResults;

      setTimeout(() => {
        this.ListPaginator.pageIndex = this.SearchBy.PageIndex;
        this.ListPaginator.length = this.SearchBy.TotalResults;
      });


      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
  selectHandler(row: PeriodicElement) {
    this.selection.toggle(row);
  }

  onChangeTemplateType(TemplateID): Promise<any> {
    this.templateId = TemplateID;
    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.messageTemplatesService.GetTemplateDataById({ TemplateID }).subscribe((response: any) => {
        this.glificMessage = response.data.sessionTemplate.sessionTemplate.body;
        const regex = /{{(\d+)}}/g;
        const matches = this.glificMessage.match(regex);
        if (matches) {
          this.variables = matches.map(match => match.slice(2, -2));
          this.variableCount = this.variables.length;

          this.updateMessage();
          this.updateFields()
        }
        this.variables.forEach((variable, index) => {
          const fieldName = `Variable${index + 1}`;
          this.messageTemplateForm.controls[fieldName].setValue(null);
          this.messageTemplateForm.controls[fieldName].clearValidators();

        });
      });
      this.IsLoading = false;
      resolve(true);
    });
    return promise;
  }
  updateFields() {
    this.fields = Array.from({ length: this.variableCount }, (_, index) => ({
      label: `Variable ${index + 1}`,
      value: ''
    }));
    this.fields.forEach((field, index) => {
      const fieldName = `Variable${index + 1}`;
      this.messageTemplateForm.addControl(
        fieldName,
        new FormControl('', Validators.required)
      );
    });
  }

  updateMessage() {
    let updatedMessage = this.glificMessage;
    for (let i = 0; i < this.variableCount; i++) {
      updatedMessage = updatedMessage.replace(`{{${i + 1}}}`, `{{Variable${i + 1}}}`);
    }
    this.messagepreview = updatedMessage;
  }

  updateMessagePreview() {
    let updatedMessagePreview = this.messagepreview;
    this.fields.forEach((_, index) => {
      const fieldName = `Variable${index + 1}`;
      const fieldValue = this.messageTemplateForm.controls[fieldName].value;
      if (fieldValue) {
        const variablePlaceholder = `{{${fieldName}}}`;
        updatedMessagePreview = updatedMessagePreview.replace(variablePlaceholder, fieldValue);
      }
    });
    this.messageTemplateForm.controls.TemplateMessage.setValue(updatedMessagePreview);
  }

  onChangeuserType(userType) {
    this.userType = userType;
    this.IsLoading = true;
  }

  async saveOrUpdateMessageTemplateDetails() {
console.log(this.messageTemplateForm,"hello")

    if (!this.messageTemplateForm.valid) {
      this.validateAllFormFields(this.messageTemplateForm);
      return;
    }
console.log("hello2")

    const data = this.selection.selected;
    const templateId = parseInt(this.templateId, 10);
    const userType = this.userType;
    const inputData = {
      isHsm: true,
      templateId: templateId,
      params: []
    };
console.log("hello3")

    this.fields.forEach((_, index) => {
      const fieldName = `Variable${index + 1}`;
      const fieldValue = this.messageTemplateForm.controls[fieldName].value;
      if (fieldValue) {
        inputData.params.push(fieldValue);
      }
console.log("hello4")

    });
    try {
      const response: any = await this.messageTemplatesService.CreateContactGroup({ data }, templateId, userType, inputData).toPromise();
      this.setValueFromFormGroup(this.messageTemplateForm, this.messageTemplateModel);
      const messageTemplateResp: any = await this.messageTemplatesService.createOrUpdateMessageTemplate(this.messageTemplateModel).toPromise();
      if (messageTemplateResp.Success) {
        this.zone.run(() => {
          this.showActionMessage(this.Constants.Messages.RecordSavedMessage, this.Constants.Html.SuccessSnackbar);
          this.router.navigate([RouteConstants.WhatsappBroadcasting.List]);
        });
      } else {
        const errorMessages = this.getHtmlMessage(messageTemplateResp.Errors);
        this.dialogService.openShowDialog(errorMessages);
      }

      this.IsLoading = false;
      return true;
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  }

  createMessageTemplateForm(): FormGroup {
    const formGroup = this.formBuilder.group({
      CampainID: new FormControl({ value: this.messageTemplateModel.CampainID, disabled: this.PageRights.IsReadOnly }),
      GlificMessage: new FormControl({ value: this.messageTemplateModel.GlificMessage, disabled: true }),
      TemplateID: new FormControl({ value: this.messageTemplateModel.TemplateID, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ConditionId: new FormControl({ value: this.messageTemplateModel.ConditionId, disabled: this.PageRights.IsReadOnly }),
      TemplateMessage: new FormControl({ value: this.messageTemplateModel.TemplateMessage, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(3000)),
      UserType: new FormControl({ value: this.messageTemplateModel.UserType, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(150)]),
    });
    return formGroup;
  }

}
