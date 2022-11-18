import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { CourseMaterialService } from '../course-material.service';
import { CourseMaterialModel } from '../course-material.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'course-material',
  templateUrl: './create-course-material.component.html',
  styleUrls: ['./create-course-material.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateCourseMaterialComponent extends BaseComponent<CourseMaterialModel> implements OnInit {
  courseMaterialForm: FormGroup;
  courseMaterialModel: CourseMaterialModel;
  vtpId: string;
  vcId: string;
  schoolId: string;
  currentAcademicYearId: string;
  academicYearAllList: [DropdownModel];

  academicYearList: [DropdownModel];
  classList: [DropdownModel];

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
    private courseMaterialService: CourseMaterialService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default courseMaterial Model
    this.courseMaterialModel = new CourseMaterialModel();
    this.courseMaterialForm = this.createCourseMaterialForm();
  }

  ngOnInit(): void {

    this.courseMaterialService.getAcademicYearClass(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpFilterList = results[1].Results;
        this.vtpList = this.vtpFilterList.slice();
      }

      if (results[2].Success) {
        this.academicYearAllList = results[2].Results;
      }

      let currentYearItem = this.academicYearAllList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.courseMaterialModel = new CourseMaterialModel();

            if (this.UserModel.RoleCode == 'VC') {
              this.courseMaterialModel.VTId = this.UserModel.UserTypeId;

              this.commonService.getVTPByVC(this.UserModel).then(resp => {
                this.courseMaterialModel.VTPId = resp[0].Id;
                this.courseMaterialModel.VCId = resp[0].Name;

                this.courseMaterialForm.get('VTPId').setValue(this.courseMaterialModel.VTPId);
                this.courseMaterialForm.controls['VTPId'].disable();

                this.onChangeVTP(this.courseMaterialModel.VTPId).then(vtpResp => {
                  this.courseMaterialForm.get('VCId').setValue(this.courseMaterialModel.VCId);
                  this.courseMaterialForm.controls['VCId'].disable();

                  this.onChangeVC(this.courseMaterialModel.VCId);
                  //  this.courseMaterialForm = this.createCourseMaterialForm();
                });
              });
            }

          } else {
            var courseMaterialId: string = params.get('courseMaterialId')

            this.courseMaterialService.getCourseMaterialById(courseMaterialId)
              .subscribe((response: any) => {
                this.courseMaterialModel = response.Result;

                if (this.UserModel.RoleCode == "HM") {
                  this.courseMaterialForm.get('VTPId').setValue(this.courseMaterialModel.VTPId);
                  this.courseMaterialForm.controls['VTPId'].disable();

                  this.onChangeVTP(this.courseMaterialModel.VTPId).then(vtpResp => {
                    this.courseMaterialForm.get('VCId').setValue(this.courseMaterialModel.VCId);
                    this.courseMaterialForm.controls['VCId'].disable();

                    this.onChangeVC(this.courseMaterialModel.VCId).then(vcResp => {
                      this.courseMaterialForm.get('SchoolId').setValue(this.courseMaterialModel.SchoolId);
                      this.courseMaterialForm.controls['SchoolId'].disable();

                      this.onChangeSchool(this.courseMaterialModel.SchoolId).then(schoolResp => {
                        this.courseMaterialForm.get('VTId').setValue(this.courseMaterialModel.VTId);
                        this.courseMaterialForm.get('AcademicYearId').setValue(this.courseMaterialModel.AcademicYearId);

                        this.onChangeAcademicYear().then(schoolResp => {
                          this.courseMaterialForm = this.createCourseMaterialForm();
                        });
                      });
                    });
                  });
                }

                if (this.UserModel.RoleCode == 'VT') {
                  this.courseMaterialForm = this.createCourseMaterialForm();

                  this.onChangeAcademicYear().then(schoolResp => {
                    this.courseMaterialForm = this.createCourseMaterialForm();
                  });
                } else {
                  this.courseMaterialForm.get('VTPId').setValue(this.courseMaterialModel.VTPId);
                  this.courseMaterialForm.controls['VTPId'].disable();
                  this.onChangeVTP(this.courseMaterialModel.VTPId).then(vtpResp => {
                    this.courseMaterialForm.get('VCId').setValue(this.courseMaterialModel.VCId);
                    this.courseMaterialForm.controls['VCId'].disable();

                    this.onChangeVC(this.courseMaterialModel.VCId).then(vcResp => {
                      this.courseMaterialForm.get('SchoolId').setValue(this.courseMaterialModel.SchoolId);
                      this.courseMaterialForm.controls['SchoolId'].disable();

                      this.onChangeSchool(this.courseMaterialModel.SchoolId).then(schoolResp => {
                        this.courseMaterialForm.get('VTId').setValue(this.courseMaterialModel.VTId);
                        this.courseMaterialForm.get('AcademicYearId').setValue(this.courseMaterialModel.AcademicYearId);

                        this.onChangeAcademicYear().then(schoolResp => {
                          this.courseMaterialForm = this.createCourseMaterialForm();
                        });
                      });
                    });
                  });
                }

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.Edit;
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
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
        vcRequest = this.commonService.GetVCByHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, vtpId);
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
        schoolRequest = this.commonService.GetSchoolByHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, vcId);
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
        vtRequest = this.commonService.GetVTBySchoolIdHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, this.vcId, schoolId);
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

  onChangeAcademicYear(): Promise<any> {
    let vtId = this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.courseMaterialForm.get('VTId').value;
    let academicYearId = this.courseMaterialForm.get('AcademicYearId').value;

    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;

      this.commonService.GetMasterDataByType({ DataType: 'ClassesByVTForCM', ParentId: academicYearId, UserId: vtId, SelectTitle: 'Class' }).subscribe((response) => {
        if (response.Success) {
          this.classList = response.Results;
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

  saveOrUpdateCourseMaterialDetails() {
    if (!this.courseMaterialForm.valid) {
      this.validateAllFormFields(this.courseMaterialForm);
      return;
    }

    this.setValueFromFormGroup(this.courseMaterialForm, this.courseMaterialModel);
    if (this.UserModel.RoleCode == 'VT') {
      this.courseMaterialModel.VTId = this.UserModel.UserTypeId;
    }

    this.courseMaterialService.createOrUpdateCourseMaterial(this.courseMaterialModel)
      .subscribe((courseMaterialResp: any) => {

        if (courseMaterialResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.CourseMaterial.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(courseMaterialResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('CourseMaterial deletion errors =>', error);
      });
  }

  //Create courseMaterial form and returns {FormGroup}
  createCourseMaterialForm(): FormGroup {
    return this.formBuilder.group({
      VTPId: new FormControl({ value: this.courseMaterialModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.courseMaterialModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.courseMaterialModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      VTId: new FormControl({ value: (this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.courseMaterialModel.VTId), disabled: this.PageRights.IsReadOnly }),
      CourseMaterialId: new FormControl(this.courseMaterialModel.CourseMaterialId),
      AcademicYearId: new FormControl({ value: this.courseMaterialModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassId: new FormControl({ value: this.courseMaterialModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReceiptDate: new FormControl({ value: this.getDateValue(this.courseMaterialModel.ReceiptDate), disabled: this.PageRights.IsReadOnly }),
      CMStatus: new FormControl({ value: this.courseMaterialModel.CMStatus, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Details: new FormControl({ value: this.courseMaterialModel.Details, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350))
    });
  }

  onChangeOnCMStatusType(chk) {
    if (chk.value == "No") {
      this.courseMaterialForm.controls["ReceiptDate"].clearValidators();
    }
    else {
      this.courseMaterialForm.controls["ReceiptDate"].setValidators([Validators.required]);
    }

    this.courseMaterialForm.controls["ReceiptDate"].updateValueAndValidity();
  }
}
