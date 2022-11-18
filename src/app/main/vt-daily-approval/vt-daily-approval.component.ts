import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTDailyReportingModel } from '../vt-daily-reportings/vt-daily-reporting.model';
import { VTDailyReportingService } from '../vt-daily-reportings/vt-daily-reporting.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { VTDailyApprovalService } from './vt-daily-approval.service';
import { RouteConstants } from 'app/constants/route.constant';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-daily-approval.component.html',
  styleUrls: ['./vt-daily-approval.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTDailyApprovalComponent extends BaseListComponent<VTDailyReportingModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtDailyReportingService: VTDailyReportingService,
    private vtDailyApprovalService: VTDailyApprovalService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vtDailyReportingService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['SchoolName', 'SectorName', 'ReportingDate', 'ReportType', 'ApprovalStatus', 'IsActive', 'Actions'];

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

  saveOrUpdateVTDailyApprovalDetails(actionType: string, vtDailyReportingId: string) {

    let approvalParams = {
      VTDailyReportingId: vtDailyReportingId,

      ApprovalStatus: actionType
    };

    this.vtDailyApprovalService.approvedVTDailyApproval(approvalParams)
      .subscribe((vtDailyReportingResp: any) => {

        if (vtDailyReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTDailyReporting.Approval]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtDailyReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTDailyReporting deletion errors =>', error);
      });
  }

}
