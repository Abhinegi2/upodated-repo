import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { SchoolInfoReportModel } from './school-info-report.model';
import { ReportService } from 'app/reports/report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'data-list-view',
  templateUrl: './school-info-report.component.html',
  styleUrls: ['./school-info-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class SchoolInfoReportComponent extends BaseListComponent<SchoolInfoReportModel> implements OnInit {
  schoolInfoReportForm: FormGroup;

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
        this.schoolInfoReportForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.schoolInfoReportForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getSchoolInfoReportReports();
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.schoolInfoReportForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.schoolInfoReportForm.controls["DistrictId"].setValue(districtIds);

            this.getSchoolInfoReportReports();
          });
        }
        else {
          this.getSchoolInfoReportReports();
        }
      }
    });

    this.schoolInfoReportForm = this.createSchoolInfoReportForm();
  }

  resetReportFilters(): void {
    this.schoolInfoReportForm.reset();
    this.schoolInfoReportForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.schoolInfoReportForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.schoolInfoReportForm.controls["DistrictId"].setValue(districtIds);

        this.getSchoolInfoReportReports();
      });
    }
    else {
      this.getSchoolInfoReportReports();
    }
  }

  onChangeAY(AYId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let vtpRequest = this.commonService.GetVTPByAYId(this.UserModel.RoleCode, this.UserModel.UserTypeId, AYId)

      vtpRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vtpList = response.Results;
        }

        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.schoolInfoReportForm.controls['DistrictId'].setValue(null);
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

  //Create SchoolInfoReport form and returns {FormGroup}
  createSchoolInfoReportForm(): FormGroup {
    return this.formBuilder.group({
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

  getSchoolInfoReportReports(): void {
    if (!this.schoolInfoReportForm.valid) {
      return;
    }
    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.schoolInfoReportForm.get('AcademicYearId').value,
      DivisionId: this.schoolInfoReportForm.get('DivisionId').value,
      DistrictId: this.schoolInfoReportForm.get('DistrictId').value,
      SectorId: this.schoolInfoReportForm.get('SectorId').value,
      JobRoleId: this.schoolInfoReportForm.get('JobRoleId').value,
      VTPId: this.schoolInfoReportForm.get('VTPId').value,
      ClassId: this.schoolInfoReportForm.get('ClassId').value,
      MonthId: this.schoolInfoReportForm.get('MonthId').value,
      SchoolManagementId: this.schoolInfoReportForm.get('SchoolManagementId').value
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetSchoolInfoReportsByCriteria(reportParams).subscribe(response => {

      this.displayedColumns = ['SrNo', 'AcademicYear', 'SchoolAllottedYear', 'PhaseName', 'VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'VTDateOfJoining', 'HMName', 'HMMobile', 'HMEmail', 'SchoolManagement', 'DivisionName', 'DistrictName', 'BlockName', 'UDISE', 'SchoolName', 'SchoolType', 'SectorName', 'JobRoleName', 'ClassName'];

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
      AcademicYearId: this.schoolInfoReportForm.get('AcademicYearId').value,
      DivisionId: this.schoolInfoReportForm.get('DivisionId').value,
      DistrictId: this.schoolInfoReportForm.get('DistrictId').value,
      SectorId: this.schoolInfoReportForm.get('SectorId').value,
      JobRoleId: this.schoolInfoReportForm.get('JobRoleId').value,
      VTPId: this.schoolInfoReportForm.get('VTPId').value,
      ClassId: this.schoolInfoReportForm.get('ClassId').value,
      MonthId: this.schoolInfoReportForm.get('MonthId').value,
      SchoolManagementId: this.schoolInfoReportForm.get('SchoolManagementId').value
    };
    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }
    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;
    this.reportService.GetSchoolInfoReportsByCriteria(reportParams).subscribe(response => {
      this.exportExcelFromTable(response.Results, "SchoolInformation");
      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}
