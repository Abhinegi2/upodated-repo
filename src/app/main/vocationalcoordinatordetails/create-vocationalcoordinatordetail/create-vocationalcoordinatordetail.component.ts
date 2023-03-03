import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VocationalcoordinatordetailService } from '../vocationalcoordinatordetail.service';
import { VocationalcoordinatordetailModel } from '../vocationalcoordinatordetail.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vocationalcoordinatordetail',
  templateUrl: './create-vocationalcoordinatordetail.component.html',
  styleUrls: ['./create-vocationalcoordinatordetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVocationalcoordinatordetailComponent extends BaseComponent<VocationalcoordinatordetailModel> implements OnInit {
  vocationalcoordinatordetailForm: FormGroup;
  vocationalcoordinatordetailModel: VocationalcoordinatordetailModel;

  stateList: [DropdownModel];
  divisionList: DropdownModel[];
  districtList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vocationalcoordinatordetailService: VocationalcoordinatordetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vocationalcoordinatordetail Model
    this.vocationalcoordinatordetailModel = new VocationalcoordinatordetailModel();
  }

  ngOnInit(): void {

    this.vocationalcoordinatordetailService.getStateDivisions().subscribe(results => {

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
            this.vocationalcoordinatordetailModel = new VocationalcoordinatordetailModel();

          } else {
            var vocationalcoordinatordetailId: string = params.get('vocationalcoordinatordetailId')

            this.vocationalcoordinatordetailService.getVocationalcoordinatordetailById(vocationalcoordinatordetailId)
              .subscribe((response: any) => {
                this.vocationalcoordinatordetailModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vocationalcoordinatordetailModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vocationalcoordinatordetailModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vocationalcoordinatordetailForm = this.createVocationalcoordinatordetailForm();                
                this.onChangeDivision(this.vocationalcoordinatordetailModel.DivisionId);
              });
          }
        }
      });
    });

    this.vocationalcoordinatordetailForm = this.createVocationalcoordinatordetailForm();
  }

  onChangeState(stateId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
      this.divisionList = response.Results;
      this.districtList = <DropdownModel[]>[];
    });
  }

  onChangeDivision(divisionId: any) {
    var stateCode = this.vocationalcoordinatordetailForm.get('StateCode').value;

    this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });
  }

  saveOrUpdateVocationalcoordinatordetailDetails() {
    if (!this.vocationalcoordinatordetailForm.valid) {
      this.validateAllFormFields(this.vocationalcoordinatordetailForm);  
      return;
    }

    this.setValueFromFormGroup(this.vocationalcoordinatordetailForm, this.vocationalcoordinatordetailModel);

    this.vocationalcoordinatordetailService.createOrUpdateVocationalcoordinatordetail(this.vocationalcoordinatordetailModel)
      .subscribe((vocationalcoordinatordetailResp: any) => {

        if (vocationalcoordinatordetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Vocationalcoordinatordetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vocationalcoordinatordetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Vocationalcoordinatordetail deletion errors =>', error);
      });
  }

  //Create vocationalcoordinatordetail form and returns {FormGroup}
  createVocationalcoordinatordetailForm(): FormGroup {
    return this.formBuilder.group({
      VocationalcoordinatordetailId: new FormControl(this.vocationalcoordinatordetailModel.VocationalcoordinatordetailId),
      StateCode: new FormControl({ value: this.vocationalcoordinatordetailModel.StateCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DivisionId: new FormControl({ value: this.vocationalcoordinatordetailModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictCode: new FormControl({ value: this.vocationalcoordinatordetailModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      BlockName: new FormControl({ value: this.vocationalcoordinatordetailModel.BlockName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Address: new FormControl({ value: this.vocationalcoordinatordetailModel.Address, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      City: new FormControl({ value: this.vocationalcoordinatordetailModel.City, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Pincode: new FormControl({ value: this.vocationalcoordinatordetailModel.Pincode, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      BusinessType: new FormControl({ value: this.vocationalcoordinatordetailModel.BusinessType, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      EmployeeCount: new FormControl({ value: this.vocationalcoordinatordetailModel.EmployeeCount, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Outlets: new FormControl({ value: this.vocationalcoordinatordetailModel.Outlets, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Contact1: new FormControl({ value: this.vocationalcoordinatordetailModel.Contact1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Mobile1: new FormControl({ value: this.vocationalcoordinatordetailModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Designation1: new FormControl({ value: this.vocationalcoordinatordetailModel.Designation1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      EmailId1: new FormControl({ value: this.vocationalcoordinatordetailModel.EmailId1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Email)]),
      Contact2: new FormControl({ value: this.vocationalcoordinatordetailModel.Contact2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Mobile2: new FormControl({ value: this.vocationalcoordinatordetailModel.Mobile2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      Designation2: new FormControl({ value: this.vocationalcoordinatordetailModel.Designation2, disabled: this.PageRights.IsReadOnly },  Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      EmailId2: new FormControl({ value: this.vocationalcoordinatordetailModel.EmailId2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Email)),
      IsActive: new FormControl({ value: this.vocationalcoordinatordetailModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
