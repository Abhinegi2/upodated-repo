import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { SettingService } from './setting.service';
import { SettingModel } from './setting.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SettingComponent extends BaseComponent<SettingModel> implements OnInit {
  settingForm: FormGroup;
  settingModel: SettingModel;
  roleList: DropdownModel[];
  userList: [DropdownModel];
  filteredUserItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private settingService: SettingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default setting Model
    this.settingModel = new SettingModel();
  }

  ngOnInit(): void {
    this.settingService.getAllRoles().subscribe((result) => {

      if (result.Success) {
        if (this.UserModel.RoleCode == 'SUR') {
          this.roleList = result.Results;
        }
        else {
          this.roleList = result.Results.filter(r => r.Id != this.Constants.SuperUser);
        }
        this.route.paramMap.subscribe(params => {

          this.settingForm = this.createSettingForm();
        });
      }
    });

    this.settingForm = this.createSettingForm();
  }

  onChangeRole(roleId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'AccountsByRole', UserId: this.UserModel.DefaultStateId, ParentId: roleId, SelectTitle: 'Account' }).subscribe((response: any) => {
      this.userList = response.Results;
      this.filteredUserItems = this.userList.slice();
    });
  }

  saveSettings() {
    if (!this.settingForm.valid) {
      this.validateAllFormFields(this.settingForm);
      return;
    }

    this.setValueFromFormGroup(this.settingForm, this.settingModel);

    this.settingService.saveSettings(this.settingModel)
      .subscribe((settingResp: any) => {

        if (settingResp.Success) {
          this.dialogService.openShowDialog('<b>User details</b><p>Login Id : ' + settingResp.Result.LoginId + ' <br />Password : ' + settingResp.Result.Password + '</p>');
        }
        else {
          var errorMessages = this.getHtmlMessage(settingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Setting deletion errors =>', error);
      });
  }

  //Create setting form and returns {FormGroup}
  createSettingForm(): FormGroup {
    return this.formBuilder.group({
      RoleId: new FormControl(this.settingModel.RoleId),
      UserId: new FormControl({ value: this.settingModel.UserId, disabled: this.PageRights.IsReadOnly }, Validators.required),
    });
  }
}
