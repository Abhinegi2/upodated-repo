import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VTMonthlyAttendanceModel } from './vt-monthly-attendance.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";

const moment = _rollupMoment || _moment;
import { MatDatepicker } from '@angular/material/datepicker';

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
  selector: 'vt-monthly-attendance',
  templateUrl: './vt-monthly-attendance.component.html',
  styleUrls: ['./vt-monthly-attendance.component.scss'],
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

export class VTMonthlyAttendanceComponent extends BaseListComponent<VTMonthlyAttendanceModel> implements OnInit {
  monthlyAttendanceForm: FormGroup;
  monthlyAttendanceModel: VTMonthlyAttendanceModel;
  vtList: any;
  filteredVTItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private reportService: ReportService) {
    super(commonService, router, routeParams, snackBar, zone);

    // Set the default school Model
    this.monthlyAttendanceModel = new VTMonthlyAttendanceModel();
  }

  ngOnInit(): void {
    this.reportService.getDropdownforVocationalTrainer(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.vtList = results[0].Results;
        this.filteredVTItems = this.vtList.slice();
      }

      this.monthlyAttendanceForm = this.createVTMonthlyAttendanceForm();
    });

    this.monthlyAttendanceForm = this.createVTMonthlyAttendanceForm();
  }

  //Create VTMonthlyAttendance form and returns {FormGroup}
  createVTMonthlyAttendanceForm(): FormGroup {
    return this.formBuilder.group({
      VTId: new FormControl({ value: (this.UserModel.RoleCode === 'ADM' ? '' : this.UserModel.UserTypeId), disabled: false }, Validators.required),
      ReportDate: new FormControl({ value: moment(), disabled: false }, Validators.required),
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.monthlyAttendanceForm.get('ReportDate').value;
    ctrlValue.year(normalizedYear.year());
    this.monthlyAttendanceForm.get('ReportDate').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.monthlyAttendanceForm.get('ReportDate').value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year())

    this.monthlyAttendanceForm.get('ReportDate').setValue(ctrlValue);
    datepicker.close();
  }

  getVTMonthlyAttendanceReport(): void {
    if (!this.monthlyAttendanceForm.valid) {
      this.validateAllFormFields(this.monthlyAttendanceForm);
      return;
    }

    let vtId = this.monthlyAttendanceForm.get('VTId').value;
    let reportDate = this.DateFormatPipe.transform(this.monthlyAttendanceForm.get('ReportDate').value, this.Constants.ServerDateFormat);
    
    var reportParams = {
      UserId: this.UserModel.LoginId,
      VTId: vtId,
      ReportDate: reportDate
    }

    this.reportService.GetVTMonthlyAttendanceReport(reportParams).subscribe(response => {

      if (response.Result != null && response.Result != '') {
        let pdfReportUrl = this.Constants.Services.BaseUrl + 'Lighthouse/DownloadReportFile?fileId=' + response.Result + '&folderName=VTMonthlyAttendancePDF';
        window.open(pdfReportUrl, '_blank', '');
      }
    });
  }
}
