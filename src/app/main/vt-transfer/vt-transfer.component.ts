import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { VTTransferService } from './vt-transfer.service';
import { VTTransferModel } from './vt-transfer.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { BaseListComponent } from 'app/common/base-list/base.list.component';

@Component({
  selector: 'vt-transfer',
  templateUrl: './vt-transfer.component.html',
  styleUrls: ['./vt-transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class VTTransferComponent extends BaseListComponent<VTTransferModel> implements OnInit {
  vtTransferForm: FormGroup;
  vtTransferModel: VTTransferModel;

  vtpList: DropdownModel[];
  fromVCList: DropdownModel[];
  toVCList: DropdownModel[];

  fromVTList: DropdownModel[];
  fromSchoolList: DropdownModel[];
  filteredFromVTItems: any;

  toVTList: DropdownModel[];
  filteredToVTItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtTransferService: VTTransferService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar, zone);

    // Set the default vt-transfer Model
    this.vtTransferModel = new VTTransferModel();

    this.vtTransferForm = this.createVTTransferForm();
  }

  ngOnInit(): void {

    this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, SelectTitle: 'Vocational Training Provider' }).subscribe((response) => {
      if (response.Success) {
        this.vtpList = response.Results;

        this.vtTransferForm = this.createVTTransferForm();
      }
    });
  }

  onChangeFromVTP(vtpId) {
    this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinatorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }).subscribe((response) => {
      if (response.Success) {
        this.fromVCList = response.Results;
      }
    });
  }

  onChangeToVTP(vtpId) {
    this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinatorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }).subscribe((response) => {
      if (response.Success) {
        this.toVCList = response.Results;
      }
    });
  }

  onChangeFromVC(vcId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: this.UserModel.RoleCode, ParentId: vcId, SelectTitle: 'Vocational Trainer' }).subscribe((response: any) => {
      this.fromVTList = response.Results;
      this.filteredFromVTItems = this.fromVTList.slice();
    });
  }

  onChangeToVC(vcId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: this.UserModel.RoleCode, ParentId: vcId, SelectTitle: 'Vocational Trainer' }).subscribe((response: any) => {
      this.toVTList = response.Results;
      this.filteredToVTItems = this.toVTList.slice();
    });
  }

  onChangeFromVT(vtId: any) {
    this.vtTransferService.GetSchoolStudentsByVTId(vtId).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'SchoolName', 'SectorName', 'JobRoleName', 'VTName', 'ClassName', 'SectionName', 'StudentCount'];

      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;

      this.fromSchoolList = response.Results

      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  saveVTTransfers() {
    if (!this.vtTransferForm.valid) {
      this.validateAllFormFields(this.vtTransferForm);
      return;
    }

    this.setValueFromFormGroup(this.vtTransferForm, this.vtTransferModel);

    this.vtTransferService.saveVTTransfers(this.vtTransferModel)
      .subscribe((settingResp: any) => {

        if (settingResp.Success) {
          this.dialogService.openShowDialog('<b>User details</b><p>Login Id : ' + settingResp.Result.LoginId + ' <br />Password : ' + settingResp.Result.Password + '</p>');
        }
        else {
          var errorMessages = this.getHtmlMessage(settingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VT Transfer saving errors =>', error);
      });
  }

  //Create vt-transfer form and returns {FormGroup}
  createVTTransferForm(): FormGroup {
    return this.formBuilder.group({
      FromVTPId: new FormControl({ value: this.vtTransferModel.FromVTPId, disabled: false }, Validators.required),
      FromVCId: new FormControl({ value: this.vtTransferModel.FromVCId, disabled: false }, Validators.required),
      FromVTId: new FormControl({ value: this.vtTransferModel.FromVTId, disabled: false }, Validators.required),
      FromSchoolId: new FormControl({ value: this.vtTransferModel.FromSchoolId, disabled: false }, Validators.required),
      ToVTPId: new FormControl({ value: this.vtTransferModel.ToVTPId, disabled: false }, Validators.required),
      ToVCId: new FormControl({ value: this.vtTransferModel.ToVCId, disabled: false }, Validators.required),
      ToVTId: new FormControl({ value: this.vtTransferModel.ToVTId, disabled: false }, Validators.required),
    });
  }
}
