import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTPMonthlyBillSubmissionStatusService } from '../vtp-monthly-bill-submission-status.service';
import { VTPMonthlyBillSubmissionStatusModel } from '../vtp-monthly-bill-submission-status.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vtp-monthly-bill-submission-status',
  templateUrl: './create-vtp-monthly-bill-submission-status.component.html',
  styleUrls: ['./create-vtp-monthly-bill-submission-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTPMonthlyBillSubmissionStatusComponent extends BaseComponent<VTPMonthlyBillSubmissionStatusModel> implements OnInit {
  vtpMonthlyBillSubmissionStatusForm: FormGroup;
  vtpMonthlyBillSubmissionStatusModel: VTPMonthlyBillSubmissionStatusModel;
  vocationalCoordinatorList: [DropdownModel];
  monthList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtpMonthlyBillSubmissionStatusService: VTPMonthlyBillSubmissionStatusService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtpMonthlyBillSubmissionStatus Model
    this.vtpMonthlyBillSubmissionStatusModel = new VTPMonthlyBillSubmissionStatusModel();
  }

  ngOnInit(): void {

    this.commonService.GetMasterDataByType({DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month'}).subscribe((response) => {
      if (response.Success) {
        this.monthList = response.Results;
      }
    });

    this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Block Vocational Coordinators' }).subscribe((response: any) => {
      if (response.Success) {
        this.vocationalCoordinatorList = response.Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtpMonthlyBillSubmissionStatusModel = new VTPMonthlyBillSubmissionStatusModel();

          } else {
            var vtpMonthlyBillSubmissionStatusId: string = params.get('vtpMonthlyBillSubmissionStatusId')

            this.vtpMonthlyBillSubmissionStatusService.getVTPMonthlyBillSubmissionStatusById(vtpMonthlyBillSubmissionStatusId)
              .subscribe((response: any) => {
                this.vtpMonthlyBillSubmissionStatusModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtpMonthlyBillSubmissionStatusModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtpMonthlyBillSubmissionStatusModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vtpMonthlyBillSubmissionStatusForm = this.createVTPMonthlyBillSubmissionStatusForm();
              });
          }
        }
      });
    });

    this.vtpMonthlyBillSubmissionStatusForm = this.createVTPMonthlyBillSubmissionStatusForm();
  }

  saveOrUpdateVTPMonthlyBillSubmissionStatusDetails() {
    if (!this.vtpMonthlyBillSubmissionStatusForm.valid) {
      this.validateAllFormFields(this.vtpMonthlyBillSubmissionStatusForm);  
      return;
    }
    this.setValueFromFormGroup(this.vtpMonthlyBillSubmissionStatusForm, this.vtpMonthlyBillSubmissionStatusModel);

    this.vtpMonthlyBillSubmissionStatusService.createOrUpdateVTPMonthlyBillSubmissionStatus(this.vtpMonthlyBillSubmissionStatusModel)
      .subscribe((vtpMonthlyBillSubmissionStatusResp: any) => {

        if (vtpMonthlyBillSubmissionStatusResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTPMonthlyBillSubmissionStatus.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtpMonthlyBillSubmissionStatusResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTPMonthlyBillSubmissionStatus deletion errors =>', error);
      });
  }

  //Create vtpMonthlyBillSubmissionStatus form and returns {FormGroup}
  createVTPMonthlyBillSubmissionStatusForm(): FormGroup {
    return this.formBuilder.group({
      VTPMonthlyBillSubmissionStatusId: new FormControl(this.vtpMonthlyBillSubmissionStatusModel.VTPMonthlyBillSubmissionStatusId),
      VCId: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.VCId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.Month, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      DateSubmission: new FormControl({ value: new Date(this.vtpMonthlyBillSubmissionStatusModel.DateSubmission), disabled: this.PageRights.IsReadOnly }, Validators.required),
      Incorrect: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.Incorrect, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      IncorrectDetails: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.IncorrectDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      Final: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.Final, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50)]),
      ApprovedPMU: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.ApprovedPMU, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      Amount: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.Amount, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      DiaryentryDone: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.DiaryentryDone, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      DiaryentryNumber: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.DiaryentryNumber, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      Details: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.Details, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      // IsActive: new FormControl({ value: this.vtpMonthlyBillSubmissionStatusModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
