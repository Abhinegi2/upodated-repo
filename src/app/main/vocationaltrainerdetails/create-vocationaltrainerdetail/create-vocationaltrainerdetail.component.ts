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
  vtpList: [DropdownModel];
  socialCategoryList: [DropdownModel];
  natureOfAppointmentList: [DropdownModel];
  academicQualificationList: [DropdownModel];
  professionalQualificationList: [DropdownModel];
  industryTrainingExperienceList: [DropdownModel];
  genderList: [DropdownModel];
  vtList: [DropdownModel];
  filteredVTItems: any;
  vocationalCoordinatorList: any;
  // vcList: [DropdownModel];
  // filteredVCItems;

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

    this.vocationaltrainerdetailService.getDropdownforVocationalTrainerDetail(this.UserModel).subscribe(results => {

      // if (results[0].Success) {
      //   this.vtpList = results[0].Results;
      // }

      if (results[0].Success) {
        this.socialCategoryList = results[0].Results;
      }

      // if (results[2].Success) {
      //   this.natureOfAppointmentList = results[2].Results;
      // }

      if (results[1].Success) {
        this.academicQualificationList = results[1].Results;
      }

      if (results[2].Success) {
        this.professionalQualificationList = results[2].Results;
      }

      if (results[3].Success) {
        this.industryTrainingExperienceList = results[3].Results;
      }

      if (results[4].Success) {
        this.genderList = results[4].Results;
      }

      if (results[5].Success) {
        this.vtList = results[5].Results;
        this.filteredVTItems = this.vtList.slice();
      }

      // if (results[6].Success) {
      //   this.vcList = results[6].Results;
      //   this.filteredVCItems = this.vcList.slice();
      // }

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

                if (this.vocationaltrainerdetailModel.DateOfResignation != null) {
                  this.vocationaltrainerdetailForm.get("DateOfResignation").setValue(this.getDateValue(this.vocationaltrainerdetailModel.DateOfResignation));
                  let dateOfResignationCtrl = this.vocationaltrainerdetailForm.get("DateOfResignation");
                  this.onChangeDateEnableDisableCheckBox(this.vocationaltrainerdetailForm, dateOfResignationCtrl);
                }

                // this.onChangeVTP(this.vocationaltrainerdetailModel.VTPId);


                this.vocationaltrainerdetailForm = this.createVocationaltrainerdetailForm();
                // this.onChangeDivision(this.vocationaltrainerdetailModel.DivisionId);
              });
          }
        }
      });
    });

    this.vocationaltrainerdetailForm = this.createVocationaltrainerdetailForm();
  }

  // onChangeVTP(vtpId) {
  //   this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinatorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }).subscribe((response) => {
  //     if (response.Success) {
  //       this.vocationalCoordinatorList = response.Results;
  //     }
  //   });

  // }
  // onChangeState(stateId: any) {
  //   this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
  //     this.divisionList = response.Results;
  //     this.districtList = <DropdownModel[]>[];
  //   });
  // }

  // onChangeDivision(divisionId: any) {
  //   var stateCode = this.vocationaltrainerdetailForm.get('StateCode').value;

  //   this.commonService.GetMasterDataByType({ DataType: 'Districts', UserId: stateCode, ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
  //     this.districtList = response.Results;
  //   });
  // }

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
      VTId: new FormControl({ value: this.vocationaltrainerdetailModel.VTId, disabled: this.PageRights.IsReadOnly }),
      // AcademicYearId: new FormControl(this.vocationaltrainerdetailModel.AcademicYearId),
      // VTPId: new FormControl({ value: this.vocationaltrainerdetailModel.VTPId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      // VCId: new FormControl({ value: this.vocationaltrainerdetailModel.VCId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      // FirstName: new FormControl({ value: this.vocationaltrainerdetailModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      MiddleName: new FormControl({ value: this.vocationaltrainerdetailModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // LastName: new FormControl({ value: this.vocationaltrainerdetailModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // FullName: new FormControl({ value: this.vocationaltrainerdetailModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      // Mobile: new FormControl({ value: this.vocationaltrainerdetailModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.vocationaltrainerdetailModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      // Email: new FormControl({ value: this.vocationaltrainerdetailModel.Email, disabled: (this.PageRights.IsReadOnly || this.PageRights.ActionType == this.Constants.Actions.Edit) }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Gender: new FormControl({ value: this.vocationaltrainerdetailModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      DateOfBirth: new FormControl({ value: new Date(this.vocationaltrainerdetailModel.DateOfBirth), disabled: this.PageRights.IsReadOnly }, Validators.required),
      SocialCategory: new FormControl({ value: this.vocationaltrainerdetailModel.SocialCategory, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),
      NatureOfAppointment: new FormControl({ value: this.vocationaltrainerdetailModel.NatureOfAppointment, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),
      AcademicQualification: new FormControl({ value: this.vocationaltrainerdetailModel.AcademicQualification, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
      ProfessionalQualification: new FormControl({ value: this.vocationaltrainerdetailModel.ProfessionalQualification, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
      ProfessionalQualificationDetails: new FormControl({ value: this.vocationaltrainerdetailModel.ProfessionalQualificationDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      IndustryExperienceMonths: new FormControl({ value: this.vocationaltrainerdetailModel.IndustryExperienceMonths, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      TrainingExperienceMonths: new FormControl({ value: this.vocationaltrainerdetailModel.TrainingExperienceMonths, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      AadhaarNumber: new FormControl({ value: this.maskingStudentAadhaarNo(this.vocationaltrainerdetailModel.AadhaarNumber), disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(12), Validators.minLength(12), Validators.pattern(this.Constants.Regex.Number)]),
      DateOfJoining: new FormControl({ value: new Date(this.vocationaltrainerdetailModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfResignation: new FormControl({ value: this.getDateValue(this.vocationaltrainerdetailModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.vocationaltrainerdetailModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
