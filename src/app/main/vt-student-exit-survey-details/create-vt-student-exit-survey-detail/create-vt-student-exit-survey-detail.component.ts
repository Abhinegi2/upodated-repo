import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
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
import { DropdownModel } from 'app/models/dropdown.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
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
  vtStudentDetailForm: FormGroup;
  vtStudentExitSurveyDetailModel: VTStudentExitSurveyDetailModel;
  vtStudentDetailModel: VTStudentDetailModel;

  studentList: [DropdownModel];
  genderList: any;
  migrationReasonList: any;
  parentsOccupationList: any;
  currentEmployementStatusList: any;
  courseList: any;
  courseSelectionReasonList: any;
  postCourseCpmletionPlanningList: any;
  educationDiscontinueReasonList: any;
  plansList: any;
  age: number;
  districtList: any;
  classList: any;
  socialCategoryList: any;
  sectorList: any;
  sectorFilteredOptions: any;
  jobRoleList: any;
  vtpList: any;
  blockList: any;
  natureOfWorkList: any;
  sectorOfEmployementList: any;
  courseToBePursueList: any;
  streamOfEducationList: any;
  veNotContinuingReasonsList: any;
  topicsOfJobInterestList: any;
  preferredLocationForEmploymentList: any;
  divisionId: string;
  StudentDetail: any;
  studentFullName: any;
  IsDisabled: boolean;
  ExitStudentId: any;
  YesNoDropdown: any = [{ "key": "Yes", "value": "Yes" }, { "key": "No", "value": "No" }];
  className: any;
  divisionList: any;
  schoolList: any;
  studentslist: any;
  StudentModel: any;
  IsSectorDisabled: boolean = true;
  religionList: any;
  districtItem: any;
  finalClassId: string;
  academicYearList: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStudentExitSurveyDetailService: VTStudentExitSurveyDetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStudentExitSurveyDetail Model
    this.vtStudentExitSurveyDetailModel = new VTStudentExitSurveyDetailModel();
    this.StudentDetail = new VTStudentDetailModel();

    this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
  }

  ngOnInit(): void {
    this.vtStudentExitSurveyDetailService.getStudentExitSurveyDropdown(this.UserModel).subscribe((response: any) => {
      this.districtList = response[0].Results;
      this.sectorList = response[1].Results;
      this.natureOfWorkList = response[2].Results
      this.sectorOfEmployementList = response[3].Results
      this.veNotContinuingReasonsList = response[4].Results
      this.topicsOfJobInterestList = response[5].Results
      this.preferredLocationForEmploymentList = response[6].Results
      this.academicYearList = response[7].Results;
      this.religionList = response[8].Results

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtStudentExitSurveyDetailModel = new VTStudentExitSurveyDetailModel();
          }
          else {
            var exitStudentId: string = params.get('exitStudentId');
            var academicYear: string = params.get('academicYear');
            var classId: string = params.get('classId');

            let academicYearItem = this.academicYearList.find(ay => ay.Name == academicYear);
            let academicYearId = academicYearItem.Id;

            if (classId == 'Class 10') {
              this.finalClassId = "3d99b3d3-f955-4e8f-9f2e-ec697a774bbc";
            }
            if (classId == 'Class 12') {
              this.finalClassId = "e0302e36-a8a7-49a0-b621-21d48986c43e";
            }

            if (academicYearId == '2020-2021') {
              this.IsSectorDisabled = false;
              let ReqObj = {
                "UserId": this.UserModel.UserTypeId,
                "UserType": this.UserModel.RoleCode,
                "AcademicYearId": academicYearId,
                "StudentId": exitStudentId,
                "ClassId": this.finalClassId,
              };

              this.vtStudentExitSurveyDetailService.GetStudentsForExitForm(ReqObj).subscribe(response => {
                this.studentslist = response.Results;
                if (response.Results != null) {
                  this.StudentModel = this.studentslist.find(student => student.ExitStudentId == exitStudentId);
                }
                this.IsLoading = false;
              }, error => {
                console.log(error);
              });
            }

            let ReqObj = {
              "UserId": this.UserModel.UserTypeId,
              "UserType": this.UserModel.RoleCode,
              "AcademicYearId": academicYearId,
              "StudentId": exitStudentId,
              "ClassId": this.finalClassId,
            };

            this.vtStudentExitSurveyDetailService.getVTStudentExitSurveyReportById(ReqObj).subscribe((response: any) => {
              if (response.Success) {
                this.StudentDetail = response.Result;
                this.ExitStudentId = this.StudentDetail.ExitStudentId;
                this.IsDisabled = true;
              }

              this.className = this.StudentDetail.Class;

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

              if (this.PageRights.ActionType == this.Constants.Actions.Add) {
                this.setStudentDataForNewExistSurvey();
              }
              else if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
                this.onChangeDistrict(this.StudentDetail.DistrictOfResidence).then(result => {

                  //this.StudentDetail.SectorsInterestedIn = this.StudentDetail.SectorsInterestedIn.split(',');
                  this.StudentDetail.TopicsOfInterest = this.StudentDetail.TopicsOfInterest.split(',');

                  this.vtStudentExitSurveyDetailModel = this.StudentDetail;
                  this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
                });
              }

              if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.PageRights.IsReadOnly = true;
              }
            });
          }
        }
      });

    });

    this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
  }

  setStudentDataForNewExistSurvey() {
    this.vtStudentExitSurveyDetailForm = this.createVTStudentExitSurveyDetailForm();
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("StudentFullName").setValue(this.StudentDetail.StudentFullName);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("FatherName").setValue(this.StudentDetail.FatherName);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("StudentUniqueId").setValue(this.StudentDetail.StudentUniqueId);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("NameOfSchool").setValue(this.StudentDetail.NameOfSchool);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("UdiseCode").setValue(this.StudentDetail.UdiseCode);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("District").setValue(this.StudentDetail.District);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("Class").setValue(this.StudentDetail.Class);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("Gender").setValue(this.StudentDetail.Gender);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("DOB").setValue(new Date(this.StudentDetail.DOB));

    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("Category").setValue(this.StudentDetail.Category);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("Sector").setValue(this.StudentDetail.Sector);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("JobRole").setValue(this.StudentDetail.JobRole);

    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("VTPName").setValue(this.StudentDetail.VTPName);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("VTName").setValue(this.StudentDetail.VTName);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("VTMobile").setValue(this.StudentDetail.VTMobile);
    this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("MotherName").setValue(this.StudentDetail.MotherName);
  }

  onChangeDistrict(districtId: any): Promise<any> {
    let districtItem = this.districtList.find(d => d.Name == districtId);

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Blocks', UserId: this.UserModel.DefaultStateId, ParentId: districtItem.Id, SelectTitle: 'Block' }).subscribe((response: any) => {
        this.blockList = response.Results;
      });
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

  onChangeHigherStudies(higherStudies) {
    if (higherStudies == 0) {
      this.vtStudentExitSurveyDetailForm.get("WillBeFullTime").setValue("");
      this.vtStudentExitSurveyDetailForm.get("CourseToPursue").setValue("");
      this.vtStudentExitSurveyDetailForm.get("OtherCourse").setValue("");
      this.vtStudentExitSurveyDetailForm.get("StreamOfEducation").setValue("");
    }
  }
  onChangeWillingToContSkillTraining(skill) {
    if (skill == 0) {
      this.vtStudentExitSurveyDetailForm.get("SkillTrainingType").setValue("");
      this.vtStudentExitSurveyDetailForm.get("CourseForTraining").setValue("");
      this.vtStudentExitSurveyDetailForm.get("SectorForTraining").setValue("");
      this.vtStudentExitSurveyDetailForm.get("OtherSectorsIfAny").setValue("");
    }
  }

  onChangeSectorForTraining(sector) {
    if (sector !== 'Other') {
      this.vtStudentExitSurveyDetailForm.get("OtherSectorsIfAny").setValue("");
    }
  }

  WantToPursueAnySkillTraining(skillTraining) {
    if (skillTraining == 0) {
      this.vtStudentExitSurveyDetailForm.get("TrainingType").setValue("");
      this.vtStudentExitSurveyDetailForm.get("SectorForSkillTraining").setValue("");
      this.vtStudentExitSurveyDetailForm.get("OthersIfAny").setValue("");
    }
  }

  onChangeCourseToPursue(course) {
    if (course !== 'Other') {
      this.vtStudentExitSurveyDetailForm.get("OtherCourse").setValue("");
    }
  }

  onChangeSectorForSkillTraining(sector) {
    if (sector !== 'Other') {
      this.vtStudentExitSurveyDetailForm.get("OthersIfAny").setValue("");
    }
  }

  onChangeInterestedInJobOrSE(isInterestedInJob) {
    if (isInterestedInJob == 0) {
      this.vtStudentExitSurveyDetailForm.get("TopicsOfInterest").setValue("");
      this.vtStudentExitSurveyDetailForm.get("IsFullTime").setValue("");
      this.vtStudentExitSurveyDetailForm.get("SectorsOfEmployment").setValue("");
      this.vtStudentExitSurveyDetailForm.get("IsRelevantToVocCourse").setValue("");
    }
  }

  onChangeAnyPreferredLoc(loc) {
    if (loc !== '348') {
      this.vtStudentExitSurveyDetailForm.get("PreferredLocations").setValue("");
    }
  }

  saveOrUpdateVTStudentExitSurveyDetailDetails() {
    if (!this.vtStudentExitSurveyDetailForm.valid) {
      this.validateAllFormFields(this.vtStudentExitSurveyDetailForm);
      return;
    }

    // if (this.IsSectorDisabled == false) {
    //   this.StudentModel.Sector = this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("Sector").value;
    //   this.StudentModel.JobRole = this.vtStudentExitSurveyDetailForm.controls.studentDetailGroup.get("JobRole").value;
    //   this.vtStudentExitSurveyDetailService.createOrUpdateExitStudentDetail(this.StudentModel)
    //     .subscribe((vtStudentExitSurveyDetailResp: any) => {

    //       if (vtStudentExitSurveyDetailResp.Success) {
    //         this.zone.run(() => {
    //           this.showActionMessage(
    //             this.Constants.Messages.RecordSavedMessage,
    //             this.Constants.Html.SuccessSnackbar
    //           );

    //           this.router.navigate([RouteConstants.VTStudentExitSurveyDetail.List]);
    //         });
    //       }
    //       else {
    //         var errorMessages = this.getHtmlMessage(vtStudentExitSurveyDetailResp.Errors)
    //         this.dialogService.openShowDialog(errorMessages);
    //       }
    //     }, error => {
    //       console.log('VTStudentExitSurveyDetail deletion errors =>', error);
    //     });
    // }

    this.vtStudentExitSurveyDetailForm.removeControl('studentDetailGroup');

    let topicOfInterest = this.vtStudentExitSurveyDetailForm.get('TopicsOfInterest').value;
    this.setValueFromFormGroup(this.vtStudentExitSurveyDetailForm, this.vtStudentExitSurveyDetailModel);
    if (topicOfInterest !== null && topicOfInterest !== "") {
      this.vtStudentExitSurveyDetailModel.TopicsOfInterest = topicOfInterest.join(',');
    }

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
      VTStudentExitSurveyDetailId: new FormControl(this.vtStudentExitSurveyDetailModel.VTStudentExitSurveyDetailId),
      ExitStudentId: new FormControl(this.vtStudentExitSurveyDetailModel.ExitStudentId),
      DateOfIntv: new FormControl({ value: new Date(this.vtStudentExitSurveyDetailModel.DateOfIntv), disabled: this.PageRights.IsReadOnly }, Validators.required),
      Religion: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Religion, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SeatNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SeatNo, disabled: this.PageRights.IsReadOnly }, Validators.required),
      CityOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CityOfResidence, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DistrictOfResidence, disabled: this.PageRights.IsReadOnly }),
      BlockOfResidence: new FormControl({ value: this.vtStudentExitSurveyDetailModel.BlockOfResidence, disabled: this.PageRights.IsReadOnly }),
      PinCode: new FormControl({ value: this.vtStudentExitSurveyDetailModel.PinCode, disabled: this.PageRights.IsReadOnly },),
      StudentMobileNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentMobileNo, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Number), Validators.required]),
      StudentWANo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StudentWANo, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Number), Validators.required]),
      ParentMobileNo: new FormControl({ value: this.vtStudentExitSurveyDetailModel.ParentMobileNo, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Number), Validators.required]),
      DoneInternship: new FormControl({ value: this.vtStudentExitSurveyDetailModel.DoneInternship, disabled: this.PageRights.IsReadOnly }),
      WillContHigherStudies: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillContHigherStudies, disabled: this.PageRights.IsReadOnly }),
      WillBeFullTime: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillBeFullTime, disabled: this.PageRights.IsReadOnly }),
      CourseToPursue: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CourseToPursue, disabled: this.PageRights.IsReadOnly }),
      OtherCourse: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherCourse, disabled: this.PageRights.IsReadOnly }),
      StreamOfEducation: new FormControl({ value: this.vtStudentExitSurveyDetailModel.StreamOfEducation, disabled: this.PageRights.IsReadOnly }),
      WillingToContSkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillingToContSkillTraining, disabled: this.PageRights.IsReadOnly }),
      SkillTrainingType: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SkillTrainingType, disabled: this.PageRights.IsReadOnly }),
      CourseForTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CourseForTraining, disabled: this.PageRights.IsReadOnly }),
      CourseNameIfOther: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CourseNameIfOther, disabled: this.PageRights.IsReadOnly }),
      SectorForTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorForTraining, disabled: this.PageRights.IsReadOnly }),
      OtherSectorsIfAny: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OtherSectorsIfAny, disabled: this.PageRights.IsReadOnly }),
      InterestedInJobOrSelfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.InterestedInJobOrSelfEmployment, disabled: this.PageRights.IsReadOnly }),
      TopicsOfInterest: new FormControl({ value: this.vtStudentExitSurveyDetailModel.TopicsOfInterest, disabled: this.PageRights.IsReadOnly }),
      IsFullTime: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsFullTime, disabled: this.PageRights.IsReadOnly }),
      SectorsOfEmployment: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorsOfEmployment, disabled: this.PageRights.IsReadOnly }),
      IsRelevantToVocCourse: new FormControl({ value: this.vtStudentExitSurveyDetailModel.IsRelevantToVocCourse, disabled: this.PageRights.IsReadOnly }),
      WantToPursueAnySkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToPursueAnySkillTraining, disabled: this.PageRights.IsReadOnly }),
      TrainingType: new FormControl({ value: this.vtStudentExitSurveyDetailModel.TrainingType, disabled: this.PageRights.IsReadOnly }),
      SectorForSkillTraining: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SectorForSkillTraining, disabled: this.PageRights.IsReadOnly }),
      OthersIfAny: new FormControl({ value: this.vtStudentExitSurveyDetailModel.OthersIfAny, disabled: this.PageRights.IsReadOnly }),
      WillingToGoForTechHighEdu: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WillingToGoForTechHighEdu, disabled: this.PageRights.IsReadOnly }),
      WantToKnowAbtPgmsForJobsNContEdu: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToKnowAbtPgmsForJobsNContEdu, disabled: this.PageRights.IsReadOnly }),
      CanSendTheUpdates: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CanSendTheUpdates, disabled: this.PageRights.IsReadOnly }),
      WantToKnowAboutOpportunities: new FormControl({ value: this.vtStudentExitSurveyDetailModel.WantToKnowAboutOpportunities, disabled: this.PageRights.IsReadOnly }),
      CanLahiGetInTouch: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CanLahiGetInTouch, disabled: this.PageRights.IsReadOnly }),
      CollectedEmailId: new FormControl({ value: this.vtStudentExitSurveyDetailModel.CollectedEmailId, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Email)]),
      SurveyCompletedByStudentORParent: new FormControl({ value: this.vtStudentExitSurveyDetailModel.SurveyCompletedByStudentORParent, disabled: this.PageRights.IsReadOnly }),
      Remark: new FormControl({ value: this.vtStudentExitSurveyDetailModel.Remark, disabled: this.PageRights.IsReadOnly }),

      studentDetailGroup: this.formBuilder.group({
        StudentFullName: new FormControl({ value: this.StudentDetail.StudentFullName, disabled: true }),
        FatherName: new FormControl({ value: this.StudentDetail.FatherName, disabled: true }),
        MotherName: new FormControl({ value: this.StudentDetail.MotherName, disabled: true }),
        StudentUniqueId: new FormControl({ value: this.StudentDetail.StudentUniqueId, disabled: true }),
        NameOfSchool: new FormControl({ value: this.StudentDetail.NameOfSchool, disabled: true }),
        UdiseCode: new FormControl({ value: this.StudentDetail.UdiseCode, disabled: true }),
        Gender: new FormControl({ value: this.StudentDetail.Gender, disabled: true }),
        DOB: new FormControl({ value: new Date(this.StudentDetail.DOB), disabled: true }),
        District: new FormControl({ value: this.StudentDetail.District, disabled: true }),
        Class: new FormControl({ value: this.StudentDetail.Class, disabled: true }),
        Category: new FormControl({ value: this.StudentDetail.Category, disabled: true }),
        Sector: new FormControl({ value: this.StudentDetail.Sector, disabled: true }),
        JobRole: new FormControl({ value: this.StudentDetail.JobRole, disabled: true }),
        VTName: new FormControl({ value: this.StudentDetail.VTName, disabled: true }),
        VTMobile: new FormControl({ value: this.StudentDetail.VTMobile, disabled: true }),
        VTPName: new FormControl({ value: this.StudentDetail.VTPId, disabled: true }),
      })
    });
  }
}
