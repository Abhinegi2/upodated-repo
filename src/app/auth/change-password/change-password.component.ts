import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordModel } from './change-password.model';

@Component({
  selector: 'account',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChangePasswordComponent extends BaseComponent<ChangePasswordModel> implements OnInit {
  changePasswordForm: FormGroup;
  changePasswordModel: ChangePasswordModel;
  previousUrl: string;
  hideConfirmPassword: boolean = true;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private changePasswordService: ChangePasswordService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default account Model
    this.changePasswordModel = new ChangePasswordModel();
  }

  ngOnInit(): void {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  saveOrUpdateChangePasswordDetails() {

    let currentPassword = this.changePasswordForm.get("Password");
    let newPassword = this.changePasswordForm.get("NewPassword");
    if (currentPassword.value == newPassword.value) {
      this.dialogService.openShowDialog("The new password cannot be the same as the current password");
      return;
    }

    this.setValueFromFormGroup(this.changePasswordForm, this.changePasswordModel);
    this.changePasswordModel.UserId = this.UserModel.LoginId;

    this.changePasswordService.createOrUpdatePassword(this.changePasswordModel)
      .subscribe((accountResp: any) => {

        if (accountResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.PasswordChangeMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([this.UserModel.LandingPageUrl]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(accountResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('change password errors =>', error);
      });
  }

  onStrengthChanged(strength: number) {
    //console.log('password strength = ', strength);
  }

  setVisibleConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  //Create account form and returns {FormGroup}
  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      UserId: new FormControl({ value: this.UserModel.LoginId, disabled: true }, Validators.required),
      Password: new FormControl({ value: this.changePasswordModel.Password, disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Password)]),
      NewPassword: new FormControl({ value: this.changePasswordModel.NewPassword, disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Password)]),
      ConfirmPassword: new FormControl({ value: this.changePasswordModel.ConfirmPassword, disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Password)])
    }, { validator: this.checkIfMatchingPasswords('NewPassword', 'ConfirmPassword') });
  }
}
