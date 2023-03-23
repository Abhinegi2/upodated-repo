import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { HeadMasterService } from '../head-master.service';
import { HeadMasterModel } from '../head-master.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'head-master',
  templateUrl: './create-head-master.component.html',
  styleUrls: ['./create-head-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateHeadMasterComponent extends BaseComponent<HeadMasterModel> implements OnInit {
  headMasterForm: FormGroup;
  headMasterModel: HeadMasterModel;
  genderList: [DropdownModel];
  yearsInSchool: number;

  // vtpList: DropdownModel[];
  // vcList: DropdownModel[];

  schoolList: DropdownModel[];
  filteredSchoolItems: any;

  // vtList: DropdownModel[];
  VtId: any;
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private headMasterService: HeadMasterService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default headMaster Model
    this.headMasterModel = new HeadMasterModel();
    //this.headMasterModel = new HeadMasterModel().getHeadMasterTestData();

    this.headMasterForm = this.createHeadMasterForm();
  }

  ngOnInit(): void {
    this.headMasterService.getDropdownforHeadMaster(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }
      if (results[1].Success) {
        this.genderList = results[1].Results;
      }
      // if (results[2].Success) {
      //   this.vtpList = results[2].Results;
      // }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.headMasterModel = new HeadMasterModel();

            // if (this.UserModel.RoleCode == 'VC') {
            //   this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
            //     this.headMasterModel.VTPId = vtpResp[0].Id;

            // this.onChangeVTP(this.headMasterModel.VTPId).then(vcResp => {
            //   this.headMasterModel.VCId = this.UserModel.UserTypeId;
            //   this.headMasterForm = this.createHeadMasterForm();

            //   this.onChangeVC(this.headMasterModel.VCId);
            // });
            //   });
            // }

          } else {
            var hmId: string = params.get('hmId')

            this.headMasterService.getHeadMasterById(hmId)
              .subscribe((response: any) => {
                this.headMasterModel = response.Result;
                console.log(response.Result);
                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.headMasterModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.headMasterModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeDateCalculateYear(this.headMasterModel.DateOfJoining);
                // this.onChangeVTP(this.headMasterModel.VTPId).then(vtpResp => {
                // this.onChangeVC(this.headMasterModel.VCId).then(vcResp => {
                // this.onChangeSchool(this.headMasterModel.SchoolId).then(sResp => {
                this.headMasterForm = this.createHeadMasterForm();
                // });
                // });
                // });
              });
          }
        }
      });
    });
  }

  // onChangeVTP(vtpId): Promise<any> {
  //   this.IsLoading = true;
  //   let promise = new Promise((resolve, reject) => {
  //     this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false).subscribe((response: any) => {
  //       if (response.Success) {
  //         this.filteredSchoolItems = []
  //         this.vcList = [];
  //         this.vtList = [];
  //         this.vcList = response.Results;
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeVC(vcId): Promise<any> {
  //   this.IsLoading = true;
  //   let promise = new Promise((resolve, reject) => {

  //     this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }, false).subscribe((response: any) => {
  //       if (response.Success) {
  //         this.schoolList = response.Results;
  //         this.filteredSchoolItems = this.schoolList.slice();
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeSchool(schoolId): Promise<any> {
  //   this.IsLoading = true;
  //   let promise = new Promise((resolve, reject) => {

  //     this.commonService.GetMasterDataByType({ DataType: 'TrainersBySchool', ParentId: schoolId, /*SelectTitle: 'Vocational Trainer'*/ }, false).subscribe((response: any) => {
  //       if (response.Success) {
  // this.vtList = response.Results;
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     });
  //   });
  //   return promise;
  // }

  onChangeDateCalculateYear(event) {
    let dateOfJoining = new Date(event.value);
    let today = new Date();
    this.yearsInSchool = today.getFullYear() - dateOfJoining.getFullYear();
    this.headMasterForm.get("YearsInSchool").patchValue(this.yearsInSchool);
  }

  saveOrUpdateHeadMasterDetails() {
    if (!this.headMasterForm.valid) {
      this.validateAllFormFields(this.headMasterForm);

      return;
    }

    this.headMasterModel.YearsInSchool = this.headMasterForm.get("YearsInSchool").value;
    this.setValueFromFormGroup(this.headMasterForm, this.headMasterModel);
    // this.headMasterModel.AcademicYearId = this.UserModel.AcademicYearId;

    // if (this.UserModel.RoleCode == 'VT') {
    //   this.headMasterModel.VTId = this.UserModel.UserTypeId;
    // }

    this.headMasterService.createOrUpdateHeadMaster(this.headMasterModel)
      .subscribe((headMasterResp: any) => {

        if (headMasterResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.HeadMaster.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(headMasterResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('HeadMaster deletion errors =>', error);
      });
  }

  //Create headMaster form and returns {FormGroup}
  createHeadMasterForm(): FormGroup {
    return this.formBuilder.group({
      // VTPId: new FormControl({ value: this.headMasterModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      // VCId: new FormControl({ value: this.headMasterModel.VCId, disabled: this.PageRights.IsReadOnly }),
      // VTId: new FormControl({ value: this.headMasterModel.VTId, disabled: this.PageRights.IsReadOnly }),
      HMId: new FormControl(this.headMasterModel.HMId),
      SchoolId: new FormControl({ value: this.headMasterModel.SchoolId, disabled: this.PageRights.IsReadOnly }, /*Validators.required*/),
      FirstName: new FormControl({ value: this.headMasterModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      MiddleName: new FormControl({ value: this.headMasterModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      LastName: new FormControl({ value: this.headMasterModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      FullName: new FormControl({ value: this.headMasterModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      Mobile: new FormControl({ value: this.headMasterModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.headMasterModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Email: new FormControl({ value: this.headMasterModel.Email, disabled: (this.PageRights.IsReadOnly || this.PageRights.ActionType == this.Constants.Actions.Edit) }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Gender: new FormControl({ value: this.headMasterModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      YearsInSchool: new FormControl({ value: this.headMasterModel.YearsInSchool, disabled: true }, Validators.pattern(this.Constants.Regex.Number)),
      DateOfJoining: new FormControl({ value: new Date(this.headMasterModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfResignation: new FormControl({ value: this.getDateValue(this.headMasterModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.headMasterModel.IsActive, disabled: this.PageRights.IsReadOnly })
    });
  }
}
