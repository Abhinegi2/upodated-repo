import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant';
import { VTPSectorJobRoleService } from '../vtp-sector-job-role.service';
import { VTPSectorJobRoleModel } from '../vtp-sector-job-role.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vtp-sector-job-role',
  templateUrl: './create-vtp-sector-job-role.component.html',
  styleUrls: ['./create-vtp-sector-job-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTPSectorJobRoleComponent extends BaseComponent<VTPSectorJobRoleModel> implements OnInit {
  vtpSectorJobRoleForm: FormGroup;
  vtpSectorJobRoleModel: VTPSectorJobRoleModel;
  vtpList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtpSectorJobRoleService: VTPSectorJobRoleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtpSectorJobRole Model
    this.vtpSectorJobRoleModel = new VTPSectorJobRoleModel();
  }

  ngOnInit(): void {
    this.vtpSectorJobRoleService.getDropdownforVTPSectorJobRole().subscribe((results) => {
      if (results[0].Success) {
        this.vtpList = results[0].Results;

      }

      if (results[1].Success) {
        this.sectorList = results[1].Results;
      }

      if (results[2].Success) {
        this.jobRoleList = results[2].Results;
      }
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.vtpSectorJobRoleModel = new VTPSectorJobRoleModel();

        } else {
          var vtpSectorJobRoleId: string = params.get('vtpSectorJobRoleId')

          this.vtpSectorJobRoleService.getVTPSectorJobRoleById(vtpSectorJobRoleId)
            .subscribe((response: any) => {
              this.vtpSectorJobRoleModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.vtpSectorJobRoleModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.vtpSectorJobRoleModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.vtpSectorJobRoleForm = this.createVTPSectorJobRoleForm();
            });
        }
      }
    });
  });
    this.vtpSectorJobRoleForm = this.createVTPSectorJobRoleForm();
  }

  saveOrUpdateVTPSectorJobRoleDetails() {
    if (!this.vtpSectorJobRoleForm.valid) {
      this.validateAllFormFields(this.vtpSectorJobRoleForm);  
      return;
    }
    this.setValueFromFormGroup(this.vtpSectorJobRoleForm, this.vtpSectorJobRoleModel);

    this.vtpSectorJobRoleService.createOrUpdateVTPSectorJobRole(this.vtpSectorJobRoleModel)
      .subscribe((vtpSectorJobRoleResp: any) => {

        if (vtpSectorJobRoleResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTPSectorJobRole.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtpSectorJobRoleResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTPSectorJobRole deletion errors =>', error);
      });
  }

  //Create vtpSectorJobRole form and returns {FormGroup}
  createVTPSectorJobRoleForm(): FormGroup {
    return this.formBuilder.group({
      VTPSectorJobRoleId: new FormControl(this.vtpSectorJobRoleModel.VTPSectorJobRoleId),
      VTPId: new FormControl({ value: this.vtpSectorJobRoleModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.vtpSectorJobRoleModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.vtpSectorJobRoleModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),
      VTPSectorJobRoleName: new FormControl({ value: this.vtpSectorJobRoleModel.VTPSectorJobRoleName, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
    });
  }
}
