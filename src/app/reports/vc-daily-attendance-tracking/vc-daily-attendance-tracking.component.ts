import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VCDailyAttendanceTrackingModel } from './vc-daily-attendance-tracking.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'data-list-view',
  templateUrl: './vc-daily-attendance-tracking.component.html',
  styleUrls: ['./vc-daily-attendance-tracking.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VCDailyAttendanceTrackingComponent extends BaseListComponent<VCDailyAttendanceTrackingModel> implements OnInit {
  dailyAttendanceTrackingForm: FormGroup;

  academicyearList: [DropdownModel];
  divisionList: [DropdownModel];
  districtList: DropdownModel[];
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  vtpList: [DropdownModel];
  classList: [DropdownModel];
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
    this.dailyAttendanceTrackingForm = this.createVCDailyAttendanceTrackingForm();
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

      if (results[6].Success) {
        this.schoolManagementList = results[6].Results;
      }

      let currentYearItem = this.academicyearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.dailyAttendanceTrackingForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.dailyAttendanceTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.dailyAttendanceTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.dailyAttendanceTrackingForm.controls["DistrictId"].setValue(districtIds);
          });
        }
      }
    });
  }

  resetReportFilters(): void {
    this.dailyAttendanceTrackingForm.reset();
    this.dailyAttendanceTrackingForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.dailyAttendanceTrackingForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.dailyAttendanceTrackingForm.controls["DistrictId"].setValue(districtIds);

        this.getVCDailyAttendanceTrackingReports();
      });
    }
    else {
      this.getVCDailyAttendanceTrackingReports();
    }
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.dailyAttendanceTrackingForm.controls['DistrictId'].setValue(null);
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

  //Create VCDailyAttendanceTracking form and returns {FormGroup}
  createVCDailyAttendanceTrackingForm(): FormGroup {
    return this.formBuilder.group({
      FromDate: new FormControl('', Validators.required),
      ToDate: new FormControl('', Validators.required),
      AcademicYearId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      ClassId: new FormControl(),
      VTPId: new FormControl(),
      SchoolManagementId: new FormControl()
    });
  }

  getVCDailyAttendanceTrackingReports(): void {
    if (!this.dailyAttendanceTrackingForm.valid) {
      this.validateAllFormFields(this.dailyAttendanceTrackingForm);
      return;
    }

    var reportParams = {
      AcademicYearId: this.dailyAttendanceTrackingForm.get('AcademicYearId').value,
      DivisionId: this.dailyAttendanceTrackingForm.get('DivisionId').value,
      DistrictId: this.dailyAttendanceTrackingForm.get('DistrictId').value,
      SectorId: this.dailyAttendanceTrackingForm.get('SectorId').value,
      JobRoleId: this.dailyAttendanceTrackingForm.get('JobRoleId').value,
      VTPId: this.dailyAttendanceTrackingForm.get('VTPId').value,
      ClassId: this.dailyAttendanceTrackingForm.get('ClassId').value,
      SchoolManagementId: this.dailyAttendanceTrackingForm.get('SchoolManagementId').value,
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.dailyAttendanceTrackingForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.dailyAttendanceTrackingForm.get('ToDate').value, this.Constants.ServerDateFormat)
    };

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVCDailyAttendanceTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VCDateOfJoining', 'UDISE', 'SchoolName', 'SectorName', 'ReportType', 'DateOfReport', 'ActualSubmissionDateTime', 'GeoLocation'];

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
      AcademicYearId: this.dailyAttendanceTrackingForm.get('AcademicYearId').value,
      DivisionId: this.dailyAttendanceTrackingForm.get('DivisionId').value,
      DistrictId: this.dailyAttendanceTrackingForm.get('DistrictId').value,
      SectorId: this.dailyAttendanceTrackingForm.get('SectorId').value,
      JobRoleId: this.dailyAttendanceTrackingForm.get('JobRoleId').value,
      VTPId: this.dailyAttendanceTrackingForm.get('VTPId').value,
      ClassId: this.dailyAttendanceTrackingForm.get('ClassId').value,
      SchoolManagementId: this.dailyAttendanceTrackingForm.get('SchoolManagementId').value,
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.dailyAttendanceTrackingForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.dailyAttendanceTrackingForm.get('ToDate').value, this.Constants.ServerDateFormat)
    };

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVCDailyAttendanceTrackingByCriteria(reportParams).subscribe(response => {
      this.exportExcelFromTable(response.Results, "VCDailyAttendanceTracking");
      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}
