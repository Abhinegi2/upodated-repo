import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VTStudentTrackingReportModel } from './vt-student-tracking-report.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-student-tracking-report.component.html',
  styleUrls: ['./vt-student-tracking-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTStudentTrackingReportComponent extends BaseListComponent<VTStudentTrackingReportModel> implements OnInit {
  vtStudentTrackingForm: FormGroup;


  academicyearList: [DropdownModel];
  divisionList: [DropdownModel];
  districtList: DropdownModel[];
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  vtpList: [DropdownModel];
  classList: [DropdownModel];
  monthList: [DropdownModel];
  schoolManagementList: [DropdownModel];
  currentAcademicYearId: string;
  isShowFilterContainer = false;
  @ViewChild('districtMatSelect') districtSelections: MatSelect;

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
    this.reportService.GetDropdownForReports(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicyearList = results[0].Results;
      }

      if (results[1].Success) {
        this.divisionList = results[1].Results;
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      if (results[3].Success) {
        this.vtpList = results[3].Results;
      }

      if (results[4].Success) {
        this.classList = results[4].Results;
      }

      if (results[5].Success) {
        this.monthList = results[5].Results;
      }

      if (results[6].Success) {
        this.schoolManagementList = results[6].Results;
      }

      let currentYearItem = this.academicyearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.vtStudentTrackingForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.vtStudentTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getVTStudentTrackingReports();
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.vtStudentTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.vtStudentTrackingForm.controls["DistrictId"].setValue(districtIds);

            this.getVTStudentTrackingReports();
          });
        }
        else {
          this.getVTStudentTrackingReports();
        }
      }
    });

    this.vtStudentTrackingForm = this.createVTStudentTrackingForm();
  }

  resetReportFilters(): void {
    this.vtStudentTrackingForm.reset();
    this.vtStudentTrackingForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.vtStudentTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.vtStudentTrackingForm.controls["DistrictId"].setValue(districtIds);

        this.getVTStudentTrackingReports();
      });
    }
    else {
      this.getVTStudentTrackingReports();
    }
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.vtStudentTrackingForm.controls['DistrictId'].setValue(null);
          resolve(response.Results);
        }, err => {

          reject(err);
        });
    });

    return promise;
  }

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
    });
  }

  toggleDistrictSelections(evt) {
    //To control select-unselect all
    let isAllSelected = (evt.currentTarget.classList.toString().indexOf('mat-active') > 0)

    if (isAllSelected) {
      this.districtSelections.options.forEach((item: MatOption) => item.select());
      this.districtSelections.options.first.deselect();
    } else {
      this.districtSelections.options.forEach((item: MatOption) => { item.deselect() });
    }
    setTimeout(() => { this.districtSelections.close(); }, 200);
  }

  //Create VTDailyAttendanceTracking form and returns {FormGroup}
  createVTStudentTrackingForm(): FormGroup {
    return this.formBuilder.group({
      FromDate: new FormControl('', Validators.required),
      ToDate: new FormControl('', Validators.required),
      AcademicYearId: new FormControl(),
      MonthId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      ClassId: new FormControl(),
      VTPId: new FormControl(),
      SchoolManagementId: new FormControl()
    });
  }

  getVTStudentTrackingReports(): void {
    if (!this.vtStudentTrackingForm.valid) {
      this.validateAllFormFields(this.vtStudentTrackingForm);
      return;
    }

    var reportParams = {
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.vtStudentTrackingForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.vtStudentTrackingForm.get('ToDate').value, this.Constants.ServerDateFormat),
      AcademicYearId: this.vtStudentTrackingForm.get('AcademicYearId').value,
      DivisionId: this.vtStudentTrackingForm.get('DivisionId').value,
      DistrictId: this.vtStudentTrackingForm.get('DistrictId').value,
      SectorId: this.vtStudentTrackingForm.get('SectorId').value,
      JobRoleId: this.vtStudentTrackingForm.get('JobRoleId').value,
      VTPId: this.vtStudentTrackingForm.get('VTPId').value,
      ClassId: this.vtStudentTrackingForm.get('ClassId').value,
      MonthId: this.vtStudentTrackingForm.get('MonthId').value,
      SchoolManagementId: this.vtStudentTrackingForm.get('SchoolManagementId').value
    };

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVTStudentTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'VTDateOfJoining', 'HMName', 'HMMobile', 'HMEmail', 'SchoolManagement', 'DivisionName', 'DistrictName', 'BlockName', 'UDISE', 'SchoolName', 'SectorName', 'ReportType', 'WorkingDayType', 'ClassTaught', 'ClassType', 'Girls', 'Boys', 'ReportingDate', 'SubmissionDate', 'GeoLocation'];

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

  exportExcel(): void {
    this.IsLoading = true;
    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.vtStudentTrackingForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.vtStudentTrackingForm.get('ToDate').value, this.Constants.ServerDateFormat),
      AcademicYearId: this.vtStudentTrackingForm.get('AcademicYearId').value,
      DivisionId: this.vtStudentTrackingForm.get('DivisionId').value,
      DistrictId: this.vtStudentTrackingForm.get('DistrictId').value,
      SectorId: this.vtStudentTrackingForm.get('SectorId').value,
      JobRoleId: this.vtStudentTrackingForm.get('JobRoleId').value,
      VTPId: this.vtStudentTrackingForm.get('VTPId').value,
      ClassId: this.vtStudentTrackingForm.get('ClassId').value,
      MonthId: this.vtStudentTrackingForm.get('MonthId').value,
      SchoolManagementId: this.vtStudentTrackingForm.get('SchoolManagementId').value
    };

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVTStudentTrackingByCriteria(reportParams).subscribe(response => {
      this.exportExcelFromTable(response.Results, "VTStudentTracking");
      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}
