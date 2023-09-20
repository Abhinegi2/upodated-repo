import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTStatusOfInductionInserviceTrainingService } from '../vt-status-of-induction-inservice-training.service';
import { VTStatusOfInductionInserviceTrainingModel } from '../vt-status-of-induction-inservice-training.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vt-status-of-induction-inservice-training',
  templateUrl: './create-vt-status-of-induction-inservice-training.component.html',
  styleUrls: ['./create-vt-status-of-induction-inservice-training.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTStatusOfInductionInserviceTrainingComponent extends BaseComponent<VTStatusOfInductionInserviceTrainingModel> implements OnInit {
  vtStatusOfInductionInserviceTrainingForm: FormGroup;
  vtStatusOfInductionInserviceTrainingModel: VTStatusOfInductionInserviceTrainingModel;
  vtSchoolSectorList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStatusOfInductionInserviceTrainingService: VTStatusOfInductionInserviceTrainingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStatusOfInductionInserviceTraining Model
    this.vtStatusOfInductionInserviceTrainingModel = new VTStatusOfInductionInserviceTrainingModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.vtStatusOfInductionInserviceTrainingModel = new VTStatusOfInductionInserviceTrainingModel();

        } else {
          var vtStatusOfInductionInserviceTrainingId: string = params.get('vtStatusOfInductionInserviceTrainingId')

          this.vtStatusOfInductionInserviceTrainingService.getVTStatusOfInductionInserviceTrainingById(vtStatusOfInductionInserviceTrainingId)
            .subscribe((response: any) => {
              this.vtStatusOfInductionInserviceTrainingModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.vtStatusOfInductionInserviceTrainingModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.vtStatusOfInductionInserviceTrainingModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.vtStatusOfInductionInserviceTrainingForm = this.createVTStatusOfInductionInserviceTrainingForm();
            });
        }
      }
    });

    this.vtStatusOfInductionInserviceTrainingForm = this.createVTStatusOfInductionInserviceTrainingForm();
  }

  saveOrUpdateVTStatusOfInductionInserviceTrainingDetails() {
    if (!this.vtStatusOfInductionInserviceTrainingForm.valid) {
      this.validateAllFormFields(this.vtStatusOfInductionInserviceTrainingForm);  
      return;
    }
    this.setValueFromFormGroup(this.vtStatusOfInductionInserviceTrainingForm, this.vtStatusOfInductionInserviceTrainingModel);
    this.vtStatusOfInductionInserviceTrainingModel.VTId = this.UserModel.UserTypeId;
    
    this.vtStatusOfInductionInserviceTrainingService.createOrUpdateVTStatusOfInductionInserviceTraining(this.vtStatusOfInductionInserviceTrainingModel)
      .subscribe((vtStatusOfInductionInserviceTrainingResp: any) => {

        if (vtStatusOfInductionInserviceTrainingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTStatusOfInductionInserviceTraining.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtStatusOfInductionInserviceTrainingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTStatusOfInductionInserviceTraining deletion errors =>', error);
      });
  }

  //Create vtStatusOfInductionInserviceTraining form and returns {FormGroup}
  createVTStatusOfInductionInserviceTrainingForm(): FormGroup {
    return this.formBuilder.group({
      VTStatusOfInductionInserviceTrainingId: new FormControl(this.vtStatusOfInductionInserviceTrainingModel.VTStatusOfInductionInserviceTrainingId),
      IndustryTrainingStatus: new FormControl({ value: this.vtStatusOfInductionInserviceTrainingModel.IndustryTrainingStatus, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50), Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)]),
      InserviceTrainingStatus: new FormControl({ value: this.vtStatusOfInductionInserviceTrainingModel.InserviceTrainingStatus, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50), Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)]),
    });
  }
}
