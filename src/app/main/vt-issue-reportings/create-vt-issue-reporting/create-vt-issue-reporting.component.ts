import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTIssueReportingService } from '../vt-issue-reporting.service';
import { VTIssueReportingModel } from '../vt-issue-reporting.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vt-issue-reporting',
  templateUrl: './create-vt-issue-reporting.component.html',
  styleUrls: ['./create-vt-issue-reporting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTIssueReportingComponent extends BaseComponent<VTIssueReportingModel> implements OnInit {
  vtIssueReportingForm: FormGroup;
  vtIssueReportingModel: VTIssueReportingModel;
  vtSchoolSectorList: [DropdownModel];
  mainIssueList: [DropdownModel];
  subIssueList: [DropdownModel];
  studentClassList: [DropdownModel];
  monthList: [DropdownModel];
  minReportingDate: Date;
  studentTypeList: any;
  checkUrl: any;
  approvalUrl: boolean = false;
  issueStatusList: any;
  notApplicableId = "218";
  allClassesId = "213";

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private issueReportingService: VTIssueReportingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtIssueReporting Model
    this.vtIssueReportingModel = new VTIssueReportingModel();
    this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
  }

  ngOnInit(): void {
    this.issueReportingService.getDropdownforVTIssueReporting(this.UserModel).subscribe((results) => {
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
            this.vtIssueReportingModel = new VTIssueReportingModel();

          } else {
            var vtIssueReportingId: string = params.get('vtIssueReportingId')

            this.issueReportingService.getVTIssueReportingById(vtIssueReportingId)
              .subscribe((response: any) => {
                this.vtIssueReportingModel = response.Result;
                this.vtIssueReportingModel.StudentClass = response.Result.StudentClass.split(',');
                this.vtIssueReportingModel.Month = response.Result.Month.split(',');

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtIssueReportingModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtIssueReportingModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeMainIssue(this.vtIssueReportingModel.MainIssue);
                this.vtIssueReportingForm = this.createVTIssueReportingForm();
              });
          }
        }
      });
    });
    this.vtIssueReportingForm = this.createVTIssueReportingForm();
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
      this.vtIssueReportingForm.get('StudentClass').setValue(['214', '215', '216', '217']);
      ev._selected = true;
    }

    if (ev._selected == false) {
      this.vtIssueReportingForm.get('StudentClass').setValue([]);
      let studentClassItem = this.studentClassList.find(s => s.Id == this.notApplicableId);
      studentClassItem.IsDisabled = false;
    }
  }

  saveOrUpdateVTIssueReportingDetails() {
    if (!this.vtIssueReportingForm.valid) {
      this.validateAllFormFields(this.vtIssueReportingForm);
      return;
    }
    var studentClass = this.vtIssueReportingForm.get('StudentClass').value;
    var month = this.vtIssueReportingForm.get('Month').value;
    this.setValueFromFormGroup(this.vtIssueReportingForm, this.vtIssueReportingModel);
    this.vtIssueReportingModel.StudentClass = studentClass.join(',');
    this.vtIssueReportingModel.Month = month.join(',');
    this.vtIssueReportingModel.VTId = this.UserModel.UserTypeId;
    this.vtIssueReportingModel.AcademicYearId = this.UserModel.AcademicYearId;

    this.issueReportingService.createOrUpdateVTIssueReporting(this.vtIssueReportingModel)
      .subscribe((vtIssueReportingResp: any) => {

        if (vtIssueReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTIssueReporting.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtIssueReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTIssueReporting deletion errors =>', error);
      });
  }

  onChangeMainIssue(mainIssueId: string) {
    this.commonService.GetMasterDataByType({ DataType: 'SubIssue', UserId: this.UserModel.RoleCode, ParentId: mainIssueId, SelectTitle: 'Sub Issue' }).subscribe((response: any) => {
      if (response.Success) {
        this.subIssueList = response.Results;
      }
    });
  }

  //Create vtIssueReporting form and returns {FormGroup}
  createVTIssueReportingForm(): FormGroup {
    return this.formBuilder.group({
      VTIssueReportingId: new FormControl(this.vtIssueReportingModel.VTIssueReportingId),
      VCId: new FormControl(this.vtIssueReportingModel.VTId),
      IssueReportDate: new FormControl({ value: new Date(this.vtIssueReportingModel.IssueReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      MainIssue: new FormControl({ value: this.vtIssueReportingModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SubIssue: new FormControl({ value: this.vtIssueReportingModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentClass: new FormControl({ value: this.vtIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.vtIssueReportingModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentType: new FormControl({ value: this.vtIssueReportingModel.StudentType, disabled: this.PageRights.IsReadOnly }),
      NoOfStudents: new FormControl({ value: this.vtIssueReportingModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern("^[0-9]*$")]),
      IssueDetails: new FormControl({ value: this.vtIssueReportingModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      IssueStatus: new FormControl({ value: this.vtIssueReportingModel.IssueStatus, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
