import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTStudentExitSurveyReportModel } from './vt-student-exit-survey-detail-report.model';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from '../report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-student-exit-survey-detail-report.component.html',
  styleUrls: ['./vt-student-exit-survey-detail-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTStudentExitSurveyReportComponent extends BaseListComponent<VTStudentExitSurveyReportModel> implements OnInit {
  vtStudentExitSurveyForm: FormGroup;

  academicyearList: [DropdownModel];
  classList: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private reportService: ReportService) {
    super(commonService, router, routeParams, snackBar, zone);

    this.displayedColumns = ['AcademicYear', 'VTPName', 'VCName', 'VTName', 'VTMobile', 'Sector', 'JobRole', 'Division', 'District', 'NameOfSchool', 'UdiseCode', 'Class', 'SeatNo', 'StudentUniqueId', 'StudentFullName', 'Gender', 'DOB', 'FatherName', 'MotherName', 'Category', /*'Religion',*/ 'StreamName', 'StudentMobileNo', 'StudentWhatsAppNo', 'ParentMobileNo', 'CityOfResidence', 'DistrictOfResidence', 'BlockOfResidence', 'PinCode', 'StudentAddress', 'WillContHigherStudies', 'IsFullTime', 'CourseToPursue', 'OtherCourse', 'StreamOfEducation', 'OtherStreamStudying', 'WillContVocEdu', 'WillContVocational11', 'ReasonsNOTToContinue', 'WillContSameSector', 'SectorForTraining', 'OtherSector', 'CurrentlyEmployed', 'WorkTitle', 'DetailsOfEmployment', 'WillBeFullTime', 'SectorsOfEmployment', 'IsVSCompleted', 'WantToPursueAnySkillTraining', 'IsFulltimeWillingness', 'HveRegisteredOnEmploymentPortal', 'EmploymentPortalName', 'WillingToGetRegisteredOnNAPS', 'WantToKnowAboutOpportunities', 'CanLahiGetInTouch', 'CollectedEmailId', 'SurveyCompletedByStudentORParent', 'DateOfIntv', 'Remark', 'ExitSurveyStatus', 'SubmissionDate'];
    this.vtStudentExitSurveyForm = this.createVTStudentExitSurveyForm();
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 250; // delete after script changed

    this.reportService.GetExitSurveyReportDropdown(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicyearList = results[0].Results;
      }

      results[1].Results.forEach(classItem => {
        if (classItem.Name == 'Class 10' || classItem.Name == 'Class 12') {
          this.classList.push(classItem);
        }
      });

      this.vtStudentExitSurveyForm.get('ClassId').setValue('3d99b3d3-f955-4e8f-9f2e-ec697a774bbc');
      this.vtStudentExitSurveyForm.get('AcademicYearId').setValue(this.UserModel.AcademicYearId);
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadStudentExitSurveyReportByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vtStudentExitSurveyForm.reset();
    this.vtStudentExitSurveyForm.get('ClassId').setValue('3d99b3d3-f955-4e8f-9f2e-ec697a774bbc');
    this.vtStudentExitSurveyForm.get('AcademicYearId').setValue(this.UserModel.AcademicYearId);

    this.tableDataSource.data = [];
    this.tableDataSource.filteredData = [];
  }

  onLoadStudentExitSurveyReportByCriteria() {
    this.IsLoading = true;

    this.getVTStudentExitSurveyReportsData().then(response => {

      if (this.vtStudentExitSurveyForm.get('ClassId').value == '3d99b3d3-f955-4e8f-9f2e-ec697a774bbc') {
        this.displayedColumns = ['AcademicYear', 'VTPName', 'VCName', 'VTName', 'VTMobile', 'Sector', 'JobRole', 'Division', 'District', 'NameOfSchool', 'UdiseCode', 'Class', 'SeatNo', 'StudentUniqueId', 'StudentFullName', 'Gender', 'DOB', 'FatherName', 'MotherName', 'Category', 'Religion', 'StreamName', 'StudentMobileNo', 'StudentWhatsAppNo', 'ParentMobileNo', 'CityOfResidence', 'DistrictOfResidence', 'BlockOfResidence', 'PinCode', 'StudentAddress', 'WillContHigherStudies', 'IsFullTime', 'CourseToPursue', 'OtherCourse', 'StreamOfEducation', 'OtherStreamStudying', 'WillContVocEdu', 'WillContVocational11', 'ReasonsNOTToContinue', 'WillContSameSector', 'SectorForTraining', 'OtherSector', 'CurrentlyEmployed', 'WorkTitle', 'DetailsOfEmployment', 'WillBeFullTime', 'SectorsOfEmployment', 'IsVSCompleted', 'WantToPursueAnySkillTraining', 'IsFulltimeWillingness', 'HveRegisteredOnEmploymentPortal', 'EmploymentPortalName', 'WillingToGetRegisteredOnNAPS', 'WantToKnowAboutOpportunities', 'CanLahiGetInTouch', 'CollectedEmailId', 'SurveyCompletedByStudentORParent', 'DateOfIntv', 'Remark', 'ExitSurveyStatus', 'SubmissionDate'];
      }
      else {
        this.displayedColumns = ['AcademicYear', 'VTPName', 'VCName', 'VTName', 'VTMobile', 'Sector', 'JobRole', 'Division', 'District', 'NameOfSchool', 'UdiseCode', 'Class', 'SeatNo', 'StudentUniqueId', 'StudentFullName', 'Gender', 'DOB', 'FatherName', 'MotherName', 'Category', 'Religion', 'StreamName', 'StudentMobileNo', 'StudentWhatsAppNo', 'ParentMobileNo', 'CityOfResidence', 'DistrictOfResidence', 'BlockOfResidence', 'PinCode', 'StudentAddress', 'DoneInternship', 'InternshipCompletedSector', 'WillContHigherStudies', 'IsFullTime', 'CourseToPursue', 'OtherCourse', 'StreamOfEducation', 'OtherStreamStudying', 'WillContVocEdu', 'WillContVocational11', 'ReasonsNOTToContinue', 'WillContSameSector', 'SectorForTraining', 'OtherSector', 'CurrentlyEmployed', 'WorkTitle', 'DetailsOfEmployment', 'WillBeFullTime', 'SectorsOfEmployment', 'IsVSCompleted', 'WantToPursueAnySkillTraining', 'IsFulltimeWillingness', 'HveRegisteredOnEmploymentPortal', 'EmploymentPortalName', 'WillingToGetRegisteredOnNAPS', 'IntrestedInJobOrSelfEmploymentPost12th', 'PreferredLocations', 'ParticularLocation', 'WantToKnowAboutOpportunities', 'CanLahiGetInTouch', 'WantToKnowAbtPgmsForJobsNContEdu', 'CollectedEmailId', 'SurveyCompletedByStudentORParent', 'DateOfIntv', 'Remark', 'ExitSurveyStatus', 'SubmissionDate'];
      }

      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;

      this.SearchBy.TotalResults = response.TotalResults;

      setTimeout(() => {
        this.ListPaginator.pageIndex = this.SearchBy.PageIndex;
        this.ListPaginator.length = this.SearchBy.TotalResults;
      });

      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  getVTStudentExitSurveyReportsData(): Promise<any> {
    if (!this.vtStudentExitSurveyForm.valid) {
      this.validateAllFormFields(this.vtStudentExitSurveyForm);
      return;
    }

    let studentUniqueId: string = this.vtStudentExitSurveyForm.get('StudentUniqueId').value;

    let exitSurveyParams = {
      UserId: this.UserModel.UserTypeId,
      UserType: this.UserModel.RoleCode,
      AcademicYearId: this.vtStudentExitSurveyForm.get('AcademicYearId').value,
      ClassId: this.vtStudentExitSurveyForm.get('ClassId').value,
      StudentId: null,
      StudentUniqueId: (studentUniqueId == null || studentUniqueId.length == 0 ? null : studentUniqueId),
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    let promise = new Promise((resolve, reject) => {
      this.reportService.GetVTStudentExitSurveyReportsByCriteria(exitSurveyParams).subscribe(response => {
        resolve(response);
      }, error => {
        console.log(error);
        resolve(error);
      });
    });

    return promise;
  }

  exportFilterData(): void {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 25000000;
    let selectedClassId = this.vtStudentExitSurveyForm.get('ClassId').value;

    this.getVTStudentExitSurveyReportsData().then(response => {

      response.Results.forEach(
        function (obj) {
          obj.LhStudentId = obj.ExitStudentId;

          if (selectedClassId == '3d99b3d3-f955-4e8f-9f2e-ec697a774bbc') {
            delete obj.DoneInternship;
            delete obj.InternshipCompletedSector;
            delete obj.IntrestedInJobOrSelfEmploymentPost12th;
            delete obj.PreferredLocations;
            delete obj.ParticularLocation;
            delete obj.WantToKnowAbtPgmsForJobsNContEdu;
          }

          delete obj.ExitStudentId;
          delete obj.AcademicYearId;
          delete obj.State;
          delete obj.StudentFirstName;
          delete obj.StudentMiddleName;
          delete obj.StudentLastName;
          delete obj.OtherReasons;
          delete obj.DoesFieldStudyHveVocSub;
          delete obj.AnyPreferredLocForEmployment;
          delete obj.TrainingType;
          delete obj.WillingToContSkillTraining;
          delete obj.SkillTrainingType;
          delete obj.CourseForTraining;
          delete obj.CourseNameIfOther;
          delete obj.OtherSectorsIfAny;
          delete obj.InterestedInJobOrSelfEmployment;
          delete obj.TopicsOfInterest;
          delete obj.IsRelevantToVocCourse;
          delete obj.SectorForSkillTraining;
          delete obj.OthersIfAny;
          delete obj.WillingToGoForTechHighEdu;
          delete obj.WantToKnowAbtSkillsUnivByGvt;
          delete obj.CanSendTheUpdates;
          delete obj.IsAssessmentRequired;
          delete obj.AssessmentConducted;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VTExitSurveyReport");
      this.SearchBy.PageSize = 250;
      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  exportBulkData(): void {
    this.IsLoading = true;
    let selectedClassId = this.vtStudentExitSurveyForm.get('ClassId').value;

    let exitSurveyParams = {
      UserId: this.UserModel.UserTypeId,
      UserType: this.UserModel.RoleCode,
      AcademicYearId: this.vtStudentExitSurveyForm.get('AcademicYearId').value,
      ClassId: this.vtStudentExitSurveyForm.get('ClassId').value,
      PageIndex: 0,
      PageSize: 25000000
    };

    this.reportService.GetVTStudentExitSurveyReportsByCriteria(exitSurveyParams).subscribe(response => {

      response.Results.forEach(
        function (obj) {
          obj.LhStudentId = obj.ExitStudentId;

          if (selectedClassId == '3d99b3d3-f955-4e8f-9f2e-ec697a774bbc') {
            delete obj.DoneInternship;
            delete obj.InternshipCompletedSector;
            delete obj.IntrestedInJobOrSelfEmploymentPost12th;
            delete obj.PreferredLocations;
            delete obj.ParticularLocation;
            delete obj.WantToKnowAbtPgmsForJobsNContEdu;
          }

          delete obj.ExitStudentId;
          delete obj.AcademicYearId;
          delete obj.State;
          delete obj.StudentFirstName;
          delete obj.StudentMiddleName;
          delete obj.StudentLastName;
          delete obj.OtherReasons;
          delete obj.DoesFieldStudyHveVocSub;
          delete obj.AnyPreferredLocForEmployment;
          delete obj.TrainingType;
          delete obj.WillingToContSkillTraining;
          delete obj.SkillTrainingType;
          delete obj.CourseForTraining;
          delete obj.CourseNameIfOther;
          delete obj.OtherSectorsIfAny;
          delete obj.InterestedInJobOrSelfEmployment;
          delete obj.TopicsOfInterest;
          delete obj.IsRelevantToVocCourse;
          delete obj.SectorForSkillTraining;
          delete obj.OthersIfAny;
          delete obj.WillingToGoForTechHighEdu;
          delete obj.WantToKnowAbtSkillsUnivByGvt;
          delete obj.CanSendTheUpdates;
          delete obj.IsAssessmentRequired;
          delete obj.AssessmentConducted;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VTExitSurveyReport");
      this.SearchBy.PageSize = 250;
      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VTSchoolSector form and returns {FormGroup}
  createVTStudentExitSurveyForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      ClassId: new FormControl(),
      StudentUniqueId: new FormControl(),
    });
  }
}

