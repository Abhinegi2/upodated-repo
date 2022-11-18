import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SectorJobRoleService } from '../sector-job-role.service';
import { SectorJobRoleModel } from '../sector-job-role.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'sector-job-role',
  templateUrl: './create-sector-job-role.component.html',
  styleUrls: ['./create-sector-job-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSectorJobRoleComponent extends BaseComponent<SectorJobRoleModel> implements OnInit {
  sectorJobRoleForm: FormGroup;
  sectorJobRoleModel: SectorJobRoleModel;
  academicyearList: [DropdownModel];
  phaseList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];
  remarkText: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private sectorJobRoleService: SectorJobRoleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default sectorJobRole Model
    this.sectorJobRoleModel = new SectorJobRoleModel();
  }

  ngOnInit(): void {

    this.commonService.GetMasterDataByType({ DataType: 'Sectors' }).subscribe((response: any) => {
      if (response.Success) {
        this.sectorList = response.Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.sectorJobRoleModel = new SectorJobRoleModel();

          } else {
            var sectorJobRoleId: string = params.get('sectorJobRoleId')

            this.sectorJobRoleService.getSectorJobRoleById(sectorJobRoleId)
              .subscribe((response: any) => {
                this.sectorJobRoleModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.sectorJobRoleModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.sectorJobRoleModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.sectorJobRoleForm = this.createSectorJobRoleForm();
              });
          }
        }
      });
    });
    this.sectorJobRoleForm = this.createSectorJobRoleForm();
  }

  saveOrUpdateSectorJobRoleDetails() {
    this.setValueFromFormGroup(this.sectorJobRoleForm, this.sectorJobRoleModel);
    this.sectorJobRoleModel.Remarks = this.remarkText;

    this.sectorJobRoleService.createOrUpdateSectorJobRole(this.sectorJobRoleModel)
      .subscribe((sectorJobRoleResp: any) => {

        if (sectorJobRoleResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SectorJobRole.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(sectorJobRoleResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SectorJobRole deletion errors =>', error);
      });
  }

  onChangeSector(evt) {

    this.commonService
      .GetMasterDataByType({ DataType: 'JobRoles', ParentId: evt.value })
      .subscribe((response: any) => {

        if (response.Success) {
          this.jobRoleList = response.Results;

          var sectorItem = this.sectorList.find(x => x.Id == evt.value);
          var jobRoleItem = this.jobRoleList.find(x => x.Id == this.sectorJobRoleForm.get('JobRoleId').value);
          this.remarkText = sectorItem.Name + (jobRoleItem == null ? '' : '-' + jobRoleItem.Name);
          this.sectorJobRoleForm.get('Remarks').setValue(this.remarkText);
        }
      });
  }

  onChangeJobRole(evt) {
    var sectorItem = this.sectorList.find(x => x.Id == this.sectorJobRoleForm.get('SectorId').value);
    var jobRoleItem = this.jobRoleList.find(x => x.Id == evt.value);
    this.remarkText = (sectorItem == null ? '' : sectorItem.Name + '-') + jobRoleItem.Name;
    this.sectorJobRoleForm.get('Remarks').setValue(this.remarkText);
  }

  //Create sectorJobRole form and returns {FormGroup}
  createSectorJobRoleForm(): FormGroup {
    return this.formBuilder.group({
      SectorJobRoleId: new FormControl(this.sectorJobRoleModel.SectorJobRoleId),
      SectorId: new FormControl({ value: this.sectorJobRoleModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.sectorJobRoleModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      QPCode: new FormControl({ value: this.sectorJobRoleModel.QPCode, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(15), Validators.pattern(this.Constants.Regex.QPCode)]),
      Remarks: new FormControl({ value: this.sectorJobRoleModel.Remarks, disabled: true }, Validators.maxLength(350)),
      IsActive: new FormControl({ value: this.sectorJobRoleModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
