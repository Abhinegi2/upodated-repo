import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { DRPDailyReportingService } from '../drp-daily-reporting.service';
import { DRPDailyReportingModel } from '../drp-daily-reporting.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { DRPLeaveModel } from '../drp-leave.model';
import { DRPHolidayModel } from '../drp-holiday.model';
import { DRPIndustryExposureVisitModel } from '../drp-industry-exposure-visit.model';

@Component({
  selector: 'drp-daily-reporting',
  templateUrl: './create-drp-daily-reporting.component.html',
  styleUrls: ['./create-drp-daily-reporting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateDRPDailyReportingComponent extends BaseComponent<DRPDailyReportingModel> implements OnInit {
  dailyReportingForm: FormGroup;
  dailyReportingModel: DRPDailyReportingModel;
  vocationalCoordinatorList: [DropdownModel];
  reportTypeList: [DropdownModel];
  workTypeList: [DropdownModel];
  industryLinkageList: [DropdownModel];
  leaveApproverList: [DropdownModel];
  schoolList: [DropdownModel];

  isAllowHoliday: boolean = false;
  isAllowLeave: boolean = false;
  isAllowSchool: boolean = false;
  isAllowIndustryExposureVisit: boolean = false;
  isAllowWorkDetails: boolean = false;
  holidayTypeList: any;
  observationDayList: any;
  leaveTypeList: any;
  minReportingDate: Date;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private dailyReportingService: DRPDailyReportingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default dailyReporting Model
    this.dailyReportingModel = new DRPDailyReportingModel();
    this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
  }

  ngOnInit(): void {

    this.dailyReportingService.getDropdownForDRPDailyReporting().subscribe(results => {
      if (results[0].Success) {
        this.reportTypeList = results[0].Results;

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.dailyReportingModel = new DRPDailyReportingModel();

            } else {
              var dailyReportingId: string = params.get('drpDailyReportingId')

              this.dailyReportingService.getDRPDailyReportingById(dailyReportingId)
                .subscribe((response: any) => {
                  this.dailyReportingModel = response.Result;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.dailyReportingModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.dailyReportingModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }

                  this.dailyReportingForm = this.createDRPDailyReportingForm();
                  this.onChangeReportType(this.dailyReportingModel.ReportType).then(response => {
                    if (this.dailyReportingModel.WorkingDayTypeIds.length > 0) {
                      this.onChangeWorkingType(this.dailyReportingModel.WorkingDayTypeIds);
                    }
                  });
                });
            }
          }
        });

      }
    });

    this.dailyReportingForm = this.createDRPDailyReportingForm();
  }

  onChangeReportType(reportTypeId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'DRPWorkType', ParentId: reportTypeId, SelectTitle: 'Working Day' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.resetReportTypeFormGroups();

          // On Leave
          if (reportTypeId == 305) {
            this.isAllowLeave = true;
            this.dailyReportingModel.Leave = new DRPLeaveModel(this.dailyReportingModel.Leave);

            this.dailyReportingForm = this.formBuilder.group({
              ...this.dailyReportingForm.controls,

              leaveGroup: this.formBuilder.group({
                LeaveTypeId: new FormControl({ value: this.dailyReportingModel.Leave.LeaveTypeId, disabled: this.PageRights.IsReadOnly }),
                LeaveApprovalStatus: new FormControl({ value: this.dailyReportingModel.Leave.LeaveApprovalStatus, disabled: this.PageRights.IsReadOnly }),
                LeaveApprover: new FormControl({ value: this.dailyReportingModel.Leave.LeaveApprover, disabled: this.PageRights.IsReadOnly }),
                LeaveReason: new FormControl({ value: this.dailyReportingModel.Leave.LeaveReason, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(350)]),
              })
            });

            this.leaveTypeList = response.Results;

            this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'DRPLeaveApprover', SelectTitle: 'Leave Approver' }).subscribe((response) => {
              if (response.Success) {
                this.leaveApproverList = response.Results;
              }
            });
          }

          // Holiday/ School Off        
          else if (reportTypeId == 306) {
            this.isAllowHoliday = true;
            this.dailyReportingModel.Holiday = new DRPHolidayModel(this.dailyReportingModel.Holiday);

            this.dailyReportingForm = this.formBuilder.group({
              ...this.dailyReportingForm.controls,

              holidayGroup: this.formBuilder.group({
                HolidayTypeId: new FormControl({ value: this.dailyReportingModel.Holiday.HolidayTypeId, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
                HolidayDetails: new FormControl({ value: this.dailyReportingModel.Holiday.HolidayDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(250)),
              })
            });

            this.holidayTypeList = response.Results;
          }

          else {

            // this.dailyReportingForm = this.formBuilder.group({
            //   ...this.dailyReportingForm.controls,

            //   WorkingDayTypeIds: new FormControl({ value: this.dailyReportingModel.WorkingDayTypeIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
            // });

            this.dailyReportingForm.controls["WorkingDayTypeIds"].setValidators([Validators.required]);
            this.dailyReportingForm.controls["WorkingDayTypeIds"].updateValueAndValidity();
            this.workTypeList = response.Results;
          }

          resolve(true);
        }
      });

    });
    return promise;
  }

  onChangeWorkingType(workingTypes): void {
    this.resetWorkTypesFormGroups();

    workingTypes.forEach(workTypeId => {

      //1. Industry Exposure Visit
      if (workTypeId == '160') {
        this.isAllowIndustryExposureVisit = true;
        this.dailyReportingModel.IndustryExposureVisit = new DRPIndustryExposureVisitModel(this.dailyReportingModel.IndustryExposureVisit);

        this.dailyReportingForm = this.formBuilder.group({
          ...this.dailyReportingForm.controls,

          industryExposureVisitGroup: this.formBuilder.group({
            TypeOfIndustryLinkage: new FormControl({ value: this.dailyReportingModel.IndustryExposureVisit.TypeOfIndustryLinkage, disabled: this.PageRights.IsReadOnly }),
            ContactPersonName: new FormControl({ value: this.dailyReportingModel.IndustryExposureVisit.ContactPersonName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharsWithSpace)]),
            ContactPersonMobile: new FormControl({ value: this.dailyReportingModel.IndustryExposureVisit.ContactPersonMobile, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.MobileNumber), Validators.minLength(10), Validators.maxLength(10)]),
            ContactPersonEmail: new FormControl({ value: this.dailyReportingModel.IndustryExposureVisit.ContactPersonEmail, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
          })
        });

        this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'IndustryLinkageType', SelectTitle: 'Industry Linkage' }).subscribe((response) => {
          if (response.Success) {
            this.industryLinkageList = response.Results;
          }
        });
      }
      //School
      else if (workTypeId == "313") {
        this.isAllowSchool = true;

        this.commonService.GetSchoolsByDRPId({ DataId: this.UserModel.LoginId, DataId1: this.UserModel.UserTypeId, SelectTitle: 'School' }).subscribe((response) => {
          if (response.Success) {
            this.schoolList = response.Results;
          }
        });
      }

      //Work details
      if (workTypeId !== '160') {
        this.isAllowWorkDetails = true;
      }
    });

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      let initialFormValues = this.dailyReportingForm.value;
      this.dailyReportingForm.reset(initialFormValues);
    }
  }

  resetReportTypeFormGroups(): void {
    this.isAllowHoliday = false;
    this.isAllowLeave = false;
    this.isAllowWorkDetails = false;
    this.isAllowSchool = false;
    this.isAllowIndustryExposureVisit = false;

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      delete this.dailyReportingForm.controls['leaveGroup'];
      delete this.dailyReportingForm.value['leaveGroup'];
      delete this.dailyReportingForm.controls['holidayGroup'];
      delete this.dailyReportingForm.value['holidayGroup'];
      delete this.dailyReportingForm.controls['industryExposureVisitGroup'];
      delete this.dailyReportingForm.value['industryExposureVisitGroup'];

      this.dailyReportingForm.controls["WorkingDayTypeIds"].clearValidators();
      this.dailyReportingForm.controls["SchoolId"].clearValidators();

      this.dailyReportingForm.controls["WorkingDayTypeIds"].updateValueAndValidity();
      this.dailyReportingForm.controls["SchoolId"].updateValueAndValidity();

      let initialFormValues = this.dailyReportingForm.value;
      this.dailyReportingForm.reset(initialFormValues);
    }
  }

  resetWorkTypesFormGroups(): void {
    this.isAllowIndustryExposureVisit = false;
    this.isAllowSchool = false;
    this.isAllowWorkDetails = false;
  }

  saveOrUpdateDRPDailyReportingDetails() {
    if (!this.dailyReportingForm.valid) {
      this.validateAllFormFields(this.dailyReportingForm);
      return;
    }
    this.dailyReportingModel = this.dailyReportingService.getDRPDailyReportingModelFromFormGroup(this.dailyReportingForm);
    this.dailyReportingModel.ReportDate = this.DateFormatPipe.transform(this.dailyReportingForm.get("ReportDate").value, this.Constants.ServerDateFormat);
    this.dailyReportingModel.DRPId = this.UserModel.UserTypeId;

    this.dailyReportingService.createOrUpdateDRPDailyReporting(this.dailyReportingModel)
      .subscribe((dailyReportingResp: any) => {

        if (dailyReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.DRPDailyReporting.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(dailyReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('DRPDailyReporting deletion errors =>', error);
      });
  }

  //Create dailyReporting form and returns {FormGroup}
  createDRPDailyReportingForm(): FormGroup {
    return this.formBuilder.group({
      DRPDailyReportingId: new FormControl(this.dailyReportingModel.DRPDailyReportingId),
      DRPId: new FormControl({ value: this.dailyReportingModel.DRPId }),
      ReportDate: new FormControl({ value: new Date(this.dailyReportingModel.ReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReportType: new FormControl({ value: this.dailyReportingModel.ReportType, disabled: this.PageRights.IsReadOnly }, Validators.required),
      WorkingDayTypeIds: new FormControl({ value: this.dailyReportingModel.WorkingDayTypeIds, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.dailyReportingModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      WorkTypeDetails: new FormControl({ value: this.dailyReportingModel.WorkTypeDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
    });
  }
}
