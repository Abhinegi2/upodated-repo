import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTDailyReportingService } from '../vt-daily-reporting.service';
import { VTDailyReportingModel } from '../vt-daily-reporting.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';
import { VTROnJobTrainingCoordinationModel } from '../vt-on-job-training-coordination.model';
import { VTRAssessorInOtherSchoolForExamModel } from '../vt-assessor-in-other-school-for-exam.model';
import { VTRParentTeachersMeetingModel } from '../vt-parent-teachers-meeting.model';
import { VTRCommunityHomeVisitModel } from '../vt-community-home-visit.model';
import { VTRVisitToIndustryModel } from '../vt-visit-to-industry.model';
import { VTRVisitToEducationalInstitutionModel } from '../vt-visit-to-educational-institution.model';
import { VTRAssignmentFromVocationalDepartmentModel } from '../vt-assignment-from-vocational-department.model';
import { VTRTeachingNonVocationalSubjectModel } from '../vt-teaching-non-vocational-subject.model';
import { VTRHolidayModel } from '../vt-holiday.model';
import { VTRObservationDayModel } from '../vt-observation-day.model';
import { VTRLeaveModel } from '../vt-leave.model';
import { VTRTrainingOfTeacherModel } from '../vt-training-of-teacher.model';
import { VTRTeachingVocationalEducationModel } from '../vt-teaching-vocational-education.model';
import { FileUploadModel } from 'app/models/file.upload.model';
import { StudentAttendanceModel } from 'app/models/student.attendance.model';
import { ClassSectionModel } from 'app/models/class.section.model';
import { UnitSessionModel } from 'app/models/unit.session.model';
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

