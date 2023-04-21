import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { StudentClassService } from '../student-class.service';
import { StudentClassModel } from '../student-class.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { StringNullableChain } from 'lodash';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

@Component({
  selector: 'student-class',
  templateUrl: './create-student-class.component.html',
  styleUrls: ['./create-student-class.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateStudentClassComponent extends BaseComponent<StudentClassModel> implements OnInit {
  studentClassForm: FormGroup;
  studentClassModel: StudentClassModel;
  currentAcademicYearId: string;

  academicYearList: [DropdownModel];

  classList: [DropdownModel];
  sectionList: [DropdownModel];
  genderList: [DropdownModel];
  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];

  socialCategoryList: [DropdownModel];
  // assessmentToBeConductedList: [DropdownModel];
  // CSWNStatus: [DropdownModel];
  // Stream: [DropdownModel];
  // vtpList: DropdownModel[];
  // vtpId: string;
  // getGVTId: string;

  // vcList: DropdownModel[];
  // vcId: string;
  // vtList: DropdownModel[];

  vtId: any;

  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  schoolId: string;


  noSectionId = "40b2d9eb-0dbf-11eb-ba32-0a761174c048";

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private studentClassService: StudentClassService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default studentClass Model
    this.studentClassModel = new StudentClassModel();
    this.studentClassForm = this.createStudentClassForm();
  }

  ngOnInit(): void {
    this.studentClassService.getDropdownforStudentClass(this.UserModel).subscribe((results) => {

      if (results[0].Success) {
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();

        if (this.schoolList.length == 1 && this.UserModel.RoleCode == 'VT') {
          this.studentClassForm.controls['SchoolId'].setValue(this.schoolList[0].Id);
          this.studentClassForm.controls['SchoolId'].disable();
          this.onChangeSchool(this.schoolList[0].Id);
        }
      }

      if (results[1].Success) {
        this.genderList = results[1].Results;
      }

      if (results[5].Success) {
        this.socialCategoryList = results[5].Results;
      }

      // if (results[8].Success) {
      //   this.assessmentToBeConductedList = results[8].Results;
      // }

      // if (results[6].Success) {
      //   this.CSWNStatus = results[6].Results;
      // }

      // if (results[7].Success) {
      //   this.Stream = results[7].Results;
      // }

      // if (this.UserModel.RoleCode == 'VT') {
      //   if (results[4].Success) {
      //     this.classList = results[4].Results;
      //   }
      // } else {
      //   if (results[4].Success) {
      //     this.classList = results[4].Results;
      //   }
      // }

      // if (this.UserModel.RoleCode == 'VT') {
      //   if (results[2].Success) {
      //     this.academicYearList = results[2].Results;
      //   }
      // } else {
      //   if (results[3].Success) {
      //     this.academicYearList = results[3].Results;
      //   }
      // }



      // if (results[4].Success) {
      //   this.vtpList = results[4].Results;
      // }

      // if (results[5].Success) {
      //   this.academicYearAllList = results[5].Results;
      // }

      // let currentYearItem = this.academicYearAllList.find(ay => ay.IsSelected == true)
      // if (currentYearItem != null) {
      //   this.currentAcademicYearId = currentYearItem.Id;
      // }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.studentClassModel = new StudentClassModel();
          } else {
            var studentId: string = params.get('studentId')

            this.studentClassService.getStudentClassById(studentId).subscribe((response: any) => {

              this.studentClassModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
                this.studentClassModel.RequestType = this.Constants.PageType.Edit;
                this.setDropoutReasonValidators();
                this.setSectorJobRole(this.studentClassModel.GVTId);
              }
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.studentClassModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.onChangeSchool(this.studentClassModel.SchoolId).then(sResp => {
                this.onChangeSector(this.studentClassModel.SectorId).then(vvResp => {
                  this.onChangeJobRole(this.studentClassModel.JobRoleId).then(vvResp => {
                    this.onChangeAcademicYear(this.studentClassModel.AcademicYearId).then(vResp => {
                      this.onChangeClass(this.studentClassModel.ClassId).then(cResp => {
                        this.studentClassForm = this.createStudentClassForm();
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
  }

  setEditInputValidation() {
    this.studentClassForm.controls['SchoolId'].disable();
    this.studentClassForm.controls['SectorId'].disable();
    this.studentClassForm.controls['JobRoleId'].disable();
    this.studentClassForm.controls['AcademicYearId'].disable();
    this.studentClassForm.controls['ClassId'].disable();
    this.studentClassForm.controls['SectionId'].disable();
  }

  setSectorJobRole(schoolsectorjobId) {
    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      this.schoolsectorjobService.getSchoolSectorJobById(schoolsectorjobId)
        .subscribe((response: any) => {
          var schoolsectorjobModel = response.Result;
          this.studentClassModel.SchoolId = schoolsectorjobModel.SchoolId;
          this.studentClassModel.SectorId = schoolsectorjobModel.SectorId;
          this.studentClassModel.JobRoleId = schoolsectorjobModel.JobRoleId;
        });
    }
  }

  onChangeSchool(schoolId): Promise<any> {
    this.studentClassForm.controls['SectorId'].setValue(null);
    this.studentClassForm.controls['JobRoleId'].setValue(null);
    this.studentClassForm.controls['AcademicYearId'].setValue(null);
    this.studentClassForm.controls['ClassId'].setValue(null);
    this.studentClassForm.controls['SectionId'].setValue(null);

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'SectorsBySSJ', ParentId: schoolId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sectors' }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;
          // this.studentClassForm.controls['SectorId'].enable();

          if (response.Results.length == 1) {
            var errorMessages = this.getHtmlMessage(["The selected School is not mapped with any <b>Sector</b> and <b>JobRole</b>.<br><br> Please visit the <a href='/schoolsectorjobs'><b>School Sector JobRole</b></a> page and assign a Sector & Jobrole to the required School."]);
            this.dialogService.openShowDialog(errorMessages);
            this.studentClassForm.controls['SchoolId'].setValue(null);
          }
          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.studentClassForm.controls['SectorId'].setValue(this.sectorList[1].Id);
            this.studentClassForm.controls['SectorId'].disable();
            this.onChangeSector(this.sectorList[1].Id);

          }
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeSector(sectorId): Promise<any> {

    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.studentClassForm.controls['JobRoleId'].setValue(null);
      this.studentClassForm.controls['AcademicYearId'].setValue(null);
      this.studentClassForm.controls['ClassId'].setValue(null);
      this.studentClassForm.controls['SectionId'].setValue(null);

      schoolId = this.studentClassForm.get('SchoolId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      var schoolId = this.studentClassModel.SchoolId;
      sectorId = this.studentClassModel.SectorId;
    }

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'JobRolesBySSJ', DataTypeID1: schoolId, DataTypeID2: sectorId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Job Role" }).subscribe((response) => {

        if (response.Success) {
          this.jobRoleList = response.Results;
          console.log(this.jobRoleList);
          // this.studentClassForm.controls['JobRoleId'].enable();

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.studentClassForm.controls['JobRoleId'].setValue(this.jobRoleList[1].Id);
            this.studentClassForm.controls['JobRoleId'].disable();
            this.onChangeJobRole(this.jobRoleList[1].Id);
          }
        }

        resolve(true);
      });
    });
  }


  onChangeJobRole(jobRoleId): Promise<any> {

    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.studentClassForm.controls['AcademicYearId'].setValue(null);
      this.studentClassForm.controls['ClassId'].setValue(null);
      this.studentClassForm.controls['SectionId'].setValue(null);

      var schoolId = this.studentClassForm.get('SchoolId').value;
      var sectorId = this.studentClassForm.get('SectorId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      schoolId = this.studentClassModel.SchoolId;
      sectorId = this.studentClassModel.SectorId;
      jobRoleId = this.studentClassModel.JobRoleId;
    }

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'YearsBySSJ', DataTypeID1: schoolId, DataTypeID2: sectorId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years" }).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;
          // this.studentClassForm.controls['AcademicYearId'].enable();

          if (response.Results.length == 1) {
            var errorMessages = this.getHtmlMessage(["The selected School Sector JobRole is not mapped with any <b>Academic Class Section</b>.<br><br> Please visit the <a href='/vtacademicclasssections'><b>VT Academic Class Sections</b></a> page."]);
            this.dialogService.openShowDialog(errorMessages);
            this.studentClassForm.controls['JobRoleId'].setValue(null);
          }

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.studentClassForm.controls['AcademicYearId'].setValue(response.Results[1].Id);
            this.studentClassForm.controls['AcademicYearId'].disable();
            this.onChangeAcademicYear(response.Results[1].Id);
          }
        }
        resolve(true);
      });
    });


  }

  onChangeAcademicYear(academicYearId): Promise<any> {
    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.studentClassForm.controls['ClassId'].setValue(null);
      this.studentClassForm.controls['SectionId'].setValue(null);

      var schoolId = this.studentClassForm.get('SchoolId').value;
      var sectorId = this.studentClassForm.get('SectorId').value;
      var jobRoleId = this.studentClassForm.get('JobRoleId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      schoolId = this.studentClassModel.SchoolId;
      sectorId = this.studentClassModel.SectorId;
      jobRoleId = this.studentClassModel.JobRoleId;
      academicYearId = this.studentClassModel.AcademicYearId;
    }

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'ClassesByACS', DataTypeID1: schoolId, DataTypeID2: sectorId, DataTypeID3: jobRoleId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes' }).subscribe((response) => {
        if (response.Success) {
          this.classList = response.Results;
          // this.studentClassForm.controls['ClassId'].enable();

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.studentClassForm.controls['ClassId'].setValue(response.Results[1].Id);
            this.studentClassForm.controls['ClassId'].disable();
            this.onChangeClass(response.Results[1].Id);
          }
        }

        resolve(true);
      });
    });
    return promise;
  }


  onChangeClass(classId): Promise<any> {

    if (this.PageRights.ActionType == this.Constants.Actions.New) {

      this.studentClassForm.controls['SectionId'].setValue(null);

      var schoolId = this.studentClassForm.get('SchoolId').value;
      var sectorId = this.studentClassForm.get('SectorId').value;
      var jobRoleId = this.studentClassForm.get('JobRoleId').value;
      var academicYearId = this.studentClassForm.get('AcademicYearId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      schoolId = this.studentClassModel.SchoolId;
      sectorId = this.studentClassModel.SectorId;
      jobRoleId = this.studentClassModel.JobRoleId;
      academicYearId = this.studentClassModel.AcademicYearId;
    }

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'SectionsByACS', DataTypeID1: schoolId, DataTypeID2: sectorId, DataTypeID3: jobRoleId, DataTypeID4: academicYearId, DataTypeID5: classId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sections' }).subscribe((response) => {
        if (response.Success) {
          this.sectionList = response.Results;
          // this.studentClassForm.controls['SectionId'].enable();

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.studentClassForm.controls['SectionId'].setValue(response.Results[1].Id);
            this.studentClassForm.controls['SectionId'].disable();
          }
        }
        resolve(true);
      });
    });

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      this.studentClassForm.controls['SectionId'].disable();
      this.setEditInputValidation();
    }
    return promise;

  }

  saveOrUpdateStudentClassDetails() {
    if (!this.studentClassForm.valid) {
      this.validateAllFormFields(this.studentClassForm);
      return;
    }

    this.setValueFromFormGroup(this.studentClassForm, this.studentClassModel);
    this.studentClassModel.VTId = this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.vtId;

    const dateOfDropoutControl = this.studentClassForm.get('DateOfDropout');
    if (dateOfDropoutControl.value == null) {
      this.studentClassModel.DateOfDropout = null;
      this.studentClassModel.DropoutReason = null;
    }

    // this.studentClassModel.GVTId = "d9cd0875-9b16-4197-aab7-6d429b989351";

    this.studentClassService.createOrUpdateStudentClass(this.studentClassModel)
      .subscribe((studentClassResp: any) => {

        if (studentClassResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.StudentClass.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(studentClassResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('StudentClass deletion errors =>', error);
      });
  }

  // generateStudentUniqueId(){

  //   var Org_Identfier = 1;
  //   var vocational = 1;
  //   var Enrolment_Year = 2323;
  //   var Class_Idenfier = 09;
  //   var 

  // }

  setDropoutReasonValidators() {
    const dropoutReasonControl = this.studentClassForm.get('DropoutReason');

    this.studentClassForm.get('DateOfDropout').valueChanges
      .subscribe(dateOfDropoutValue => {

        dropoutReasonControl.clearValidators();
        if (dateOfDropoutValue == null || dateOfDropoutValue == '') {
          dropoutReasonControl.setValidators([Validators.maxLength(350)]);
        }
        else {
          dropoutReasonControl.setValidators([Validators.required, Validators.maxLength(350)]);
        }
        dropoutReasonControl.updateValueAndValidity();

        const dateOfDropoutControl = this.studentClassForm.get('DateOfDropout');
        if (dateOfDropoutControl.value != null && dateOfDropoutControl.value != '') {
          dateOfDropoutControl.disable();
        }
        else {
          dateOfDropoutControl.enable();
        }
      });

    if (this.studentClassModel.DropoutReason == null || this.studentClassModel.DropoutReason == '') {
      this.studentClassForm.get('IsActive').enable();
    }
    else {
      this.studentClassForm.get('IsActive').disable();
    }
  }

  //Create studentClass form and returns {FormGroup}
  createStudentClassForm(): FormGroup {
    console.log(this.studentClassModel);
    return this.formBuilder.group({

      StudentId: new FormControl(this.studentClassModel.StudentId),
      //for PMU(GTVID)
      SchoolId: new FormControl({ value: this.studentClassModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.studentClassModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.studentClassModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),

      AcademicYearId: new FormControl({ value: this.studentClassModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),
      ClassId: new FormControl({ value: this.studentClassModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionId: new FormControl({ value: this.studentClassModel.SectionId, disabled: this.PageRights.IsReadOnly }, Validators.required),

      FirstName: new FormControl({ value: this.studentClassModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      MiddleName: new FormControl({ value: this.studentClassModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      LastName: new FormControl({ value: this.studentClassModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      FullName: new FormControl({ value: this.studentClassModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      Gender: new FormControl({ value: this.studentClassModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),

      FatherName: new FormControl({ value: this.studentClassModel.FatherName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      MotherName: new FormControl({ value: this.studentClassModel.MotherName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      GuardianName: new FormControl({ value: this.studentClassModel.GuardianName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),

      Mobile: new FormControl({ value: this.studentClassModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      SecondMobileNo: new FormControl({ value: this.studentClassModel.SecondMobileNo, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      AssessmentToBeConducted: new FormControl({ value: this.studentClassModel.AssessmentToBeConducted, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      DateOfBirth: new FormControl({ value: new Date(this.studentClassModel.DateOfBirth), disabled: this.PageRights.IsReadOnly }, Validators.required),

      Stream: new FormControl({ value: this.studentClassModel.Stream, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),

      // SameTrade: new FormControl({ value: this.studentClassModel.SameTrade, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),

      CSWNStatus: new FormControl({ value: this.studentClassModel.CSWNStatus, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),

      SocialCategory: new FormControl({ value: this.studentClassModel.SocialCategory, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),

      WhatappNo: new FormControl({ value: this.studentClassModel.WhatappNo, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(25), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      StudentUniqueId: new FormControl({ value: this.studentClassModel.StudentUniqueId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(25), Validators.pattern(this.Constants.Regex.AlphaNumeric)]),
      DateOfEnrollment: new FormControl({ value: new Date(this.studentClassModel.DateOfEnrollment), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfDropout: new FormControl({ value: this.getDateValue(this.studentClassModel.DateOfDropout), disabled: this.PageRights.IsReadOnly }),
      DropoutReason: new FormControl({ value: this.studentClassModel.DropoutReason, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(350)]),
      IsActive: new FormControl({ value: this.studentClassModel.IsActive, disabled: this.PageRights.IsReadOnly }),

      //For PMU-Admin
      VTPId: new FormControl({ value: this.studentClassModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.studentClassModel.VCId, disabled: this.PageRights.IsReadOnly }),

      VTId: new FormControl({ value: (this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.studentClassModel.VTId), disabled: this.PageRights.IsReadOnly }),

      HaveVE: new FormControl({ value: this.studentClassModel.HaveVE, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(10)),
      SameTrade: new FormControl({ value: this.studentClassModel.SameTrade, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(10)),

    });
  }
}
