import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTSchoolSectorService } from '../vt-school-sector.service';
import { VTSchoolSectorModel } from '../vt-school-sector.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vt-school-sector',
  templateUrl: './create-vt-school-sector.component.html',
  styleUrls: ['./create-vt-school-sector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTSchoolSectorComponent extends BaseComponent<VTSchoolSectorModel> implements OnInit {
  vtSchoolSectorForm: FormGroup;
  vtSchoolSectorModel: VTSchoolSectorModel;
  academicYearList: [DropdownModel];
  schoolList: [DropdownModel];
  sectorList: DropdownModel[];
  vtList: [DropdownModel];
  jobRoleList: DropdownModel[];
  filteredSchoolItems: any;
  filteredVTItems: any;
  filteredVCItems: any;
  minAllocationDate: Date;
  selectedVT: any;
  vocationalCoordinatorList: any;

  roleCode: any;
  vcId: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtSchoolSectorService: VTSchoolSectorService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtSchoolSector Model
    this.vtSchoolSectorModel = new VTSchoolSectorModel();
  }

  ngOnInit(): void {
    this.roleCode = this.UserModel.RoleCode;

    this.vtSchoolSectorService.getDropdownforVTSchoolSector(this.UserModel).subscribe((results) => {
      if (this.roleCode !== 'ADM') {
        if (results[0].Success) {
          this.academicYearList = results[0].Results;
        }
      }

      if (results[3].Success) {
        this.vtList = results[3].Results;
        this.filteredVTItems = this.vtList.slice();
      }

      if (results[4].Success) {
        this.vocationalCoordinatorList = results[4].Results;
        this.filteredVCItems = this.vocationalCoordinatorList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtSchoolSectorModel = new VTSchoolSectorModel();
            this.IsLoading = true;
          } else {
            var vtSchoolSectorId: string = params.get('vtSchoolSectorId')

            this.vtSchoolSectorService.getVTSchoolSectorById(vtSchoolSectorId)
              .subscribe((response: any) => {
                this.vtSchoolSectorModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtSchoolSectorModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtSchoolSectorModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeVC(this.vtSchoolSectorModel.VCId).then(response => {
                  this.onChangeAcademicYear(this.vtSchoolSectorModel.AcademicYearId).then(response => {
                    this.onChangeSchool(this.vtSchoolSectorModel.SchoolId).then(response => {
                      this.onChangeSector(this.vtSchoolSectorModel.SectorId).then(response => {
                        this.vtSchoolSectorForm = this.createVTSchoolSectorForm();
                        this.IsLoading = true;
                      });
                    });
                  });
                });
              });
          }
        }
      });
    });
    this.vtSchoolSectorForm = this.createVTSchoolSectorForm();
  }

  onChangeAcademicYear(academicYearId): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.roleCode == 'ADM') {
        this.vcId = this.vtSchoolSectorForm.get('VCId').value;
      }
      else {
        this.vcId = this.UserModel.UserTypeId;
      }
      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.vcId, SelectTitle: "School" }).subscribe((response) => {
        if (response.Success) {
          this.schoolList = response.Results;
          this.filteredSchoolItems = this.schoolList.slice();
        }

        if (this.IsLoading) {
          this.vtSchoolSectorForm.controls['SchoolId'].setValue(null);
          this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
          this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
          this.sectorList = <DropdownModel[]>[];
          this.jobRoleList = <DropdownModel[]>[];
        }
        resolve(true);
      });
    });
  }

  onChangeVC(vcId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'AcademicYearsByVC', RoleId: this.UserModel.RoleCode, UserId: vcId, SelectTitle: 'Academic Year' }).subscribe((response) => {
        if (response.Success) {
          this.academicYearList = response.Results;
        }

        if (this.IsLoading) {
          this.vtSchoolSectorForm.controls['SchoolId'].setValue(null);
          this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
          this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
          this.sectorList = <DropdownModel[]>[];
          this.jobRoleList = <DropdownModel[]>[];
        }
        resolve(true);
      });
    });
  }

  onChangeSchool(schoolId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'SectorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: schoolId, SelectTitle: "Sector" }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (this.IsLoading) {
            this.vtSchoolSectorForm.controls['SectorId'].setValue(null);
            this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
            this.jobRoleList = <DropdownModel[]>[];
          }
        }

        resolve(true);
      });
    });
  }

  onChangeSector(sectorId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: "Job Role" }).subscribe((response) => {
        if (response.Success) {
          this.jobRoleList = response.Results;

          if (this.IsLoading) {
            this.vtSchoolSectorForm.controls['JobRoleId'].setValue(null);
          }
        }

        resolve(true);
      });
    });
  }

  onChangeVT(vtId) {
    if (vtId !== null) {
      this.vtSchoolSectorService.getVocationalTrainerById(vtId).subscribe((response: any) => {
        this.selectedVT = response.Result;
        this.minAllocationDate = new Date(this.selectedVT.DateOfJoining);
      });
    }
  }

  saveOrUpdateVTSchoolSectorDetails() {
    if (!this.vtSchoolSectorForm.valid) {
      this.validateAllFormFields(this.vtSchoolSectorForm);
      return;
    }

    this.setValueFromFormGroup(this.vtSchoolSectorForm, this.vtSchoolSectorModel);
    if (this.roleCode == 'ADM') {
      this.vtSchoolSectorModel.VCId = this.vtSchoolSectorForm.get('VCId').value;
    }
    else {
      this.vtSchoolSectorModel.VCId = this.UserModel.UserTypeId;
    }

    this.vtSchoolSectorService.createOrUpdateVTSchoolSector(this.vtSchoolSectorModel)
      .subscribe((vtSchoolSectorResp: any) => {

        if (vtSchoolSectorResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTSchoolSector.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtSchoolSectorResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTSchoolSector deletion errors =>', error);
      });
  }

  //Create vtSchoolSector form and returns {FormGroup}
  createVTSchoolSectorForm(): FormGroup {
    return this.formBuilder.group({
      VTSchoolSectorId: new FormControl(this.vtSchoolSectorModel.VTSchoolSectorId),
      AcademicYearId: new FormControl({ value: this.vtSchoolSectorModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VTId: new FormControl({ value: this.vtSchoolSectorModel.VTId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VCId: new FormControl({ value: this.vtSchoolSectorModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.vtSchoolSectorModel.SchoolId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.vtSchoolSectorModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.vtSchoolSectorModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfAllocation: new FormControl({ value: new Date(this.vtSchoolSectorModel.DateOfAllocation), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfRemoval: new FormControl({ value: this.getDateValue(this.vtSchoolSectorModel.DateOfRemoval), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.vtSchoolSectorModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
