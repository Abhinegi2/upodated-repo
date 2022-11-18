import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { AccountTransactionService } from '../account-transaction.service';
import { AccountTransactionModel } from '../account-transaction.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'account-transaction',
  templateUrl: './create-account-transaction.component.html',
  styleUrls: ['./create-account-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateAccountTransactionComponent extends BaseComponent<AccountTransactionModel> implements OnInit {
  accountTransactionForm: FormGroup;
  accountTransactionModel: AccountTransactionModel;
  roleList: [DropdownModel];
  accountList: [DropdownModel];
  transactionList: [DropdownModel];
  filteredRoleItems: any;
  filteredAccountItems: any;
  filteredTransactionItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default accountTransaction Model
    this.accountTransactionModel = new AccountTransactionModel();
  }

  ngOnInit(): void {

    this.accountTransactionService.getAllRoles().subscribe((result) => {
      if (result.Success) {

        if (this.UserModel.RoleCode == 'SUR') {
          this.roleList = result.Results;
        }
        else {
          this.roleList = result.Results.filter(r => r.Id != this.Constants.SuperUser);
        }
        this.filteredRoleItems = this.roleList.slice();

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.accountTransactionModel = new AccountTransactionModel();

            } else {
              var accountTransactionId: string = params.get('accountTransactionId')

              this.accountTransactionService.getAccountTransactionById(accountTransactionId)
                .subscribe((response: any) => {
                  this.accountTransactionModel = response.Result;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.accountTransactionModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.accountTransactionModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }

                  this.onChangeRole(this.accountTransactionModel.RoleId);
                  this.onChangeAccount(this.accountTransactionModel.AccountId);
                  this.accountTransactionForm = this.createAccountTransactionForm();
                });
            }
          }
        });
      }
    });

    this.accountTransactionForm = this.createAccountTransactionForm();
  }

  onChangeRole(roleId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'AccountsByRole', UserId: this.UserModel.DefaultStateId, ParentId: roleId, SelectTitle: 'Account' }, false).subscribe((response: any) => {
      this.accountList = response.Results;
      this.filteredAccountItems = this.accountList.slice();
    });
  }

  onChangeAccount(accountId: any) {
    let roleId = (this.PageRights.ActionType == this.Constants.Actions.New) ? this.accountTransactionForm.get('RoleId').value : this.accountTransactionModel.RoleId;

    this.commonService.GetMasterDataByType({ DataType: 'RoleTransactions', UserId: roleId, ParentId: accountId, SelectTitle: 'Transaction' }, false).subscribe((response: any) => {
      this.transactionList = response.Results;
      this.filteredTransactionItems = this.transactionList.slice();
    });
  }

  saveOrUpdateAccountTransactionDetails() {
    if (!this.accountTransactionForm.valid) {
      this.validateAllFormFields(this.accountTransactionForm);
      return;
    }

    this.setValueFromFormGroup(this.accountTransactionForm, this.accountTransactionModel);

    this.accountTransactionService.createOrUpdateAccountTransaction(this.accountTransactionModel)
      .subscribe((accountTransactionResp: any) => {

        if (accountTransactionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.AccountTransaction.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(accountTransactionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('AccountTransaction deletion errors =>', error);
      });
  }

  //Create accountTransaction form and returns {FormGroup}
  createAccountTransactionForm(): FormGroup {
    return this.formBuilder.group({
      AccountTransactionId: new FormControl(this.accountTransactionModel.AccountTransactionId),
      RoleId: new FormControl({ value: this.accountTransactionModel.RoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      AccountId: new FormControl({ value: this.accountTransactionModel.AccountId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      TransactionId: new FormControl({ value: this.accountTransactionModel.TransactionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Rights: new FormControl({ value: this.accountTransactionModel.Rights, disabled: this.PageRights.IsReadOnly }),
      CanAdd: new FormControl({ value: this.accountTransactionModel.CanAdd, disabled: this.PageRights.IsReadOnly }),
      CanEdit: new FormControl({ value: this.accountTransactionModel.CanEdit, disabled: this.PageRights.IsReadOnly }),
      CanDelete: new FormControl({ value: this.accountTransactionModel.CanDelete, disabled: this.PageRights.IsReadOnly }),
      CanView: new FormControl({ value: this.accountTransactionModel.CanView, disabled: this.PageRights.IsReadOnly }),
      CanExport: new FormControl({ value: this.accountTransactionModel.CanExport, disabled: this.PageRights.IsReadOnly }),
      ListView: new FormControl({ value: this.accountTransactionModel.ListView, disabled: this.PageRights.IsReadOnly }),
      BasicView: new FormControl({ value: this.accountTransactionModel.BasicView, disabled: this.PageRights.IsReadOnly }),
      DetailView: new FormControl({ value: this.accountTransactionModel.DetailView, disabled: this.PageRights.IsReadOnly }),
      IsPublic: new FormControl({ value: this.accountTransactionModel.IsPublic, disabled: this.PageRights.IsReadOnly }),
      Remarks: new FormControl({ value: this.accountTransactionModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.accountTransactionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
