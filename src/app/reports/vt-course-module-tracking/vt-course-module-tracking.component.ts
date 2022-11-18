import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VTCourseModuleTrackingModel } from './vt-course-module-tracking.model';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-course-module-tracking.component.html',
  styleUrls: ['./vt-course-module-tracking.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTCourseModuleTrackingComponent extends BaseListComponent<VTCourseModuleTrackingModel> implements OnInit {
  vtCourseModuleTrackingForm: FormGroup;
  isShowFilterContainer = false;
  vtList: any;
  classList: any;
  sectionList: any;
  schoolList: any;
  filteredSchoolItems: any;

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
    this.reportService.getDropdownforVTCourseModuleTrackingReport(this.UserModel).subscribe((results) => {
      if (results[3].Success) {
        this.schoolList = results[3].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      this.vtCourseModuleTrackingForm = this.createVTCourseModuleTrackingForm();
    });

    this.vtCourseModuleTrackingForm = this.createVTCourseModuleTrackingForm();
  }

  onChangeClass(classId) {
    let vtId = this.vtCourseModuleTrackingForm.get("VTId").value;
    this.commonService.GetSectionsByVTClassId({ DataId: vtId, DataId1: classId }).subscribe(response => {
      if (response.Success) {
        this.sectionList = response.Results;
      }
    });
  }

  onChangeSchool(schoolId) {
    this.commonService.GetMasterDataByType({ DataType: 'TrainersBySchool', ParentId: schoolId, SelectTitle: 'Vocational Trainer' }).subscribe(response => {
      if (response.Success) {
        this.vtList = response.Results;
      }
    });
  }

  onChangeVT(vtId) {
    this.commonService.GetMasterDataByType({ DataType: 'ClassesForCMByVT', ParentId: vtId, SelectTitle: 'Class' }).subscribe(response => {
      if (response.Success) {
        this.classList = response.Results;
      }
    });
  }
  
  //Create VTCourseModuleTracking form and returns {FormGroup}
  createVTCourseModuleTrackingForm(): FormGroup {
    return this.formBuilder.group({
      FromDate: new FormControl('', Validators.required),
      ToDate: new FormControl('', Validators.required),
      VTId: new FormControl(''),
      SchoolId: new FormControl(''),
      ClassId: new FormControl(''),
      SectionId: new FormControl(''),
    });
  }

  getVTCourseModuleTrackingReports(): void {
    if (!this.vtCourseModuleTrackingForm.valid) {
      this.validateAllFormFields(this.vtCourseModuleTrackingForm);
      return;
    }

    var reportParams = {
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.vtCourseModuleTrackingForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.vtCourseModuleTrackingForm.get('ToDate').value, this.Constants.ServerDateFormat),
      VTId: this.vtCourseModuleTrackingForm.get('VTId').value,
      SchoolId: this.vtCourseModuleTrackingForm.get('SchoolId').value,
      ClassId: this.vtCourseModuleTrackingForm.get('ClassId').value,
      SectionId: this.vtCourseModuleTrackingForm.get('SectionId').value,
    };

    this.reportService.GetVTCourseModuleDailyTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'VTGender', 'HMName', 'HMMobile', 'HMEmail', 'SectorName', 'JobRoleName', 'SchoolName', 'UDISE', 'ClassName', 'SectionName', 'DistrictName', 'BlockName', 'ReportingDate', 'ReportingDay', 'ActivityType', 'ClassType', 'ClassDuration', 'ModulesTaught', 'UnitsTaught', 'SessionTaught', 'ClassPictureUrl', 'LessonPlanPictureUrl', 'EnrollmentBoys', 'EnrollmentGirls', 'EnrollmentTotal', 'AttendanceBoys', 'AttendanceGirls', 'AttendanceTotal'];

      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;

      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }
}
