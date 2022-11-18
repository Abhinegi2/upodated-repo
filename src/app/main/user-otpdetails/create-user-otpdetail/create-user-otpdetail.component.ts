import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { UserOTPDetailService } from '../user-otpdetail.service';
import { UserOTPDetailModel } from '../user-otpdetail.model';

@Component({
  selector: 'user-otpdetail',
  templateUrl: './create-user-otpdetail.component.html',
  styleUrls: ['./create-user-otpdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateUserOTPDetailComponent extends BaseComponent<UserOTPDetailModel> implements OnInit {
  userOTPDetailForm: FormGroup;
  userOTPDetailModel: UserOTPDetailModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private userOTPDetailService: UserOTPDetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default userOTPDetail Model
    this.userOTPDetailModel = new UserOTPDetailModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.userOTPDetailModel = new UserOTPDetailModel();

        } else {
          var otpId: string = params.get('otpId')

          this.userOTPDetailService.getUserOTPDetailById(otpId)
            .subscribe((response: any) => {
              this.userOTPDetailModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.userOTPDetailModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.userOTPDetailModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.userOTPDetailForm = this.createUserOTPDetailForm();
            });
        }
      }
    });

    this.userOTPDetailForm = this.createUserOTPDetailForm();
  }

  saveOrUpdateUserOTPDetailDetails() {
    this.setValueFromFormGroup(this.userOTPDetailForm, this.userOTPDetailModel);

    this.userOTPDetailService.createOrUpdateUserOTPDetail(this.userOTPDetailModel)
      .subscribe((userOTPDetailResp: any) => {

        if (userOTPDetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.UserOTPDetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(userOTPDetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('UserOTPDetail deletion errors =>', error);
      });
  }

  //Create userOTPDetail form and returns {FormGroup}
  createUserOTPDetailForm(): FormGroup {
    return this.formBuilder.group({
      OTPId: new FormControl(this.userOTPDetailModel.OTPId),
      Mobile: new FormControl({ value: this.userOTPDetailModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.MobileNumber)]),
      OTPToken: new FormControl({ value: this.userOTPDetailModel.OTPToken, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ExpireOn: new FormControl({ value: this.userOTPDetailModel.ExpireOn, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsRedeemed: new FormControl({ value: this.userOTPDetailModel.IsRedeemed, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.userOTPDetailModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
