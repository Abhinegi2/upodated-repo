import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VocationaltrainerdetailService } from '../vocationaltrainerdetail.service';
import { VocationaltrainerdetailModel } from '../vocationaltrainerdetail.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vocationaltrainerdetail',
  templateUrl: './create-vocationaltrainerdetail.component.html',
  styleUrls: ['./create-vocationaltrainerdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVocationaltrainerdetailComponent extends BaseComponent<VocationaltrainerdetailModel> implements OnInit {
  vocationaltrainerdetailForm: FormGroup;
  vocationaltrainerdetailModel: VocationaltrainerdetailModel;

  stateList: [DropdownModel];
  divisionList: DropdownModel[];
  districtList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vocationaltrainerdetailService: VocationaltrainerdetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vocationaltrainerdetail Model
    this.vocationaltrainerdetailModel = new VocationaltrainerdetailModel();
  }

  ngOnInit(): void {

    this.vocationaltrainerdetailService.getStateDivisions().subscribe(results => {

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
            this.vocationaltrainerdetailModel = new VocationaltrainerdetailModel();

          } else {
            var vocationaltrainerdetailId: string = params.get('vocationaltrainerdetailId')

            this.vocationaltrainerdetailService.getVocationaltrainerdetailById(vocationaltrainerdetailId)
              .subscribe((response: any) => {
                this.vocationaltrainerdetailModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vocationaltrainerdetailModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vocationaltrainerdetailModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vocationaltrainerdetailForm = this.createVocationaltrainerdetailForm();                
                this.onChangeDivision(this.vocationaltrainerdetailModel.DivisionId);
              });
          }
        }
      });
    });

    this.vocationaltrainerdetailForm = this.createVocationaltrainerdetailForm();
  }

  onChangeState(stateId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
      this.divisionList = response.Results;
      this.districtList = <DropdownModel[]>[];
    });
  }

  onChangeDivision(divisionId: any) {
    var stateCode = this.vocationaltrainerdetailForm.get('StateCode').value;

    this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });
  }

  saveOrUpdateVocationaltrainerdetailDetails() {
    if (!this.vocationaltrainerdetailForm.valid) {
      this.validateAllFormFields(this.vocationaltrainerdetailForm);  
      return;
    }

    this.setValueFromFormGroup(this.vocationaltrainerdetailForm, this.vocationaltrainerdetailModel);

    this.vocationaltrainerdetailService.createOrUpdateVocationaltrainerdetail(this.vocationaltrainerdetailModel)
      .subscribe((vocationaltrainerdetailResp: any) => {

        if (vocationaltrainerdetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Vocationaltrainerdetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vocationaltrainerdetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Vocationaltrainerdetail deletion errors =>', error);
      });
  }

  //Create vocationaltrainerdetail form and returns {FormGroup}
  createVocationaltrainerdetailForm(): FormGroup {
    return this.formBuilder.group({
      VocationaltrainerdetailId: new FormControl(this.vocationaltrainerdetailModel.VocationaltrainerdetailId),
      StateCode: new FormControl({ value: this.vocationaltrainerdetailModel.StateCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DivisionId: new FormControl({ value: this.vocationaltrainerdetailModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictCode: new FormControl({ value: this.vocationaltrainerdetailModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      BlockName: new FormControl({ value: this.vocationaltrainerdetailModel.BlockName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Address: new FormControl({ value: this.vocationaltrainerdetailModel.Address, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      City: new FormControl({ value: this.vocationaltrainerdetailModel.City, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Pincode: new FormControl({ value: this.vocationaltrainerdetailModel.Pincode, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      BusinessType: new FormControl({ value: this.vocationaltrainerdetailModel.BusinessType, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      EmployeeCount: new FormControl({ value: this.vocationaltrainerdetailModel.EmployeeCount, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Outlets: new FormControl({ value: this.vocationaltrainerdetailModel.Outlets, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Contact1: new FormControl({ value: this.vocationaltrainerdetailModel.Contact1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Mobile1: new FormControl({ value: this.vocationaltrainerdetailModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Designation1: new FormControl({ value: this.vocationaltrainerdetailModel.Designation1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      EmailId1: new FormControl({ value: this.vocationaltrainerdetailModel.EmailId1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Email)]),
      Contact2: new FormControl({ value: this.vocationaltrainerdetailModel.Contact2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Mobile2: new FormControl({ value: this.vocationaltrainerdetailModel.Mobile2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      Designation2: new FormControl({ value: this.vocationaltrainerdetailModel.Designation2, disabled: this.PageRights.IsReadOnly },  Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      EmailId2: new FormControl({ value: this.vocationaltrainerdetailModel.EmailId2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Email)),
      IsActive: new FormControl({ value: this.vocationaltrainerdetailModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
