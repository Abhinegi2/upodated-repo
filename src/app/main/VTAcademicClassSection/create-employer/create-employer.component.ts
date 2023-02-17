import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTAcademicClassSectionService } from '../vtacademicclasssection.service';
import { VTAcademicClassSectionModel } from '../vtacademicclasssection.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vtacademicclasssection',
  templateUrl: './create-vtacademicclasssection.component.html',
  styleUrls: ['./create-vtacademicclasssection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTAcademicClassSectionComponent extends BaseComponent<VTAcademicClassSectionModel> implements OnInit {
  vtacademicclasssectionForm: FormGroup;
  vtacademicclasssectionModel: VTAcademicClassSectionModel;

  stateList: [DropdownModel];
  divisionList: DropdownModel[];
  districtList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtacademicclasssectionService: VTAcademicClassSectionService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtacademicclasssection Model
    this.vtacademicclasssectionModel = new VTAcademicClassSectionModel();
  }

  ngOnInit(): void {

    this.vtacademicclasssectionService.getStateDivisions().subscribe(results => {

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
            this.vtacademicclasssectionModel = new VTAcademicClassSectionModel();

          } else {
            var vtacademicclasssectionId: string = params.get('vtacademicclasssectionId')

            this.vtacademicclasssectionService.getVTAcademicClassSectionById(vtacademicclasssectionId)
              .subscribe((response: any) => {
                this.vtacademicclasssectionModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtacademicclasssectionModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtacademicclasssectionModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vtacademicclasssectionForm = this.createVTAcademicClassSectionForm();                
                this.onChangeDivision(this.vtacademicclasssectionModel.DivisionId);
              });
          }
        }
      });
    });

    this.vtacademicclasssectionForm = this.createVTAcademicClassSectionForm();
  }

  onChangeState(stateId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
      this.divisionList = response.Results;
      this.districtList = <DropdownModel[]>[];
    });
  }

  onChangeDivision(divisionId: any) {
    var stateCode = this.vtacademicclasssectionForm.get('StateCode').value;

    this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });
  }

  saveOrUpdateVTAcademicClassSectionDetails() {
    if (!this.vtacademicclasssectionForm.valid) {
      this.validateAllFormFields(this.vtacademicclasssectionForm);  
      return;
    }

    this.setValueFromFormGroup(this.vtacademicclasssectionForm, this.vtacademicclasssectionModel);

    this.vtacademicclasssectionService.createOrUpdateVTAcademicClassSection(this.vtacademicclasssectionModel)
      .subscribe((vtacademicclasssectionResp: any) => {

        if (vtacademicclasssectionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTAcademicClassSection.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtacademicclasssectionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTAcademicClassSection deletion errors =>', error);
      });
  }

  //Create vtacademicclasssection form and returns {FormGroup}
  createVTAcademicClassSectionForm(): FormGroup {
    return this.formBuilder.group({
      VTAcademicClassSectionId: new FormControl(this.vtacademicclasssectionModel.VTAcademicClassSectionId),
      StateCode: new FormControl({ value: this.vtacademicclasssectionModel.StateCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DivisionId: new FormControl({ value: this.vtacademicclasssectionModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictCode: new FormControl({ value: this.vtacademicclasssectionModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      BlockName: new FormControl({ value: this.vtacademicclasssectionModel.BlockName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Address: new FormControl({ value: this.vtacademicclasssectionModel.Address, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      City: new FormControl({ value: this.vtacademicclasssectionModel.City, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Pincode: new FormControl({ value: this.vtacademicclasssectionModel.Pincode, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      BusinessType: new FormControl({ value: this.vtacademicclasssectionModel.BusinessType, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      EmployeeCount: new FormControl({ value: this.vtacademicclasssectionModel.EmployeeCount, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Outlets: new FormControl({ value: this.vtacademicclasssectionModel.Outlets, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Contact1: new FormControl({ value: this.vtacademicclasssectionModel.Contact1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Mobile1: new FormControl({ value: this.vtacademicclasssectionModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Designation1: new FormControl({ value: this.vtacademicclasssectionModel.Designation1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      EmailId1: new FormControl({ value: this.vtacademicclasssectionModel.EmailId1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Email)]),
      Contact2: new FormControl({ value: this.vtacademicclasssectionModel.Contact2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Mobile2: new FormControl({ value: this.vtacademicclasssectionModel.Mobile2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      Designation2: new FormControl({ value: this.vtacademicclasssectionModel.Designation2, disabled: this.PageRights.IsReadOnly },  Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      EmailId2: new FormControl({ value: this.vtacademicclasssectionModel.EmailId2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Email)),
      IsActive: new FormControl({ value: this.vtacademicclasssectionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
