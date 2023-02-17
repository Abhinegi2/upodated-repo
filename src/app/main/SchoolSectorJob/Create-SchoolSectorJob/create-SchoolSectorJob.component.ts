import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolSectorJobService } from '../schoolsectorjob.service';
import { SchoolSectorJobModel } from '../schoolsectorjob.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'schoolsectorjob',
  templateUrl: './create-schoolsectorjob.component.html',
  styleUrls: ['./create-schoolsectorjob.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolSectorJobComponent extends BaseComponent<SchoolSectorJobModel> implements OnInit {
  schoolsectorjobForm: FormGroup;
  schoolsectorjobModel: SchoolSectorJobModel;

  stateList: [DropdownModel];
  divisionList: DropdownModel[];
  districtList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default schoolsectorjob Model
    this.schoolsectorjobModel = new SchoolSectorJobModel();
  }

  ngOnInit(): void {

    this.schoolsectorjobService.getStateDivisions().subscribe(results => {

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
            this.schoolsectorjobModel = new SchoolSectorJobModel();

          } else {
            var schoolsectorjobId: string = params.get('schoolsectorjobId')

            this.schoolsectorjobService.getSchoolSectorJobById(schoolsectorjobId)
              .subscribe((response: any) => {
                this.schoolsectorjobModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.schoolsectorjobModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolsectorjobModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.schoolsectorjobForm = this.createSchoolSectorJobForm();                
                this.onChangeDivision(this.schoolsectorjobModel.DivisionId);
              });
          }
        }
      });
    });

    this.schoolsectorjobForm = this.createSchoolSectorJobForm();
  }

  onChangeState(stateId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
      this.divisionList = response.Results;
      this.districtList = <DropdownModel[]>[];
    });
  }

  onChangeDivision(divisionId: any) {
    var stateCode = this.schoolsectorjobForm.get('StateCode').value;

    this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });
  }

  saveOrUpdateSchoolSectorJobDetails() {
    if (!this.schoolsectorjobForm.valid) {
      this.validateAllFormFields(this.schoolsectorjobForm);  
      return;
    }

    this.setValueFromFormGroup(this.schoolsectorjobForm, this.schoolsectorjobModel);

    this.schoolsectorjobService.createOrUpdateSchoolSectorJob(this.schoolsectorjobModel)
      .subscribe((schoolsectorjobResp: any) => {

        if (schoolsectorjobResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolSectorJob.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolsectorjobResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolSectorJob deletion errors =>', error);
      });
  }

  //Create schoolsectorjob form and returns {FormGroup}
  createSchoolSectorJobForm(): FormGroup {
    return this.formBuilder.group({
      SchoolSectorJobId: new FormControl(this.schoolsectorjobModel.SchoolSectorJobId),
      StateCode: new FormControl({ value: this.schoolsectorjobModel.StateCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DivisionId: new FormControl({ value: this.schoolsectorjobModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictCode: new FormControl({ value: this.schoolsectorjobModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      BlockName: new FormControl({ value: this.schoolsectorjobModel.BlockName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Address: new FormControl({ value: this.schoolsectorjobModel.Address, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      City: new FormControl({ value: this.schoolsectorjobModel.City, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Pincode: new FormControl({ value: this.schoolsectorjobModel.Pincode, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      BusinessType: new FormControl({ value: this.schoolsectorjobModel.BusinessType, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      EmployeeCount: new FormControl({ value: this.schoolsectorjobModel.EmployeeCount, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Outlets: new FormControl({ value: this.schoolsectorjobModel.Outlets, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Contact1: new FormControl({ value: this.schoolsectorjobModel.Contact1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      Mobile1: new FormControl({ value: this.schoolsectorjobModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Designation1: new FormControl({ value: this.schoolsectorjobModel.Designation1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)]),
      EmailId1: new FormControl({ value: this.schoolsectorjobModel.EmailId1, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Email)]),
      Contact2: new FormControl({ value: this.schoolsectorjobModel.Contact2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      Mobile2: new FormControl({ value: this.schoolsectorjobModel.Mobile2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      Designation2: new FormControl({ value: this.schoolsectorjobModel.Designation2, disabled: this.PageRights.IsReadOnly },  Validators.pattern(this.Constants.Regex.AlphaNumericWithTitleCaseSpaceAndSpecialChars)),
      EmailId2: new FormControl({ value: this.schoolsectorjobModel.EmailId2, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Email)),
      IsActive: new FormControl({ value: this.schoolsectorjobModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
