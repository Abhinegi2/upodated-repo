import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleTransactionModel } from './role-transaction.model';
import { RoleTransactionService } from './role-transaction.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './role-transaction.component.html',
  styleUrls: ['./role-transaction.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class RoleTransactionComponent extends BaseListComponent<RoleTransactionModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private roleTransactionService: RoleTransactionService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.roleTransactionService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['RoleName', 'TransactionName', 'Rights', 'CanAdd', 'CanEdit', 'CanDelete', 'CanView', 'CanExport', 'IsActive', 'Actions'];

      if (this.UserModel.RoleCode == 'SUR') {
        this.tableDataSource.data = response.Results;
      }
      else {
        this.tableDataSource.data = response.Results.filter(r => r.RoleId != this.Constants.SuperUser);
      }

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

  onDeleteRoleTransaction(roleTransactionId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.roleTransactionService.deleteRoleTransactionById(roleTransactionId)
            .subscribe((roleTransactionResp: any) => {

              this.zone.run(() => {
                if (roleTransactionResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('RoleTransaction deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
