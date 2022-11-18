import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VCIssueReportingService } from '../vc-issue-reporting.service';
import { VCIssueReportingModel } from '../vc-issue-reporting.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vc-issue-reporting',
  templateUrl: './create-vc-issue-reporting.component.html',
  styleUrls: ['./create-vc-issue-reporting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVCIssueReportingComponent extends BaseComponent<VCIssueReportingModel> implements OnInit {
  vcIssueReportingForm: FormGroup;
  vcIssueReportingModel: VCIssueReportingModel;
  mainIssueList: [DropdownModel];
  subIssueList: [DropdownModel];
  studentClassList: [DropdownModel];
  monthList: [DropdownModel];
  minReportingDate: Date;
  studentTypeList: any;
  notApplicableId = "218";
  allClassesId = "213";

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private issueReportingService: VCIssueReportingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vcIssueReporting Model
    this.vcIssueReportingModel = new VCIssueReportingModel();
    this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
  }

  ngOnInit(): void {

    this.issueReportingService.getDropdownforVCIssueReporting(this.UserModel).subscribe((results) => {
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
            this.vcIssueReportingModel = new VCIssueReportingModel();

          } else {
            var vcIssueReportingId: string = params.get('vcIssueReportingId')

            this.issueReportingService.getVCIssueReportingById(vcIssueReportingId)
              .subscribe((response: any) => {
                this.vcIssueReportingModel = response.Result;
                this.vcIssueReportingModel.StudentClass = response.Result.StudentClass.split(',');
                this.vcIssueReportingModel.Month = response.Result.Month.split(',');

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vcIssueReportingModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vcIssueReportingModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeMainIssue(this.vcIssueReportingModel.MainIssue);
                this.vcIssueReportingForm = this.createVCIssueReportingForm();
              });
          }
        }
      });
    });

    this.vcIssueReportingForm = this.createVCIssueReportingForm();
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
      this.vcIssueReportingForm.get('StudentClass').setValue(['214', '215', '216', '217']);
      ev._selected = true;
    }

    if (ev._selected == false) {
      this.vcIssueReportingForm.get('StudentClass').setValue([]);
      let studentClassItem = this.studentClassList.find(s => s.Id == this.notApplicableId);
      studentClassItem.IsDisabled = false;
    }
  }

  saveOrUpdateVCIssueReportingDetails() {
    if (!this.vcIssueReportingForm.valid) {
      this.validateAllFormFields(this.vcIssueReportingForm);
      return;
    }
    var studentClass = this.vcIssueReportingForm.get('StudentClass').value;
    var month = this.vcIssueReportingForm.get('Month').value;
    this.setValueFromFormGroup(this.vcIssueReportingForm, this.vcIssueReportingModel);
    this.vcIssueReportingModel.StudentClass = studentClass.join(',');
    this.vcIssueReportingModel.Month = month.join(',');
    this.vcIssueReportingModel.VCId = this.UserModel.UserTypeId;
    this.vcIssueReportingModel.AcademicYearId = this.UserModel.AcademicYearId;

    this.issueReportingService.createOrUpdateVCIssueReporting(this.vcIssueReportingModel)
      .subscribe((vcIssueReportingResp: any) => {

        if (vcIssueReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VCIssueReporting.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vcIssueReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VCIssueReporting deletion errors =>', error);
      });
  }

  onChangeMainIssue(mainIssueId: string) {
    this.commonService.GetMasterDataByType({ DataType: 'SubIssue', UserId: this.UserModel.RoleCode, ParentId: mainIssueId, SelectTitle: 'Sub Issue' }).subscribe((response: any) => {
      if (response.Success) {
        this.subIssueList = response.Results;
      }
    });
  }

  //Create vcIssueReporting form and returns {FormGroup}
  createVCIssueReportingForm(): FormGroup {
    return this.formBuilder.group({
      VCIssueReportingId: new FormControl(this.vcIssueReportingModel.VCIssueReportingId),
      VCId: new FormControl(this.vcIssueReportingModel.VCId),
      IssueReportDate: new FormControl({ value: new Date(this.vcIssueReportingModel.IssueReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      MainIssue: new FormControl({ value: this.vcIssueReportingModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SubIssue: new FormControl({ value: this.vcIssueReportingModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentClass: new FormControl({ value: this.vcIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.vcIssueReportingModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentType: new FormControl({ value: this.vcIssueReportingModel.StudentType, disabled: this.PageRights.IsReadOnly }, Validators.required),
      NoOfStudents: new FormControl({ value: this.vcIssueReportingModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      IssueDetails: new FormControl({ value: this.vcIssueReportingModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350))
    });
  }
}
