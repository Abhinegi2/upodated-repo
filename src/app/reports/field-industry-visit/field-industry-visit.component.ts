import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { FieldIndustryVisitModel } from './field-industry-visit.model';
import { ReportService } from 'app/reports/report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReportFilterModel } from 'app/models/report.filter.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'data-list-view',
  templateUrl: './field-industry-visit.component.html',
  styleUrls: ['./field-industry-visit.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class FieldIndustryVisitComponent extends BaseListComponent<FieldIndustryVisitModel> implements OnInit {
  fieldIndustryVisitForm: FormGroup;

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
        this.fieldIndustryVisitForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.fieldIndustryVisitForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getFieldIndustryVisitConductedReports();
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.fieldIndustryVisitForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.fieldIndustryVisitForm.controls["DistrictId"].setValue(districtIds);

            this.getFieldIndustryVisitConductedReports();
          });
        }
        else {
          this.getFieldIndustryVisitConductedReports();
        }
      }
    });

    this.fieldIndustryVisitForm = this.createFieldIndustryVisitForm();
  }

  resetReportFilters(): void {
    this.fieldIndustryVisitForm.reset();
    this.fieldIndustryVisitForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.fieldIndustryVisitForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.fieldIndustryVisitForm.controls["DistrictId"].setValue(districtIds);


        this.getFieldIndustryVisitConductedReports();
      });
    }
    else {
      this.getFieldIndustryVisitConductedReports();
    }
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.fieldIndustryVisitForm.controls['DistrictId'].setValue(null);
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

  //Create FieldIndustryVisit form and returns {FormGroup}
  createFieldIndustryVisitForm(): FormGroup {
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

  getFieldIndustryVisitConductedReports(): void {
    if (!this.fieldIndustryVisitForm.valid) {
      return;
    }
    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.fieldIndustryVisitForm.get('AcademicYearId').value,
      DivisionId: this.fieldIndustryVisitForm.get('DivisionId').value,
      DistrictId: this.fieldIndustryVisitForm.get('DistrictId').value,
      SectorId: this.fieldIndustryVisitForm.get('SectorId').value,
      JobRoleId: this.fieldIndustryVisitForm.get('JobRoleId').value,
      VTPId: this.fieldIndustryVisitForm.get('VTPId').value,
      ClassId: this.fieldIndustryVisitForm.get('ClassId').value,
      MonthId: this.fieldIndustryVisitForm.get('MonthId').value,
      SchoolManagementId: this.fieldIndustryVisitForm.get('SchoolManagementId').value
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetFieldIndustryVisitConductedReportsByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['SrNo', 'AcademicYear', 'SchoolAllottedYear', 'ClassName', 'SchoolName', 'UDISE', 'BlockName', 'DivisionName', 'DistrictName', 'SectorName', 'JobRoleName', 'PhaseName', 'VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'HMName', 'HMMobile', 'HMEmail', 'FieldVisitDate', 'TotalStudentsPresent', 'FieldVisitTopic', 'FieldVisitModule', 'OrganisationName', 'OrganisationAddress', 'ContactPersonName', 'ContactPersonMobile', 'ContactPersonEmail', 'ContactPersonDesignation'];

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
      AcademicYearId: this.fieldIndustryVisitForm.get('AcademicYearId').value,
      DivisionId: this.fieldIndustryVisitForm.get('DivisionId').value,
      DistrictId: this.fieldIndustryVisitForm.get('DistrictId').value,
      SectorId: this.fieldIndustryVisitForm.get('SectorId').value,
      JobRoleId: this.fieldIndustryVisitForm.get('JobRoleId').value,
      VTPId: this.fieldIndustryVisitForm.get('VTPId').value,
      ClassId: this.fieldIndustryVisitForm.get('ClassId').value,
      MonthId: this.fieldIndustryVisitForm.get('MonthId').value,
      SchoolManagementId: this.fieldIndustryVisitForm.get('SchoolManagementId').value
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetFieldIndustryVisitConductedReportsByCriteria(reportParams).subscribe(response => {
      this.exportExcelFromTable(response.Results, "FieldIndustryVisits");
      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}