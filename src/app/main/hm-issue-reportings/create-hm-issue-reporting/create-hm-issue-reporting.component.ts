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
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

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
    private issueReportingService: HMIssueReportingService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default hmIssueReporting Model
    this.hmIssueReportingModel = new HMIssueReportingModel();
  }

  ngOnInit(): void {
    this.issueReportingService.getDropdownforHMIssueReporting(this.UserModel).subscribe((results) => {
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
            this.hmIssueReportingModel = new HMIssueReportingModel();

            if (results[0].Success) {
              this.schoolList = results[0].Results;
              this.filteredSchoolItems = this.schoolList.slice();
              this.loadFormInputs(this.schoolList, 'SchoolId');
            }
            this.CanUserChangeInput = true;

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

                this.schoolsectorjobService.getSchoolSectorJobById(this.hmIssueReportingModel.SSJId)
                  .subscribe((response: any) => {
                    var schoolsectorjobModel = response.Result;

                    this.hmIssueReportingModel.SchoolId = schoolsectorjobModel.SchoolId;
                    this.hmIssueReportingModel.SectorId = schoolsectorjobModel.SectorId;
                    this.hmIssueReportingModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                    this.setInputs(this.hmIssueReportingModel.SchoolId, 'SchoolId', 'SchoolById').then(sResp => {
                      this.setInputs(this.hmIssueReportingModel.SectorId, 'SectorId', 'SectorById').then(vvResp => {
                        this.setInputs(this.hmIssueReportingModel.JobRoleId, 'JobRoleId', 'JobRoleById').then(vvResp => {
                          this.setInputs(this.hmIssueReportingModel.AcademicYearId, 'AcademicYearId', 'AcademicYearById').then(vResp => {
                            this.onChangeAcademicYear(this.hmIssueReportingModel.AcademicYearId);
                            this.onChangeMainIssue(this.hmIssueReportingModel.MainIssue);
                            this.hmIssueReportingForm = this.createHMIssueReportingForm();
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

    this.hmIssueReportingForm = this.createHMIssueReportingForm();
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
            this.hmIssueReportingForm.controls['SchoolId'].setValue(null);
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
            this.hmIssueReportingForm.controls['JobRoleId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'AcademicYearId');
        }
        resolve(true);
      });
      this.setUserAction();
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

          // this.loadFormInputs(response.Results, 'StudentClass');
        }
        resolve(true);
      });
    });

    this.setUserAction();

    return promise;
  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.hmIssueReportingForm.get('SchoolId').value : this.hmIssueReportingModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.hmIssueReportingForm.get('SectorId').value : this.hmIssueReportingModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.hmIssueReportingForm.get('JobRoleId').value : this.hmIssueReportingModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.hmIssueReportingForm.get('AcademicYearId').value : this.hmIssueReportingModel.AcademicYearId;
    this.ClassInputId = this.CanUserChangeInput == true ? this.hmIssueReportingForm.get('StudentClass').value : this.hmIssueReportingModel.StudentClass;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.hmIssueReportingForm.controls[InputName].enable();
    }

    if (response.length == 2) {

      var inputId = response[1].Id;
      this.hmIssueReportingForm.controls[InputName].setValue(inputId);
      this.hmIssueReportingForm.controls[InputName].disable();

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
      this.hmIssueReportingForm.controls['SectorId'].setValue(null);
      this.hmIssueReportingForm.controls['JobRoleId'].setValue(null);
      this.hmIssueReportingForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'Sector') {
      this.hmIssueReportingForm.controls['JobRoleId'].setValue(null);
      this.hmIssueReportingForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'JobRole') {
      this.hmIssueReportingForm.controls['AcademicYearId'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
  }


  setInputs(parentId, InputId, dataType): Promise<any> {

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: dataType, ParentId: parentId, SelectTitle: 'Select'
      }).subscribe((response) => {
        if (response.Success) {
          if (InputId == 'SchoolId') {
            this.schoolList = response.Results;
            this.filteredSchoolItems = this.schoolList.slice();
            console.log(this.schoolList, 'this');
            this.hmIssueReportingForm.controls[InputId].disable();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
            this.hmIssueReportingForm.controls[InputId].disable();
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
            this.hmIssueReportingForm.controls[InputId].disable();
          } else if (InputId == 'AcademicYearId') {
            this.academicYearList = response.Results;
            this.hmIssueReportingForm.controls[InputId].disable();
          }
        }
        resolve(true);
      });

    });
    return promise;
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
    // this.hmIssueReportingModel.AcademicYearId = this.UserModel.AcademicYearId;

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

      SchoolId: new FormControl({ value: this.hmIssueReportingModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.hmIssueReportingModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.hmIssueReportingModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),

      AcademicYearId: new FormControl({ value: this.hmIssueReportingModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),
      StudentClass: new FormControl({ value: this.hmIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),

      MainIssue: new FormControl({ value: this.hmIssueReportingModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SubIssue: new FormControl({ value: this.hmIssueReportingModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.required),

      // StudentClass: new FormControl({ value: this.hmIssueReportingModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Month: new FormControl({ value: this.hmIssueReportingModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentType: new FormControl({ value: this.hmIssueReportingModel.StudentType, disabled: this.PageRights.IsReadOnly }, Validators.required),
      NoOfStudents: new FormControl({ value: this.hmIssueReportingModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      IssueDetails: new FormControl({ value: this.hmIssueReportingModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350))
    });
  }
}