@Component({
  selector: 'vt-daily-reporting',
  templateUrl: './create-vt-daily-reporting.component.html',
  styleUrls: ['./create-vt-daily-reporting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTDailyReportingComponent extends BaseComponent<VTDailyReportingModel> implements OnInit {
  vtDailyReportingForm: FormGroup;
  vtDailyReportingModel: VTDailyReportingModel;

  vtSchoolSectorList: [DropdownModel];
  reportTypeList: [DropdownModel];
  classTaughtList: [DropdownModel];
  studentClassList: [DropdownModel];
  sectionList: DropdownModel[];
  sectionTaughtList: DropdownModel[];
  sectionByClassList: ClassSectionModel[];
  studentList: StudentAttendanceModel[];
  moduleTaughtList: [DropdownModel];
  unitSessionList: UnitSessionModel[];

  classSectionList: any;
  unitList: any;
  sessionList: any;
  unitSessionsModels: any;
  activityTypeList: any;
  tveClassSectionList: any;

  displayColumns: string[] = ['StudentName', 'IsPresent'];
  dataSourceAttendance: any;
  workingDayTypeIdsList: [DropdownModel];
  otherWorkList: [DropdownModel];
  trainingTypeList: [DropdownModel];
  trainingTopicsList: [DropdownModel];
  holidayDayList: [DropdownModel];
  ojtActivityList: [DropdownModel];
  leaveApproverList: [DropdownModel];
  leaveTypeList: [DropdownModel];
  leaveModeList: [DropdownModel];
  holidayTypeList: [DropdownModel];
  observationDayList: [DropdownModel];
  classTypeList: [DropdownModel];
  classPictureFile: FileUploadModel;
  lessonPlanPictureFile: FileUploadModel;
  assignmentPhotoFile: FileUploadModel;

  isAllowTeachingVocationalEducation: boolean = false;
  isAllowTrainingOfTeacher: boolean = false;
  isAllowOnJobTrainingCoordination: boolean = false;
  isAllowAssessorInOtherSchool: boolean = false;
  isAllowParentTeacherMeeting: boolean = false;
  isAllowCommunityHomeVisit: boolean = false;
  isAllowIndustryVisit: boolean = false;
  isAllowVisitToEducationalInstitute: boolean = false;
  isAllowAssignmentFromVocationalDepartment: boolean = false;
  isAllowTeachingNonVocationalSubject: boolean = false;
  isAllowWorkAssignedByHeadMaster: boolean = false;
  isAllowSchoolExamDuty: boolean = false;
  isAllowOtherWork: boolean = false;
  isAllowHoliday: boolean = false;
  isAllowObservationDay: boolean = false;
  isAllowLeave: boolean = false;
  isAllowSchoolEventCelebration: boolean = false;
  minReportingDate: Date;


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
  SectionInputId: string;
  CanUserChangeInput: boolean;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtDailyReportingService: VTDailyReportingService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtDailyReporting Model
    this.vtDailyReportingModel = new VTDailyReportingModel();
    this.sectionList = <DropdownModel[]>[];
    this.studentList = <StudentAttendanceModel[]>[];
    this.classSectionList = [];
    this.unitList = [];
    this.sessionList = [];
    this.unitSessionsModels = [];
    this.tveClassSectionList = [];

    this.classPictureFile = new FileUploadModel();
    this.lessonPlanPictureFile = new FileUploadModel();
    this.assignmentPhotoFile = new FileUploadModel();

    let dateOfAllocation = new Date(this.UserModel.DateOfAllocation);
    let maxDate = new Date(Date.now());

    let Time = maxDate.getTime() - dateOfAllocation.getTime();
    let Days = Math.floor(Time / (1000 * 3600 * 24));
    if (Days < this.Constants.BackDatedReportingDays) {
      this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
    }
    else {
      let past7days = maxDate;
      past7days.setDate(past7days.getDate() - this.Constants.BackDatedReportingDays)
      this.minReportingDate = past7days;
    }
  }

  ngOnInit(): void {

    this.vtDailyReportingService
      .getDropdownForVTDailyReporting(this.UserModel)
      .subscribe(results => {

        if (results[0].Success) {
          this.reportTypeList = results[0].Results;
        }

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.vtDailyReportingModel = new VTDailyReportingModel();

              if (results[1].Success) {
                this.schoolList = results[1].Results;
                this.filteredSchoolItems = this.schoolList.slice();
                this.loadFormInputs(this.schoolList, 'SchoolId');
              }

              this.CanUserChangeInput = true;

            } else {
              var vtDailyReportingId: string = params.get('vtDailyReportingId')

              this.vtDailyReportingService.getVTDailyReportingById(vtDailyReportingId)
                .subscribe((response: any) => {
                  this.vtDailyReportingModel = response.Result;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.vtDailyReportingModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.vtDailyReportingModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }

                  if (response.Result.SectionIds) {
                    this.vtDailyReportingModel.SectionIds = response.Result.SectionIds.split(',');
                  }

                  this.schoolsectorjobService.getSchoolSectorJobById(this.vtDailyReportingModel.SSJId)
                    .subscribe((response: any) => {
                      var schoolsectorjobModel = response.Result;

                      this.vtDailyReportingModel.SchoolId = schoolsectorjobModel.SchoolId;
                      this.vtDailyReportingModel.SectorId = schoolsectorjobModel.SectorId;
                      this.vtDailyReportingModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                      this.setInputs(this.vtDailyReportingModel.SchoolId, 'SchoolId', 'SchoolById').then(sResp => {
                        this.setInputs(this.vtDailyReportingModel.SectorId, 'SectorId', 'SectorById').then(vvResp => {
                          this.setInputs(this.vtDailyReportingModel.JobRoleId, 'JobRoleId', 'JobRoleById').then(vvResp => {
                            this.setInputs(this.vtDailyReportingModel.AcademicYearId, 'AcademicYearId', 'AcademicYearById').then(vResp => {
                              this.onChangeReportType(this.vtDailyReportingModel.ReportType).then(response => {
                                this.vtDailyReportingForm = this.createVTDailyReportingForm();
                                this.onChangeAcademicYear(this.vtDailyReportingModel.AcademicYearId).then(response => {
                                  if (this.vtDailyReportingModel.WorkingDayTypeIds.length > 0) {
                                    this.onChangeWorkingType(this.vtDailyReportingModel.WorkingDayTypeIds);
                                  }
                                });
                              });                     
                    
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

    this.vtDailyReportingForm = this.createVTDailyReportingForm();
  }

  onChangeSchool(schoolId): Promise<any> {
    this.resetInputsAfter('School');
    this.setFormInputs();

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'SectorsBySSJ', ParentId: schoolId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sectors'
      }, false).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (response.Results.length == 0) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidSchoolSectorJob]));
            this.vtDailyReportingForm.controls['SchoolId'].setValue(null);
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
      }, false).subscribe((response) => {

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
      }, false).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;
          if (response.Results.length == 0) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidVTACS]));
            this.vtDailyReportingForm.controls['JobRoleId'].setValue(null);
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
      this.commonService.GetMasterDataByType({ DataType: 'ClassesByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes' }, false).subscribe((response) => {
        if (response.Success) {
          this.classList = response.Results;
          this.loadFormInputs(response.Results, 'ClassId');
        }

        resolve(true);
      });
    });
    return promise;
  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('SchoolId').value : this.vtDailyReportingModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('SectorId').value : this.vtDailyReportingModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('JobRoleId').value : this.vtDailyReportingModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('AcademicYearId').value : this.vtDailyReportingModel.AcademicYearId;
    this.ClassInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('ClassId').value : this.vtDailyReportingModel.ClassTaughtId;
    this.SectionInputId = this.CanUserChangeInput == true ? this.vtDailyReportingForm.get('SectionIds').value : this.vtDailyReportingModel.SectionIds;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.vtDailyReportingForm.controls[InputName].enable();
    }

    if (response.length == 1) {
      var inputId = response[0].Id;
      this.vtDailyReportingForm.controls[InputName].setValue(inputId);

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
      this.vtDailyReportingForm.controls['SectorId'].setValue(null);
      this.vtDailyReportingForm.controls['JobRoleId'].setValue(null);
      this.vtDailyReportingForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'Sector') {
      this.vtDailyReportingForm.controls['JobRoleId'].setValue(null);
      this.vtDailyReportingForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'JobRole') {
      this.vtDailyReportingForm.controls['AcademicYearId'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
  }


  setInputs(parentId, InputId, dataType): Promise<any> {

    this.IsLoading = true;
    let promise = new Promise((resolve) => {
      this.commonService.GetMasterDataByType({
        DataType: dataType, ParentId: parentId, SelectTitle: 'Select'
      }, false).subscribe((response) => {
        if (response.Success) {
          if (InputId == 'SchoolId') {
            this.schoolList = response.Results;
            this.filteredSchoolItems = this.schoolList.slice();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
          } else if (InputId == 'AcademicYearId') {
            this.academicYearList = response.Results;
          } else if (InputId == 'ClassTaughtId') {
            this.classTaughtList = response.Results;
          }
          this.vtDailyReportingForm.controls[InputId].disable();
        }
        resolve(true);
      });
    });
    return promise;
  }

  onChangeReportType(reportTypeId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'WorkingDayType', ParentId: reportTypeId, SelectTitle: 'Working Day' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.resetReportTypeFormGroups();
          // On Leave
          
          this.setAcademicInputs(reportTypeId);
          if (reportTypeId == 38) {
            
            this.isAllowLeave = true;
            this.vtDailyReportingModel.Leave = new VTRLeaveModel(this.vtDailyReportingModel.Leave);
            
            this.vtDailyReportingForm = this.formBuilder.group({
              ...this.vtDailyReportingForm.controls,
              
              leaveGroup: this.formBuilder.group({
                LeaveTypeId: new FormControl({ value: this.vtDailyReportingModel.Leave.LeaveTypeId, disabled: this.PageRights.IsReadOnly }),
                LeaveModeId: new FormControl({ value: this.vtDailyReportingModel.Leave.LeaveModeId, disabled: this.PageRights.IsReadOnly }),
                LeaveApprovalStatus: new FormControl({ value: this.vtDailyReportingModel.Leave.LeaveApprovalStatus, disabled: this.PageRights.IsReadOnly }),
                LeaveApprover: new FormControl({ value: this.vtDailyReportingModel.Leave.LeaveApprover, disabled: this.PageRights.IsReadOnly }),
                LeaveReason: new FormControl({ value: this.vtDailyReportingModel.Leave.LeaveReason, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
              })
            });
          
            this.leaveTypeList = response.Results;

            this.onChangeLeaveApprovalStatus();
            this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'LeaveApprover', SelectTitle: 'Leave Approver' }).subscribe((response) => {
              if (response.Success) {
                this.leaveApproverList = response.Results;
              }
            });

            this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'LeaveMode', SelectTitle: 'Leave Mode' }).subscribe((response) => {
              if (response.Success) {
                this.leaveModeList = response.Results;
              }
            });
          }
          // Holiday/ School Off        
          else if (reportTypeId == 40) {
            this.isAllowHoliday = true;
            this.vtDailyReportingModel.Holiday = new VTRHolidayModel(this.vtDailyReportingModel.Holiday);

            this.vtDailyReportingForm = this.formBuilder.group({
              ...this.vtDailyReportingForm.controls,

              holidayGroup: this.formBuilder.group({
                HolidayTypeId: new FormControl({ value: this.vtDailyReportingModel.Holiday.HolidayTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
                HolidayDetails: new FormControl({ value: this.vtDailyReportingModel.Holiday.HolidayDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
              })
            });

            this.holidayTypeList = response.Results;

          }
          // Observation Day
          else if (reportTypeId == 123) {
            this.isAllowObservationDay = true;
            this.vtDailyReportingModel.ObservationDay = new VTRObservationDayModel(this.vtDailyReportingModel.ObservationDay);

            this.vtDailyReportingForm = this.formBuilder.group({
              ...this.vtDailyReportingForm.controls,

              observationDayGroup: this.formBuilder.group({
                ObservationDetails: new FormControl({ value: this.vtDailyReportingModel.ObservationDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
                OBStudentCount: new FormControl({ value: this.vtDailyReportingModel.OBStudentCount, disabled: this.PageRights.IsReadOnly }),
                StudentAttendances: this.formBuilder.array([])
              })
            });

            this.observationDayList = response.Results;
          }
          else {
            this.vtDailyReportingForm = this.formBuilder.group({
              ...this.vtDailyReportingForm.controls,

              WorkingDayTypeIds: new FormControl({ value: this.vtDailyReportingModel.WorkingDayTypeIds, disabled: this.PageRights.IsReadOnly })
            });

            this.workingDayTypeIdsList = response.Results;
          }

          this.onChangeReportingDate();
        }
        resolve(true);
      });
    });
    return promise;
  }

  setAcademicInputs(reportTypeId) {

    if (reportTypeId == 37) {
      this.vtDailyReportingForm.controls['AcademicYearId'].setValidators([Validators.required]);;
    } else {
      this.vtDailyReportingForm.controls['AcademicYearId'].setValue(null);

      this.vtDailyReportingForm.controls['AcademicYearId'].clearValidators();
    }
  }

  onChangeReportingDate(): boolean {
    let reportingDate = this.vtDailyReportingForm.get('ReportingDate').value;

    if (reportingDate != null && new Date(reportingDate).getDay() == 0) {
      this.dialogService.openShowDialog("User cannot submit the VT Daily Reporting on Sunday");
      return false
    }

    return true
  }

  onChangeWorkingType(workingTypes): void {
    this.resetWorkTypesFormGroups();

    workingTypes.forEach(workTypeId => {

      //1. Teaching Vocational Education
      if (workTypeId == '101') {
        this.isAllowTeachingVocationalEducation = true;
        let teachingVocationalEducation = new VTRTeachingVocationalEducationModel();

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          teachingVocationalEducationGroup: this.formBuilder.group({
            teachingVocationalEducations: this.formBuilder.array([this.createTeachingVocationalEducation(teachingVocationalEducation)])
          })
        });

        this.vtDailyReportingService.getDropdownForTeachingVocationalEducation(this.UserModel).subscribe((response) => {
          // if (response[0].Success) {
          //   this.classTaughtList = response[0].Results;
          // }

          this.classTaughtList = this.classList;

          // var currentSelectedClass = this.vtDailyReportingForm.get('ClassId').value;
          // if (currentSelectedClass) {
          //   this.vtDailyReportingForm.controls.teachingVocationalEducationGroup.get("ClassTaughtId").setValue(currentSelectedClass);
          // }

          if (response[1].Success) {
            this.moduleTaughtList = response[1].Results;
          }

          if (response[2].Success) {
            this.otherWorkList = response[2].Results;
          }

          if (response[3].Success) {
            this.classTypeList = response[3].Results;
          }

          if (response[4].Success) {
            this.activityTypeList = response[4].Results;
          }

          if (response[5].Success) {
            this.sectionByClassList = response[5].Results;
          }

          if (response[6].Success) {
            this.studentList = response[6].Results;
          }

          if (response[7].Success) {
            this.unitSessionList = response[7].Results;
          }

          if (response[8].Success) {
            this.sectionTaughtList = response[8].Results;
          }


          // if (this.classTaughtList.length > 1) {
          //   let teachingVocationalEducationControls = <FormArray>this.vtDailyReportingForm.controls.teachingVocationalEducationGroup.get('teachingVocationalEducations');
          //   teachingVocationalEducationControls.clear();

          //   this.tveClassSectionList = [];
          //   this.classSectionList = [];

          //   for (let classIndex = 1; classIndex < this.classTaughtList.length; classIndex++) {
          //     let sections = this.sectionList.filter(c => c.ClassId == this.classTaughtList[classIndex].Id);

          //     for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
          //       this.tveClassSectionList.push({ ClassId: this.classTaughtList[classIndex].Id, SectionId: sections[sectionIndex].SectionId });

          //       this.classSectionList.push(sections);
          //     }
          //   }

          //   for (let tveIndex = 0; tveIndex < this.tveClassSectionList.length; tveIndex++) {
          //     teachingVocationalEducation = new VTRTeachingVocationalEducationModel();
          //     teachingVocationalEducation.SequenceNo = tveIndex + 1;
          //     teachingVocationalEducation.ClassTaughtId = this.tveClassSectionList[tveIndex].ClassId;
          //     teachingVocationalEducation.ClassSectionIds = this.tveClassSectionList[tveIndex].SectionId;

          //     this.unitList[tveIndex] = <DropdownModel[]>[];
          //     this.sessionList[tveIndex] = <DropdownModel[]>[];
          //     this.unitSessionsModels[tveIndex] = <ModuleUnitSessionModel[]>[];

          //     let tveFormGroup = this.createTeachingVocationalEducation(teachingVocationalEducation);
          //     let studentsForSection = this.studentList.filter(s => s.ClassId == teachingVocationalEducation.ClassTaughtId && s.SectionId == teachingVocationalEducation.ClassSectionIds);
          //     let studentAttendancesControls = <FormArray>tveFormGroup.get('StudentAttendances');
          //     studentAttendancesControls.clear();

          //     if (studentsForSection.length > 0) {
          //       studentsForSection.forEach(studentItem => {
          //         studentAttendancesControls.push(this.formBuilder.group(studentItem));
          //       });
          //     }

          //     teachingVocationalEducationControls.push(tveFormGroup);
          //   }
          // }

          if (this.PageRights.ActionType == this.Constants.Actions.View) {
            let teachingVocationalEducationControls = <FormArray>this.vtDailyReportingForm.controls.teachingVocationalEducationGroup.get('teachingVocationalEducations');
            teachingVocationalEducationControls.clear();
            this.unitSessionsModels = [];

            // this.sectionTaughtList = this.sectionList;

            // this.sectionTaughtList = <DropdownModel[]>[];
            // this.sectionTaughtList.forEach(sectionItem => {
            //   let section = this.sectionTaughtList.find(s => s.Id == sectionItem.Id);

            //   if (section == null) {
            //     this.sectionTaughtList.push(new DropdownModel({ Id: sectionItem.Id, Name: sectionItem.Name }));
            //   }
            // });

            let sortTeachingVocationalEducations = this.vtDailyReportingModel.TeachingVocationalEducations.sort((a, b) => { return a.SequenceNo - b.SequenceNo; });
            sortTeachingVocationalEducations.forEach(tveItem => {
              this.unitSessionsModels.push(tveItem.UnitSessionsModels);

              let tveFormGroup: FormGroup = this.createTeachingVocationalEducation(tveItem);

              let studentAttendancesControls = <FormArray>tveFormGroup.get('StudentAttendances');
              studentAttendancesControls.clear();

              tveItem.StudentAttendances.forEach(studentItem => {
                studentAttendancesControls.push(this.formBuilder.group(studentItem));
              });

              teachingVocationalEducationControls.push(tveFormGroup);
            });
          }

        });


      }

      //2. Training Of Teacher 
      if (workTypeId == '102') {
        this.isAllowTrainingOfTeacher = true;
        this.vtDailyReportingModel.TrainingOfTeacher = new VTRTrainingOfTeacherModel(this.vtDailyReportingModel.TrainingOfTeacher);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          trainingOfTeacherGroup: this.formBuilder.group({
            TrainingTypeId: new FormControl({ value: this.vtDailyReportingModel.TrainingOfTeacher.TrainingTypeId, disabled: this.PageRights.IsReadOnly }),
            TrainingBy: new FormControl({ value: this.vtDailyReportingModel.TrainingOfTeacher.TrainingBy, disabled: this.PageRights.IsReadOnly }),
            TrainingTopicIds: new FormControl({ value: this.vtDailyReportingModel.TrainingOfTeacher.TrainingTopicIds, disabled: this.PageRights.IsReadOnly }),
            TrainingDetails: new FormControl({ value: this.vtDailyReportingModel.TrainingOfTeacher.TrainingDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });

        this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTTrainingType', SelectTitle: 'Training Type' }).subscribe((response) => {
          if (response.Success) {
            this.trainingTypeList = response.Results;
            this.onChangeTrainingOfTeacherType();
          }
        });

        this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTTrainingTopics', SelectTitle: 'Training Topics' }, false).subscribe((response) => {
          if (response.Success) {
            this.trainingTopicsList = response.Results;
          }
        });
      }

      //3. On Job Training Coordination
      if (workTypeId == '103') {
        this.isAllowOnJobTrainingCoordination = true;
        this.vtDailyReportingModel.OnJobTrainingCoordination = new VTROnJobTrainingCoordinationModel(this.vtDailyReportingModel.OnJobTrainingCoordination);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          onJobTrainingCoordinationGroup: this.formBuilder.group({
            OnJobTrainingActivityId: new FormControl({ value: this.vtDailyReportingModel.OnJobTrainingCoordination.OnJobTrainingActivityId, disabled: this.PageRights.IsReadOnly }),
            IndustryName: new FormControl({ value: this.vtDailyReportingModel.OnJobTrainingCoordination.IndustryName, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
            IndustryContactPerson: new FormControl({ value: this.vtDailyReportingModel.OnJobTrainingCoordination.IndustryContactPerson, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
            IndustryContactNumber: new FormControl({ value: this.vtDailyReportingModel.OnJobTrainingCoordination.IndustryContactNumber, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.MobileNumber)]),
            OJTActivityDetails: new FormControl({ value: this.vtDailyReportingModel.OnJobTrainingCoordination.OJTActivityDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });

        this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'OnJobTrainingActivity', SelectTitle: 'On Job Training Activity' }).subscribe((response) => {
          if (response.Success) {
            this.ojtActivityList = response.Results;
            this.onChangeOnjobTrainingCoordinationType();
          }
        });
      }

      //4. Assessor In Other School
      if (workTypeId == '104') {
        this.isAllowAssessorInOtherSchool = true;
        this.vtDailyReportingModel.AssessorInOtherSchoolForExam = new VTRAssessorInOtherSchoolForExamModel(this.vtDailyReportingModel.AssessorInOtherSchoolForExam);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          assessorInOtherSchoolGroup: this.formBuilder.group({
            SchoolName: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.SchoolName, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(200)),
            Udise: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.Udise, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(11), Validators.minLength(11), Validators.pattern(this.Constants.Regex.Number)]),
            ClassId: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.ClassId, disabled: this.PageRights.IsReadOnly }),
            BoysPresent: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.BoysPresent, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            GirlsPresent: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.GirlsPresent, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            ExamDetails: new FormControl({ value: this.vtDailyReportingModel.AssessorInOtherSchoolForExam.ExamDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });

        // this.commonService.GetClassesByVTId({ DataId: this.UserModel.LoginId, DataId1: this.UserModel.UserTypeId, SelectTitle: 'Class' }).subscribe((response) => {
        //   if (response.Success) {
        //     this.studentClassList = response.Results;
        //   }
        // });

        this.studentClassList = this.classList;
      }

      //5. School Event/ Celebration
      if (workTypeId == '105') {
        this.isAllowSchoolEventCelebration = true;
        this.vtDailyReportingModel.SchoolEventCelebration = this.vtDailyReportingModel.SchoolEventCelebration;

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          schoolEventCelebrationGroup: this.formBuilder.group({
            SchoolEventCelebration: new FormControl({ value: this.vtDailyReportingModel.SchoolEventCelebration, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });
      }

      //5. Parent Teacher Meeting
      if (workTypeId == '106') {
        this.isAllowParentTeacherMeeting = true;
        this.vtDailyReportingModel.ParentTeachersMeeting = new VTRParentTeachersMeetingModel(this.vtDailyReportingModel.ParentTeachersMeeting);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          parentTeacherMeetingGroup: this.formBuilder.group({
            VocationalParentsCount: new FormControl({ value: this.vtDailyReportingModel.ParentTeachersMeeting.VocationalParentsCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            OtherParentsCount: new FormControl({ value: this.vtDailyReportingModel.ParentTeachersMeeting.OtherParentsCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            PTADetails: new FormControl({ value: this.vtDailyReportingModel.ParentTeachersMeeting.PTADetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });
      }

      //6. Community Home Visit
      if (workTypeId == '107') {
        this.isAllowCommunityHomeVisit = true;
        this.vtDailyReportingModel.CommunityHomeVisit = new VTRCommunityHomeVisitModel(this.vtDailyReportingModel.CommunityHomeVisit);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          communityHomeVisitGroup: this.formBuilder.group({
            VocationalParentsCount: new FormControl({ value: this.vtDailyReportingModel.CommunityHomeVisit.VocationalParentsCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            OtherParentsCount: new FormControl({ value: this.vtDailyReportingModel.CommunityHomeVisit.OtherParentsCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            CommunityVisitDetails: new FormControl({ value: this.vtDailyReportingModel.CommunityHomeVisit.CommunityVisitDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
          })
        });
      }

      //7. Industry Visit
      if (workTypeId == '108') {
        this.isAllowIndustryVisit = true;
        this.vtDailyReportingModel.VisitToIndustry = new VTRVisitToIndustryModel();

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          industryVisitGroup: this.formBuilder.group({
            IndustryVisitCount: new FormControl({ value: this.vtDailyReportingModel.VisitToIndustry.IndustryVisitCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            IndustryVisits: this.formBuilder.array([this.createIndustryVisit(this.vtDailyReportingModel.VisitToIndustry)])
          })
        });

        if (this.PageRights.ActionType != this.Constants.Actions.New) {
          let industryVisitControls = <FormArray>this.vtDailyReportingForm.controls.industryVisitGroup.get('IndustryVisits');
          industryVisitControls.clear();

          if (this.vtDailyReportingModel.VisitToIndustries.length > 0) {
            this.vtDailyReportingModel.VisitToIndustries.forEach(visitToIndustryItem => {
              industryVisitControls.push(this.createIndustryVisit(visitToIndustryItem));
            });
          }
          else {
            industryVisitControls.push(this.createVisitToEducationalInstitute(this.vtDailyReportingModel.VisitToEducationalInstitution));
          }
        }
      }

      //8. Visit to Educational Institute
      if (workTypeId == '109') {
        this.isAllowVisitToEducationalInstitute = true;
        this.vtDailyReportingModel.VisitToEducationalInstitution = new VTRVisitToEducationalInstitutionModel();

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          visitToEducationalInstituteGroup: this.formBuilder.group({
            EducationalInstituteVisitCount: new FormControl({ value: this.vtDailyReportingModel.VisitToEducationalInstitution.EducationalInstituteVisitCount, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
            VisitToEducationalInstitutes: this.formBuilder.array([this.createVisitToEducationalInstitute(this.vtDailyReportingModel.VisitToEducationalInstitution)])
          })
        });

        if (this.PageRights.ActionType != this.Constants.Actions.New) {
          let educationalInstituteVisitControls = <FormArray>this.vtDailyReportingForm.controls.visitToEducationalInstituteGroup.get('VisitToEducationalInstitutes');
          educationalInstituteVisitControls.clear();

          if (this.vtDailyReportingModel.VisitToEducationalInstitutions.length > 0) {
            this.vtDailyReportingModel.VisitToEducationalInstitutions.forEach(visitToEducationalInstitutionItem => {
              educationalInstituteVisitControls.push(this.createVisitToEducationalInstitute(visitToEducationalInstitutionItem));
            });
          }
          else {
            educationalInstituteVisitControls.push(this.createVisitToEducationalInstitute(this.vtDailyReportingModel.VisitToEducationalInstitution));
          }
        }
      }

      //9. Assignment From Vocational Department
      if (workTypeId == '110') {
        this.isAllowAssignmentFromVocationalDepartment = true;
        this.vtDailyReportingModel.AssignmentFromVocationalDepartment = new VTRAssignmentFromVocationalDepartmentModel(this.vtDailyReportingModel.AssignmentFromVocationalDepartment);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          assignmentFromVocationalDepartmentGroup: this.formBuilder.group({
            AssigmentNumber: new FormControl({ value: this.vtDailyReportingModel.AssignmentFromVocationalDepartment.AssigmentNumber, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Number)]),
            AssignmentDetails: new FormControl({ value: this.vtDailyReportingModel.AssignmentFromVocationalDepartment.AssignmentDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
            AssignmentPhotoFile: new FormControl({ value: this.vtDailyReportingModel.AssignmentFromVocationalDepartment.AssignmentPhotoFile, disabled: this.PageRights.IsReadOnly }, Validators.required),
            IsAssignmentPhotoFile: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
          })
        });
      }

      //10. Teaching Non Vocational Subject  
      if (workTypeId == '111') {
        this.isAllowTeachingNonVocationalSubject = true;
        this.vtDailyReportingModel.TeachingNonVocationalSubject = new VTRTeachingNonVocationalSubjectModel(this.vtDailyReportingModel.TeachingNonVocationalSubject);

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          teachingNonVocationalSubjectGroup: this.formBuilder.group({
            OtherClassTakenDetails: new FormControl({ value: this.vtDailyReportingModel.TeachingNonVocationalSubject.OtherClassTakenDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
            OtherClassTime: new FormControl({ value: this.vtDailyReportingModel.TeachingNonVocationalSubject.OtherClassTime, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
          })
        });
      }

      //11. Work Assigned By Head Master
      if (workTypeId == '112') {
        this.isAllowWorkAssignedByHeadMaster = true;
        this.vtDailyReportingModel.WorkAssignedByHeadMaster = this.vtDailyReportingModel.WorkAssignedByHeadMaster;

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          workAssignedByHeadMasterGroup: this.formBuilder.group({
            WorkAssignedByHeadMaster: new FormControl({ value: this.vtDailyReportingModel.WorkAssignedByHeadMaster, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
          })
        });
      }

      //11. School Exam Duty
      if (workTypeId == '113') {
        this.isAllowSchoolExamDuty = true;
        this.vtDailyReportingModel.SchoolExamDuty = this.vtDailyReportingModel.SchoolExamDuty;

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          schoolExamDutyGroup: this.formBuilder.group({
            SchoolExamDuty: new FormControl({ value: this.vtDailyReportingModel.SchoolExamDuty, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
          })
        });
      }

      //11. Other Work
      if (workTypeId == '114') {
        this.isAllowOtherWork = true;
        this.vtDailyReportingModel.OtherWork = this.vtDailyReportingModel.OtherWork;

        this.vtDailyReportingForm = this.formBuilder.group({
          ...this.vtDailyReportingForm.controls,

          otherWorkGroup: this.formBuilder.group({
            OtherWork: new FormControl({ value: this.vtDailyReportingModel.OtherWork, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
          })
        });
      }
    });

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      let initialFormValues = this.vtDailyReportingForm.value;
      this.vtDailyReportingForm.reset(initialFormValues);
    }
  }

  onChangeIndustryVisitCount(industryVisitCount: number): void {
    let industryVisitControls = <FormArray>this.vtDailyReportingForm.controls.industryVisitGroup.get('IndustryVisits');
    industryVisitControls.clear();

    for (let industryVisitIndex = 1; industryVisitIndex <= industryVisitCount; industryVisitIndex++) {
      var visitToIndustry = new VTRVisitToIndustryModel();
      industryVisitControls.push(this.createIndustryVisit(visitToIndustry));
    }
  }

  createTeachingVocationalEducation(teachingVocationalEducation: VTRTeachingVocationalEducationModel): FormGroup {
    return this.formBuilder.group({
      SequenceNo: new FormControl({ value: teachingVocationalEducation.SequenceNo, disabled: true }),
      ClassTaughtId: new FormControl({ value: teachingVocationalEducation.ClassTaughtId, disabled: this.PageRights.IsReadOnly }),
      DidYouTeachToday: new FormControl({ value: teachingVocationalEducation.DidYouTeachToday, disabled: this.PageRights.IsReadOnly }),
      ClassSectionIds: new FormControl({ value: teachingVocationalEducation.ClassSectionIds, disabled: this.PageRights.IsReadOnly }),
      ActivityTypeIds: new FormControl({ value: teachingVocationalEducation.ActivityTypeIds, disabled: this.PageRights.IsReadOnly }),
      ModuleId: new FormControl({ value: teachingVocationalEducation.ModuleId, disabled: this.PageRights.IsReadOnly }),
      UnitId: new FormControl({ value: teachingVocationalEducation.UnitId, disabled: this.PageRights.IsReadOnly }),
      SessionsTaught: new FormControl({ value: teachingVocationalEducation.SessionsTaught, disabled: this.PageRights.IsReadOnly }),
      ClassTypeId: new FormControl({ value: teachingVocationalEducation.ClassTypeId, disabled: this.PageRights.IsReadOnly }),
      ClassTime: new FormControl({ value: teachingVocationalEducation.ClassTime, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.Number)]),
      ClassPictureFile: new FormControl({ value: teachingVocationalEducation.ClassPictureFile, disabled: this.PageRights.IsReadOnly }, Validators.required),
      LessonPlanPictureFile: new FormControl({ value: teachingVocationalEducation.LessonPlanPictureFile, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReasonOfNotConductingTheClassIds: new FormControl({ value: teachingVocationalEducation.ReasonOfNotConductingTheClassIds, disabled: this.PageRights.IsReadOnly }),
      ReasonDetails: new FormControl({ value: teachingVocationalEducation.ReasonDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      IsClassPictureFile: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
      IsLessonPlanPictureFile: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
      StudentAttendances: this.formBuilder.array([])
    })
  }

  createIndustryVisit(visitToIndustry: VTRVisitToIndustryModel): FormGroup {
    return this.formBuilder.group({
      IndustryName: new FormControl({ value: visitToIndustry.IndustryName, disabled: this.PageRights.IsReadOnly }),
      IndustryContactPerson: new FormControl({ value: visitToIndustry.IndustryContactPerson, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      IndustryContactNumber: new FormControl({ value: visitToIndustry.IndustryContactNumber, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.MobileNumber)),
      IndustryVisitDetails: new FormControl({ value: visitToIndustry.IndustryVisitDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
    })
  }

  onChangeEducationalInstituteVisitCount(educationalInstituteVisitCount: number): void {
    let educationalInstituteVisitControls = <FormArray>this.vtDailyReportingForm.controls.visitToEducationalInstituteGroup.get('VisitToEducationalInstitutes');
    educationalInstituteVisitControls.clear();

    for (let visitToEducationalInstituteIndex = 1; visitToEducationalInstituteIndex <= educationalInstituteVisitCount; visitToEducationalInstituteIndex++) {
      var visitToEducationalInstitution = new VTRVisitToEducationalInstitutionModel();
      educationalInstituteVisitControls.push(this.createVisitToEducationalInstitute(visitToEducationalInstitution));
    }
  }

  createVisitToEducationalInstitute(visitToEducationalInstitution: VTRVisitToEducationalInstitutionModel): FormGroup {
    return this.formBuilder.group({
      EducationalInstitute: new FormControl({ value: visitToEducationalInstitution.EducationalInstitute, disabled: this.PageRights.IsReadOnly }),
      InstituteContactPerson: new FormControl({ value: visitToEducationalInstitution.InstituteContactPerson, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      InstituteContactNumber: new FormControl({ value: visitToEducationalInstitution.InstituteContactNumber, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.MobileNumber)),
      InstituteVisitDetails: new FormControl({ value: visitToEducationalInstitution.InstituteVisitDetails, disabled: this.PageRights.IsReadOnly }),
    })
  }

  onChangeClassForTaught(formGroup, classId): void {
    if (classId != null) {
      formGroup.get('DidYouTeachToday').setValue(true);


      this.commonService.GetMasterDataByType({ DataType: 'SectionsByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, DataTypeID4: this.AcademicYearInputId, DataTypeID5: classId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sections' }).subscribe((response) => {
        if (response.Success) {
          this.sectionTaughtList = response.Results;
        }
      });

      let moduleItem = formGroup.get('ModuleId').value;
      if (moduleItem != null && moduleItem.Id != null) {
        this.onChangeCourseModule(null, 1, moduleItem);
      }
    }

    this.unitList[0] = <DropdownModel[]>[];
    this.sessionList = <DropdownModel[]>[];
    this.unitSessionsModels[0] = <ModuleUnitSessionModel[]>[];

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      formGroup.get("ClassSectionIds").setValue(null);
    }

    let studentAttendancesControls = <FormArray>formGroup.get('StudentAttendances');
    studentAttendancesControls.clear();
  }

  onChangeSectionForTaught(formGroup, sectionId) {
    this.setFormInputs();
    if (sectionId != null) {
      let classId = formGroup.get("ClassTaughtId").value;
      formGroup.get('DidYouTeachToday').setValue(true);

      // this.commonService.getStudentsByClassId({ DataId: this.UserModel.UserTypeId, DataId1: classId, DataId2: sectionId }).subscribe(response => {
      //   if (response.Success) {
      //     //let studentsForSection = this.studentList.filter(s => s.ClassId == classId && s.SectionId == sectionId);
      //     let studentAttendancesControls = <FormArray>formGroup.get('StudentAttendances');
      //     studentAttendancesControls.clear();

      //     response.Results.forEach(studentItem => {
      //       studentAttendancesControls.push(this.formBuilder.group(studentItem));
      //     });
      //   }
      // });

      this.commonService.GetMasterDataByType({ DataType: 'GetSchoolSectorJobId', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'SSJ' }).subscribe((response) => {
        if (response.Success) {
          let SSJID = response.Results[1].Id;

          this.commonService.getStudentsByClassId({
            DataId: SSJID,
            DataId1: classId,
            DataId2: sectionId
          }).subscribe(response => {
            if (response.Success) {
              let studentAttendancesControls = <FormArray>formGroup.get('StudentAttendances');
              studentAttendancesControls.clear();

              response.Results.forEach(studentItem => {
                studentAttendancesControls.push(this.formBuilder.group(studentItem));
              });

              // let initialFormValues = this.vtGuestLectureConductedForm.value;
              // this.vtGuestLectureConductedForm.reset(initialFormValues);
            }
          });
        }

      });
    }
    else {
      let studentAttendancesControls = <FormArray>formGroup.get('StudentAttendances');
      studentAttendancesControls.clear();
    }
  }

  getSectionByClassId(classId): any {
    return this.sectionByClassList.filter(s => s.ClassId == classId);
  }

  getUnitByClassAndModule(moduleId, classId): any {
    return this.unitSessionList.filter(s => s.ClassId == classId && s.ModuleTypeId == moduleId.Id);
  }

  onChangeCourseModule(formGroup, fgIndex, moduleItem): void {
    let classId = formGroup.get('ClassTaughtId').value;

    if (classId != '' && moduleItem.Id != null) {
      this.commonService.GetUnitsByClassAndModuleId({ DataId: classId, DataId1: moduleItem.Id, DataId2: this.UserModel.UserTypeId, SelectTitle: 'Unit Taught' }).subscribe((response: any) => {
        if (response.Success) {
          this.unitList[fgIndex] = response.Results;
          this.sessionList[fgIndex] = <DropdownModel[]>[];
        }
      });
    }
    else {
      this.unitList[fgIndex] = <DropdownModel[]>[];
      this.sessionList[fgIndex] = <DropdownModel[]>[];
    }
  }

  onChangeUnitsTaught(formGroup, fgIndex, unitItem): void {
    let classId = formGroup.get('ClassTaughtId').value;

    if (classId != '' && unitItem.Id != null) {
      this.commonService.GetSessionsByUnitId({ DataId: unitItem.Id, SelectTitle: 'Sessions Taught' }).subscribe((response: any) => {
        if (response.Success) {
          this.sessionList[fgIndex] = response.Results;
        }
      });
    }
    else {
      this.sessionList[fgIndex] = <DropdownModel[]>[];
    }
  }

  addUnitSession(fieldGroup, tveIndex) {
    let moduleCtrl = fieldGroup.get('ModuleId');
    let unitCtrl = fieldGroup.get('UnitId');
    let sessionIdsCtrl = fieldGroup.get('SessionsTaught');

    if (moduleCtrl.value !== '' && unitCtrl.value !== '' && sessionIdsCtrl.value !== '') {
      this.unitSessionsModels[tveIndex].push(
        new ModuleUnitSessionModel({
          ClassId: fieldGroup.get('ClassTaughtId').value,
          SectionId: fieldGroup.get('ClassSectionIds').value,
          ModuleId: moduleCtrl.value.Id,
          ModuleName: moduleCtrl.value.Name,
          UnitId: unitCtrl.value.Id,
          UnitName: unitCtrl.value.Name,
          SessionIds: sessionIdsCtrl.value.map(x => x.Id),
          SessionNames: sessionIdsCtrl.value.map(x => x.Name).join(',')
        })
      );

      moduleCtrl.setValue({ Id: null, Name: "Select Modules Taught", Description: "", SequenceNo: 1 });
      // unitCtrl.setValue('');
      // sessionIdsCtrl.setValue('');

      this.unitList[tveIndex] = <DropdownModel[]>[];
      this.sessionList[tveIndex] = <DropdownModel[]>[];
    }
  }

  removeUnitSession(tveIndex, sessionItem) {
    const sessionIndex = this.unitSessionsModels[tveIndex].indexOf(sessionItem);
    this.unitSessionsModels[tveIndex].splice(sessionIndex, 1);
  }

  resetReportTypeFormGroups(): void {
    this.isAllowTeachingVocationalEducation = false;
    this.isAllowTrainingOfTeacher = false;
    this.isAllowOnJobTrainingCoordination = false;
    this.isAllowAssessorInOtherSchool = false;
    this.isAllowParentTeacherMeeting = false;
    this.isAllowSchoolEventCelebration = false;
    this.isAllowCommunityHomeVisit = false;
    this.isAllowIndustryVisit = false;
    this.isAllowVisitToEducationalInstitute = false;
    this.isAllowAssignmentFromVocationalDepartment = false;
    this.isAllowTeachingNonVocationalSubject = false;
    this.isAllowWorkAssignedByHeadMaster = false;
    this.isAllowSchoolExamDuty = false;
    this.isAllowOtherWork = false;
    this.isAllowHoliday = false;
    this.isAllowObservationDay = false;
    this.isAllowLeave = false;

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      delete this.vtDailyReportingForm.controls['teachingVocationalEducationGroup'];
      delete this.vtDailyReportingForm.value['teachingVocationalEducationGroup'];
      delete this.vtDailyReportingForm.controls['trainingOfTeacherGroup'];
      delete this.vtDailyReportingForm.value['trainingOfTeacherGroup'];
      delete this.vtDailyReportingForm.controls['onJobTrainingCoordinationGroup'];
      delete this.vtDailyReportingForm.value['onJobTrainingCoordinationGroup'];
      delete this.vtDailyReportingForm.controls['assessorInOtherSchoolGroup'];
      delete this.vtDailyReportingForm.value['assessorInOtherSchoolGroup'];
      delete this.vtDailyReportingForm.controls['schoolEventCelebrationGroup'];
      delete this.vtDailyReportingForm.value['schoolEventCelebrationGroup'];
      delete this.vtDailyReportingForm.controls['parentTeacherMeetingGroup'];
      delete this.vtDailyReportingForm.value['parentTeacherMeetingGroup'];
      delete this.vtDailyReportingForm.controls['communityHomeVisitGroup'];
      delete this.vtDailyReportingForm.value['communityHomeVisitGroup'];
      delete this.vtDailyReportingForm.controls['industryVisitGroup'];
      delete this.vtDailyReportingForm.value['industryVisitGroup'];
      delete this.vtDailyReportingForm.controls['visitToEducationalInstituteGroup'];
      delete this.vtDailyReportingForm.value['visitToEducationalInstituteGroup'];
      delete this.vtDailyReportingForm.controls['assignmentFromVocationalDepartmentGroup'];
      delete this.vtDailyReportingForm.value['assignmentFromVocationalDepartmentGroup'];
      delete this.vtDailyReportingForm.controls['teachingNonVocationalSubjectGroup'];
      delete this.vtDailyReportingForm.value['teachingNonVocationalSubjectGroup'];
      delete this.vtDailyReportingForm.controls['workAssignedByHeadMasterGroup'];
      delete this.vtDailyReportingForm.value['workAssignedByHeadMasterGroup'];
      delete this.vtDailyReportingForm.controls['schoolExamDutyGroup'];
      delete this.vtDailyReportingForm.value['schoolExamDutyGroup'];
      delete this.vtDailyReportingForm.controls['otherWorkGroup'];
      delete this.vtDailyReportingForm.value['otherWorkGroup'];
      delete this.vtDailyReportingForm.controls['leaveGroup'];
      delete this.vtDailyReportingForm.value['leaveGroup'];
      delete this.vtDailyReportingForm.controls['holidayGroup'];
      delete this.vtDailyReportingForm.value['holidayGroup'];
      delete this.vtDailyReportingForm.controls['observationDayGroup'];
      delete this.vtDailyReportingForm.value['observationDayGroup'];
      delete this.vtDailyReportingForm.controls['WorkingDayTypeIds'];
      delete this.vtDailyReportingForm.value['WorkingDayTypeIds'];

      let initialFormValues = this.vtDailyReportingForm.value;
      this.vtDailyReportingForm.reset(initialFormValues);
    }
  }

  resetWorkTypesFormGroups(): void {
    this.isAllowTeachingVocationalEducation = false;
    this.isAllowTrainingOfTeacher = false;
    this.isAllowOnJobTrainingCoordination = false;
    this.isAllowAssessorInOtherSchool = false;
    this.isAllowParentTeacherMeeting = false;
    this.isAllowSchoolEventCelebration = false;
    this.isAllowCommunityHomeVisit = false;
    this.isAllowIndustryVisit = false;
    this.isAllowVisitToEducationalInstitute = false;
    this.isAllowAssignmentFromVocationalDepartment = false;
    this.isAllowTeachingNonVocationalSubject = false;
    this.isAllowWorkAssignedByHeadMaster = false;
    this.isAllowSchoolExamDuty = false;
    this.isAllowOtherWork = false;

    if (this.PageRights.ActionType != this.Constants.Actions.View) {
      delete this.vtDailyReportingForm.controls['teachingVocationalEducationGroup'];
      delete this.vtDailyReportingForm.value['teachingVocationalEducationGroup'];
      delete this.vtDailyReportingForm.controls['trainingOfTeacherGroup'];
      delete this.vtDailyReportingForm.value['trainingOfTeacherGroup'];
      delete this.vtDailyReportingForm.controls['onJobTrainingCoordinationGroup'];
      delete this.vtDailyReportingForm.value['onJobTrainingCoordinationGroup'];
      delete this.vtDailyReportingForm.controls['assessorInOtherSchoolGroup'];
      delete this.vtDailyReportingForm.value['assessorInOtherSchoolGroup'];
      delete this.vtDailyReportingForm.controls['schoolEventCelebrationGroup'];
      delete this.vtDailyReportingForm.value['schoolEventCelebrationGroup'];
      delete this.vtDailyReportingForm.controls['parentTeacherMeetingGroup'];
      delete this.vtDailyReportingForm.value['parentTeacherMeetingGroup'];
      delete this.vtDailyReportingForm.controls['communityHomeVisitGroup'];
      delete this.vtDailyReportingForm.value['communityHomeVisitGroup'];
      delete this.vtDailyReportingForm.controls['industryVisitGroup'];
      delete this.vtDailyReportingForm.value['industryVisitGroup'];
      delete this.vtDailyReportingForm.controls['visitToEducationalInstituteGroup'];
      delete this.vtDailyReportingForm.value['visitToEducationalInstituteGroup'];
      delete this.vtDailyReportingForm.controls['assignmentFromVocationalDepartmentGroup'];
      delete this.vtDailyReportingForm.value['assignmentFromVocationalDepartmentGroup'];
      delete this.vtDailyReportingForm.controls['teachingNonVocationalSubjectGroup'];
      delete this.vtDailyReportingForm.value['teachingNonVocationalSubjectGroup'];
      delete this.vtDailyReportingForm.controls['workAssignedByHeadMasterGroup'];
      delete this.vtDailyReportingForm.value['workAssignedByHeadMasterGroup'];
      delete this.vtDailyReportingForm.controls['schoolExamDutyGroup'];
      delete this.vtDailyReportingForm.value['schoolExamDutyGroup'];
      delete this.vtDailyReportingForm.controls['otherWorkGroup'];
      delete this.vtDailyReportingForm.value['otherWorkGroup'];

      let initialFormValues = this.vtDailyReportingForm.value;
      this.vtDailyReportingForm.reset(initialFormValues);
    }
  }

  uploadedClassPhotoFile(formGroup, event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        formGroup.get('ClassPictureFile').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.VTReporting).then((response: FileUploadModel) => {
        this.classPictureFile = response;

        formGroup.get('IsClassPictureFile').setValue(false);
        this.setMandatoryFieldControl(formGroup, 'ClassPictureFile', this.Constants.DefaultImageState);
      });
    }
  }

  uploadedLessonPlanPhotoFile(formGroup, event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        formGroup.get('LessonPlanPictureFile').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.VTReporting).then((response: FileUploadModel) => {
        this.lessonPlanPictureFile = response;

        formGroup.get('IsLessonPlanPictureFile').setValue(false);
        this.setMandatoryFieldControl(formGroup, 'LessonPlanPictureFile', this.Constants.DefaultImageState);
      });
    }
  }

  uploadedAssignmentPhotoFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        this.vtDailyReportingForm.controls.assignmentFromVocationalDepartmentGroup.get('AssignmentPhotoFile').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.VTReporting).then((response: FileUploadModel) => {
        this.assignmentPhotoFile = response;

        this.vtDailyReportingForm.controls.assignmentFromVocationalDepartmentGroup.get('IsAssignmentPhotoFile').setValue(false);
        this.setMandatoryFieldControl(this.vtDailyReportingForm.controls.assignmentFromVocationalDepartmentGroup as FormGroup, 'AssignmentPhotoFile', this.Constants.DefaultImageState);
      });
    }
  }

  saveOrUpdateVTDailyReportingDetails() {
    if (!this.vtDailyReportingForm.valid) {
      this.validateDynamicFormArrayFields(this.vtDailyReportingForm);
      return;
    }

    if (!this.onChangeReportingDate()) {
      return;
    }

    let workingDayTypeControl = this.vtDailyReportingForm.get('WorkingDayTypeIds');

    if (workingDayTypeControl != null && workingDayTypeControl.value != null) {
      let workingDayType = workingDayTypeControl.value.find(w => w == '101');

      if (workingDayType != undefined && this.unitSessionsModels[0].length == 0) {
        this.dialogService.openShowDialog("Please add course module taught first!");
        return;
      }
    }

    this.vtDailyReportingModel = this.vtDailyReportingService.getVTDailyReportingModelFromFormGroup(this.vtDailyReportingForm);
    this.vtDailyReportingModel.VTId = this.UserModel.UserTypeId;

    var sectionIds = this.vtDailyReportingForm.get('SectionIds').value;
    if (sectionIds) {
      this.vtDailyReportingModel.SectionIds = sectionIds.join(',');
    }

    if (this.vtDailyReportingModel.TeachingVocationalEducations.length > 0) {
      this.vtDailyReportingModel.TeachingVocationalEducations[0].UnitSessionsModels = this.unitSessionsModels[0];
      this.vtDailyReportingModel.TeachingVocationalEducations[0].ClassPictureFile = (this.classPictureFile.Base64Data != '' ? this.setUploadedFile(this.classPictureFile) : null);
      this.vtDailyReportingModel.TeachingVocationalEducations[0].LessonPlanPictureFile = (this.lessonPlanPictureFile.Base64Data != '' ? this.setUploadedFile(this.lessonPlanPictureFile) : null);
    }
    else {
      delete this.vtDailyReportingModel['TeachingVocationalEducations'];
    }

    if (this.vtDailyReportingModel.AssignmentFromVocationalDepartment != undefined) {
      this.vtDailyReportingModel.AssignmentFromVocationalDepartment.AssignmentPhotoFile = (this.assignmentPhotoFile.Base64Data != '' ? this.setUploadedFile(this.assignmentPhotoFile) : null);
    }



    this.vtDailyReportingService.createOrUpdateVTDailyReporting(this.vtDailyReportingModel)
      .subscribe((vtDailyReportingResp: any) => {

        if (vtDailyReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTDailyReporting.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtDailyReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTDailyReporting deletion errors =>', error);
      });
  }

  //Create vtDailyReporting form and returns {FormGroup}
  createVTDailyReportingForm(): FormGroup {
    return this.formBuilder.group({
      VTDailyReportingId: new FormControl(this.vtDailyReportingModel.VTDailyReportingId),

      SchoolId: new FormControl({ value: this.vtDailyReportingModel.SchoolId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.vtDailyReportingModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.vtDailyReportingModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      AcademicYearId: new FormControl({ value: this.vtDailyReportingModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),

      ClassId: new FormControl({ value: this.vtDailyReportingModel.ClassId, disabled: this.PageRights.IsReadOnly }),
      SectionIds: new FormControl({ value: this.vtDailyReportingModel.SectionIds, disabled: this.PageRights.IsReadOnly }),

      ReportingDate: new FormControl({ value: new Date(this.vtDailyReportingModel.ReportingDate), disabled: this.PageRights.IsReadOnly }),
      ReportType: new FormControl({ value: this.vtDailyReportingModel.ReportType, disabled: this.PageRights.IsReadOnly }, Validators.required),
      WorkingDayTypeIds: new FormControl({ value: this.vtDailyReportingModel.WorkingDayTypeIds, disabled: this.PageRights.IsReadOnly }),
      //SchoolEventCelebration: new FormControl({ value: this.vtDailyReportingModel.SchoolEventCelebration, disabled: this.PageRights.IsReadOnly }),
      //OBSDayDetails: new FormControl({ value: this.vtDailyReportingModel.OBSDayDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
    });
  }

  private onChangeTrainingOfTeacherType() {
    this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get('TrainingTypeId').valueChanges
      .subscribe(data => {

        if (data == "126") {
          this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingBy").setValidators([Validators.required, Validators.maxLength(100)]);
          this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingTopicIds").clearValidators();
        }
        else if (data == "124" || data == "125") {
          this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingTopicIds").setValidators(Validators.required);
          this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingBy").clearValidators();
        }

        this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingTopicIds").updateValueAndValidity();
        this.vtDailyReportingForm.controls.trainingOfTeacherGroup.get("TrainingBy").updateValueAndValidity();
      });
  }

  private onChangeOnjobTrainingCoordinationType() {
    this.vtDailyReportingForm.get("OnJobTrainingActivityId").valueChanges
      .subscribe(data => {

        if (data == "139") {
          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryName").setValidators(Validators.required);
          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactPerson").setValidators([Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]);
          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactNumber").setValidators([Validators.required, Validators.pattern(this.Constants.Regex.MobileNumber)]);
        }
        else if (data == "140") {
          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryName").setValidators(Validators.required);

          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactPerson").clearValidators();
          this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactNumber").clearValidators();
        }

        this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryName").updateValueAndValidity();
        this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactPerson").updateValueAndValidity();
        this.vtDailyReportingForm.controls.onJobTrainingCoordinationGroup.get("IndustryContactNumber").updateValueAndValidity();
      });
  }

  private onChangeLeaveApprovalStatus() {
    this.vtDailyReportingForm.controls.leaveGroup.get('LeaveApprovalStatus').valueChanges
      .subscribe(leaveApprovalStatusId => {

        if (leaveApprovalStatusId == 'Yes') {
          this.vtDailyReportingForm.controls.leaveGroup.get("LeaveApprover").setValidators([Validators.required]);
        }
        else {
          this.vtDailyReportingForm.controls.leaveGroup.get("LeaveApprover").clearValidators();
        }

        this.vtDailyReportingForm.controls.leaveGroup.get("LeaveApprover").updateValueAndValidity();
      });
  }
}
