import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTPSectorService } from '../vtp-sector.service';
import { VTPSectorModel } from '../vtp-sector.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vtp-sector',
  templateUrl: './create-vtp-sector.component.html',
  styleUrls: ['./create-vtp-sector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTPSectorComponent extends BaseComponent<VTPSectorModel> implements OnInit {
  vtpSectorForm: FormGroup;
  vtpSectorModel: VTPSectorModel;
  academicyearList: [DropdownModel];
  vtpList: [DropdownModel];
  sectorList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtpSectorService: VTPSectorService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtpSector Model
    this.vtpSectorModel = new VTPSectorModel();
  }

  ngOnInit(): void {
    this.vtpSectorService.getDropdownforVTPSector().subscribe((results) => {
      if (results[0].Success) {
        this.academicyearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtpSectorModel = new VTPSectorModel();

          } else {
            var vtpSectorId: string = params.get('vtpSectorId')

            this.vtpSectorService.getVTPSectorById(vtpSectorId)
              .subscribe((response: any) => {
                this.vtpSectorModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtpSectorModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtpSectorModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vtpSectorForm = this.createVTPSectorForm();
              });
          }
        }
      });
    });
    this.vtpSectorForm = this.createVTPSectorForm();
  }

  saveOrUpdateVTPSectorDetails() {
    if (!this.vtpSectorForm.valid) {
      this.validateAllFormFields(this.vtpSectorForm);  
      return;
    }

    this.setValueFromFormGroup(this.vtpSectorForm, this.vtpSectorModel);

    this.vtpSectorService.createOrUpdateVTPSector(this.vtpSectorModel)
      .subscribe((vtpSectorResp: any) => {

        if (vtpSectorResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTPSector.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtpSectorResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTPSector deletion errors =>', error);
      });
  }

  //Create vtpSector form and returns {FormGroup}
  createVTPSectorForm(): FormGroup {
    return this.formBuilder.group({
      VTPSectorId: new FormControl(this.vtpSectorModel.VTPSectorId),
      AcademicYearId: new FormControl({ value: this.vtpSectorModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VTPId: new FormControl({ value: this.vtpSectorModel.VTPId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.vtpSectorModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsActive: new FormControl({ value: this.vtpSectorModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
