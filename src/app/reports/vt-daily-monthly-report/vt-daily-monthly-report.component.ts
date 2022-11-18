import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTDailyMonthlyModel } from './vt-daily-monthly-report.model';
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
  templateUrl: './vt-daily-monthly-report.component.html',
  styleUrls: ['./vt-daily-monthly-report.component.scss'],
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

export class VTDailyMonthlyReportComponent extends BaseListComponent<VTDailyMonthlyModel> implements OnInit {
  vtDailyMonthlySearchForm: FormGroup;
  vtDailyMonthlyFilterForm: FormGroup;
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
    this.vtDailyMonthlySearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vtDailyMonthlyFilterForm = this.createVTDailyMonthlyFilterForm()
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


      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vtDailyMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.SearchBy.VTId = this.UserModel.UserTypeId;

        this.commonService.getVTPByVC(this.UserModel).then(resp => {
          this.vtpId = resp[0].Id;
          this.vcId = resp[0].Name;

          this.vtDailyMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
          this.vtDailyMonthlyFilterForm.controls['VTPId'].disable();

          this.onChangeVTP(this.vtpId).then(vtpResp => {
            this.vtDailyMonthlyFilterForm.get('VCId').setValue(this.vcId);
            this.vtDailyMonthlyFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.vcId).then(vtpResp => {
              this.onLoadVTDailyMonthlyByCriteria();
            });
          });
        });
      } else if (this.UserModel.RoleCode === 'DivEO') {
        this.vtDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId);
      }
      else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
        this.vtDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

        this.onChangeDivision(this.UserModel.DivisionId).then(response => {
          let districtIds = [];
          response.forEach(districtItem => {
            districtIds.push(districtItem.Id);
          });

          this.vtDailyMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
        });
      }
      else {
        //Load initial onLoadVTDailyMonthlyByCriteria
        this.onLoadVTDailyMonthlyByCriteria();
      }

      this.vtDailyMonthlySearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVTDailyMonthlyByCriteria();
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
        this.onLoadVTDailyMonthlyByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVTDailyMonthlyByCriteria();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.vtDailyMonthlyFilterForm.get('ReportDate').value;
    ctrlValue.year(normalizedYear.year());
    this.vtDailyMonthlyFilterForm.get('ReportDate').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.vtDailyMonthlyFilterForm.get('ReportDate').value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year())

    this.vtDailyMonthlyFilterForm.get('ReportDate').setValue(ctrlValue);
    datepicker.close();
  }

  onLoadVTClassesByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVTDailyMonthlyByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vtDailyMonthlySearchForm.reset();
    this.vtDailyMonthlyFilterForm.reset();
    this.vtDailyMonthlyFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
    if (this.UserModel.RoleCode == 'VC') {
      this.vtDailyMonthlyFilterForm.get('VTPId').setValue(this.vtpId);
      this.vtDailyMonthlyFilterForm.get('VCId').setValue(this.vcId);
      this.vtDailyMonthlyFilterForm.controls['VTPId'].disable();
      this.vtDailyMonthlyFilterForm.controls['VCId'].disable();

      this.schoolList = [];
      this.filteredSchoolItems = [];
    }
    else if (this.UserModel.RoleCode === 'DisEO' || this.UserModel.RoleCode === 'DisRP' || this.UserModel.RoleCode === 'BEO' || this.UserModel.RoleCode === 'BRP') {
      this.vtDailyMonthlyFilterForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

      this.onChangeDivision(this.UserModel.DivisionId).then(response => {
        let districtIds = [];
        response.forEach(districtItem => {
          districtIds.push(districtItem.Id);
        });

        this.vtDailyMonthlyFilterForm.controls["DistrictId"].setValue(districtIds);
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
    this.onLoadVTDailyMonthlyByCriteria();
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
          this.vtDailyMonthlyFilterForm.controls['DistrictId'].setValue(null);
          resolve(response.Results);
        }, err => {

          reject(err);
        });
    });

    return promise;
  }

  onLoadVTDailyMonthlyByCriteria(): void {
    this.IsLoading = true;

    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vtDailyMonthlyFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtDailyMonthlyFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vtDailyMonthlyFilterForm.controls['VCId'].value,
      HMId: null,
      VTId: null,
      SchoolId: this.vtDailyMonthlyFilterForm.controls['SchoolId'].value,
      DivisionId: this.vtDailyMonthlyFilterForm.controls['DivisionId'].value,
      DistrictId: this.vtDailyMonthlyFilterForm.controls['DistrictId'].value,
      SectorId: this.vtDailyMonthlyFilterForm.controls['SectorId'].value,
      ReportDate: this.DateFormatPipe.transform(this.vtDailyMonthlyFilterForm.get('ReportDate').value, this.Constants.ServerDateFormat)
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    reportParams.DistrictId = (reportParams.DistrictId != null && reportParams.DistrictId.length > 0) ? reportParams.DistrictId.toString() : null;

    this.reportService.GetVTDailyMonthlyTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['SrNo', 'VTName', 'VTEmailId', 'VTMobile', 'VTDateOfResignation', 'VTStatus', 'VCName', 'VCEmailId', 'VCMobile', 'VTPName', 'SectorName', 'JobRoleName', 'ReportMonth', 'SchoolName', 'UDISE', 'DivisionName', 'DistrictName', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7', 'Day8', 'Day9', 'Day10', 'Day11', 'Day12', 'Day13', 'Day14', 'Day15', 'Day16', 'Day17', 'Day18', 'Day19', 'Day20', 'Day21', 'Day22', 'Day23', 'Day24', 'Day25', 'Day26', 'Day27', 'Day28', 'Day29', 'Day30', 'Day31', 'WorkingDays', 'Sundays', 'Holidays', 'Leaves', 'DaysInMonth'];

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

  exportExcel(): void {
    this.IsLoading = true;
    var reportParams: any = {
      UserId: this.UserModel.LoginId,
      AcademicYearId: this.vtDailyMonthlyFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtDailyMonthlyFilterForm.controls["VTPId"].value,
      VCId: this.vtDailyMonthlyFilterForm.controls['VCId'].value,
      HMId: null,
      VTId: this.vtDailyMonthlyFilterForm.controls['VTId'].value,
      SchoolId: this.vtDailyMonthlyFilterForm.controls['SchoolId'].value,
      DivisionId: this.vtDailyMonthlyFilterForm.controls['DivisionId'].value,
      DistrictId: this.vtDailyMonthlyFilterForm.controls['DistrictId'].value,
      SectorId: this.vtDailyMonthlyFilterForm.controls['SectorId'].value,
      ReportDate: this.DateFormatPipe.transform(this.vtDailyMonthlyFilterForm.get('ReportDate').value, this.Constants.ServerDateFormat)
    };

    if (this.UserModel.RoleCode == 'HM') {
      reportParams.HMId = this.UserModel.UserTypeId;
    }

    this.reportService.GetVTDailyMonthlyTrackingByCriteria(this.SearchBy).subscribe(response => {
      this.exportExcelFromTable(response.Results, "VTDailyMonthlyReport");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VtDailyMonthlyFilter form and returns {FormGroup}
  createVTDailyMonthlyFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      SchoolId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl(),
      ReportDate: new FormControl({ value: moment(), disabled: false })
    });
  }
}

