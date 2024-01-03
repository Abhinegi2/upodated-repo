import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { GuestLectureConductedModel } from './guest-lecture-conducted.model';
import { ReportService } from 'app/reports/report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'data-list-view',
  templateUrl: './guest-lecture-conducted.component.html',
  styleUrls: ['./guest-lecture-conducted.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class GuestLectureConductedComponent extends BaseListComponent<GuestLectureConductedModel> implements OnInit {
  guestLectureConductedForm: FormGroup;

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
        this.guestLectureConductedForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.guestLectureConductedForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getGuestLectureConductedReports();
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.guestLectureConductedForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.guestLectureConductedForm.controls["DistrictId"].setValue(districtIds);

            this.getGuestLectureConductedReports();
          });
        }
        else {
          this.getGuestLectureConductedReports();
        }

      }
    });

    this.guestLectureConductedForm = this.createGuestLectureConductedForm();
  }

  resetReportFilters(): void {
    this.guestLectureConductedForm.reset();
    this.guestLectureConductedForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.guestLectureConductedForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.guestLectureConductedForm.controls["DistrictId"].setValue(districtIds);


        this.getGuestLectureConductedReports();
      });
    }
    else {
      this.getGuestLectureConductedReports();
    }
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.guestLectureConductedForm.controls['DistrictId'].setValue(null);
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

  //Create GuestLectureConducted form and returns {FormGroup}
  createGuestLectureConductedForm(): FormGroup {
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

  getGuestLectureConductedReports(): void {
    if (!this.guestLectureConductedForm.valid) {
      return;
    }
    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.guestLectureConductedForm.get('AcademicYearId').value,
      DivisionId: this.guestLectureConductedForm.get('DivisionId').value,
      DistrictId: this.guestLectureConductedForm.get('DistrictId').value,
      SectorId: this.guestLectureConductedForm.get('SectorId').value,
      JobRoleId: this.guestLectureConductedForm.get('JobRoleId').value,
      VTPId: this.guestLectureConductedForm.get('VTPId').value,
      ClassId: this.guestLectureConductedForm.get('ClassId').value,
      MonthId: this.guestLectureConductedForm.get('MonthId').value,
      SchoolManagementId: this.guestLectureConductedForm.get('SchoolManagementId').value
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetGuestLectureConductedReportsByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['SrNo', 'AcademicYear', 'SchoolAllottedYear', 'ClassName', 'SchoolName', 'UDISE', 'BlockName', 'DivisionName', 'DistrictName', 'SectorName', 'JobRoleName', 'PhaseName', 'VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'HMName', 'HMMobile', 'HMEmail', 'GuestLectureDate', 'TotalStudentsPresent', 'GuestLectureTopic', 'GuestLectureMethodology', 'GuestLectureModule', 'GuestLecturerName', 'GuestLecturerMobile', 'GuestLecturerEmail', 'GuestLecturerQualification', 'GuestLecturerAddress', 'GuestLecturerOrganisation', 'GuestLecturerDesignation'];

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
      AcademicYearId: this.guestLectureConductedForm.get('AcademicYearId').value,
      DivisionId: this.guestLectureConductedForm.get('DivisionId').value,
      DistrictId: this.guestLectureConductedForm.get('DistrictId').value,
      SectorId: this.guestLectureConductedForm.get('SectorId').value,
      JobRoleId: this.guestLectureConductedForm.get('JobRoleId').value,
      VTPId: this.guestLectureConductedForm.get('VTPId').value,
      ClassId: this.guestLectureConductedForm.get('ClassId').value,
      MonthId: this.guestLectureConductedForm.get('MonthId').value,
      SchoolManagementId: this.guestLectureConductedForm.get('SchoolManagementId').value
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetGuestLectureConductedReportsByCriteria(reportParams).subscribe(response => {
      this.exportExcelFromTable(response.Results, "GuestLectureConducted");
      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}
