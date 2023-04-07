import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VocationalCoordinatorService } from '../vocational-coordinator.service';
import { VocationalCoordinatorModel } from '../vocational-coordinator.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { AccountService } from 'app/main/accounts/account.service';

@Component({
  selector: 'vocational-coordinator',
  templateUrl: './create-vocational-coordinator.component.html',
  styleUrls: ['./create-vocational-coordinator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVocationalCoordinatorComponent extends BaseComponent<VocationalCoordinatorModel> implements OnInit {
  vocationalCoordinatorForm: FormGroup;
  vocationalCoordinatorModel: VocationalCoordinatorModel;
  vtpList: [DropdownModel];
  natureOfAppointmentList: [DropdownModel];
  genderList: [DropdownModel];
  vcList: [DropdownModel];
  filteredVcItems;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vocationalCoordinatorService: VocationalCoordinatorService,
    private accountService: AccountService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vocationalCoordinator Model
    this.vocationalCoordinatorModel = new VocationalCoordinatorModel();
    //this.vocationalCoordinatorModel = new VocationalCoordinatorModel().getVocationalCoordinatorTestData();

    this.vocationalCoordinatorForm = this.createVocationalCoordinatorForm();
  }

  ngOnInit(): void {

    this.vocationalCoordinatorService.getDropdownforVocationalCoordinators(this.UserModel).subscribe((results: any) => {

      if (results[0].Success) {
        this.genderList = results[0].Results;
      }

      if (results[1].Success) {
        this.vcList = results[1].Results;
        this.filteredVcItems = this.vcList.slice();
      }


      // if (results[0].Success) {
      //   this.vtpList = results[0].Results;
      // }

      // if (results[1].Success) {
      //   this.natureOfAppointmentList = results[1].Results;
      // }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vocationalCoordinatorModel = new VocationalCoordinatorModel();

          } else {
            var vcId: string = params.get('vcId')

            this.vocationalCoordinatorService.getVocationalCoordinatorById(vcId)
              .subscribe((response: any) => {
                console.log(response);
                this.vocationalCoordinatorModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vocationalCoordinatorModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vocationalCoordinatorModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.onChangeVC(this.vocationalCoordinatorModel.VCId);

                // this.vocationalCoordinatorForm = this.createVocationalCoordinatorForm();
                // this.onChangeVC().then(response => {
                // this.onChangeSector(this.schoolsectorjobModel.SectorId).then(response => {
                this.vocationalCoordinatorForm = this.createVocationalCoordinatorForm();
                // this.IsLoading = true;
                // });
                // });
              });
          }
        }
      });
    });
  }


  onChangeVC(VCId) {
    this.accountService.getAccountById(VCId).subscribe((response: any) => {
      var accountModel = response.Result;
      this.vocationalCoordinatorForm.controls['EmailId'].setValue(accountModel.EmailId);
      this.vocationalCoordinatorForm.controls['EmailId'].disable();
      this.vocationalCoordinatorForm.controls['Mobile'].setValue(accountModel.Mobile);
      this.vocationalCoordinatorForm.controls['Mobile'].disable();
    });
    // // var VCName = this.vocationalCoordinatorForm.controls['VCId'].html();
    // var selectedValue = this.vocationalCoordinatorService.getDropDownText(this.mySelect, VCId)[0].name;
    // console.log(selectedValue);
  }


  saveOrUpdateVocationalCoordinatorDetails() {
    if (!this.vocationalCoordinatorForm.valid) {
      this.validateAllFormFields(this.vocationalCoordinatorForm);
      return;
    }

    this.setValueFromFormGroup(this.vocationalCoordinatorForm, this.vocationalCoordinatorModel);
    // this.vocationalCoordinatorModel.AcademicYearId = this.UserModel.AcademicYearId;

    this.vocationalCoordinatorService.createOrUpdateVocationalCoordinator(this.vocationalCoordinatorModel)
      .subscribe((vocationalCoordinatorResp: any) => {

        if (vocationalCoordinatorResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VocationalCoordinator.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vocationalCoordinatorResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VocationalCoordinator deletion errors =>', error);
      });
  }

  //Create vocationalCoordinator form and returns {FormGroup}
  createVocationalCoordinatorForm(): FormGroup {
    return this.formBuilder.group({
      // VCId: new FormControl(this.vocationalCoordinatorModel.VCId),
      VCId: new FormControl({ value: this.vocationalCoordinatorModel.VCId, disabled: this.PageRights.IsReadOnly }),
      // VTPId: new FormControl({ value: this.vocationalCoordinatorModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      // FirstName: new FormControl({ value: this.vocationalCoordinatorModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // MiddleName: new FormControl({ value: this.vocationalCoordinatorModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // LastName: new FormControl({ value: this.vocationalCoordinatorModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      // FullName: new FormControl({ value: this.vocationalCoordinatorModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      Mobile: new FormControl({ value: this.vocationalCoordinatorModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.vocationalCoordinatorModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      EmailId: new FormControl({ value: this.vocationalCoordinatorModel.EmailId, disabled: (this.PageRights.IsReadOnly || this.PageRights.ActionType == this.Constants.Actions.Edit) }, [Validators.required, Validators.maxLength(50), Validators.pattern(this.Constants.Regex.Email)]),
      // NatureOfAppointment: new FormControl({ value: this.vocationalCoordinatorModel.NatureOfAppointment, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100)]),
      Gender: new FormControl({ value: this.vocationalCoordinatorModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50)]),
      DateOfJoining: new FormControl({ value: new Date(this.vocationalCoordinatorModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      //DateOfJoining2: new FormControl({ value: new Date(this.vocationalCoordinatorModel.DateOfJoining2), disabled: this.PageRights.IsReadOnly }, Validators.required),


      DateOfResignation: new FormControl({ value: this.getDateValue(this.vocationalCoordinatorModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.vocationalCoordinatorModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
