import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { RoleService } from '../role.service';
import { RoleModel } from '../role.model';

@Component({
  selector: 'role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateRoleComponent extends BaseComponent<RoleModel> implements OnInit {
  roleForm: FormGroup;
  roleModel: RoleModel;
  // safeHtml: SafeHtml;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default role Model
    this.roleModel = new RoleModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.roleModel = new RoleModel();

        } else {
          var roleId: string = params.get('roleId')

          this.roleService.getRoleById(roleId)
            .subscribe((response: any) => {
              this.roleModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.roleModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.roleModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.roleForm = this.createRoleForm();
            });
        }
      }
    });

    this.roleForm = this.createRoleForm();
  }

  saveOrUpdateRoleDetails() {
    if (!this.roleForm.valid) {
      this.validateAllFormFields(this.roleForm);
      return;
    }

    this.setValueFromFormGroup(this.roleForm, this.roleModel);

    this.roleService.createOrUpdateRole(this.roleModel)
      .subscribe((roleResp: any) => {

        if (roleResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Role.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(roleResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Role deletion errors =>', error);
      });
  }

  //Create role form and returns {FormGroup}
  createRoleForm(): FormGroup {
    return this.formBuilder.group({
      RoleId: new FormControl(this.roleModel.RoleId),
      Code: new FormControl({ value: this.roleModel.Code, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Name: new FormControl({ value: this.roleModel.Name, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.roleModel.Description, disabled: this.PageRights.IsReadOnly }),
      LandingPageUrl: new FormControl({ value: this.roleModel.LandingPageUrl, disabled: this.PageRights.IsReadOnly }),
      Remarks: new FormControl({ value: this.roleModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.roleModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
