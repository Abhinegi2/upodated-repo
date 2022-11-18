import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { HMIssueReportingService } from '../hm-issue-reporting.service';
import { HMIssueReportingModel } from '../hm-issue-reporting.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'hm-issue-reporting',
  templateUrl: './create-hm-issue-reporting.component.html',
  styleUrls: ['./create-hm-issue-reporting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateHMIssueReportingComponent extends BaseComponent<HMIssueReportingModel> implements OnInit {
  hmIssueReportingForm: FormGroup;
  hmIssueReportingModel: HMIssueReportingModel;
  headMasterList: [DropdownModel];
  vtSchoolSectorList: [DropdownModel];
  mainIssueList: [DropdownModel];
  subIssueList: [DropdownModel];
  studentClassList: [DropdownModel];
  monthList: [DropdownModel];
  studentTypeList: any;
  notApplicableId = "218";
  allClassesId = "213";

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private issueReportingService: HMIssueReportingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default hmIssueReporting Model
    this.hmIssueReportingModel = new HMIssueReportingModel();
  }

  ngOnInit(): void {
    this.issueReportingService.getDropdownforHMIssueReporting(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.monthList = results[0].Results;
      }

      if (results[1].Success) {
        this.studentClassList = results[1].Results;
      }

      if (results[2].Success) {
        this.studentTypeList = results[2].Results;
      }

      if (results[3].Success) {
        this.mainIssueList = results[3].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.hmIssueReportingModel = new HMIssueReportingModel();

          } else {
            var hmIssueReportingId: string = params.get('hmIssueReportingId')

            this.issueReportingService.getHMIssueReportingById(hmIssueReportingId)
              .subscribe((response: any) => {
                this.hmIssueReportingModel = response.Result;
                this.hmIssueReportingModel.StudentClass = response.Result.StudentClass.split(',');
                this.hmIssueReportingModel.Month = response.Result.Month.split(',');

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.hmIssueReportingModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.hmIssueReportingModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.onChangeMainIssue(this.hmIssueReportingModel.MainIssue);
                this.hmIssueReportingForm = this.createHMIssueReportingForm();
              });
          }
        }
      });
    });

    this.hmIssueReportingForm = this.createHMIssueReportingForm();
  }

  onChangeMainIssue(mainIssueId: string) {
    this.commonService.GetMasterDataByType({ DataType: 'SubIssue', UserId: this.UserModel.RoleCode, ParentId: mainIssueId, SelectTitle: 'Sub Issue' }).subscribe((response: any) => {
      if (response.Success) {
        this.subIssueList = response.Results;
      }
    });
  }

  onStudentClassChange(selectedSectionIds) {
    if (selectedSectionIds.length == 0) {
      this.studentClassList.forEach(studentClassItem => {
        studentClassItem.IsDisabled = false;
      });
    }
    else {
      if (selectedSectionIds[0] == this.notApplicableId) {
        this.studentClassList.forEach(studentClassItem => {
          if (studentClassItem.Id != selectedSectionIds[0]) {
            studentClassItem.IsDisabled = true;
          }
        });
      }
      else {
        let studentClassItem = this.studentClassList.find(s => s.Id == this.notApplicableId);
        studentClassItem.IsDisabled = true;
      }
    }
  }

  selectAll(ev) {
    if (ev._selected) {
      this.hmIssueReportingForm.get('StudentClass').setValue(['214', '215', '216', '217']);
      ev._selected = true;
    }

    if (ev._selected == false) {
      this.hmIssueReportingForm.get('StudentClass').setValue(null);
      let studentClassItem = this.studentClassList.find(s => s.Id == this.notApplicableId);
      studentClassItem.IsDisabled = false;
    }
  }

  saveOrUpdateHMIssueReportingDetails() {
    if (!this.hmIssueReportingForm.valid) {
      this.validateAllFormFields(this.hmIssueReportingForm);
      return;
    }
    var studentClass = this.hmIssueReportingForm.get('StudentClass').value;
    var month = this.hmIssueReportingForm.get('Month').value;
    this.setValueFromFormGroup(this.hmIssueReportingForm, this.hmIssueReportingModel);
    this.hmIssueReportingModel.StudentClass = studentClass.join(',');
    this.hmIssueReportingModel.Month = month.join(',');
    this.hmIssueReportingModel.HMId = this.UserModel.UserTypeId;
    this.hmIssueReportingModel.AcademicYearId = this.UserModel.AcademicYearId;

    this.issueReportingService.createOrUpdateHMIssueReporting(this.hmIssueReportingModel)
      .subscribe((hmIssueReportingResp: any) => {

        if (hmIssueReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.HMIssueReporting.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(hmIssueReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('HMIssueReporting deletion errors =>', error);
      });
  }

  //Create hmIssueReporting form and returns {FormGroup}
  createHMIssueReportingForm(): FormGroup {
    return this.formBuilder.group({
      HMIssueReportingId: new FormControl(this.hmIssueReportingModel.HMIssueReportingId),
      IssueReportDate: new FormControl({ value: new Date(this.hmIssueReportingModel.IssueReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      MainIssue: new FormControl({ value: this.hmIssueReportingModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SubIssue: new FormControl({ value: this.hmIssueReportingModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentClass: new FormControl({ value: this.hmIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.hmIssueReportingModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentType: new FormControl({ value: this.hmIssueReportingModel.StudentType, disabled: this.PageRights.IsReadOnly }, Validators.required),
      NoOfStudents: new FormControl({ value: this.hmIssueReportingModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      IssueDetails: new FormControl({ value: this.hmIssueReportingModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350))
    });
  }
}
