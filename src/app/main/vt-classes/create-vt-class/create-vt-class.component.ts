import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTClassService } from '../vt-class.service';
import { VTClassModel } from '../vt-class.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { FuseUtils } from '@fuse/utils';

@Component({
  selector: 'vt-class',
  templateUrl: './create-vt-class.component.html',
  styleUrls: ['./create-vt-class.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTClassComponent extends BaseComponent<VTClassModel> implements OnInit {
  vtClassForm: FormGroup;
  vtClassModel: VTClassModel;
  vtpId: string;
  vcId: string;
  schoolId: string;
  AcademicYearId: string;
  academicYearAllList: [DropdownModel];
  academicYearList: [DropdownModel];
  vtSchoolSectorList: [DropdownModel];

  classList: [DropdownModel];
  sectionList: [DropdownModel];
  aySchoolJobRoleList: [DropdownModel];
  noSectionId = "40b2d9eb-0dbf-11eb-ba32-0a761174c048";

  vtpList: DropdownModel[];
  vtpFilterList: any;

  vcList: DropdownModel[];
  VCList: any = [];

  vtList: DropdownModel[];
  VTList: any = [];

  schoolList: DropdownModel[];
  filteredSchoolItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtClassService: VTClassService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtClass Model
    this.vtClassModel = new VTClassModel();
    this.vtClassForm = this.createVTClassForm();
  }

  ngOnInit(): void {
    this.vtClassService.getAcademicYearClassSection(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpFilterList = results[1].Results;
        this.vtpList = this.vtpFilterList.slice();
      }

      if (results[3].Success) {
        this.classList = results[3].Results;
      }

      if (results[4].Success) {
        this.sectionList = results[4].Results;
        this.sectionList.splice(0, 1);
      }
      if (results[5].Success) {
        this.academicYearAllList = results[5].Results;
      }

      let currentYearItem = this.academicYearAllList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtClassModel = new VTClassModel();

            if (this.UserModel.RoleCode == 'VC') {
              this.vtClassModel.VTId = this.UserModel.UserTypeId;

              this.commonService.getVTPByVC(this.UserModel).then(resp => {
                this.vtClassModel.VTPId = resp[0].Id;
                this.vtClassModel.VCId = resp[0].Name;

                this.vtClassForm.get('VTPId').setValue(this.vtClassModel.VTPId);
                this.vtClassForm.controls['VTPId'].disable();

                this.onChangeVTP(this.vtClassModel.VTPId).then(vtpResp => {
                  this.vtClassForm.get('VCId').setValue(this.vtClassModel.VCId);
                  this.vtClassForm.controls['VCId'].disable();

                  this.onChangeVC(this.vtClassModel.VCId);
                });
              });
            }

          } else {
            var vtClassId: string = params.get('vtClassId')

            this.vtClassService.getVTClassById(vtClassId)
              .subscribe((response: any) => {
                this.vtClassModel = response.Result;
                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.vtClassModel.RequestType = this.Constants.PageType.Edit;
                  if (this.UserModel.RoleCode == "HM") {
                    this.vtClassForm.get('VTPId').setValue(this.vtClassModel.VTPId);
                    this.vtClassForm.controls['VTPId'].disable();

                    this.onChangeVTP(this.vtpId).then(vtpResp => {
                      this.vtClassForm.get('VCId').setValue(this.vtClassModel.VCId);
                      this.vtClassForm.controls['VCId'].disable();
                      this.vtClassForm.get('SchoolId').setValue(this.vtClassModel.SchoolId);
                      this.vtClassForm.controls['SchoolId'].disable();

                      this.onChangeVC(this.vtClassModel.VCId);
                      this.onChangeSchool(this.vtClassModel.SchoolId);
                    });
                  }

                  if (this.UserModel.RoleCode == 'VC') {
                    this.vtClassForm.controls['VTPId'].disable();
                    this.vtClassForm.controls['VCId'].disable();
                  }
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtClassModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                if (this.UserModel.RoleCode == 'VT') {
                  this.vtClassForm = this.createVTClassForm();
                }
                else {
                  this.onChangeVTP(this.vtClassModel.VTPId).then(vtpResp => {
                    this.onChangeVC(this.vtClassModel.VCId).then(vcResp => {
                      this.onChangeSchool(this.vtClassModel.SchoolId).then(schoolResp => {
                        this.vtClassForm = this.createVTClassForm();
                      });
                    });
                  });
                }

              });
          }
        }
      });
    });
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      let vcRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        vcRequest = this.commonService.GetVCByHMId(this.AcademicYearId, this.UserModel.UserTypeId, vtpId);
      }
      else {
        vcRequest = this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false);
      }

      vcRequest.subscribe((response: any) => {
        if (response.Success) {
          this.VCList = [];
          this.vtList = [];
          this.filteredSchoolItems = [];

          this.VCList = response.Results;
          this.vcList = this.VCList.slice();
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

      let schoolRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        schoolRequest = this.commonService.GetSchoolByHMId(this.AcademicYearId, this.UserModel.UserTypeId, vcId);
      }
      else {
        schoolRequest = this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }, false);
      }

      schoolRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vcId = vcId;
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

  onChangeSchool(schoolId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;

      let vtRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        vtRequest = this.commonService.GetVTBySchoolIdHMId(this.AcademicYearId, this.UserModel.UserTypeId, this.vcId, schoolId);
      }
      else {
        vtRequest = this.commonService.GetMasterDataByType({ DataType: 'TrainersBySchool', ParentId: schoolId, SelectTitle: 'Vocational Trainer' }, false);
      }

      vtRequest.subscribe((response: any) => {
        if (response.Success) {
          this.VTList = response.Results;
          this.vtList = this.VTList.slice();
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

  onSectionChange(selectedSectionIds) {
    if (selectedSectionIds.length == 0) {
      this.sectionList.forEach(sectionItem => {
        sectionItem.IsDisabled = false;
      });
    }
    else {
      if (selectedSectionIds[0] == this.noSectionId) {
        this.sectionList.forEach(sectionItem => {
          if (sectionItem.Id != selectedSectionIds[0]) {
            sectionItem.IsDisabled = true;
          }
        });
      }
      else {
        let sectionItem = this.sectionList.find(s => s.Id == this.noSectionId);
        sectionItem.IsDisabled = true;
      }
    }
  }

  saveOrUpdateVTClassDetails() {
    if (!this.vtClassForm.valid) {
      this.validateAllFormFields(this.vtClassForm);
      return;
    }
    this.setValueFromFormGroup(this.vtClassForm, this.vtClassModel);

    if (this.UserModel.RoleCode == 'VT' && this.PageRights.ActionType == this.Constants.Actions.New) {
      this.vtClassModel.SchoolId = FuseUtils.NewGuid();
    }

    this.vtClassService.createOrUpdateVTClass(this.vtClassModel)
      .subscribe((vtClassResp: any) => {

        if (vtClassResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTClass.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtClassResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTClass deletion errors =>', error);
      });
  }

  //Create vtClass form and returns {FormGroup}
  createVTClassForm(): FormGroup {
    return this.formBuilder.group({
      VTClassId: new FormControl(this.vtClassModel.VTClassId),
      VTPId: new FormControl({ value: this.vtClassModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.vtClassModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.vtClassModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      VTId: new FormControl({ value: (this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.vtClassModel.VTId), disabled: this.PageRights.IsReadOnly }),
      AcademicYearId: new FormControl({ value: this.vtClassModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassId: new FormControl({ value: this.vtClassModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionIds: new FormControl({ value: this.vtClassModel.SectionIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsActive: new FormControl({ value: this.vtClassModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
