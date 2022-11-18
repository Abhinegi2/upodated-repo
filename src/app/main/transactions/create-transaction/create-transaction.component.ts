import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { TransactionService } from '../transaction.service';
import { TransactionModel } from '../transaction.model';

@Component({
  selector: 'transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateTransactionComponent extends BaseComponent<TransactionModel> implements OnInit {
  transactionForm: FormGroup;
  transactionModel: TransactionModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default transaction Model
    this.transactionModel = new TransactionModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.transactionModel = new TransactionModel();

        } else {
          var transactionId: string = params.get('transactionId')

          this.transactionService.getTransactionById(transactionId)
            .subscribe((response: any) => {
              this.transactionModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.transactionModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.transactionModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.transactionForm = this.createTransactionForm();
            });
        }
      }
    });

    this.transactionForm = this.createTransactionForm();
  }

  saveOrUpdateTransactionDetails() {
    this.setValueFromFormGroup(this.transactionForm, this.transactionModel);

    this.transactionService.createOrUpdateTransaction(this.transactionModel)
      .subscribe((transactionResp: any) => {

        if (transactionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Transaction.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(transactionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Transaction deletion errors =>', error);
      });
  }

  //Create transaction form and returns {FormGroup}
  createTransactionForm(): FormGroup {
    return this.formBuilder.group({
      TransactionId: new FormControl(this.transactionModel.TransactionId),
      Code: new FormControl({ value: this.transactionModel.Code, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Name: new FormControl({ value: this.transactionModel.Name, disabled: this.PageRights.IsReadOnly }, Validators.required),
      PageTitle: new FormControl({ value: this.transactionModel.PageTitle, disabled: this.PageRights.IsReadOnly }, Validators.required),
      PageDescription: new FormControl({ value: this.transactionModel.PageDescription, disabled: this.PageRights.IsReadOnly }),
      UrlAction: new FormControl({ value: this.transactionModel.UrlAction, disabled: this.PageRights.IsReadOnly }),
      UrlController: new FormControl({ value: this.transactionModel.UrlController, disabled: this.PageRights.IsReadOnly }),
      UrlPara: new FormControl({ value: this.transactionModel.UrlPara, disabled: this.PageRights.IsReadOnly }),
      RouteUrl: new FormControl({ value: this.transactionModel.RouteUrl, disabled: this.PageRights.IsReadOnly }),
      DisplayOrder: new FormControl({ value: this.transactionModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Remarks: new FormControl({ value: this.transactionModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.transactionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
