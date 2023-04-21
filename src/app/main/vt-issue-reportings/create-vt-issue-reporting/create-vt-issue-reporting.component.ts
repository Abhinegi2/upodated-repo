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
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

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


  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];
  academicYearList: [DropdownModel];
  classList: [DropdownModel];

  SchoolInputId: string;
  SectorInputId: string;
  JobRoleInputId: string;
  AcademicYearInputId: string;
  ClassInputId: string;

  CanUserChangeInput: boolean;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private issueReportingService: VTIssueReportingService,
    private schoolsectorjobService: SchoolSectorJobService,
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
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();
        this.loadFormInputs(this.schoolList, 'SchoolId');
      }

      if (results[1].Success) {
        this.monthList = results[1].Results;
      }

      if (results[2].Success) {
        this.studentClassList = results[2].Results;
      }

      if (results[3].Success) {
        this.studentTypeList = results[3].Results;
      }

      if (results[4].Success) {
        this.mainIssueList = results[4].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtIssueReportingModel = new VTIssueReportingModel();

            this.CanUserChangeInput = true;

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


                // this.vtIssueReportingForm = this.createVTIssueReportingForm();

                this.schoolsectorjobService.getSchoolSectorJobById(this.vtIssueReportingModel.SSJId)
                  .subscribe((response: any) => {
                    var schoolsectorjobModel = response.Result;

                    this.vtIssueReportingModel.SchoolId = schoolsectorjobModel.SchoolId;
                    this.vtIssueReportingModel.SectorId = schoolsectorjobModel.SectorId;
                    this.vtIssueReportingModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                    this.onChangeSchool(this.vtIssueReportingModel.SchoolId).then(sResp => {
                      this.onChangeSector(this.vtIssueReportingModel.SectorId).then(vvResp => {
                        this.onChangeJobRole(this.vtIssueReportingModel.JobRoleId).then(vvResp => {
                          this.onChangeAcademicYear(this.vtIssueReportingModel.AcademicYearId).then(vResp => {
                            this.onChangeMainIssue(this.vtIssueReportingModel.MainIssue);
                            this.vtIssueReportingForm = this.createVTIssueReportingForm();
                          });
                        });
                      });
                    });
                  });
              });
          }
        }
      });
    });
    this.vtIssueReportingForm = this.createVTIssueReportingForm();
  }

  onChangeSchool(schoolId): Promise<any> {
    this.resetInputsAfter('School');
    this.setFormInputs();

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'SectorsBySSJ', ParentId: schoolId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sectors'
      }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (response.Results.length == 1) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidSchoolSectorJob]));
            this.vtIssueReportingForm.controls['SchoolId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'SectorId');
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeSector(sectorId): Promise<any> {
    this.resetInputsAfter('Sector');
    this.setFormInputs();

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'JobRolesBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: sectorId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Job Role"
      }).subscribe((response) => {

        if (response.Success) {
          this.jobRoleList = response.Results;
          this.loadFormInputs(response.Results, 'JobRoleId');
        }

        resolve(true);
      });
    });
  }


  onChangeJobRole(jobRoleId): Promise<any> {
    this.resetInputsAfter('JobRole');
    this.setFormInputs();

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'YearsBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years"
      }).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;

          if (response.Results.length == 1) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidVTACS]));
            this.vtIssueReportingForm.controls['JobRoleId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'AcademicYearId');
        }
        resolve(true);
      });
    });
  }

  onChangeAcademicYear(academicYearId): Promise<any> {
    this.resetInputsAfter('AcademicYear');
    this.setFormInputs();

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'ClassesByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes'
      }, false).subscribe((response) => {

        if (response.Success) {
          this.classList = response.Results;
          // this.classList = response.Results.split(',');

          // this.loadFormInputs(response.Results, 'StudentClass');
        }
        resolve(true);
      });
    });

    this.setUserAction();

    return promise;
  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.vtIssueReportingForm.get('SchoolId').value : this.vtIssueReportingModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.vtIssueReportingForm.get('SectorId').value : this.vtIssueReportingModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.vtIssueReportingForm.get('JobRoleId').value : this.vtIssueReportingModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.vtIssueReportingForm.get('AcademicYearId').value : this.vtIssueReportingModel.AcademicYearId;
    this.ClassInputId = this.CanUserChangeInput == true ? this.vtIssueReportingForm.get('StudentClass').value : this.vtIssueReportingModel.StudentClass;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.vtIssueReportingForm.controls[InputName].enable();
    }

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.vtIssueReportingForm.controls[InputName].setValue(inputId);
      this.vtIssueReportingForm.controls[InputName].disable();
      if (InputName == 'SchoolId') {
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        this.onChangeJobRole(inputId);
      } else if (InputName == 'AcademicYearId') {
        this.onChangeAcademicYear(inputId);
      }
    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.vtIssueReportingForm.controls['SectorId'].setValue(null);
      this.vtIssueReportingForm.controls['JobRoleId'].setValue(null);
      this.vtIssueReportingForm.controls['AcademicYearId'].setValue(null);
      this.vtIssueReportingForm.controls['StudentClass'].setValue(null);
    }

    if (input == 'Sector') {
      this.vtIssueReportingForm.controls['JobRoleId'].setValue(null);
      this.vtIssueReportingForm.controls['AcademicYearId'].setValue(null);
      this.vtIssueReportingForm.controls['StudentClass'].setValue(null);
    }

    if (input == 'JobRole') {
      this.vtIssueReportingForm.controls['AcademicYearId'].setValue(null);
      this.vtIssueReportingForm.controls['StudentClass'].setValue(null);
    }

    if (input == 'AcademicYear') {
      this.vtIssueReportingForm.controls['StudentClass'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
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
    // this.vtIssueReportingModel.AcademicYearId = this.UserModel.AcademicYearId;

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
      VTId: new FormControl(this.vtIssueReportingModel.VTId),

      SchoolId: new FormControl({ value: this.vtIssueReportingModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.vtIssueReportingModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.vtIssueReportingModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),

      AcademicYearId: new FormControl({ value: this.vtIssueReportingModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),
      StudentClass: new FormControl({ value: this.vtIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),


      IssueReportDate: new FormControl({ value: new Date(this.vtIssueReportingModel.IssueReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      MainIssue: new FormControl({ value: this.vtIssueReportingModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SubIssue: new FormControl({ value: this.vtIssueReportingModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      // StudentClass: new FormControl({ value: this.vtIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.vtIssueReportingModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentType: new FormControl({ value: this.vtIssueReportingModel.StudentType, disabled: this.PageRights.IsReadOnly }),
      NoOfStudents: new FormControl({ value: this.vtIssueReportingModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern("^[0-9]*$")]),
      IssueDetails: new FormControl({ value: this.vtIssueReportingModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      IssueStatus: new FormControl({ value: this.vtIssueReportingModel.IssueStatus, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
