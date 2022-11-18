import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VCSchoolVisitReportModel } from './vc-school-visit-report.model';
import { VCSchoolVisitReportService } from './vc-school-visit-report.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vc-school-visit-report.component.html',
  styleUrls: ['./vc-school-visit-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VCSchoolVisitReportComponent extends BaseListComponent<VCSchoolVisitReportModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vcSchoolVisitService: VCSchoolVisitReportService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vcSchoolVisitService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['VCName','VTName','SchoolName', 'DistrictName', 'VisitDate', 'TotalBoys', 'TotalGirls', 'Actions'];

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

  onDeleteVCSchoolVisitReport(VCSchoolVisitReportingId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vcSchoolVisitService.deleteVCSchoolVisitReportById(VCSchoolVisitReportingId)
            .subscribe((vcSchoolVisitResp: any) => {

              this.zone.run(() => {
                if (vcSchoolVisitResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VCSchoolVisit deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
