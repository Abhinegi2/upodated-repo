import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { VCSchoolVisitSummaryModel } from './vc-school-visit-summary.model';
import { ReportService } from 'app/reports/report.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'data-list-view',
  templateUrl: './vc-school-visit-summary.component.html',
  styleUrls: ['./vc-school-visit-summary.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VCSchoolVisitSummaryComponent extends BaseListComponent<VCSchoolVisitSummaryModel> implements OnInit {
  vcSchoolVisitSummaryForm: FormGroup;

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
        this.vcSchoolVisitSummaryForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

        if (this.UserModel.RoleCode === 'DivEO') {
          this.vcSchoolVisitSummaryForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getVCSchoolVisitSummaryReports();
          });
        }
        else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
          this.vcSchoolVisitSummaryForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.vcSchoolVisitSummaryForm.controls["DistrictId"].setValue(districtIds);

            this.getVCSchoolVisitSummaryReports();
          });
        }
        else {
          this.getVCSchoolVisitSummaryReports();
        }
      }
    });

    this.vcSchoolVisitSummaryForm = this.createVCSchoolVisitSummaryForm();
  }

  resetReportFilters(): void {
    this.vcSchoolVisitSummaryForm.reset();
    this.vcSchoolVisitSummaryForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.districtList = <DropdownModel[]>[];
    this.jobRoleList = <DropdownModel[]>[];

    if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.vcSchoolVisitSummaryForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);


      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.vcSchoolVisitSummaryForm.controls["DistrictId"].setValue(districtIds);


        this.getVCSchoolVisitSummaryReports();
      });
    }
    else {
      this.getVCSchoolVisitSummaryReports();
    }
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.vcSchoolVisitSummaryForm.controls['DistrictId'].setValue(null);
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

  //Create VCSchoolVisitSummary form and returns {FormGroup}
  createVCSchoolVisitSummaryForm(): FormGroup {
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

  getVCSchoolVisitSummaryReports(): void {
    if (!this.vcSchoolVisitSummaryForm.valid) {
      return;
    }
    var reportParams = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vcSchoolVisitSummaryForm.get('AcademicYearId').value,
      DivisionId: this.vcSchoolVisitSummaryForm.get('DivisionId').value,
      DistrictId: this.vcSchoolVisitSummaryForm.get('DistrictId').value,
      SectorId: this.vcSchoolVisitSummaryForm.get('SectorId').value,
      JobRoleId: this.vcSchoolVisitSummaryForm.get('JobRoleId').value,
      VTPId: this.vcSchoolVisitSummaryForm.get('VTPId').value,
      ClassId: this.vcSchoolVisitSummaryForm.get('ClassId').value,
      MonthId: this.vcSchoolVisitSummaryForm.get('MonthId').value,
      SchoolManagementId: this.vcSchoolVisitSummaryForm.get('SchoolManagementId').value
    };

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVCSchoolVisitSummaryReportsByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['SrNo', 'AcademicYear', 'SchoolAllottedYear', 'PhaseName', 'VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'VTDateOfJoining', 'HMName', 'HMMobile', 'HMEmail', 'SchoolManagement', 'DivisionName', 'DistrictName', 'BlockName', 'UDISE', 'SchoolName', 'SectorName', 'JobRoleName', 'ClassName', 'MonthYear',
        'DateOfSchoolVisit', 'VTPresentStatus', 'VTAttendanceRegisterMaintained', 'MovementRegisterMaintained', 'VisitorRegisterMaintained', 'ToolsDisplayStatus', 'RawMaterialAvailabilityStatus', 'ToolInventoryReportMaintained', 'ClassObserved', 'ClassActivityObserved', 'ClassStudentsTakingNotes', 'ClassSafetyObservedDetails', 'GLPlanMaintained', 'GLReportMaintained', 'FVPlanMaintained', 'FVReportMaintained', 'AttendanceRegisterMaintained', 'LessonPlanMaintained', 'SyllabusCoverageReportMaintained', 'StudentBookAvailable'];

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
