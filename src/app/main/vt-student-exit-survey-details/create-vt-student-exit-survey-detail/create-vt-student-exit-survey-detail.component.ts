import { Component, OnInit, NgZone, ViewEncapsulation, ElementRef } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTStudentExitSurveyDetailService } from '../vt-student-exit-survey-detail.service';
import { VTStudentExitSurveyDetailModel } from '../vt-student-exit-survey-detail.model';
import { VTStudentDetailModel } from '../vt-student-detail.model';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from "moment";

@Component({
  selector: 'vt-student-exit-survey-detail',
  templateUrl: './create-vt-student-exit-survey-detail.component.html',
  styleUrls: ['./create-vt-student-exit-survey-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class CreateVTStudentExitSurveyDetailComponent extends BaseComponent<VTStudentExitSurveyDetailModel> implements OnInit {
  vtStudentExitSurveyDetailForm: FormGroup;
  vtStudentExitSurveyDetailModel: VTStudentExitSurveyDetailModel;

  districtList: any;
  sectorList: any;
  jobRoleList: any;
  blockList: any;
  natureOfWorkList: any;
  sectorOfEmployementList: any;
  courseToBePursueList: any;
  NotContinuingEducation: any;
  streamOfEducationList: any;
  topicsOfJobInterestList: any;
  preferredLocationForEmploymentList: any;
  ExitStudentId: any;
  YesNoDropdown: any = [{ "key": "Yes", "value": "Yes" }, { "key": "No", "value": "No" }];
  className: any;
  religionList: any;
  districtItem: any;
  academicYearList: any;
  isIncompleteStudentDetails: boolean = false;
  incompleteStudentMessages: string = '';

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStudentExitSurveyDetailService: VTStudentExitSurveyDetailService,
    private dialogService: DialogService,
    private elRef: ElementRef,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStudentExitSurveyDetail Model
    this.vtStudentExitSurveyDetailModel = new VTStudentExitSurveyDetailModel();
    this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
  }

  ngOnInit(): void {
    this.vtStudentExitSurveyDetailService.getStudentExitSurveyDropdown(this.UserModel).subscribe((response: any) => {
      this.districtList = response[0].Results;
      this.sectorList = response[1].Results;
      this.natureOfWorkList = response[2].Results
      this.sectorOfEmployementList = response[3].Results
      this.topicsOfJobInterestList = response[4].Results
      this.preferredLocationForEmploymentList = response[5].Results
      this.academicYearList = response[6].Results;
      this.religionList = response[7].Results

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');
          this.vtStudentExitSurveyDetailModel = new VTStudentExitSurveyDetailModel();

          if (this.PageRights.ActionType != this.Constants.Actions.New) {
            var exitStudentId: string = params.get('exitStudentId');
            var academicYear: string = params.get('academicYear');
            var classId: string = params.get('classId');

            let academicYearItem = this.academicYearList.find(ay => ay.Name == academicYear);
            this.vtStudentExitSurveyDetailForm.get("AcademicYear").setValue(academicYearItem.Name);

            let ReqObj = {
              "UserId": this.UserModel.UserTypeId,
              "UserType": this.UserModel.RoleCode,
              "AcademicYearId": academicYearItem.Id,
              "StudentId": exitStudentId,
              "ClassId": (classId == 'Class 10' ? 'd4af815b-254d-4036-90bd-0e2d7663ef0c' : 'c536f6e8-4c79-4744-a6f1-07d525b8228f'),
              "pageIndex": 0,
              "pageSize": 100000
            };

            this.vtStudentExitSurveyDetailService.getVTStudentExitSurveyReportById(ReqObj).subscribe((response: any) => {
              if (response.Success) {
                this.vtStudentExitSurveyDetailModel = response.Result;
                this.ExitStudentId = this.vtStudentExitSurveyDetailModel.ExitStudentId;

                if (this.vtStudentExitSurveyDetailModel.IsAssessmentRequired == true) {
                  this.isIncompleteStudentDetails = (this.vtStudentExitSurveyDetailModel.AssessmentConducted == null);
                  this.incompleteStudentMessages = 'The Student Class details are incomplete. Please submit Student Class Details first before submitting Survey.';
                }
                else {
                  this.isIncompleteStudentDetails = (this.vtStudentExitSurveyDetailModel.FatherName == null && this.vtStudentExitSurveyDetailModel.StudentUniqueId == null);
                  this.incompleteStudentMessages = 'The Student Class details are incomplete. Please submit Student Class Details first before submitting Survey.';
                }

                if (this.vtStudentExitSurveyDetailModel.StudentMobileNo == null || this.vtStudentExitSurveyDetailModel.StudentMobileNo == '') {
                  this.isIncompleteStudentDetails = (this.vtStudentExitSurveyDetailModel.StudentMobileNo == null);
                  this.incompleteStudentMessages = 'You have not added mobile number for Student. Please add the mobile number/s in Student assessment details and then submit the Exit Survey for student.';
                }
              }

              this.className = this.vtStudentExitSurveyDetailModel.Class;

              if (this.className == 'Class 10') {
                this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'CourseToBePursueFor10th', SelectTitle: 'The Course' }).subscribe((response: any) => {
                  this.courseToBePursueList = response.Results;
                });

                this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StreamOfEducation', SelectTitle: 'Stream Of Education' }).subscribe((response: any) => {
                  this.streamOfEducationList = response.Results;
                });
              }

              if (this.className == 'Class 12') {
                this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'CourseToBePursueFor12th', SelectTitle: 'The Course' }).subscribe((response: any) => {
                  this.courseToBePursueList = response.Results;
                });
                
                this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StreamOfEducationFor12th', SelectTitle: 'Stream Of Education' }).subscribe((response: any) => {
                  this.streamOfEducationList = response.Results;
                });
              }

              this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'NotContinuingEducation', SelectTitle: 'Stream Of Education' }).subscribe((response: any) => {
                this.NotContinuingEducation = response.Results;
              });

              this.PageRights.IsReadOnly = (this.PageRights.ActionType == this.Constants.Actions.View);
              this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
            });
          }
        }
      });

    });

    this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
  }

  onChangeDistrict(districtId: any): Promise<any> {
    let districtItem = this.districtList.find(d => d.Name == districtId);

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Blocks', UserId: this.UserModel.DefaultStateId, ParentId: districtItem.Id, SelectTitle: 'Block' }).subscribe((response: any) => {
        this.blockList = response.Results;
      });

      this.getStudentAddress();
      resolve(true);
    });
  }

  onChangeSector(sectorId): Promise<any> {
    let sectorItem = this.sectorList.find(s => s.Name == sectorId);

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorItem.Id, SelectTitle: "Job Role" }).subscribe((response) => {
        if (response.Success) {
          this.jobRoleList = response.Results;

          if (this.IsLoading) {
            this.vtStudentExitSurveyDetailForm.controls['JobRole'].setValue(null);
          }
        }
        resolve(true);
      });
    });
  }

  getStudentAddress() {
    let studentAddress = '';
    if (this.vtStudentExitSurveyDetailForm.controls['CityOfResidence'].value != null && this.vtStudentExitSurveyDetailForm.controls['CityOfResidence'].value != '') {
      studentAddress = this.vtStudentExitSurveyDetailForm.controls['CityOfResidence'].value;
    }

    if (this.vtStudentExitSurveyDetailForm.controls['DistrictOfResidence'].value != null && this.vtStudentExitSurveyDetailForm.controls['DistrictOfResidence'].value != '') {
      studentAddress += ', ' + this.vtStudentExitSurveyDetailForm.controls['DistrictOfResidence'].value;
    }

    if (this.vtStudentExitSurveyDetailForm.controls['BlockOfResidence'].value != null && this.vtStudentExitSurveyDetailForm.controls['BlockOfResidence'].value != '') {
      studentAddress += ', ' + this.vtStudentExitSurveyDetailForm.controls['BlockOfResidence'].value;
    }

    if (this.vtStudentExitSurveyDetailForm.controls['PinCode'].value != null && this.vtStudentExitSurveyDetailForm.controls['PinCode'].value != '') {
      studentAddress += ', ' + this.vtStudentExitSurveyDetailForm.controls['PinCode'].value;
    }

    this.vtStudentExitSurveyDetailForm.controls['StudentAddress'].setValue(studentAddress.replace(/^\s+|\s+$/g, ""));
  }

  onChangeWillContHigherStudies(selectedValue: string) {
    if (selectedValue == 'No') {
      this.setFormControlInitialState(this.vtStudentExitSurveyDetailForm, ['IsFullTime','OtherIsFullTime', 'CourseToPursue', /*'WillContVocEdu',*/ 'StreamOfEducation', 'OtherStreamStudying', 'WillContVocational11', 'WillContSameSector',/* 'SectorForTraining',*/ 'OtherSector', 'PartTimeJobWithEducation','ReasonsNoTToContinue']);
    }
  }

  // onChangeDoneInternship(selectedValue: string) {
  //   if (selectedValue == 'No') {
  //     this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['InternshipCompletedSector']);
  //   }
  // }

  onChangeCourseToPursue(selectedValue: string) {
    if (selectedValue != 'Other') {
      this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['OtherCourse']);
    }

    if ((this.className == 'Class 10' && this.vtStudentExitSurveyDetailForm.controls['CourseToPursue'].value != 'Continue in class 11')) {
      this.setFormControlInitialState(this.vtStudentExitSurveyDetailForm, ['StreamOfEducation', 'OtherStreamStudying', 'WillContVocational11', 'WillContSameSector',/* 'SectorForTraining',*/ 'OtherSector', 'ReasonsNoTToContinue']);
    }
  }

  onChangeWillContVocational11(selectedValue: string) {
    if (selectedValue == 'No') {
      this.setFormControlInitialState(this.vtStudentExitSurveyDetailForm, ['WillContSameSector', /*'SectorForTraining',*/ 'ReasonsNoTToContinue']);
    }
  }

  // onChangeWillContSameSector(selectedValue: string) {
  //   if (selectedValue == 'Yes') {
  //     this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['SectorForTraining']);
  //   }
  // }

  onChangeSectorForTraining(selectedValue: string) {
    if (selectedValue != 'Other') {
      this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['OtherSector']);
    }
  }

  onChangeCurrentlyEmployed(selectedValue: string) {
    if (selectedValue == 'No') {
      this.setFormControlInitialState(this.vtStudentExitSurveyDetailForm, ['WorkTitle', 'DetailsOfEmployment', 'WillBeFullTime',/* 'SectorsOfEmployment',*/ 'IsVSCompleted','IsJobSelfEmployment','PartTimeEdcationSelfEmployment']);
    }
  }

  onChangeWantToPursueAnySkillTraining(selectedValue: string) {
    if (selectedValue != 'Yes') {
      this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['IsFulltimeWillingness']);
    }
  }

  // onChangeHveRegisteredOnEmploymentPortal(selectedValue: string) {
  //   if (selectedValue == 'No') {
  //     this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['EmploymentPortalName']);
  //   }
  // }

  onChangeIntrestedInJobOrSelfEmploymentPost12th(selectedValue: string) {
    if (selectedValue == 'No') {
      this.clearFormControlAsInitialState(this.vtStudentExitSurveyDetailForm.controls['PreferredLocations']);
    }
  }

  saveOrUpdateVTStudentExitSurveyDetailDetails() {
    if (!this.vtStudentExitSurveyDetailForm.valid) {
      this.validateAllFormFields(this.vtStudentExitSurveyDetailForm);
      console.log('Student Exit Survey Errors :');
      return;
    }

    if (this.vtStudentExitSurveyDetailModel.FatherName == null && this.vtStudentExitSurveyDetailModel.StudentUniqueId == null) {
      this.dialogService.openShowDialog("The Student Class details are incomplete. Please submit Student Class Details first before submitting Survey.");
      return;
    }
    else if (this.vtStudentExitSurveyDetailModel.FatherName != null && this.vtStudentExitSurveyDetailModel.StudentMobileNo == null) {
      this.dialogService.openShowDialog("You have not added mobile number for Student. Please add the mobile number/s in Student assessment details and then submit the Exit Survey for student.");
      return;
    }

    this.setValueFromFormGroup(this.vtStudentExitSurveyDetailForm, this.vtStudentExitSurveyDetailModel);

    this.vtStudentExitSurveyDetailModel.AcademicYearId = this.UserModel.AcademicYearId;
    this.vtStudentExitSurveyDetailModel.VTId = this.UserModel.UserTypeId;
    this.vtStudentExitSurveyDetailModel.ExitStudentId = this.ExitStudentId;

    this.vtStudentExitSurveyDetailService.createOrUpdateVTStudentExitSurveyDetail(this.vtStudentExitSurveyDetailModel)
      .subscribe((vtStudentExitSurveyDetailResp: any) => {

        if (vtStudentExitSurveyDetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTStudentExitSurveyDetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtStudentExitSurveyDetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTStudentExitSurveyDetail deletion errors =>', error);
      });
  }

  createVTStudentExitSurveyDetailForm(): FormGroup {
    return this.formBuilder.group({
      // Academic Information
      ExitStudentId: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ExitStudentId, disabled: false }),
      AcademicYear: new FormControl({ value: this.vtStudentExitSurveyDetailModel.AcademicYear, disabled: true }),
      StudentUniqueId: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentUniqueId, disabled: true }),
      SeatNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SeatNo, disabled: this.PageRights.IsReadOnly }),
      State: new FormControl({ value: this.vtStudentExitSurveyDetailModel.State, disabled: true }),
      Division: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Division, disabled: true }),
      District: new FormControl({ value: this.vtStudentExitSurveyDetailModel.District, disabled: true }),
      NameOfSchool: new FormControl({ value: this.vtStudentExitSurveyDetailModel.NameOfSchool, disabled: true }),
      UdiseCode: new FormControl({ value: this.vtStudentExitSurveyDetailModel.UdiseCode, disabled: true }),
      Class: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Class, disabled: true }),
      Sector: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Sector, disabled: true }),
      JobRole: new FormControl({ value: this.vtStudentExitSurveyDetailModel.JobRole, disabled: true }),
      VTPName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.VTPName, disabled: true }),
      VCName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.VCName, disabled: true }),
      VTName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.VTName, disabled: true }),
      VTMobile: new FormControl({ value: this.vtStudentExitSurveyDetailModel.VTMobile, disabled: true }),

      // Personal Information
      StudentFirstName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentFirstName, disabled: true }),
      StudentMiddleName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentMiddleName, disabled: true }),
      StudentLastName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentLastName, disabled: true }),
      StudentFullName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentFullName, disabled: true }),
      Gender: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Gender, disabled: true }),
      DOB: new FormControl({ value: new Date(this.vtStudentExitSurveyDetailModel.DOB), disabled: true }),
      FatherName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.FatherName, disabled: true }),
      MotherName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.MotherName, disabled: true }),
      Category: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Category, disabled: true }),
      Religion: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Religion, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StudentMobileNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentMobileNo, disabled: true }, [Validators.pattern(this.Constants.Regex.Number)]),
      StudentWhatsAppNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentWhatsAppNo, disabled: true }, [Validators.pattern(this.Constants.Regex.Number)]),
      ParentMobileNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ParentMobileNo, disabled: true }, [Validators.pattern(this.Constants.Regex.Number)]),

      // Residential Information
      CityOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CityOfResidence, disabled: this.PageRights.IsReadOnly }),
      DistrictOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DistrictOfResidence, disabled: this.PageRights.IsReadOnly },Validators.required),
      BlockOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.BlockOfResidence, disabled: this.PageRights.IsReadOnly }),
      PinCode: new FormControl({ value: this.vtStudentExitSurveyDetailModel.PinCode, disabled: this.PageRights.IsReadOnly }),
      StudentAddress: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentAddress, disabled: this.PageRights.IsReadOnly }),

      // Education post 10th
      WillContHigherStudies: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillContHigherStudies, disabled: this.PageRights.IsReadOnly }),
      PartTimeJobWithEducation: new FormControl({ value: this.vtStudentExitSurveyDetailModel.PartTimeJobWithEducation, disabled: this.PageRights.IsReadOnly }),
      IsFullTime: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsFullTime, disabled: this.PageRights.IsReadOnly }),
      OtherIsFullTime:  new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherIsFullTime, disabled: this.PageRights.IsReadOnly }),
      CourseToPursue: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CourseToPursue, disabled: this.PageRights.IsReadOnly }),
      StreamOfEducation: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StreamOfEducation, disabled: this.PageRights.IsReadOnly }),
      // WillContVocEdu: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillContVocEdu, disabled: this.PageRights.IsReadOnly }),
      WillContVocational11: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillContVocational11, disabled: this.PageRights.IsReadOnly }),
      ReasonsNoTToContinue: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ReasonsNoTToContinue, disabled: this.PageRights.IsReadOnly }),
     // WillContSameSector: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillContSameSector, disabled: this.PageRights.IsReadOnly }),
      //SectorForTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorForTraining, disabled: this.PageRights.IsReadOnly }),
      OtherSector: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherSector, disabled: this.PageRights.IsReadOnly }),

      // Employment Details
      CurrentlyEmployed: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CurrentlyEmployed, disabled: this.PageRights.IsReadOnly }),
      WorkTitle: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WorkTitle, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(200)),
      DetailsOfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DetailsOfEmployment, disabled: this.PageRights.IsReadOnly }),
      WillBeFullTime: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillBeFullTime, disabled: this.PageRights.IsReadOnly }),
      // SectorsOfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorsOfEmployment, disabled: this.PageRights.IsReadOnly }),
      IsVSCompleted: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsVSCompleted, disabled: this.PageRights.IsReadOnly }),
      IsJobSelfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsJobSelfEmployment, disabled: this.PageRights.IsReadOnly }),
      PartTimeEdcationSelfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.PartTimeEdcationSelfEmployment, disabled: this.PageRights.IsReadOnly }),
      // Support
      WantToPursueAnySkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToPursueAnySkillTraining, disabled: this.PageRights.IsReadOnly }),
      // IsFulltimeWillingness: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsFulltimeWillingness, disabled: this.PageRights.IsReadOnly }),
      // HveRegisteredOnEmploymentPortal: new FormControl({ value: this.vtStudentExitSurveyDetailModel.HveRegisteredOnEmploymentPortal, disabled: this.PageRights.IsReadOnly }),
      EmploymentPortalName: new FormControl({ value: this.vtStudentExitSurveyDetailModel.EmploymentPortalName, disabled: this.PageRights.IsReadOnly }),
      WillingToGetRegisteredOnNAPS: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillingToGetRegisteredOnNAPS, disabled: this.PageRights.IsReadOnly }),
      WantToKnowAboutOpportunities: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToKnowAboutOpportunities, disabled: this.PageRights.IsReadOnly }),
      CanLahiGetInTouch: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CanLahiGetInTouch, disabled: this.PageRights.IsReadOnly }),

      // Status & Remarks
      CollectedEmailId: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CollectedEmailId, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Email)]),
      SurveyCompletedByStudentORParent: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SurveyCompletedByStudentORParent, disabled: this.PageRights.IsReadOnly }),
      DateOfIntv: new FormControl({ value: (this.vtStudentExitSurveyDetailModel.DateOfIntv == null ? null : new Date(this.vtStudentExitSurveyDetailModel.DateOfIntv)), disabled: this.PageRights.IsReadOnly }),
      Remark: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Remark, disabled: this.PageRights.IsReadOnly }),

      // Class 12
      DoneInternship: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DoneInternship, disabled: this.PageRights.IsReadOnly }),
      // InternshipCompletedSector: new FormControl({ value: this.vtStudentExitSurveyDetailModel.InternshipCompletedSector, disabled: this.PageRights.IsReadOnly }),
      ContinueEductionPost12th: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ContinueEductionPost12th, disabled: this.PageRights.IsReadOnly }),
      IntrestedInJobOrSelfEmploymentPost12th: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IntrestedInJobOrSelfEmploymentPost12th, disabled: this.PageRights.IsReadOnly }),
      PreferredLocations: new FormControl({ value: this.vtStudentExitSurveyDetailModel.PreferredLocations, disabled: this.PageRights.IsReadOnly }),
      ParticularLocation: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ParticularLocation, disabled: this.PageRights.IsReadOnly }),
      DifferentProgramOpportunities: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DifferentProgramOpportunities, disabled: this.PageRights.IsReadOnly }),
      OtherStreamStudying: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherStreamStudying, disabled: this.PageRights.IsReadOnly }),

      VTStudentExitSurveyDetailId: new FormControl({ value: this.vtStudentExitSurveyDetailModel.VTStudentExitSurveyDetailId, disabled: false }),
      TrainingType: new FormControl({ value: this.vtStudentExitSurveyDetailModel.TrainingType, disabled: this.PageRights.IsReadOnly }),
      OtherCourse: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherCourse, disabled: this.PageRights.IsReadOnly }),
      WillingToContSkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillingToContSkillTraining, disabled: this.PageRights.IsReadOnly }),
      CourseNameIfOther: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CourseNameIfOther, disabled: this.PageRights.IsReadOnly }),
      OtherSectorsIfAny: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherSectorsIfAny, disabled: this.PageRights.IsReadOnly }),
      InterestedInJobOrSelfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.InterestedInJobOrSelfEmployment, disabled: this.PageRights.IsReadOnly }),
      TopicsOfInterest: new FormControl({ value: this.vtStudentExitSurveyDetailModel.TopicsOfInterest, disabled: this.PageRights.IsReadOnly }),
      IsRelevantToVocCourse: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsRelevantToVocCourse, disabled: this.PageRights.IsReadOnly }),
      SectorForSkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorForSkillTraining, disabled: this.PageRights.IsReadOnly }),
      OthersIfAny: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OthersIfAny, disabled: this.PageRights.IsReadOnly }),
      WillingToGoForTechHighEdu: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillingToGoForTechHighEdu, disabled: this.PageRights.IsReadOnly }),
      // WantToKnowAbtPgmsForJobsNContEdu: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToKnowAbtPgmsForJobsNContEdu, disabled: this.PageRights.IsReadOnly }),
      SectorTrade: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorTrade, disabled: this.PageRights.IsReadOnly }),
      CanSendTheUpdates: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CanSendTheUpdates, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
