import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HMIssueApprovalService } from './hm-issue-approval.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { HMIssueReportingModel } from '../hm-issue-reportings/hm-issue-reporting.model';
import { HMIssueReportingService } from '../hm-issue-reportings/hm-issue-reporting.service';
import { RouteConstants } from 'app/constants/route.constant';

@Component({
  selector: 'data-list-view',
  templateUrl: './hm-issue-approval.component.html',
  styleUrls: ['./hm-issue-approval.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class HMIssueApprovalComponent extends BaseListComponent<HMIssueReportingModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private hmIssueReportingService: HMIssueReportingService,
    private hmIssueApprovalService: HMIssueApprovalService) {
    super(commonService, router, route, snackBar, zone);
  }

  ngOnInit(): void {
    this.hmIssueReportingService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['HeadMasterName', 'DateOfAllocation', 'IssueReportDate', 'MainIssue', 'SubIssue', 'StudentClass', 'Month', 'StudentType', 'NoOfStudents', 'ApprovalStatus', 'ApprovedDate', 'IsActive', 'Actions'];

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

  saveOrUpdateHMIssueApprovalDetails(actionType: string, hmIssueReportingId: string) {
    let approvalParams = {
      HMIssueReportingId: hmIssueReportingId,
      ApprovalStatus: actionType
    };
      
    this.hmIssueApprovalService.approvedHMIssueReporting(approvalParams)
      .subscribe((hmIssueReportingResp: any) => {

        if (hmIssueReportingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.HMIssueReporting.Approval]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(hmIssueReportingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('HMIssueReporting deletion errors =>', error);
      });
  }

}
