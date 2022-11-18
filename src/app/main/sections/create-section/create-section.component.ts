import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SectionService } from '../section.service';
import { SectionModel } from '../section.model';

@Component({
  selector: 'section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSectionComponent extends BaseComponent<SectionModel> implements OnInit {
  sectionForm: FormGroup;
  sectionModel: SectionModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default section Model
    this.sectionModel = new SectionModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.sectionModel = new SectionModel();

        } else {
          var sectionId: string = params.get('sectionId')

          this.sectionService.getSectionById(sectionId)
            .subscribe((response: any) => {
              this.sectionModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.sectionModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.sectionModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.sectionForm = this.createSectionForm();
            });
        }
      }
    });

    this.sectionForm = this.createSectionForm();
  }

  saveOrUpdateSectionDetails() {
    this.setValueFromFormGroup(this.sectionForm, this.sectionModel);

    this.sectionService.createOrUpdateSection(this.sectionModel)
      .subscribe((sectionResp: any) => {

        if (sectionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Section.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(sectionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Section deletion errors =>', error);
      });
  }

  //Create section form and returns {FormGroup}
  createSectionForm(): FormGroup {
    return this.formBuilder.group({
      SectionId: new FormControl(this.sectionModel.SectionId),
      Name: new FormControl({ value: this.sectionModel.Name, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.sectionModel.Description, disabled: this.PageRights.IsReadOnly }),
      Remarks: new FormControl({ value: this.sectionModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.sectionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
