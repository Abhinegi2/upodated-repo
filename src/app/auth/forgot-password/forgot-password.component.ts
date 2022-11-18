import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from 'app/common/base/base.component';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'app/services/common.service';
import { RouteConstants } from 'app/constants/route.constant';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { ChangePasswordService } from 'app/auth/change-password/change-password.service';
import { FuseUtils } from '@fuse/utils';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ForgotPasswordComponent extends BaseComponent<any> implements OnInit {
  forgotPasswordForm: FormGroup;
  codec = new HttpUrlEncodingCodec;

  constructor(
    public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
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
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.createForgotPasswordForm();
  }

  forgotPasswordLink(): void {
    let emailId = this.forgotPasswordForm.get('EmailId').value;

    let currentDateTime = new Date(this.CurrentDateTime);
    currentDateTime.setHours(currentDateTime.getHours() + 4 );

    let resetToken = FuseUtils.NewGuid() + '#' + emailId + '#' + currentDateTime;

    // Encrypt access token for Password Reset
    let encryptToken = this.commonService.getEncryptText(resetToken);

    let resetUrl = window.location.origin + '/reset-password?accessToken=' + encodeURIComponent(encryptToken);

    this.accountService.forgotPassword({ UserId: emailId, ResetUrl: resetUrl, ResetToken: encryptToken })
      .subscribe((passwordResp: any) => {

        if (passwordResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.EmailSentForgotPasswordMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Login]);
          })
        }
        else {
          var errorMessages = this.getHtmlMessage(passwordResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Forgot password errors =>', error);
      });
  }

  //Create forgetPassword form and returns {FormGroup}
  createForgotPasswordForm(): FormGroup {
    return this.formBuilder.group({
      EmailId: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.Constants.Regex.Email)])
    });
  }
}
