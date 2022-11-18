import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VTReportNotSubmittedReportModel } from './vt-report-not-submitted-report.model';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-report-not-submitted-report.component.html',
  styleUrls: ['./vt-report-not-submitted-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTReportNotSubmittedReportComponent extends BaseListComponent<VTReportNotSubmittedReportModel> implements OnInit {
  vtReportNotSubmittedForm: FormGroup;
  isShowFilterContainer = false;

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

    this.vtReportNotSubmittedForm = this.createVTStudentTrackingForm();
  }

  //Create VTDailyAttendanceTracking form and returns {FormGroup}
  createVTStudentTrackingForm(): FormGroup {
    return this.formBuilder.group({
      FromDate: new FormControl('', Validators.required),
      ToDate: new FormControl('', Validators.required)
    });
  }

  getVTReportNotSubmittedReports(): void {
    if (!this.vtReportNotSubmittedForm.valid) {
      this.validateAllFormFields(this.vtReportNotSubmittedForm);  
      return;
    }

    var reportParams = {
      UserId: this.UserModel.LoginId,
      FromDate: this.DateFormatPipe.transform(this.vtReportNotSubmittedForm.get('FromDate').value, this.Constants.ServerDateFormat),
      ToDate: this.DateFormatPipe.transform(this.vtReportNotSubmittedForm.get('ToDate').value, this.Constants.ServerDateFormat)
    };

    this.reportService.GetVTDailyReportNotSubmittedTrackingByCriteria(reportParams).subscribe(response => {
      this.displayedColumns = ['VTPName', 'VCName', 'VCMobile', 'VCEmail', 'VTName', 'VTMobile', 'VTEmail', 'VTDateOfJoining', 'DivisionName', 'DistrictName', 'BlockName',  'UDISE', 'SchoolName', 'SectorName', 'ReportingDate', 'ReportingStatus'];

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
