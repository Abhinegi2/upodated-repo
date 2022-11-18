import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VCDailyMonthlyModel } from './vc-daily-monthly-report.model';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from '../report.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownModel } from 'app/models/dropdown.model';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";

const moment = _rollupMoment || _moment;

declare var require: any
const fileSaver = require('file-saver');

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'data-list-view',
  templateUrl: './vc-daily-monthly-report.component.html',
  styleUrls: ['./vc-daily-monthly-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class VCDailyMonthlyReportComponent extends BaseListComponent<VCDailyMonthlyModel> implements OnInit {
  vcDailyMonthlySearchForm: FormGroup;
  vcDailyMonthlyFilterForm: FormGroup;
  AcademicYearId: string;
  vtpId: string;
  vcId: string;

  academicYearList: [DropdownModel];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  vcList: DropdownModel[];
  filteredVCItems: any;
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
    this.vcDailyMonthlySearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vcDailyMonthlyFilterForm = this.createVCDailyMonthlyFilterForm();
    this.IsShowFilter = true;
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 100; // delete after script changed

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

      if (results[7].Success) {
        this.schoolList = results[7].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vcDailyMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }
      if (this.UserModel.RoleCode == 'VC') {
        this.SearchBy.VTId = this.UserModel.UserTypeId;

        this.commonService.getVTPByVC(this.UserModel).then(resp => {
          this.vtpId = resp[0].Id;
          this.vcId = resp[0].Name;

          this.vcDailyMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
          this.vcDailyMonthlyFilterForm.controls['VTPId'].disable();

          this.onChangeVTP(this.vtpId).then(vtpResp => {
            this.onLoadVCDailyMonthlyByCriteria();
          });
        });
      }
      if (this.UserModel.RoleCode === 'DivEO') {
        this.vcDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId);
      }
      else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
        this.vcDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId).then(response => {
          let districtIds = [];
          response.forEach(districtItem => {
            districtIds.push(districtItem.Id);
          });

          this.vcDailyMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
        });
      }
      else {
        //Load initial onLoadVTDailyMonthlyByCriteria
        this.onLoadVCDailyMonthlyByCriteria();
      }

      this.vcDailyMonthlySearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVCDailyMonthlyByCriteria();
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
        this.onLoadVCDailyMonthlyByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVCDailyMonthlyByCriteria();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.vcDailyMonthlyFilterForm.get('ReportDate').value;
    ctrlValue.year(normalizedYear.year());
    this.vcDailyMonthlyFilterForm.get('ReportDate').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.vcDailyMonthlyFilterForm.get('ReportDate').value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year())

    this.vcDailyMonthlyFilterForm.get('ReportDate').setValue(ctrlValue);
    datepicker.close();
  }

  onLoadVCDailyMonthlyByCriteria(): void {
    this.IsLoading = true;

    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vcDailyMonthlyFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcDailyMonthlyFilterForm.controls["VTPId"].value,
      VCId: this.vcDailyMonthlyFilterForm.controls['VCId'].value,
      HMId: null,
      SchoolId: this.vcDailyMonthlyFilterForm.controls['SchoolId'].value,
      DivisionId: this.vcDailyMonthlyFilterForm.controls['DivisionId'].value,
      DistrictId: this.vcDailyMonthlyFilterForm.controls['DistrictId'].value,
      SectorId: this.vcDailyMonthlyFilterForm.controls['SectorId'].value,
      ReportDate: this.DateFormatPipe.transform(this.vcDailyMonthlyFilterForm.get('ReportDate').value, this.Constants.ServerDateFormat)
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVCDailyMonthlyTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['VocationalCoordinator', 'VCEmailId', 'VCMobile', 'VCDateOfResignation', 'VCStatus', 'VTPName', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', 'WorkingDays', 'Sundays', 'Holidays', 'Leaves', 'DaysInMonth'];

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
    });
  }

  onLoadVTClassesByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVCDailyMonthlyByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vcDailyMonthlySearchForm.reset();
    this.vcDailyMonthlyFilterForm.reset();
    this.vcDailyMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
    if (this.UserModel.RoleCode == 'VC') {
      this.vcDailyMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
      this.vcDailyMonthlyFilterForm.get('VCId').setValue(this.vcId);
      this.vcDailyMonthlyFilterForm.controls['VTPId'].disable();
      this.vcDailyMonthlyFilterForm.controls['VCId'].disable();

      this.schoolList = [];
      this.filteredSchoolItems = [];
    }
    else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.vcDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.vcDailyMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
      });
    }
    else {
      this.vtpList = [];
      this.filteredVTPItems = [];
      this.vcList = [];
      this.filteredVCItems = [];
    }
    this.onLoadVCDailyMonthlyByCriteria();
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

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {

          this.districtList = response.Results;
          this.vcDailyMonthlyFilterForm.controls['DistrictId'].setValue(null);
          resolve(response.Results);
        }, err => {

          reject(err);
        });
    });

    return promise;
  }


  exportExcel(): void {
    this.IsLoading = true;

    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vcDailyMonthlyFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcDailyMonthlyFilterForm.controls["VTPId"].value,
      VCId: this.vcDailyMonthlyFilterForm.controls['VCId'].value,
      HMId: null,
      SchoolId: this.vcDailyMonthlyFilterForm.controls['SchoolId'].value,
      DivisionId: this.vcDailyMonthlyFilterForm.controls['DivisionId'].value,
      DistrictId: this.vcDailyMonthlyFilterForm.controls['DistrictId'].value,
      SectorId: this.vcDailyMonthlyFilterForm.controls['SectorId'].value,
      ReportDate: this.DateFormatPipe.transform(this.vcDailyMonthlyFilterForm.get('ReportDate').value, this.Constants.ServerDateFormat)
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    this.reportService.GetVCDailyMonthlyTrackingByCriteria(reportParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.IsAYRollover;
          delete obj.VTClassId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VCDailyMonthlyReport");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VtDailyMonthlyFilter form and returns {FormGroup}
  createVCDailyMonthlyFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      SchoolId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl(),
      ReportDate: new FormControl({ value: moment(), disabled: false })
    });
  }
}

