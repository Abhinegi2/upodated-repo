import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolSectorJobService } from '../school-sector-job.service';
import { SchoolSectorJobModel } from '../school-sector-job.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { FuseUtils } from '@fuse/utils';

@Component({
  selector: 'school-sector-job',
  templateUrl: './create-school-sector-job.component.html',
  styleUrls: ['./create-school-sector-job.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolSectorJobComponent extends BaseComponent<SchoolSectorJobModel> implements OnInit {
  schoolSectorJobForm: FormGroup;
  schoolSectorJobModel: SchoolSectorJobModel;
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
    private schoolSectorJobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtClass Model
    this.schoolSectorJobModel = new SchoolSectorJobModel();
    this.schoolSectorJobForm = this.createSchoolSectorJobForm();
  }

  ngOnInit(): void {
    this.schoolSectorJobService.getAcademicYearClassSection(this.UserModel).subscribe(results => {
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
            this.schoolSectorJobModel = new SchoolSectorJobModel();

            if (this.UserModel.RoleCode == 'VC') {
              this.schoolSectorJobModel.VTId = this.UserModel.UserTypeId;

              this.commonService.getVTPByVC(this.UserModel).then(resp => {
                this.schoolSectorJobModel.VTPId = resp[0].Id;
                this.schoolSectorJobModel.VCId = resp[0].Name;

                this.schoolSectorJobForm.get('VTPId').setValue(this.schoolSectorJobModel.VTPId);
                this.schoolSectorJobForm.controls['VTPId'].disable();

                this.onChangeVTP(this.schoolSectorJobModel.VTPId).then(vtpResp => {
                  this.schoolSectorJobForm.get('VCId').setValue(this.schoolSectorJobModel.VCId);
                  this.schoolSectorJobForm.controls['VCId'].disable();

                  this.onChangeVC(this.schoolSectorJobModel.VCId);
                });
              });
            }

          } else {
            var schoolSectorJobId: string = params.get('schoolSectorJobId')

            this.schoolSectorJobService.getSchoolSectorJobById(schoolSectorJobId)
              .subscribe((response: any) => {
                this.schoolSectorJobModel = response.Result;
                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.schoolSectorJobModel.RequestType = this.Constants.PageType.Edit;
                  if (this.UserModel.RoleCode == "HM") {
                    this.schoolSectorJobForm.get('VTPId').setValue(this.schoolSectorJobModel.VTPId);
                    this.schoolSectorJobForm.controls['VTPId'].disable();

                    this.onChangeVTP(this.vtpId).then(vtpResp => {
                      this.schoolSectorJobForm.get('VCId').setValue(this.schoolSectorJobModel.VCId);
                      this.schoolSectorJobForm.controls['VCId'].disable();
                      this.schoolSectorJobForm.get('SchoolId').setValue(this.schoolSectorJobModel.SchoolId);
                      this.schoolSectorJobForm.controls['SchoolId'].disable();

                      this.onChangeVC(this.schoolSectorJobModel.VCId);
                      this.onChangeSchool(this.schoolSectorJobModel.SchoolId);
                    });
                  }

                  if (this.UserModel.RoleCode == 'VC') {
                    this.schoolSectorJobForm.controls['VTPId'].disable();
                    this.schoolSectorJobForm.controls['VCId'].disable();
                  }
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolSectorJobModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                if (this.UserModel.RoleCode == 'VT') {
                  this.schoolSectorJobForm = this.createSchoolSectorJobForm();
                }
                else {
                  this.onChangeVTP(this.schoolSectorJobModel.VTPId).then(vtpResp => {
                    this.onChangeVC(this.schoolSectorJobModel.VCId).then(vcResp => {
                      this.onChangeSchool(this.schoolSectorJobModel.SchoolId).then(schoolResp => {
                        this.schoolSectorJobForm = this.createSchoolSectorJobForm();
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

  saveOrUpdateSchoolSectorJobDetails() {
    if (!this.schoolSectorJobForm.valid) {
      this.validateAllFormFields(this.schoolSectorJobForm);
      return;
    }
    this.setValueFromFormGroup(this.schoolSectorJobForm, this.schoolSectorJobModel);

    if (this.UserModel.RoleCode == 'VT' && this.PageRights.ActionType == this.Constants.Actions.New) {
      this.schoolSectorJobModel.SchoolId = FuseUtils.NewGuid();
    }

    this.schoolSectorJobService.createOrUpdateSchoolSectorJob(this.schoolSectorJobModel)
      .subscribe((schoolSectorJobResp: any) => {

        if (schoolSectorJobResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolSectorJob.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolSectorJobResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolSectorJob deletion errors =>', error);
      });
  }

  //Create vtClass form and returns {FormGroup}
  createSchoolSectorJobForm(): FormGroup {
    return this.formBuilder.group({
      SchoolSectorJobId: new FormControl(this.schoolSectorJobModel.SchoolSectorJobId),
      VTPId: new FormControl({ value: this.schoolSectorJobModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.schoolSectorJobModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.schoolSectorJobModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      VTId: new FormControl({ value: (this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.schoolSectorJobModel.VTId), disabled: this.PageRights.IsReadOnly }),
      AcademicYearId: new FormControl({ value: this.schoolSectorJobModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassId: new FormControl({ value: this.schoolSectorJobModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionIds: new FormControl({ value: this.schoolSectorJobModel.SectionIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsActive: new FormControl({ value: this.schoolSectorJobModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
