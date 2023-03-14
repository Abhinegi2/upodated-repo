import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VocationaltrainerdetailModel } from './vocationaltrainerdetail.model';
import { VocationaltrainerdetailService } from './vocationaltrainerdetail.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vocationaltrainerdetail.component.html',
  styleUrls: ['./vocationaltrainerdetail.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VocationaltrainerdetailComponent extends BaseListComponent<VocationaltrainerdetailModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vocationaltrainerdetailService: VocationaltrainerdetailService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vocationaltrainerdetailService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['Email','Gender','SocialCategory', 'IsActive', 'Actions'];
      console.log(response);

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

  onDeleteVocationaltrainerdetail(vocationaltrainerdetailId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vocationaltrainerdetailService.deleteVocationaltrainerdetailById(vocationaltrainerdetailId)
            .subscribe((vocationaltrainerdetailResp: any) => {

              this.zone.run(() => {
                if (vocationaltrainerdetailResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('Vocationaltrainerdetail deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
