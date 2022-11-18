import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolService } from '../school.service';
import { SchoolModel } from '../school.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolComponent extends BaseComponent<SchoolModel> implements OnInit {
  schoolForm: FormGroup;
  schoolModel: SchoolModel;
  schoolCategoryList: [DropdownModel];
  academicyearList: [DropdownModel];
  phaseList: [DropdownModel];
  divisionList: [DropdownModel];
  stateList: [DropdownModel];
  districtList: [DropdownModel];
  schoolTypeList: [DropdownModel];
  schoolManagementList: [DropdownModel];
  blockList: [DropdownModel];
  clusterList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default school Model
    this.schoolModel = new SchoolModel();
  }

  ngOnInit(): void {
    this.schoolService.getDropdownforSchool().subscribe((results) => {
      if (results[0].Success) {
        this.schoolCategoryList = results[0].Results;
      }

      if (results[1].Success) {
        this.academicyearList = results[1].Results;
      }

      if (results[2].Success) {
        this.schoolTypeList = results[2].Results;
      }

      if (results[3].Success) {
        this.stateList = results[3].Results;
      }

      if (results[4].Success) {
        this.schoolManagementList = results[4].Results;
      }

      this.route.paramMap.subscribe(params => {

        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.schoolModel = new SchoolModel();

          } else {
            var schoolId: string = params.get('schoolId');

            this.schoolService.getSchoolById(schoolId)
              .subscribe((response: any) => {
                this.schoolModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.schoolModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeAcademicYear(this.schoolModel.AcademicYearId);
                this.onChangeState(this.schoolModel.StateName);
                this.onChangeDivision(this.schoolModel.DivisionId);
                this.onChangeDistrict(this.schoolModel.DistrictCode);
                this.onChangeBlock(this.schoolModel.BlockId);
                this.schoolForm = this.createSchoolForm();
              });
          }
        }
      });
    });

    this.schoolForm = this.createSchoolForm();
  }

  onChangeAcademicYear(academicYearId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'ApprovalPhases', ParentId: academicYearId, SelectTitle: 'Approval Phase' }).subscribe((response: any) => {
      this.phaseList = response.Results;
    });
  }

  onChangeState(stateId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
      this.divisionList = response.Results;
    });
  }

  onChangeDivision(divisionId: any) {
    var stateCode = this.schoolForm.get('StateName').value;

    this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });
  }

  onChangeDistrict(districtId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Blocks', UserId: this.UserModel.DefaultStateId, ParentId: districtId, SelectTitle: 'Block' }).subscribe((response: any) => {
      this.blockList = response.Results;
    });
  }

  onChangeBlock(blockId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Clusters', UserId: this.UserModel.DefaultStateId, ParentId: blockId, SelectTitle: 'Cluster' }).subscribe((response: any) => {
      this.clusterList = response.Results;
    });
  }

  saveOrUpdateSchoolDetails() {
    if (!this.schoolForm.valid) {
      this.validateAllFormFields(this.schoolForm);
      return;
    }

    this.setValueFromFormGroup(this.schoolForm, this.schoolModel);

    this.schoolService.createOrUpdateSchool(this.schoolModel)
      .subscribe((schoolResp: any) => {

        if (schoolResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.School.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('School deletion errors =>', error);
      });
  }

  //Create school form and returns {FormGroup}
  createSchoolForm(): FormGroup {
    return this.formBuilder.group({
      SchoolId: new FormControl(this.schoolModel.SchoolId),
      SchoolName: new FormControl({ value: this.schoolModel.SchoolName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.CharsWithTitleCase), Validators.maxLength(150)]),
      SchoolCategoryId: new FormControl({ value: this.schoolModel.SchoolCategoryId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SchoolTypeId: new FormControl({ value: this.schoolModel.SchoolTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SchoolManagementId: new FormControl({ value: this.schoolModel.SchoolManagementId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Udise: new FormControl({ value: this.schoolModel.Udise, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(11), Validators.minLength(11), Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      AcademicYearId: new FormControl({ value: this.schoolModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      PhaseId: new FormControl({ value: this.schoolModel.PhaseId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      StateName: new FormControl({ value: this.schoolModel.StateName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DivisionId: new FormControl({ value: this.schoolModel.DivisionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DistrictCode: new FormControl({ value: this.schoolModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, Validators.required),      
      BlockId: new FormControl({ value: this.schoolModel.BlockId, disabled: this.PageRights.IsReadOnly }),
      ClusterId: new FormControl({ value: this.schoolModel.ClusterId, disabled: this.PageRights.IsReadOnly }),
      Village: new FormControl({ value: this.schoolModel.Village, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      Panchayat: new FormControl({ value: this.schoolModel.Panchayat, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      Pincode: new FormControl({ value: this.schoolModel.Pincode, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(6), Validators.minLength(6), Validators.pattern(this.Constants.Regex.Number)]),
      Demography: new FormControl({ value: this.schoolModel.Demography, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(250)),
      IsImplemented: new FormControl({ value: this.schoolModel.IsImplemented, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.schoolModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
