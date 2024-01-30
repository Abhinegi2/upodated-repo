import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountModel } from './account.model';
import { AccountService } from './account.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownModel } from 'app/models/dropdown.model';


@Component({
  selector: 'data-list-view',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class AccountComponent extends BaseListComponent<AccountModel> implements OnInit {
  userFilterForm: FormGroup;
  roleList: [DropdownModel];
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    public formBuilder: FormBuilder,

    private dialogService: DialogService,
    private accountService: AccountService) {
    super(commonService, router, routeParams, snackBar, zone);
    this.userFilterForm = this.createUserFilterForm();
  }

  ngOnInit(): void {
    this.accountService.getUserDropdowns(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
          this.roleList = results[0].Results;
      }
      this.onLoadHeadMastersByCriteria();
    });
  }


  onLoadHeadMastersByCriteria(): void {
    this.IsLoading = true;
    let genericvtParams: any = {
      UserTypeId: this.UserModel.UserTypeId,
      UserRole :this.userFilterForm.controls["UserRole"].value,
      Status: this.userFilterForm.controls["Status"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.accountService.GetAllByCriteria(genericvtParams).subscribe(response => {
      this.displayedColumns = [
        'LoginId', 'UserName', 'EmailId', 'Mobile', 'AccountType', 'CreatedBy', 'UpdatedBy', 'IsActive', 'Actions'
      ];
      this.tableDataSource.data = response.Results.$values;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.SearchBy.TotalResults = response.TotalResults;

      setTimeout(() => {
        this.ListPaginator.pageIndex = this.SearchBy.PageIndex;
        this.ListPaginator.length = this.SearchBy.TotalResults;
      });

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

  resetFilters(): void {
    this.userFilterForm.reset();
    this.onLoadHeadMastersByCriteria();
  }

  onLoadHeadMastersByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadHeadMastersByCriteria();
  }

  onDeleteAccount(accountId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.accountService.deleteAccountById(accountId)
            .subscribe((accountResp: any) => {

              this.zone.run(() => {
                if (accountResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('Account deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  isUserEditable(roleCode){
    return 'Roles : VC, VT, HM'.indexOf(roleCode) == -1;
  }

  createUserFilterForm(): FormGroup {
    return this.formBuilder.group({
      Status: new FormControl(),
      UserRole: new FormControl()
    });
  }
}
