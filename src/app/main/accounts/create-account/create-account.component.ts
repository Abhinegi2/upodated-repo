import { Component, OnInit, NgZone, ViewEncapsulation, ElementRef } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { AccountService } from '../account.service';
import { AccountModel, AccountWorkLocationModel } from '../account.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { FuseUtils } from '@fuse/utils';

@Component({
  selector: 'account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateAccountComponent extends BaseListComponent<AccountModel> implements OnInit {
  accountForm: FormGroup;
  accountModel: AccountModel;
  roleList: DropdownModel[];

  roleNotAdmin = ['980200d7-de58-4140-ab62-845e5eec08d1', 'cd6b4973-f87f-4887-bff2-6146447d11df'];
  stateList: [DropdownModel];
  divisionList: DropdownModel[];
  districtList: DropdownModel[];
  blockList: DropdownModel[];
  clusterList: DropdownModel[];

  workLocationForm: FormGroup;
  workLocationModel: AccountWorkLocationModel;
  workLocationAction: string = 'add';
  currentWorkLocationIndex: number = 0;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dialogService: DialogService,
    private elRef: ElementRef,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar, zone);

    // Set the default account Model
    this.accountModel = new AccountModel();
    this.roleList = <DropdownModel[]>[];
    this.workLocationAction = 'add';
    this.workLocationModel = new AccountWorkLocationModel();

    this.accountForm = this.createAccountForm();
  }

  ngOnInit(): void {
    this.accountService.getUserDropdowns().subscribe((results) => {
      if (results[0].Success) {
        //  980200d7-de58-4140-ab62-845e5eec08d1	VC	Vocational Coordinator
        //  259b3087-4e2a-435a-accc-cf8980ffbcca	VT	Vocational Trainer
        //  cd6b4973-f87f-4887-bff2-6146447d11df	HM	Head Master	 

        if (this.UserModel.RoleCode == "SUR") {
          this.roleList = results[0].Results;
        }
        else {
          results[0].Results.forEach(roleItem => {
            if (this.roleNotAdmin.indexOf(roleItem.Id) == -1) {
              this.roleList.push(roleItem);
            }
          });
        }
      }

      if (results[1].Success) {
        this.stateList = results[1].Results;
        this.onChangeState(this.UserModel.DefaultStateId);
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.accountModel = new AccountModel();

          } else {
            var accountId: string = params.get('accountId')

            this.accountService.getAccountById(accountId)
              .subscribe((response: any) => {
                this.accountModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.accountModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.accountModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;

                  // Set all roles for view VT/VC/HM role
                  this.roleList = results[0].Results;
                }

                this.onChangeRoleType(this.accountModel.RoleId);
                this.populateWorkLocations();

                this.accountForm = this.createAccountForm();
                this.workLocationForm = this.accountForm.controls.workLocationForm as FormGroup;
              });
          }
        }
      });
    });
  }

  onChangeState(stateId: string): any {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Divisions', ParentId: stateId, SelectTitle: 'Division' }).subscribe((response: any) => {
        if (response.Success) {
          this.divisionList = response.Results;
          this.districtList = <DropdownModel[]>[];
          this.blockList = <DropdownModel[]>[];
          this.clusterList = <DropdownModel[]>[];
        }
        resolve(true);
      })
    });
    return promise;
  }

  onChangeDivision(divisionId: string): any {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Districts', ParentId: divisionId, SelectTitle: 'District' }).subscribe((response: any) => {
        if (response.Success) {
          this.districtList = response.Results;
          this.blockList = <DropdownModel[]>[];
          this.clusterList = <DropdownModel[]>[];
        }
        resolve(true);
      })
    });
    return promise;
  }

  onChangeDistrict(districtId: string): any {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Blocks', ParentId: districtId, SelectTitle: 'District' }).subscribe((response: any) => {
        if (response.Success) {
          this.blockList = response.Results;
          this.clusterList = <DropdownModel[]>[];
        }
        resolve(true);
      })
    });
    return promise;
  }

  onChangeBlock(blockId: any): any {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'Clusters', UserId: this.UserModel.DefaultStateId, ParentId: blockId, SelectTitle: 'Cluster' }).subscribe((response: any) => {
        if (response.Success) {
          this.clusterList = response.Results;
        }
        resolve(true);
      })
    });
    return promise;
  }

  onChangeRoleType(roleId) {
    let workLocationFormGroup: any = this.accountForm.controls.workLocationForm;
    if (roleId == this.Constants.DistrictEducationOfficer || roleId == this.Constants.DistrictResourcePerson) //District Education Officer 
    {
      workLocationFormGroup.controls["StateCode"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DivisionId"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DistrictId"].setValidators([Validators.required]);

      workLocationFormGroup.controls["BlockId"].clearValidators();
    }
    else if (roleId == this.Constants.DivisionEducationOfficer) //Division Education Officer
    {
      workLocationFormGroup.controls["StateCode"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DivisionId"].setValidators([Validators.required]);

      workLocationFormGroup.controls["DistrictId"].clearValidators();
      workLocationFormGroup.controls["BlockId"].clearValidators();
    }
    else if (roleId == this.Constants.BlockEducationOfficer) //Block Education Officer
    {
      workLocationFormGroup.controls["StateCode"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DivisionId"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DistrictId"].setValidators([Validators.required]);
      workLocationFormGroup.controls["BlockId"].setValidators([Validators.required, Validators.maxLength(150)]);
    }
    else if (roleId == this.Constants.BlockResoursePerson) //Block Education Officer
    {
      workLocationFormGroup.controls["StateCode"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DivisionId"].setValidators([Validators.required]);
      workLocationFormGroup.controls["DistrictId"].setValidators([Validators.required]);
      workLocationFormGroup.controls["BlockId"].setValidators([Validators.required, Validators.maxLength(150)]);
    }
    else {
      workLocationFormGroup.controls["StateCode"].clearValidators();
      workLocationFormGroup.controls["DivisionId"].clearValidators();
      workLocationFormGroup.controls["DistrictId"].clearValidators();
      workLocationFormGroup.controls["BlockId"].clearValidators();
    }

    workLocationFormGroup.controls["StateCode"].updateValueAndValidity();
    workLocationFormGroup.controls["DivisionId"].updateValueAndValidity();
    workLocationFormGroup.controls["DistrictId"].updateValueAndValidity();
    workLocationFormGroup.controls["BlockId"].updateValueAndValidity();
  }

  saveOrUpdateAccountDetails() {
    delete this.accountForm.controls['workLocationForm'];
    this.accountForm.updateValueAndValidity();

    if (!this.accountForm.valid) {
      this.validateAllFormFields(this.accountForm);
      return;
    }
    this.setValueFromFormGroup(this.accountForm, this.accountModel);

    this.accountService.createOrUpdateAccount(this.accountModel)
      .subscribe((accountResp: any) => {

        if (accountResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Account.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(accountResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Account deletion errors =>', error);
      });
  }

  //Create account form and returns {FormGroup}
  createAccountForm(): FormGroup {
    return this.formBuilder.group({

      AccountId: new FormControl(this.accountModel.AccountId),
      LoginId: new FormControl({ value: this.accountModel.LoginId, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Password: new FormControl({ value: this.accountModel.Password, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(35), Validators.pattern(this.Constants.Regex.Password)]),
      UserId: new FormControl({ value: this.accountModel.UserId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(40)]),
      UserName: new FormControl({ value: this.accountModel.UserName, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(100)),
      FirstName: new FormControl({ value: this.accountModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(35), Validators.pattern(this.Constants.Regex.FirstCharsCapital)]),
      LastName: new FormControl({ value: this.accountModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(35), Validators.pattern(this.Constants.Regex.FirstCharsCapital)]),
      RoleId: new FormControl({ value: this.accountModel.RoleId, disabled: this.PageRights.IsReadOnly }),
      Designation: new FormControl({ value: this.accountModel.Designation, disabled: this.PageRights.IsReadOnly }),
      EmailId: new FormControl({ value: this.accountModel.EmailId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Mobile: new FormControl({ value: this.accountModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      IsLocked: new FormControl({ value: this.accountModel.IsLocked, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.accountModel.IsActive, disabled: this.PageRights.IsReadOnly }),

      workLocationForm: this.formBuilder.group({
        AccountId: new FormControl(this.accountModel.AccountId),
        StateCode: new FormControl({ value: this.UserModel.DefaultStateId=this.Constants.DefaultStateId, disabled: (this.UserModel.DefaultStateId =this.Constants.DefaultStateId) }),
        DivisionId: new FormControl({ value: this.workLocationModel.DivisionId, disabled: this.PageRights.IsReadOnly }),
        DistrictId: new FormControl({ value: this.workLocationModel.DistrictId, disabled: this.PageRights.IsReadOnly }),
        BlockId: new FormControl({ value: this.workLocationModel.BlockId, disabled: this.PageRights.IsReadOnly }),
        ClusterId: new FormControl({ value: this.workLocationModel.ClusterId, disabled: this.PageRights.IsReadOnly }),
        IsActive: new FormControl({ value: this.workLocationModel.IsActive, disabled: this.PageRights.IsReadOnly })
      })
    });
  }

  populateWorkLocations(): void {
    this.displayedColumns = ['StateName', 'DivisionName', 'DistrictName', 'BlockName', 'ClusterName', 'Actions'];

    this.tableDataSource.data = this.accountModel.WorkLocationModels;
    this.tableDataSource.sort = this.ListSort;
    this.tableDataSource.paginator = this.ListPaginator;
    this.tableDataSource.filteredData = this.tableDataSource.data;
  }

  onAddWorkLocation(): void {
    let workLocationFormGroup: any = this.accountForm.controls.workLocationForm;

    if (workLocationFormGroup.status == 'INVALID') {
      return;
    }

    this.workLocationModel = {
      AccountWorkLocationId: (this.workLocationAction == 'edit' ? this.workLocationModel.AccountWorkLocationId : FuseUtils.NewGuid()),
      AccountId: this.accountModel.AccountId,
      StateCode: workLocationFormGroup.controls["StateCode"].value,
      StateName: this.elRef.nativeElement.querySelector('mat-select[name="stateCode"]').innerText,
      DivisionId: workLocationFormGroup.controls["DivisionId"].value,
      DivisionName: this.elRef.nativeElement.querySelector('mat-select[name="divisionId"]').innerText,
      DistrictId: workLocationFormGroup.controls["DistrictId"].value,
      DistrictName: this.elRef.nativeElement.querySelector('mat-select[name="districtId"]').innerText,
      BlockId: workLocationFormGroup.controls["BlockId"].value,
      BlockName: this.elRef.nativeElement.querySelector('mat-select[name="blockId"]').innerText,
      ClusterId: workLocationFormGroup.controls["ClusterId"].value,
      ClusterName: this.elRef.nativeElement.querySelector('mat-select[name="clusterId"]').innerText,
      Remarks: null,
      IsActive: workLocationFormGroup.controls["IsActive"].value,
      RequestType: (this.workLocationAction == 'add' ? this.Constants.PageType.New : this.Constants.PageType.Edit),
    };

    if (this.workLocationAction == 'add') {
      let workLocations = this.accountModel.WorkLocationModels.filter(wl => wl.StateCode == this.workLocationModel.StateCode && wl.DivisionId == this.workLocationModel.DivisionId && wl.DistrictId == this.workLocationModel.DistrictId && wl.BlockId == this.workLocationModel.BlockId && wl.ClusterId == this.workLocationModel.ClusterId);
      if (workLocations.length > 0) {
        this.dialogService.openShowDialog('Current work location is already exists');
        return;
      }
    }

    if (this.workLocationAction == 'edit') {
      this.accountModel.WorkLocationModels[this.currentWorkLocationIndex] = this.workLocationModel;
    }
    else {
      this.accountModel.WorkLocationModels.push(this.workLocationModel);
    }

    this.populateWorkLocations();
    this.onClearWorkLocation();
    this.scrollToBottom();
  }

  onEditWorkLocation(wlIndex: any): void {
    this.workLocationModel = this.accountModel.WorkLocationModels[wlIndex];
    this.currentWorkLocationIndex = wlIndex;
    this.workLocationAction = 'edit';

    this.onChangeState(this.workLocationModel.StateCode).then(res => {
      this.onChangeDivision(this.workLocationModel.DivisionId).then(res => {
        this.onChangeDistrict(this.workLocationModel.DistrictId).then(res => {
          this.onChangeBlock(this.workLocationModel.BlockId).then(res => {

            let workLocationFormGroup: any = this.accountForm.controls.workLocationForm;

            workLocationFormGroup.controls["StateCode"].patchValue(this.workLocationModel.StateCode);
            workLocationFormGroup.controls["DivisionId"].patchValue(this.workLocationModel.DivisionId);
            workLocationFormGroup.controls["DistrictId"].patchValue(this.workLocationModel.DistrictId);
            workLocationFormGroup.controls["BlockId"].patchValue(this.workLocationModel.BlockId);
            workLocationFormGroup.controls["ClusterId"].patchValue(this.workLocationModel.ClusterId);
          });
        });
      });
    });
  }

  onDeleteWorkLocation(wlIndex: any): void {
    this.accountModel.WorkLocationModels.splice(wlIndex, 1);
    this.populateWorkLocations();
  }

  onClearWorkLocation(): void {
    this.workLocationAction = 'add';
    let workLocationFormGroup: any = this.accountForm.controls.workLocationForm;

    workLocationFormGroup.controls["StateCode"].patchValue(this.UserModel.DefaultStateId);
    workLocationFormGroup.controls["DivisionId"].patchValue('');
    workLocationFormGroup.controls["DistrictId"].patchValue('');
    workLocationFormGroup.controls["BlockId"].patchValue('');
    workLocationFormGroup.controls["ClusterId"].patchValue('');

    this.districtList = <DropdownModel[]>[];

    for (let control in workLocationFormGroup.controls) {
      workLocationFormGroup.controls[control].updateValueAndValidity();
      workLocationFormGroup.controls[control].markAsPristine();
      workLocationFormGroup.controls[control].markAsUntouched();
    }
  }
}
