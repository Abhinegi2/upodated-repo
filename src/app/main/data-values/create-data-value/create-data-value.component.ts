import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { DataValueService } from '../data-value.service';
import { DataValueModel } from '../data-value.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'data-value',
  templateUrl: './create-data-value.component.html',
  styleUrls: ['./create-data-value.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateDataValueComponent extends BaseComponent<DataValueModel> implements OnInit {
  dataValueForm: FormGroup;
  dataValueModel: DataValueModel;
  dataTypeList = [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private dataValueService: DataValueService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default dataValue Model
    this.dataValueModel = new DataValueModel();
  }

  ngOnInit(): void {

    this.commonService
      .GetMasterDataByType({ DataType: 'DataTypes' })
      .subscribe((response: any) => {

        if (response.Success) {
          this.dataTypeList = response.Results;
        }

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.dataValueModel = new DataValueModel();

            } else {
              var dataValueId: string = params.get('dataValueId')

              this.dataValueService.getDataValueById(dataValueId)
                .subscribe((response: any) => {
                  this.dataValueModel = response.Result;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.dataValueModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.dataValueModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }

                  this.dataValueForm = this.createDataValueForm();
                });
            }
          }
        });
      });

    this.dataValueForm = this.createDataValueForm();
  }

  saveOrUpdateDataValueDetails() {
    this.setValueFromFormGroup(this.dataValueForm, this.dataValueModel);

    this.dataValueService.createOrUpdateDataValue(this.dataValueModel)
      .subscribe((dataValueResp: any) => {

        if (dataValueResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.DataValue.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(dataValueResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('DataValue deletion errors =>', error);
      });
  }

  //Create dataValue form and returns {FormGroup}
  createDataValueForm(): FormGroup {
    return this.formBuilder.group({
      DataValueId: new FormControl(this.dataValueModel.DataValueId),
      DataTypeId: new FormControl({ value: this.dataValueModel.DataTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ParentId: new FormControl({ value: this.dataValueModel.ParentId, disabled: this.PageRights.IsReadOnly }),
      Code: new FormControl({ value: this.dataValueModel.Code, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      Name: new FormControl({ value: this.dataValueModel.Name, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Description: new FormControl({ value: this.dataValueModel.Description, disabled: this.PageRights.IsReadOnly }),
      DisplayOrder: new FormControl({ value: this.dataValueModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsActive: new FormControl({ value: this.dataValueModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
