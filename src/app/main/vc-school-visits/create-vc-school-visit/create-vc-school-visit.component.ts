import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VCSchoolVisitService } from '../vc-school-visit.service';
import { VCSchoolVisitModel } from '../vc-school-visit.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vc-school-visit',
  templateUrl: './create-vc-school-visit.component.html',
  styleUrls: ['./create-vc-school-visit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVCSchoolVisitComponent extends BaseComponent<VCSchoolVisitModel> implements OnInit {
  vcSchoolVisitForm: FormGroup;
  vcSchoolVisitModel: VCSchoolVisitModel;
  monthList: [DropdownModel];
  minReportingDate: Date;
  
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vcSchoolVisitService: VCSchoolVisitService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vcSchoolVisit Model
    this.vcSchoolVisitModel = new VCSchoolVisitModel();
    this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
  }

  ngOnInit(): void {
    this.commonService.GetMasterDataByType({DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month'}).subscribe((response) => {
      if (response.Success) {
        this.monthList = response.Results;
      }
    });

    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.vcSchoolVisitModel = new VCSchoolVisitModel();

        } else {
          var vcSchoolVisitId: string = params.get('vcSchoolVisitId')

          this.vcSchoolVisitService.getVCSchoolVisitById(vcSchoolVisitId)
            .subscribe((response: any) => {
              this.vcSchoolVisitModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.vcSchoolVisitModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.vcSchoolVisitModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.vcSchoolVisitForm = this.createVCSchoolVisitForm();
            });
        }
      }
    });

    this.vcSchoolVisitForm = this.createVCSchoolVisitForm();
  }

  saveOrUpdateVCSchoolVisitDetails() {
    if (!this.vcSchoolVisitForm.valid) {
      this.validateAllFormFields(this.vcSchoolVisitForm);  
      return;
    }
    this.setValueFromFormGroup(this.vcSchoolVisitForm, this.vcSchoolVisitModel);
    this.vcSchoolVisitModel.VCId = this.UserModel.UserTypeId;

    this.vcSchoolVisitService.createOrUpdateVCSchoolVisit(this.vcSchoolVisitModel)
      .subscribe((vcSchoolVisitResp: any) => {

        if (vcSchoolVisitResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VCSchoolVisit.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vcSchoolVisitResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VCSchoolVisit deletion errors =>', error);
      });
  }

  //Create vcSchoolVisit form and returns {FormGroup}
  createVCSchoolVisitForm(): FormGroup {
    return this.formBuilder.group({
      VCSchoolVisitId: new FormControl(this.vcSchoolVisitModel.VCSchoolVisitId),
      VCSchoolSectorId: new FormControl({ value: this.vcSchoolVisitModel.VCSchoolSectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReportDate: new FormControl({ value: new Date(this.vcSchoolVisitModel.ReportDate), disabled: this.PageRights.IsReadOnly }),
      GeoLocation: new FormControl({ value: this.vcSchoolVisitModel.GeoLocation, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      Month: new FormControl({ value: this.vcSchoolVisitModel.Month, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50)]),
      VTReportSubmitted: new FormControl({ value: this.vcSchoolVisitModel.VTReportSubmitted, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      VTWorkingDays: new FormControl({ value: this.vcSchoolVisitModel.VTWorkingDays, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      VTLeaveDays: new FormControl({ value: this.vcSchoolVisitModel.VTLeaveDays, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      VTTeachingDays: new FormControl({ value: this.vcSchoolVisitModel.VTTeachingDays, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      ClassVisited: new FormControl({ value: this.vcSchoolVisitModel.ClassVisited, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50)]),
      ClassTeachingDays: new FormControl({ value: this.vcSchoolVisitModel.ClassTeachingDays, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      BoysEnrolledCheck: new FormControl({ value: this.vcSchoolVisitModel.BoysEnrolledCheck, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      GirlsEnrolledCheck: new FormControl({ value: this.vcSchoolVisitModel.GirlsEnrolledCheck, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      AvgStudentAttendance: new FormControl({ value: this.vcSchoolVisitModel.AvgStudentAttendance, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      CMAvailability: new FormControl({ value: this.vcSchoolVisitModel.CMAvailability, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      CMDate: new FormControl({ value: new Date(this.vcSchoolVisitModel.CMDate), disabled: this.PageRights.IsReadOnly }),
      TEAvailability: new FormControl({ value: this.vcSchoolVisitModel.TEAvailability, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      TEDate: new FormControl({ value: new Date(this.vcSchoolVisitModel.TEDate), disabled: this.PageRights.IsReadOnly }),
      NoOfGLConducted: new FormControl({ value: this.vcSchoolVisitModel.NoOfGLConducted, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      NoOfFVConducted: new FormControl({ value: this.vcSchoolVisitModel.NoOfFVConducted, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      SchoolHMVisited: new FormControl({ value: this.vcSchoolVisitModel.SchoolHMVisited, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      HMRatingVTattendance: new FormControl({ value: this.vcSchoolVisitModel.HMRatingVTattendance, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      HMRatingSyllabuscompletion: new FormControl({ value: this.vcSchoolVisitModel.HMRatingSyllabuscompletion, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      HMRatingVtreporting: new FormControl({ value: this.vcSchoolVisitModel.HMRatingVtreporting, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      HMRatingVtqualityteaching: new FormControl({ value: this.vcSchoolVisitModel.HMRatingVtqualityteaching, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      HMRatingVtglfvquality: new FormControl({ value: this.vcSchoolVisitModel.HMRatingVtglfvquality, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      HMRatingInitiativestaken: new FormControl({ value: this.vcSchoolVisitModel.HMRatingInitiativestaken, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
     // IsActive: new FormControl({ value: this.vcSchoolVisitModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
