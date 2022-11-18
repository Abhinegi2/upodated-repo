import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { RoleTransactionService } from '../role-transaction.service';
import { RoleTransactionModel } from '../role-transaction.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'role-transaction',
  templateUrl: './create-role-transaction.component.html',
  styleUrls: ['./create-role-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateRoleTransactionComponent extends BaseComponent<RoleTransactionModel> implements OnInit {
  roleTransactionForm: FormGroup;
  roleTransactionModel: RoleTransactionModel;

  roleList: [DropdownModel];
  filteredRoleItems: any;
  transactionList: [DropdownModel];
  filteredTransactionItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private roleTransactionService: RoleTransactionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default roleTransaction Model
    this.roleTransactionModel = new RoleTransactionModel();
  }

  ngOnInit(): void {

    this.roleTransactionService.getDropdownforRoleTransaction().subscribe((results) => {
      if (results[0].Success) {

        if (this.UserModel.RoleCode == 'SUR') {
          this.roleList = results[0].Results;
        }
        else {
          this.roleList = results[0].Results.filter(r => r.Id != this.Constants.SuperUser);
        }
        this.filteredRoleItems = this.roleList.slice();
      }

      if (results[1].Success) {
        this.transactionList = results[1].Results;
        this.filteredTransactionItems = this.transactionList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.roleTransactionModel = new RoleTransactionModel();

          } else {
            var roleTransactionId: string = params.get('roleTransactionId')

            this.roleTransactionService.getRoleTransactionById(roleTransactionId)
              .subscribe((response: any) => {
                this.roleTransactionModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.roleTransactionModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.roleTransactionModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.roleTransactionForm = this.createRoleTransactionForm();
              });
          }
        }
      });
    });

    this.roleTransactionForm = this.createRoleTransactionForm();
  }

  saveOrUpdateRoleTransactionDetails() {
    this.setValueFromFormGroup(this.roleTransactionForm, this.roleTransactionModel);

    this.roleTransactionService.createOrUpdateRoleTransaction(this.roleTransactionModel)
      .subscribe((roleTransactionResp: any) => {

        if (roleTransactionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.RoleTransaction.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(roleTransactionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('RoleTransaction deletion errors =>', error);
      });
  }

  //Create roleTransaction form and returns {FormGroup}
  createRoleTransactionForm(): FormGroup {
    return this.formBuilder.group({
      RoleTransactionId: new FormControl(this.roleTransactionModel.RoleTransactionId),
      RoleId: new FormControl({ value: this.roleTransactionModel.RoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      TransactionId: new FormControl({ value: this.roleTransactionModel.TransactionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Rights: new FormControl({ value: this.roleTransactionModel.Rights, disabled: this.PageRights.IsReadOnly }),
      CanAdd: new FormControl({ value: this.roleTransactionModel.CanAdd, disabled: this.PageRights.IsReadOnly }),
      CanEdit: new FormControl({ value: this.roleTransactionModel.CanEdit, disabled: this.PageRights.IsReadOnly }),
      CanDelete: new FormControl({ value: this.roleTransactionModel.CanDelete, disabled: this.PageRights.IsReadOnly }),
      CanView: new FormControl({ value: this.roleTransactionModel.CanView, disabled: this.PageRights.IsReadOnly }),
      CanExport: new FormControl({ value: this.roleTransactionModel.CanExport, disabled: this.PageRights.IsReadOnly }),
      ListView: new FormControl({ value: this.roleTransactionModel.ListView, disabled: this.PageRights.IsReadOnly }),
      BasicView: new FormControl({ value: this.roleTransactionModel.BasicView, disabled: this.PageRights.IsReadOnly }),
      DetailView: new FormControl({ value: this.roleTransactionModel.DetailView, disabled: this.PageRights.IsReadOnly }),
      IsPublic: new FormControl({ value: this.roleTransactionModel.IsPublic, disabled: this.PageRights.IsReadOnly }),
      Remarks: new FormControl({ value: this.roleTransactionModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.roleTransactionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
