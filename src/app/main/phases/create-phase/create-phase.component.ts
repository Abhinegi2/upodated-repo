import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { PhaseService } from '../phase.service';
import { PhaseModel } from '../phase.model';

@Component({
  selector: 'phase',
  templateUrl: './create-phase.component.html',
  styleUrls: ['./create-phase.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreatePhaseComponent extends BaseComponent<PhaseModel> implements OnInit {
  phaseForm: FormGroup;
  phaseModel: PhaseModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private phaseService: PhaseService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default phase Model
    this.phaseModel = new PhaseModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.phaseModel = new PhaseModel();

        } else {
          var phaseId: string = params.get('phaseId')

          this.phaseService.getPhaseById(phaseId)
            .subscribe((response: any) => {
              this.phaseModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.phaseModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.phaseModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.phaseForm = this.createPhaseForm();
            });
        }
      }
    });

    this.phaseForm = this.createPhaseForm();
  }

  saveOrUpdatePhaseDetails() {
    this.setValueFromFormGroup(this.phaseForm, this.phaseModel);

    this.phaseService.createOrUpdatePhase(this.phaseModel)
      .subscribe((phaseResp: any) => {

        if (phaseResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Phase.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(phaseResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Phase deletion errors =>', error);
      });
  }

  //Create phase form and returns {FormGroup}
  createPhaseForm(): FormGroup {
    return this.formBuilder.group({
      PhaseId: new FormControl(this.phaseModel.PhaseId),
      PhaseName: new FormControl({ value: this.phaseModel.PhaseName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.phaseModel.Description, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.phaseModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
