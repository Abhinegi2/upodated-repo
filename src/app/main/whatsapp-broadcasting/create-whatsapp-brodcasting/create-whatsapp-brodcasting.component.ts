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
  messageSubTypeList: [DropdownModel];
  messageVariablesList: [DropdownModel];
  filteredMessageVariablesItems: any;
  messageApplicableList: string[] = ['SMS', 'Whatsapp', 'Email'];
  userTypeList: string[] = ['PMU', 'VT', 'VC', 'VTP', 'Students'];
  conditionList: string[] = ['All PMU', 'All VT', 'All VC', 'All VTP', 'All Students'];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

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

    // Set the default headMaster Model
    this.messageTemplateModel = new whatsappBroadcastingModel();
    this.messageTemplateForm = this.createMessageTemplateForm();
  }

  ngOnInit(): void {
    this.messageTemplatesService.getDropdownforMessageTemplate(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.messageTypeList = results[0].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.messageTemplateModel = new whatsappBroadcastingModel();

          } else {
            var campainID: string = params.get('campainID');

            this.messageTemplatesService.getMessageTemplateById(campainID)
              .subscribe((response: any) => {
                this.messageTemplateModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.messageTemplateModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.messageTemplateModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                // this.onChangeMessageType(this.messageTemplateModel.MessageTypeId).then(mt => {
                //   this.onChangeMessageSubType(this.messageTemplateModel.MessageSubTypeId).then(mst => {
                //     this.messageTemplateForm = this.createMessageTemplateForm();
                //   });
                // });

              });
          }
          const selectedUserTypes = this.messageTemplateForm.get('TemplateID').value;
        }
      });
    });
  }
  generateTable() {
    const selectedConditions = this.messageTemplateForm.get('TemplateIDCondition').value;

    // if (selectedUserTypes.length > 0 && selectedConditions.length > 0) {
    //   // Generate table data based on the selected options
    //   // For demonstration, let's just create some dummy data
    //   this.tableData = [
    //     { selected: false, column1: 'Data 1', column2: 'Condition 1' },
    //     { selected: false, column1: 'Data 2', column2: 'Condition 2' },
    //     { selected: false, column1: 'Data 3', column2: 'Condition 3' },
    //     // Add more data rows as needed
    //   ];
    // } else {
    //   this.tableData = [];
    // }
  }



  onChangeMessageType(messageId): Promise<any> {
    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'MessageSubTypes', ParentId: messageId, SelectTitle: 'Message Sub Type' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.messageSubTypeList = response.Results;
        }
      });

      this.IsLoading = false;
      resolve(true);
    });
    return promise;
  }

  onChangeMessageSubType(messageSubTypeId): Promise<any> {
    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'MessageVariables', UserId: this.UserModel.LoginId, ParentId: messageSubTypeId, SelectTitle: 'Message Sub Type' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.messageVariablesList = response.Results;
          this.filteredMessageVariablesItems = this.messageVariablesList.slice();
        }
      });

      this.IsLoading = false;
      resolve(true);
    });
    return promise;
  }

  saveOrUpdateMessageTemplateDetails() {
    if (!this.messageTemplateForm.valid) {
      this.validateAllFormFields(this.messageTemplateForm);
      return;
    }

    this.setValueFromFormGroup(this.messageTemplateForm, this.messageTemplateModel);

    this.messageTemplatesService.createOrUpdateMessageTemplate(this.messageTemplateModel)
      .subscribe((messageTemplateResp: any) => {
        if (messageTemplateResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );
            this.router.navigate([RouteConstants.MessageTemplates.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(messageTemplateResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('MessageTemplate deletion errors =>', error);
      });
  }

  //Create MessageTemplate form and returns {FormGroup}
  createMessageTemplateForm(): FormGroup {
    return this.formBuilder.group({
      CampainID: new FormControl({ value: this.messageTemplateModel.CampainID, disabled: this.PageRights.IsReadOnly }),
      TemplateID: new FormControl({ value: this.messageTemplateModel.TemplateID, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ConditionId: new FormControl({ value: this.messageTemplateModel.ConditionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      TemplateMessage: new FormControl({ value: this.messageTemplateModel.TemplateMessage, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(3000)),
      UserType: new FormControl({ value: this.messageTemplateModel.UserType, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(150)]),
      TemplateFlowId: new FormControl({ value: this.messageTemplateModel.TemplateFlowId, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(200)]),
    });
  }
}
