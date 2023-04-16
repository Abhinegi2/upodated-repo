import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { DivisionService } from '../division.service';
import { DivisionModel } from '../division.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'division',
  templateUrl: './create-division.component.html',
  styleUrls: ['./create-division.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateDivisionComponent extends BaseComponent<DivisionModel> implements OnInit {
  divisionForm: FormGroup;
  divisionModel: DivisionModel;
  stateList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private divisionService: DivisionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default division Model
    this.divisionModel = new DivisionModel();
  }

  ngOnInit(): void {

    this.commonService.GetMasterDataByType({ DataType: 'States', SelectTitle: 'State' }).subscribe((response: any) => {
      if (response.Success) {
        this.stateList = response.Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.divisionModel = new DivisionModel();

          } else {
            var divisionId: string = params.get('divisionId')

            this.divisionService.getDivisionById(divisionId)
              .subscribe((response: any) => {
                this.divisionModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.divisionModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.divisionModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.divisionForm = this.createDivisionForm();
              });
          }
        }
      });
    });

    this.divisionForm = this.createDivisionForm();
  }

  saveOrUpdateDivisionDetails() {
    this.setValueFromFormGroup(this.divisionForm, this.divisionModel);

    this.divisionService.createOrUpdateDivision(this.divisionModel)
      .subscribe((divisionResp: any) => {

        if (divisionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Division.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(divisionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Division deletion errors =>', error);
      });
  }

  //Create division form and returns {FormGroup}
  createDivisionForm(): FormGroup {
    return this.formBuilder.group({
      DivisionId: new FormControl(this.divisionModel.DivisionId),
      StateCode: new FormControl({ value: this.UserModel.DefaultStateId='DL', disabled: (this.UserModel.DefaultStateId ='DL') }),
      DivisionName: new FormControl({ value: this.divisionModel.DivisionName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.divisionModel.Description, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.divisionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
