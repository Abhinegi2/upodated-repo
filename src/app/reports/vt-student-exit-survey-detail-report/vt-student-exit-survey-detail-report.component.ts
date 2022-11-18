import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTStudentExitSurveyReportModel } from './vt-student-exit-survey-detail-report.model';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { ReportService } from '../report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

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
  divisionList: [DropdownModel];
  districtList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];
  vtpList: [DropdownModel];
  classList: any = [];
  monthList: [DropdownModel];
  schoolManagementList: [DropdownModel];

  currentAcademicYearId: string;
  isShowFilterContainer = false;
  roleCode: string;
  ReqObj: any;
  PageIndex: number;
  PageSize: number;
  ShowFirstLastButtons = true;
  PageSizeOptions = [5, 10, 25, 50, 100, 200];
  TotalResults: number;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private reportService: ReportService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.PageIndex = 0; // delete after script changed
    this.PageSize = 10; // delete after script changed

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

      let currentYearItem = this.academicyearList.find(ay => ay.IsSelected == true);
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.vtStudentExitSurveyForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
        this.onChangeAcademicYear(this.currentAcademicYearId);
      }
    });

    this.vtStudentExitSurveyForm = this.createVTStudentExitSurveyForm();
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.PageIndex = evt.pageIndex;
    this.PageSize = evt.pageSize;
    let ay = this.vtStudentExitSurveyForm.get('AcademicYearId').value;
    this.onChangeAcademicYear(ay);
  }

  //Create VTSchoolSector form and returns {FormGroup}
  createVTStudentExitSurveyForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      ClassId: new FormControl(),
    });
  }

  onChangeClass() {
    let ay = this.vtStudentExitSurveyForm.get('AcademicYearId').value;
    this.onChangeAcademicYear(ay);
    this.tableDataSource.data = [];
  }

  onChangeAcademicYear(academicYear) {
    let classId = this.vtStudentExitSurveyForm.get('ClassId').value;
    this.roleCode = this.UserModel.RoleCode;

    if (this.UserModel.RoleCode == "ADM") {
      this.roleCode = "PMU";
    }

    this.ReqObj = {
      "UserId": this.UserModel.UserTypeId,
      "UserType": this.roleCode,
      "AcademicYearId": academicYear,
      "StudentId": null,
      "ClassId": classId,
      "PageIndex": this.PageIndex,
      "PageSize": this.PageSize
    };

    this.IsLoading = true;
    this.reportService.GetVTStudentExitSurveyReportsByCriteria(this.ReqObj).subscribe(response => {
      this.displayedColumns = ['StudentFullName', 'StudentUniqueId', 'SeatNo', 'District', 'NameOfSchool', 'UdiseCode', 'Class', 'Gender', 'DOB', 'Category', 'Religion', 'FatherName', 'MotherName', 'Sector', 'JobRole', 'VTPName', 'VTName', 'VTMobile', 'VCName', 'DateOfIntv', 'CityOfResidence', 'DistrictOfResidence', 'BlockOfResidence', 'PinCode', 'StudentMobileNo', 'StudentWANo', 'ParentMobileNo', 'ParentName', 'DoneInternship', 'CurrentlyEmployed', 'DetailsOfEmployment', 'IsFullTime', 'SectorsOfEmployment', 'IsRelevantToVocCourse', 'WillContHigherStudies', 'WillBeFullTime', 'CourseToPursue', 'OtherCourse', 'StreamOfEducation', 'WillingToContSkillTraining', 'SkillTrainingType', 'CourseForTraining', 'SectorForTraining', 'OtherSectorsIfAny', 'WantToPursueAnySkillTraining', 'TrainingType', 'SectorForSkillTraining', 'OthersIfAny', 'WillingToGoForTechHighEdu', 'WantToKnowAbtPgmsForJobsNContEdu', 'WantToKnowAboutOpportunities', 'InterestedInJobOrSelfEmployment', 'TopicsOfInterest', 'CanSendTheUpdates', 'CollectedEmailId', 'SurveyCompletedByStudentORParent', 'Remark'];

      this.tableDataSource.data = [];
      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.TotalResults = response.TotalResults;

      setTimeout(() => {
        this.ListPaginator.pageIndex = this.PageIndex;
        this.ListPaginator.length = this.TotalResults;
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

  exportExcel(): void {
    this.IsLoading = true;
    this.PageIndex = 0;
    this.PageSize = 1000000;

    let classId = this.vtStudentExitSurveyForm.get('ClassId').value;
    let academicYearId = this.vtStudentExitSurveyForm.get('AcademicYearId').value;
    this.roleCode = this.UserModel.RoleCode;

    if (this.UserModel.RoleCode == "ADM") {
      this.roleCode = "PMU";
    }

    this.ReqObj = {
      "UserId": this.UserModel.UserTypeId,
      "UserType": this.roleCode,
      "AcademicYearId": academicYearId,
      "StudentId": null,
      "ClassId": classId,
      "PageIndex": this.PageIndex,
      "PageSize": this.PageSize
    };

    this.reportService.GetVTStudentExitSurveyReportsByCriteria(this.ReqObj).subscribe(response => {

      response.Results.forEach(
        function (obj) {
          delete obj.TotalRows;
          delete obj.VTPId;
          delete obj.VCId;
          delete obj.VTId;
          delete obj.ExitStudentId;
        });

      this.exportExcelFromTable(response.Results, "VTExitSurveyDetailsReport");

      this.IsLoading = false;
      this.PageIndex = 0;
      this.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

}

