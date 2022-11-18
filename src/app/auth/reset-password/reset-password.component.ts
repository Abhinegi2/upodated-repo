import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from 'app/common/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'app/services/common.service';
import { RouteConstants } from 'app/constants/route.constant';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { ChangePasswordService } from 'app/auth/change-password/change-password.service';
import { ResetPasswordModel } from './reset.password.model';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPasswordComponent extends BaseComponent<any> implements OnInit {
    resetPasswordForm: FormGroup;
    resetPasswordModel: ResetPasswordModel;

    constructor(
        public commonService: CommonService,
        public router: Router,
        public routeParams: ActivatedRoute,
        public snackBar: MatSnackBar,
        private zone: NgZone,
        private route: ActivatedRoute,
        private dialogService: DialogService,
        private accountService: ChangePasswordService,
        private fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder
    ) {
        super(commonService, router, routeParams, snackBar);

        // Configure the layout
        this.fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the default phase Model
        this.resetPasswordModel = new ResetPasswordModel();
    }

    ngOnInit(): void {        
        if (this.route.snapshot.queryParams.accessToken != undefined && !this.route.snapshot.queryParams.accessToken.IsNullOrEmpty()) {
            let accessToken = this.route.snapshot.queryParams.accessToken;

            // Decrypt access token for Password Reset
            let decryptToken = this.commonService.getDecryptText(accessToken);
            let decryptTokenKeys = decryptToken.split('#');

            let tokenDateTime = new Date(decryptTokenKeys[2]);
            let todayDateTime = new Date();

            if (tokenDateTime < todayDateTime) {
                this.dialogService.openShowDialog(this.Constants.Messages.ResetPasswordFailureMessage);
                this.router.navigate([RouteConstants.Login]);
            }

            this.resetPasswordModel.UserId = decryptTokenKeys[1];
        }
        else if (this.UserModel === undefined) {
            this.dialogService.openShowDialog(this.Constants.Messages.ResetPasswordFailureMessage);
            this.router.navigate([RouteConstants.Login]);
        }
        else if (this.UserModel != undefined) {
            this.resetPasswordModel.UserId = this.UserModel.EmailId;
        }

        this.resetPasswordForm = this.createResetPasswordForm();
    }

    resetPassword(): void {
        let confirmPassword = this.resetPasswordForm.get("ConfirmPassword");
        let newPassword = this.resetPasswordForm.get("NewPassword");
        if (confirmPassword.value != newPassword.value) {
            this.dialogService.openShowDialog("The password and confirmation password do not match.");
            return;
        }

        this.setValueFromFormGroup(this.resetPasswordForm, this.resetPasswordModel);

        // if (this.resetPasswordModel.UserId != this.UserModel.LoginId) {
        //     this.dialogService.openShowDialog("User login Id doesn’t match current Id in authorization");
        //     return;
        // }

        this.accountService.resetPassword(this.resetPasswordModel)
            .subscribe((passwordResp: any) => {
                if (passwordResp.Success) {
                    this.zone.run(() => {
                        this.showActionMessage(
                            this.Constants.Messages.ResetPasswordSuccessMessage,
                            this.Constants.Html.SuccessSnackbar
                        );

                        this.router.navigate([RouteConstants.Login]);
                    });
                }
                else {
                    var errorMessages = this.getHtmlMessage(passwordResp.Errors)
                    this.dialogService.openShowDialog(errorMessages);
                }
            }, error => {
                console.log('Reset password errors =>', error);
            });
    }

    onStrengthChanged(strength: number) {
        //console.log('password strength = ', strength);
    }

    //Create reset password form and returns {FormGroup}
    createResetPasswordForm(): FormGroup {
        return this.formBuilder.group({
            UserId: new FormControl({ value: this.resetPasswordModel.UserId, disabled: true }, Validators.required),
            NewPassword: new FormControl({ value: this.resetPasswordModel.NewPassword, disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Password)]),
            ConfirmPassword: new FormControl({ value: this.resetPasswordModel.ConfirmPassword, disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Password)])
        }, { validator: this.checkIfMatchingPasswords('NewPassword', 'ConfirmPassword') });
    }
}
