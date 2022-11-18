import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { DropdownModel } from 'app/models/dropdown.model';
import { CommonService } from 'app/services/common.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ReportService } from '../report.service';
import { VTPMonthlyModel } from './vtp-monthly-report.model';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'data-list-view',
  templateUrl: './vtp-monthly-report.component.html',
  styleUrls: ['./vtp-monthly-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class VTPMonthlyReportComponent extends BaseListComponent<VTPMonthlyModel> implements OnInit {
  vtpMonthlySearchForm: FormGroup;
  vtpMonthlyFilterForm: FormGroup;
  AcademicYearId: string;
  vtpId: string;
  vcId: string;

  academicYearList: [DropdownModel];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  vcList: DropdownModel[];
  filteredVCItems: any;
  vtList: DropdownModel[];
  filteredVTItems: any;
  divisionList: [DropdownModel];
  districtList: DropdownModel[];
  sectorList: [DropdownModel];

  schoolList: any;
  filteredSchoolItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private reportService: ReportService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 250;
    this.vtpMonthlySearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vtpMonthlyFilterForm = this.createVTPMonthlyFilterForm()
    this.IsShowFilter = true;
  }

  ngOnInit(): void {
    this.reportService.GetDropdownForReports(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.divisionList = results[1].Results;
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      if (results[3].Success) {
        this.vtpList = results[3].Results;
        this.filteredVTPItems = this.vtpList.slice();
      }


      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vtpMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.SearchBy.VTId = this.UserModel.UserTypeId;

        this.commonService.getVTPByVC(this.UserModel).then(resp => {
          this.vtpId = resp[0].Id;
          this.vcId = resp[0].Name;

          this.vtpMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
          this.vtpMonthlyFilterForm.controls['VTPId'].disable();

          this.onChangeVTP(this.vtpId).then(vtpResp => {
            this.vtpMonthlyFilterForm.get('VCId').setValue(this.vcId);
            this.vtpMonthlyFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.vcId).then(vtpResp => {
              this.getVTPMonthlyReports();
            });
          });
        });
      } else if (this.UserModel.RoleCode === 'DivEO') {
        this.vtpMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId);
      }
      else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
        this.vtpMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId).then(response => {
          let districtIds = [];
          response.forEach(districtItem => {
            districtIds.push(districtItem.Id);
          });

          this.vtpMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
        });
      }
      else {
        //Load initial getVTPMonthlyReports
        this.getVTPMonthlyReports();
      }

      this.vtpMonthlySearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.getVTPMonthlyReports();
            return false;
          }

          return res.length > 2
        }),

        // Time in milliseconds between key events
        debounceTime(650),

        // If previous query is diffent from current   
        distinctUntilChanged()

        // subscription for response
      ).subscribe((searchText: string) => {
        this.SearchBy.Name = searchText;
        this.getVTPMonthlyReports();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.getVTPMonthlyReports();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vtpMonthlySearchForm.reset();
    this.vtpMonthlyFilterForm.reset();
    this.vtpMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
    if (this.UserModel.RoleCode == 'VC') {
      this.vtpMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
      this.vtpMonthlyFilterForm.get('VCId').setValue(this.vcId);
      this.vtpMonthlyFilterForm.controls['VTPId'].disable();
      this.vtpMonthlyFilterForm.controls['VCId'].disable();

      this.schoolList = [];
      this.filteredSchoolItems = [];
    }
    else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.vtpMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.vtpMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
      });
    }
    else {
      this.vtpList = [];
      this.filteredVTPItems = [];
      this.vcList = [];
      this.filteredVCItems = [];
      this.vtList = [];
      this.filteredVTItems = [];
    }
    this.getVTPMonthlyReports();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      let vcRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        vcRequest = this.commonService.GetVCByHMId(this.AcademicYearId, this.UserModel.UserTypeId, vtpId);
      }
      else {
        vcRequest = this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false);
      }

      vcRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vcList = response.Results;
          this.filteredVCItems = this.vcList.slice();
        }

        this.IsLoading = false;
        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }


  onChangeVC(vcId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;
      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }).subscribe((response: any) => {
        if (response.Success) {
          this.schoolList = response.Results;
          this.filteredSchoolItems = this.schoolList.slice();

        }

        this.IsLoading = false;
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
          this.vtpMonthlyFilterForm.controls['DistrictId'].setValue(null);
          resolve(response.Results);
        }, err => {

          reject(err);
        });
    });

    return promise;
  }

  onLoadVTPMonthlyByCriteria(): void {
    this.SearchBy.PageIndex = 0;
    this.getVTPMonthlyReports();
  }

  getVTPMonthlyReports(): void {
    this.getVTPMonthlyReportsData().then(response => {
      this.displayedColumns = ['SrNo', 'VTPName', 'UDISE', 'SchoolName', 'DistrictName', 'Block', 'Village', 'SectorName', 'SubjectCode', 'JobRoleStd9thWithQPCode', 'JobRoleStd11thWithQPCode',
        'JobRoleStd12thWithQPCode', 'VCName', 'VCEmailId', 'VTName', 'VTEmailId', 'VTMobile', 'VTGender', 'VTDateOfJoining', 'HMName', 'HMMobile', 'NoOfVisitsByVCInReportingMonth',
        'TotalNoOfVisitsByVCInAY', 'StudentEnrollment9thGirls', 'StudentEnrollment9thBoys', 'StudentEnrollment9thTotal', 'StudentEnrollment10thGirls', 'StudentEnrollment10thBoys',
        'StudentEnrollment10thTotal', 'StudentEnrollment11thGirls', 'StudentEnrollment11thBoys', 'StudentEnrollment11thTotal', 'StudentEnrollment12thGirls', 'StudentEnrollment12thBoys',
        'StudentEnrollment12thTotal', 'StudentsDropped9InReportingMonth', 'StudentsDropped10InReportingMonth', 'StudentsDropped11InReportingMonth', 'StudentsDropped12InReportingMonth',
        'GL9thReportingMonth', 'GL9thTotalInAY', 'GL10thReportingMonth', 'GL10thTotalInAY', 'GL11thReportingMonth', 'GL11thTotalInAY', 'GL12thReportingMonth', 'GL12thTotalInAY',
        'FV9thReportingMonth', 'FV9thTotalInAY', 'FV10thReportingMonth', 'FV10thTotalInAY', 'FV11thReportingMonth', 'FV11thTotalInAY', 'FV12thReportingMonth', 'FV12thTotalInAY',
        'Student9thAttendanceInPerc', 'Student10thAttendanceInPerc', 'Student11thAttendanceInPerc', 'Student12thAttendanceInPerc', 'Remark'];

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

  getVTPMonthlyReportsData(): Promise<any> {
    if (!this.vtpMonthlyFilterForm.valid) {
      this.validateAllFormFields(this.vtpMonthlyFilterForm);
      return;
    }

    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vtpMonthlyFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtpMonthlyFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vtpMonthlyFilterForm.controls['VCId'].value,
      HMId: null,
      VTId: null,
      SchoolId: this.vtpMonthlyFilterForm.controls['SchoolId'].value,
      DivisionId: this.vtpMonthlyFilterForm.controls['DivisionId'].value,
      DistrictId: this.vtpMonthlyFilterForm.controls['DistrictId'].value,
      SectorId: this.vtpMonthlyFilterForm.controls['SectorId'].value,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    let promise = new Promise((resolve, reject) => {
      this.reportService.GetVTPMonthlyTrackingByCriteria(reportParams).subscribe(response => {
        resolve(response);
      }, error => {
        console.log(error);
        resolve(error);
      });
    });

    return promise;
  }

  exportExcel(): void {
    this.getVTPMonthlyReportsData().then(response => {

      response.Results.forEach(
        function (obj) {
          delete obj.VTDailyReportingId;
          delete obj.TotalRows;
          delete obj.SrNo;
        });

      this.exportExcelFromTable(response.Results, "VTPMonthlyReports");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 250;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VtDailyMonthlyFilter form and returns {FormGroup}
  createVTPMonthlyFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      SchoolId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl()
    });
  }

}
