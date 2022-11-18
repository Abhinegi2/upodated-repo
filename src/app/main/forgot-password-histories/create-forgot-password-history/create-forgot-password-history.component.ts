import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { ForgotPasswordHistoryService } from '../forgot-password-history.service';
import { ForgotPasswordHistoryModel } from '../forgot-password-history.model';

@Component({
  selector: 'forgot-password-history',
  templateUrl: './create-forgot-password-history.component.html',
  styleUrls: ['./create-forgot-password-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateForgotPasswordHistoryComponent extends BaseComponent<ForgotPasswordHistoryModel> implements OnInit {
  forgotPasswordHistoryForm: FormGroup;
  forgotPasswordHistoryModel: ForgotPasswordHistoryModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private forgotPasswordHistoryService: ForgotPasswordHistoryService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default forgotPasswordHistory Model
    this.forgotPasswordHistoryModel = new ForgotPasswordHistoryModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.forgotPasswordHistoryModel = new ForgotPasswordHistoryModel();

        } else {
          var forgotPasswordId: string = params.get('forgotPasswordId')

          this.forgotPasswordHistoryService.getForgotPasswordHistoryById(forgotPasswordId)
            .subscribe((response: any) => {
              this.forgotPasswordHistoryModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.forgotPasswordHistoryModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.forgotPasswordHistoryModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.forgotPasswordHistoryForm = this.createForgotPasswordHistoryForm();
            });
        }
      }
    });

    this.forgotPasswordHistoryForm = this.createForgotPasswordHistoryForm();
  }

  saveOrUpdateForgotPasswordHistoryDetails() {
    this.setValueFromFormGroup(this.forgotPasswordHistoryForm, this.forgotPasswordHistoryModel);

    this.forgotPasswordHistoryService.createOrUpdateForgotPasswordHistory(this.forgotPasswordHistoryModel)
      .subscribe((forgotPasswordHistoryResp: any) => {

        if (forgotPasswordHistoryResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.ForgotPasswordHistory.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(forgotPasswordHistoryResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('ForgotPasswordHistory deletion errors =>', error);
      });
  }

  //Create forgotPasswordHistory form and returns {FormGroup}
  createForgotPasswordHistoryForm(): FormGroup {
    return this.formBuilder.group({
      ForgotPasswordId: new FormControl(this.forgotPasswordHistoryModel.ForgotPasswordId),
      EmailId: new FormControl({ value: this.forgotPasswordHistoryModel.EmailId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      PasswordResetUrl: new FormControl({ value: this.forgotPasswordHistoryModel.PasswordResetUrl, disabled: this.PageRights.IsReadOnly }),
      UserIPAddress: new FormControl({ value: this.forgotPasswordHistoryModel.UserIPAddress, disabled: this.PageRights.IsReadOnly }),
      RequestDate: new FormControl({ value: this.forgotPasswordHistoryModel.RequestDate, disabled: this.PageRights.IsReadOnly }),
      ResetPasswordDate: new FormControl({ value: this.forgotPasswordHistoryModel.ResetPasswordDate, disabled: this.PageRights.IsReadOnly })
    });
  }
}
