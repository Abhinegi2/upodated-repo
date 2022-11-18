import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { ChangeLoginService } from './change-login.service';
import { ChangeLoginModel } from './change-login.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { AccountTransactionService } from 'app/main/account-transactions/account-transaction.service';

@Component({
  selector: 'change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChangeLoginComponent extends BaseComponent<ChangeLoginModel> implements OnInit {
  changeLoginForm: FormGroup;
  changeLoginModel: ChangeLoginModel;
  roleList: [DropdownModel];
  accountList: [DropdownModel];
  filteredAccountItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private changeLoginService: ChangeLoginService,
    private accountTransactionService: AccountTransactionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default account Model
    this.changeLoginModel = new ChangeLoginModel();
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

        this.changeLoginForm = this.createChangeLoginForm();
      }
    });

    this.changeLoginForm = this.createChangeLoginForm();
  }

  onChangeRole(roleId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'AccountsByRole', UserId: this.UserModel.DefaultStateId, ParentId: roleId, SelectTitle: 'Account' }).subscribe((response: any) => {
      this.accountList = response.Results;
      this.filteredAccountItems = this.accountList.slice();
    });
  }

  submitChangingLoginId() {

    if (!this.changeLoginForm.valid) {
      this.validateAllFormFields(this.changeLoginForm);
      return;
    }

    this.setValueFromFormGroup(this.changeLoginForm, this.changeLoginModel);

    this.changeLoginService.changeUserLoginId(this.changeLoginModel)
      .subscribe((accountResp: any) => {

        if (accountResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.ChangeLoginIdMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.changeLoginModel = new ChangeLoginModel();
            this.changeLoginForm = this.createChangeLoginForm();
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(accountResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('change login errors =>', error);
      });
  }

  //Create account form and returns {FormGroup}
  createChangeLoginForm(): FormGroup {
    return this.formBuilder.group({
      RoleId: new FormControl({ value: this.changeLoginModel.RoleId, disabled: false }, Validators.required),
      AccountId: new FormControl({ value: this.changeLoginModel.AccountId, disabled: false }, Validators.required),
      NewLoginId: new FormControl({ value: this.changeLoginModel.NewLoginId, disabled: false }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)])
    });
  }
}
