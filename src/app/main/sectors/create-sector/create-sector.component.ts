import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SectorService } from '../sector.service';
import { SectorModel } from '../sector.model';

@Component({
  selector: 'sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSectorComponent extends BaseComponent<SectorModel> implements OnInit {
  sectorForm: FormGroup;
  sectorModel: SectorModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private sectorService: SectorService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default sector Model
    this.sectorModel = new SectorModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.sectorModel = new SectorModel();

        } else {
          var sectorId: string = params.get('sectorId')

          this.sectorService.getSectorById(sectorId)
            .subscribe((response: any) => {
              this.sectorModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.sectorModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.sectorModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.sectorForm = this.createSectorForm();
            });
        }
      }
    });

    this.sectorForm = this.createSectorForm();
  }

  saveOrUpdateSectorDetails() {
    this.setValueFromFormGroup(this.sectorForm, this.sectorModel);

    this.sectorService.createOrUpdateSector(this.sectorModel)
      .subscribe((sectorResp: any) => {

        if (sectorResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Sector.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(sectorResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Sector deletion errors =>', error);
      });
  }

  //Create sector form and returns {FormGroup}
  createSectorForm(): FormGroup {
    return this.formBuilder.group({
      SectorId: new FormControl(this.sectorModel.SectorId),
      SectorName: new FormControl({ value: this.sectorModel.SectorName, disabled: this.PageRights.IsReadOnly }, Validators.required),      
      Description: new FormControl({ value: this.sectorModel.Description, disabled: this.PageRights.IsReadOnly }),
      DisplayOrder: new FormControl({ value: this.sectorModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),      
      IsActive: new FormControl({ value: this.sectorModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
