import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTMonthlyTeachingPlanModel } from './vt-monthly-teaching-plan.model';
import { VTMonthlyTeachingPlanService } from './vt-monthly-teaching-plan.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-monthly-teaching-plan.component.html',
  styleUrls: ['./vt-monthly-teaching-plan.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTMonthlyTeachingPlanComponent extends BaseListComponent<VTMonthlyTeachingPlanModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtMonthlyTeachingPlanService: VTMonthlyTeachingPlanService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vtMonthlyTeachingPlanService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['ClassName', 'WeekStartDate', 'WeekendDate', 'ModulesPlanned', 'IVPlannedDate', 'IVVCAttend', 'Actions'];

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

  onDeleteVTMonthlyTeachingPlan(vtMonthlyTeachingPlanId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtMonthlyTeachingPlanService.deleteVTMonthlyTeachingPlanById(vtMonthlyTeachingPlanId)
            .subscribe((vtMonthlyTeachingPlanResp: any) => {

              this.zone.run(() => {
                if (vtMonthlyTeachingPlanResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTMonthlyTeachingPlan deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
