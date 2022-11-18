import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolVEInchargeService } from '../school-ve-incharge.service';
import { SchoolVEInchargeModel } from '../school-ve-incharge.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { UserModel } from 'app/models/user.model';

@Component({
  selector: 'school-ve-incharge',
  templateUrl: './create-school-ve-incharge.component.html',
  styleUrls: ['./create-school-ve-incharge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolVEInchargeComponent extends BaseComponent<SchoolVEInchargeModel> implements OnInit {
  schoolVEInchargeForm: FormGroup;
  schoolVEInchargeModel: SchoolVEInchargeModel;
  vtpId: string;
  vcId: string;
  schoolId: string;
  genderList: [DropdownModel];


  schoolList: DropdownModel[];
  filteredSchoolItems: any;

  vtpList: DropdownModel[];
  filteredVTPItems: any;

  vcList: DropdownModel[];
  filteredVCItems: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolVEInchargeService: SchoolVEInchargeService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default schoolVEIncharge Model
    this.schoolVEInchargeModel = new SchoolVEInchargeModel();
  }

  ngOnInit(): void {

    this.schoolVEInchargeService.initSchoolVEIncharges(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.vtpList = results[0].Results;
        this.filteredVTPItems = this.vtpList.slice();
      }

      if (results[1].Success) {
        this.genderList = results[1].Results;
      }

      if (this.UserModel.RoleCode == 'VT') {
        this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVT', ParentId: this.UserModel.UserTypeId, SelectTitle: 'School' }).subscribe((response: any) => {
          if (response.Success) {
            this.schoolList = response.Results;
            this.filteredSchoolItems = this.schoolList.slice();
          }
        });
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.schoolVEInchargeModel = new SchoolVEInchargeModel();

            if (this.UserModel.RoleCode == "HM") {

              this.commonService.getVTPVCAndSchoolIdByHMId(this.UserModel.UserTypeId).subscribe(response => {
                this.vtpId = response.Result.VTPId;
                this.vcId = response.Result.VCId;
                this.schoolId = response.Result.SchoolId;

                this.schoolVEInchargeForm.get('VTPId').setValue(this.vtpId);
                this.schoolVEInchargeForm.controls['VTPId'].disable();

                this.onChangeVTP(this.vtpId).then(vtpResp => {
                  this.schoolVEInchargeForm.get('VCId').setValue(this.vcId);
                  this.schoolVEInchargeForm.controls['VCId'].disable();
                  this.schoolVEInchargeForm.get('SchoolId').setValue(this.schoolId);
                  this.schoolVEInchargeForm.controls['SchoolId'].disable();

                  this.onChangeVC(this.vcId);
                });
              }, error => {
                console.log(error);
              });
            }

          } else {
            var schoolVEInchargeId: string = params.get('schoolVEInchargeId')

            this.schoolVEInchargeService.getSchoolVEInchargeById(schoolVEInchargeId)
              .subscribe((response: any) => {
                this.schoolVEInchargeModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.schoolVEInchargeModel.RequestType = this.Constants.PageType.Edit;
                  this.schoolVEInchargeForm.get('VTPId').setValue(this.schoolVEInchargeModel.VTPId);

                  this.onChangeVTP(this.schoolVEInchargeModel.VTPId).then(vtpResp => {
                    this.schoolVEInchargeForm.get('VCId').setValue(this.schoolVEInchargeModel.VCId);
                    this.onChangeVC(this.schoolVEInchargeModel.VCId);
                  });
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolVEInchargeModel.RequestType = this.Constants.PageType.View;
                  this.schoolVEInchargeForm.get('VTPId').setValue(this.schoolVEInchargeModel.VTPId);
                  this.schoolVEInchargeForm.controls['VTPId'].disable();

                  this.onChangeVTP(this.schoolVEInchargeModel.VTPId).then(vtpResp => {
                    this.schoolVEInchargeForm.get('VCId').setValue(this.schoolVEInchargeModel.VCId);
                    this.schoolVEInchargeForm.controls['VCId'].disable();

                    this.onChangeVC(this.schoolVEInchargeModel.VCId);
                  });
                  this.PageRights.IsReadOnly = true;
                }

                if (this.schoolVEInchargeModel.DateOfResignationFromRoleSchool != null) {
                  this.schoolVEInchargeForm.get("DateOfResignationFromRoleSchool").setValue(this.getDateValue(this.schoolVEInchargeModel.DateOfResignationFromRoleSchool));
                  let dateOfResignationCtrl = this.schoolVEInchargeForm.get("DateOfResignationFromRoleSchool");
                  this.onChangeDateEnableDisableCheckBox(this.schoolVEInchargeForm, dateOfResignationCtrl);
                }

                this.schoolVEInchargeForm = this.createSchoolVEInchargeForm();
              });

          }
        }
      });
    });

    this.schoolVEInchargeForm = this.createSchoolVEInchargeForm();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false)
        .subscribe((response: any) => {
          if (response.Success) {
            this.filteredSchoolItems = [];
            this.filteredVCItems = [];
            this.vcList = response.Results;
            this.filteredVCItems = this.vcList.slice();

          }

          this.IsLoading = false;
          resolve(true);
        }, error => {
          console.log(error);
          resolve(false);
        });
    });
    return promise;
  }

  onChangeVC(vcId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;

      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.schoolList = response.Results;
          this.filteredSchoolItems = this.schoolList.slice();
        }

        this.IsLoading = false;
        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }

  saveOrUpdateSchoolVEInchargeDetails() {
    if (!this.schoolVEInchargeForm.valid) {
      this.validateAllFormFields(this.schoolVEInchargeForm);
      return;
    }

    this.setValueFromFormGroup(this.schoolVEInchargeForm, this.schoolVEInchargeModel);
    this.schoolVEInchargeModel.VTId = this.UserModel.UserTypeId;

    this.schoolVEInchargeService.createOrUpdateSchoolVEIncharge(this.schoolVEInchargeModel)
      .subscribe((schoolVEInchargeResp: any) => {

        if (schoolVEInchargeResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolVEIncharge.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolVEInchargeResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolVEIncharge deletion errors =>', error);
      });
  }

  //Create schoolVEIncharge form and returns {FormGroup}
  createSchoolVEInchargeForm(): FormGroup {
    return this.formBuilder.group({
      VEIId: new FormControl(this.schoolVEInchargeModel.VEIId),
      VTPId: new FormControl({ value: this.schoolVEInchargeModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.schoolVEInchargeModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.schoolVEInchargeModel.SchoolId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      FirstName: new FormControl({ value: this.schoolVEInchargeModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars), Validators.maxLength(100)]),
      MiddleName: new FormControl({ value: this.schoolVEInchargeModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars), Validators.maxLength(50)]),
      LastName: new FormControl({ value: this.schoolVEInchargeModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars), Validators.maxLength(50)]),
      FullName: new FormControl({ value: this.schoolVEInchargeModel.FullName, disabled: this.PageRights.IsReadOnly }),
      Mobile: new FormControl({ value: this.schoolVEInchargeModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.schoolVEInchargeModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Email: new FormControl({ value: this.schoolVEInchargeModel.Email, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Gender: new FormControl({ value: this.schoolVEInchargeModel.Gender, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfJoining: new FormControl({ value: new Date(this.schoolVEInchargeModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }),
      DateOfResignationFromRoleSchool: new FormControl({ value: this.getDateValue(this.schoolVEInchargeModel.DateOfResignationFromRoleSchool), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.schoolVEInchargeModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}

