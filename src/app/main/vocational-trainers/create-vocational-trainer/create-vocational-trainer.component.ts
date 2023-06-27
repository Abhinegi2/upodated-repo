import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VocationalTrainerService } from '../vocational-trainer.service';
import { VocationalTrainerModel } from '../vocational-trainer.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { AccountService } from 'app/main/accounts/account.service';

@Component({
  selector: 'vocational-trainer',
  templateUrl: './create-vocational-trainer.component.html',
  styleUrls: ['./create-vocational-trainer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVocationalTrainerComponent extends BaseComponent<VocationalTrainerModel> implements OnInit {
  vocationalTrainerForm: FormGroup;
  vocationalTrainerModel: VocationalTrainerModel;
  // accountModel: AccountModel;
  // vtpList: [DropdownModel];
  socialCategoryList: [DropdownModel];
  // natureOfAppointmentList: [DropdownModel];
  academicQualificationList: [DropdownModel];
  professionalQualificationList: [DropdownModel];
  industryTrainingExperienceList: [DropdownModel];
  genderList: [DropdownModel];
  // vocationalCoordinatorList: any;
  vtList: [DropdownModel];
  filteredVTItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,

    private vocationalTrainerService: VocationalTrainerService,
    private accountService: AccountService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vocationalTrainer Model
    this.vocationalTrainerModel = new VocationalTrainerModel();
    //this.vocationalTrainerModel = new VocationalTrainerModel().getVocationalTrainerTestData();
    // this.accountModel = new AccountModel();

    this.vocationalTrainerForm = this.createVocationalTrainerForm();
  }

  ngOnInit(): void {
    this.vocationalTrainerService.getDropdownforVocationalTrainer(this.UserModel).subscribe((results) => {

      if (results[0].Success) {
        this.vtList = results[0].Results;
        this.filteredVTItems = this.vtList.slice();
      }

      if (results[1].Success) {
        this.socialCategoryList = results[1].Results;
      }

      // if (results[2].Success) {
      //   this.natureOfAppointmentList = results[2].Results;
      // }

      if (results[2].Success) {
        this.academicQualificationList = results[2].Results;
      }

      if (results[3].Success) {
        this.professionalQualificationList = results[3].Results;
      }

      if (results[4].Success) {
        this.industryTrainingExperienceList = results[4].Results;
      }

      if (results[5].Success) {
        this.genderList = results[5].Results;
      }
      console.log("Hello Vocational Trainer");

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vocationalTrainerModel = new VocationalTrainerModel();

          } else {
            var vtId: string = params.get('vtId')

            this.vocationalTrainerService.getVocationalTrainerById(vtId)
              .subscribe((response: any) => {
                this.vocationalTrainerModel = response.Result;

                if (results[7].Success) {
                  this.vtList = results[7].Results;
                  this.filteredVTItems = this.vtList.slice();
                }

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.vocationalTrainerModel.RequestType = this.Constants.PageType.Edit;
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vocationalTrainerModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                  console.log("inside view");
                }

                if (this.vocationalTrainerModel.DateOfResignation != null) {
                  this.vocationalTrainerForm.get("DateOfResignation").setValue(this.getDateValue(this.vocationalTrainerModel.DateOfResignation));
                  let dateOfResignationCtrl = this.vocationalTrainerForm.get("DateOfResignation");
                  this.onChangeDateEnableDisableCheckBox(this.vocationalTrainerForm, dateOfResignationCtrl);
                }

                // this.onChangeVTP(this.vocationalTrainerModel.VTPId);
                this.onChangeVT(this.vocationalTrainerModel.VTId);

                this.vocationalTrainerForm = this.createVocationalTrainerForm();
              });
          }
        }
      });
    });
  }

  // onChangeVTP(vtpId) {
  //   this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinatorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }).subscribe((response) => {
  //     if (response.Success) {
  //       this.vocationalCoordinatorList = response.Results;
  //     }
  //   });
  // }

  onChangeVT(accountId) {
    this.accountService.getAccountById(accountId).subscribe((response: any) => {
      var accountModel = response.Result;
      this.vocationalTrainerForm.controls['Email'].setValue(accountModel.EmailId);
      this.vocationalTrainerForm.controls['Name'].disable();
      this.vocationalTrainerForm.controls['Email'].disable();
      this.vocationalTrainerForm.controls['Mobile'].setValue(accountModel.Mobile);
      this.vocationalTrainerForm.controls['Mobile'].disable();
    });
  }

  saveOrUpdateVocationalTrainerDetails() {
    if (!this.vocationalTrainerForm.valid) {
      this.validateAllFormFields(this.vocationalTrainerForm);
      return;
    }

    this.setValueFromFormGroup(this.vocationalTrainerForm, this.vocationalTrainerModel);
    this.vocationalTrainerModel.AcademicYearId = this.UserModel.AcademicYearId;

    this.vocationalTrainerService.createOrUpdateVocationalTrainer(this.vocationalTrainerModel)
      .subscribe((vocationalTrainerResp: any) => {

        if (vocationalTrainerResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VocationalTrainer.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vocationalTrainerResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VocationalTrainer deletion errors =>', error);
      });
  }

  //Create vocationalTrainer form and returns {FormGroup}
  createVocationalTrainerForm(): FormGroup {
    return this.formBuilder.group({
      // VTId: new FormControl(this.vocationalTrainerModel.VTId),
      VTId: new FormControl({ value: this.vocationalTrainerModel.VTId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      AcademicYearId: new FormControl(this.vocationalTrainerModel.AcademicYearId),
      // VTPId: new FormControl({ value: this.vocationalTrainerModel.VTPId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      // VCId: new FormControl({ value: this.vocationalTrainerModel.VCId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      // FirstName: new FormControl({ value: this.vocationalTrainerModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // MiddleName: new FormControl({ value: this.vocationalTrainerModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // LastName: new FormControl({ value: this.vocationalTrainerModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      FullName: new FormControl({ value: this.vocationalTrainerModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      Mobile: new FormControl({ value: this.vocationalTrainerModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.vocationalTrainerModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Email: new FormControl({ value: this.vocationalTrainerModel.Email, disabled: (this.PageRights.IsReadOnly || this.PageRights.ActionType == this.Constants.Actions.Edit) }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Gender: new FormControl({ value: this.vocationalTrainerModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      DateOfBirth: new FormControl({ value: new Date(this.vocationalTrainerModel.DateOfBirth), disabled: this.PageRights.IsReadOnly }, Validators.required),
      SocialCategory: new FormControl({ value: this.vocationalTrainerModel.SocialCategory, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),
      // NatureOfAppointment: new FormControl({ value: this.vocationalTrainerModel.NatureOfAppointment, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),
      AcademicQualification: new FormControl({ value: this.vocationalTrainerModel.AcademicQualification, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
      ProfessionalQualification: new FormControl({ value: this.vocationalTrainerModel.ProfessionalQualification, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
      ProfessionalQualificationDetails: new FormControl({ value: this.vocationalTrainerModel.ProfessionalQualificationDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      IndustryExperienceMonths: new FormControl({ value: this.vocationalTrainerModel.IndustryExperienceMonths, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      TrainingExperienceMonths: new FormControl({ value: this.vocationalTrainerModel.TrainingExperienceMonths, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.Number)),
      AadhaarNumber: new FormControl({ value: this.maskingStudentAadhaarNo(this.vocationalTrainerModel.AadhaarNumber), disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(12), Validators.minLength(12), Validators.pattern(this.Constants.Regex.Number)]),
      DateOfJoining: new FormControl({ value: new Date(this.vocationalTrainerModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfResignation: new FormControl({ value: this.getDateValue(this.vocationalTrainerModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.vocationalTrainerModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
