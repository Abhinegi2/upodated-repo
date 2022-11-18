import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordHistoryModel } from './forgot-password-history.model';
import { ForgotPasswordHistoryService } from './forgot-password-history.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './forgot-password-history.component.html',
  styleUrls: ['./forgot-password-history.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class ForgotPasswordHistoryComponent extends BaseListComponent<ForgotPasswordHistoryModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private forgotPasswordHistoryService: ForgotPasswordHistoryService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.forgotPasswordHistoryService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['EmailId', 'PasswordResetUrl', 'UserIPAddress', 'RequestDate', 'ResetPasswordDate', 'Actions'];

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

  onDeleteForgotPasswordHistory(forgotPasswordId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.forgotPasswordHistoryService.deleteForgotPasswordHistoryById(forgotPasswordId)
            .subscribe((forgotPasswordHistoryResp: any) => {

              this.zone.run(() => {
                if (forgotPasswordHistoryResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('ForgotPasswordHistory deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
