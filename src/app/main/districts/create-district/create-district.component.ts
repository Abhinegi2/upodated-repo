import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { DistrictService } from '../district.service';
import { DistrictModel } from '../district.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'district',
  templateUrl: './create-district.component.html',
  styleUrls: ['./create-district.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateDistrictComponent extends BaseComponent<DistrictModel> implements OnInit {
  districtForm: FormGroup;
  districtModel: DistrictModel;
  stateList: [DropdownModel];
  divisionList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private districtService: DistrictService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default district Model
    this.districtModel = new DistrictModel();
  }

  ngOnInit(): void {

    this.districtService.getDropdownforDistrict(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.stateList = results[0].Results;
      }

      if (results[1].Success) {
        this.divisionList = results[1].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.districtModel = new DistrictModel();

          } else {
            var districtCode: string = params.get('districtCode')

            this.districtService.getDistrictById(districtCode)
              .subscribe((response: any) => {
                this.districtModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.districtModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.districtModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.districtForm = this.createDistrictForm();
              });
          }
        }
      });
    });
    this.districtForm = this.createDistrictForm();
  }

  saveOrUpdateDistrictDetails() {
    this.setValueFromFormGroup(this.districtForm, this.districtModel);

    this.districtService.createOrUpdateDistrict(this.districtModel)
      .subscribe((districtResp: any) => {

        if (districtResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.District.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(districtResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('District deletion errors =>', error);
      });
  }

  //Create district form and returns {FormGroup}
  createDistrictForm(): FormGroup {
    return this.formBuilder.group({
      DistrictCode: new FormControl(this.districtModel.DistrictCode),
      StateCode: new FormControl({ value: this.UserModel.DefaultStateId}, Validators.required),
      DivisionId: new FormControl({ value: this.districtModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictName: new FormControl({ value: this.districtModel.DistrictName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.districtModel.Description, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.districtModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
