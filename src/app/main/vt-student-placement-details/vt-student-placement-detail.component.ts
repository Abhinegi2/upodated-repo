import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTStudentPlacementDetailModel } from './vt-student-placement-detail.model';
import { VTStudentPlacementDetailService } from './vt-student-placement-detail.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-student-placement-detail.component.html',
  styleUrls: ['./vt-student-placement-detail.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTStudentPlacementDetailComponent extends BaseListComponent<VTStudentPlacementDetailModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtStudentPlacementDetailService: VTStudentPlacementDetailService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vtStudentPlacementDetailService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['ClassName', 'StudentName', 'PlacementApplyStatus', 'PlacementStatus', 'ApprenticeshipApplyStatus', 'Actions'];

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

  onDeleteVTStudentPlacementDetail(vtStudentPlacementDetailId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtStudentPlacementDetailService.deleteVTStudentPlacementDetailById(vtStudentPlacementDetailId)
            .subscribe((vtStudentPlacementDetailResp: any) => {

              this.zone.run(() => {
                if (vtStudentPlacementDetailResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTStudentPlacementDetail deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
