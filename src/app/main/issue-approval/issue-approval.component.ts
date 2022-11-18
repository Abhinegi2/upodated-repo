import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssueApprovalModel } from './issue-approval.model';
import { VCIssueReportingService } from '../vc-issue-reportings/vc-issue-reporting.service';
import { VTIssueReportingService } from '../vt-issue-reportings/vt-issue-reporting.service';
import { HMIssueReportingService } from '../hm-issue-reportings/hm-issue-reporting.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { IssueApprovalService } from './issue-approval.service';
import { RouteConstants } from 'app/constants/route.constant';
// import { UrlService } from 'app/common/shared/url.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'data-list-view',
  templateUrl: './issue-approval.component.html',
  styleUrls: ['./issue-approval.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class IssueApprovalComponent extends BaseListComponent<IssueApprovalModel> implements OnInit {
  issueType: any;
  currentUrl: string = null;
  service: any;
  // previousUrl: Observable<string> = this.urlService.previousUrl$;

  constructor(public commonService: CommonService,
    public router: Router,
    // private urlService: UrlService,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private issueApprovalService: IssueApprovalService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    if (this.currentUrl == '/vt-issue-approval') {
      this.issueType = 'VT';
    }
    else if (this.currentUrl == '/vc-issue-approval') {
      this.issueType = 'VC';
    }
    else if (this.currentUrl == '/hm-issue-approval') {
      this.issueType = 'HM';
    }

    var criteria =
    {
      UserId: this.UserModel.LoginId,
      UserTypeId: this.UserModel.UserTypeId,
      Name: null,
      CharBy: null,
      Filter: {},
      SortOrder: 'asc',
      PageIndex: 1,
      PageSize: 10000,
      ReportedBy: this.issueType,
    };

    this.issueApprovalService.GetAllByCriteria(criteria).subscribe(response => {
      this.displayedColumns = ['IssueReportDate', 'ReportedBy', 'IssueCategory', 'MainIssue', 'SubIssue', 'ApprovalStatus', 'ApprovedDate', 'Actions'];

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
