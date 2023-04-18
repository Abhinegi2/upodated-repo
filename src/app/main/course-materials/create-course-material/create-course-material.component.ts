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
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

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

  currentAcademicYearId: string;
  academicYearAllList: [DropdownModel];

  academicYearList: [DropdownModel];
  classList: [DropdownModel];
  sectionList: [DropdownModel];

  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  schoolId: string;

  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private courseMaterialService: CourseMaterialService,
    private schoolsectorjobService: SchoolSectorJobService,
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
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.courseMaterialModel = new CourseMaterialModel();

          } else {
            var courseMaterialId: string = params.get('courseMaterialId')

            this.courseMaterialService.getCourseMaterialById(courseMaterialId)
              .subscribe((response: any) => {
                this.courseMaterialModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.Edit;
                  this.setSectorJobRole(this.courseMaterialModel.SSJId);
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }


                if (this.schoolList.length == 1 && this.UserModel.RoleCode == 'VT') {
                  this.courseMaterialForm.controls['SchoolId'].setValue(this.schoolList[0].Id);
                  this.courseMaterialForm.controls['SchoolId'].disable();
                  // this.onChangeSchool(this.schoolList[0].Id);
                }

                this.onChangeSchool(this.schoolList[0].Id).then(sResp => {
                  this.onChangeSector(this.courseMaterialModel.SectorId).then(vvResp => {
                    this.onChangeJobRole(this.courseMaterialModel.JobRoleId).then(vvResp => {
                      this.onChangeAcademicYear(this.courseMaterialModel.AcademicYearId).then(vResp => {
                        this.courseMaterialForm = this.createCourseMaterialForm();
                      });
                    });
                  });
                });
              });
          }
        }
      });
    });
  }


  setEditInputValidation() {
    this.courseMaterialForm.controls['SchoolId'].disable();
    this.courseMaterialForm.controls['SectorId'].disable();
    this.courseMaterialForm.controls['JobRoleId'].disable();
    this.courseMaterialForm.controls['AcademicYearId'].disable();
    this.courseMaterialForm.controls['ClassId'].disable();
    this.courseMaterialForm.controls['SectionId'].disable();
  }

  setSectorJobRole(schoolsectorjobId) {
    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      this.schoolsectorjobService.getSchoolSectorJobById(schoolsectorjobId)
        .subscribe((response: any) => {
          var schoolsectorjobModel = response.Result;

          this.courseMaterialModel.SchoolId = schoolsectorjobModel.SchoolId;
          this.courseMaterialModel.SectorId = schoolsectorjobModel.SectorId;
          this.courseMaterialModel.JobRoleId = schoolsectorjobModel.JobRoleId;
        });
    }
  }

  onChangeSchool(schoolId): Promise<any> {
    this.courseMaterialForm.controls['SectorId'].setValue(null);
    this.courseMaterialForm.controls['JobRoleId'].setValue(null);
    this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
    this.courseMaterialForm.controls['ClassId'].setValue(null);
    this.courseMaterialForm.controls['SectionId'].setValue(null);

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'SectorsBySSJ', ParentId: schoolId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sectors' }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (response.Results.length == 1) {
            var errorMessages = this.getHtmlMessage(["The selected School is not mapped with any <b>Sector</b> and <b>JobRole</b>.<br><br> Please visit the <a href='/schoolsectorjobs'><b>School Sector JobRole</b></a> page and assign a Sector & Jobrole to the required School."]);
            this.dialogService.openShowDialog(errorMessages);
            this.courseMaterialForm.controls['SchoolId'].setValue(null);
          } else if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            console.log(this.sectorList[1].Id);
            this.courseMaterialForm.controls['SectorId'].setValue(this.sectorList[1].Id);
            this.courseMaterialForm.controls['SectorId'].disable();
            this.onChangeSector(this.sectorList[1].Id);
          }
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeSector(sectorId): Promise<any> {

    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.courseMaterialForm.controls['JobRoleId'].setValue(null);
      this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
      this.courseMaterialForm.controls['ClassId'].setValue(null);
      this.courseMaterialForm.controls['SectionId'].setValue(null);

      schoolId = this.courseMaterialForm.get('SchoolId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      var schoolId = this.courseMaterialModel.SchoolId;
      sectorId = this.courseMaterialModel.SectorId;
    }

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'JobRolesBySSJ', DataTypeID1: schoolId, DataTypeID2: sectorId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Job Role" }).subscribe((response) => {

        if (response.Success) {
          this.jobRoleList = response.Results;

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.courseMaterialForm.controls['JobRoleId'].setValue(this.jobRoleList[1].Id);
            this.courseMaterialForm.controls['JobRoleId'].disable();
            this.onChangeJobRole(this.jobRoleList[1].Id);
          }
        }

        resolve(true);
      });
    });
  }


  onChangeJobRole(jobRoleId): Promise<any> {

    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
      this.courseMaterialForm.controls['ClassId'].setValue(null);
      this.courseMaterialForm.controls['SectionId'].setValue(null);

      var schoolId = this.courseMaterialForm.get('SchoolId').value;
      var sectorId = this.courseMaterialForm.get('SectorId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      schoolId = this.courseMaterialModel.SchoolId;
      sectorId = this.courseMaterialModel.SectorId;
      jobRoleId = this.courseMaterialModel.JobRoleId;
    }

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'YearsBySSJ', DataTypeID1: schoolId, DataTypeID2: sectorId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years" }).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;

          if (response.Results.length == 1) {
            var errorMessages = this.getHtmlMessage(["The selected School Sector JobRole is not mapped with any <b>Academic Class Section</b>.<br><br> Please visit the <a href='/vtacademicclasssections'><b>VT Academic Class Sections</b></a> page."]);
            this.dialogService.openShowDialog(errorMessages);
            this.courseMaterialForm.controls['JobRoleId'].setValue(null);
          }

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.courseMaterialForm.controls['AcademicYearId'].setValue(response.Results[1].Id);
            this.courseMaterialForm.controls['AcademicYearId'].disable();
            this.onChangeAcademicYear(response.Results[1].Id);
          }
        }
        resolve(true);
      });
    });
  }


  onChangeAcademicYear(academicYearId): Promise<any> {
    if (this.PageRights.ActionType == this.Constants.Actions.New) {
      this.courseMaterialForm.controls['ClassId'].setValue(null);
      this.courseMaterialForm.controls['SectionId'].setValue(null);

      var schoolId = this.courseMaterialForm.get('SchoolId').value;
      var sectorId = this.courseMaterialForm.get('SectorId').value;
      var jobRoleId = this.courseMaterialForm.get('JobRoleId').value;
    }

    if (this.PageRights.ActionType == this.Constants.Actions.Edit || this.PageRights.ActionType == this.Constants.Actions.View) {
      schoolId = this.courseMaterialModel.SchoolId;
      sectorId = this.courseMaterialModel.SectorId;
      jobRoleId = this.courseMaterialModel.JobRoleId;
      academicYearId = this.courseMaterialModel.AcademicYearId;
    }

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'ClassesByACS', DataTypeID1: schoolId, DataTypeID2: sectorId, DataTypeID3: jobRoleId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes' }).subscribe((response) => {
        if (response.Success) {
          this.classList = response.Results;

          if (response.Results.length == 2 && this.UserModel.RoleCode == 'VT') {
            this.courseMaterialForm.controls['ClassId'].setValue(response.Results[1].Id);
            this.courseMaterialForm.controls['ClassId'].disable();
          }
        }
        resolve(true);
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
      CourseMaterialId: new FormControl(this.courseMaterialModel.CourseMaterialId),
      SchoolId: new FormControl({ value: this.courseMaterialModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.courseMaterialModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.courseMaterialModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),

      AcademicYearId: new FormControl({ value: this.courseMaterialModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),
      ClassId: new FormControl({ value: this.courseMaterialModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionId: new FormControl({ value: this.courseMaterialModel.SectionId, disabled: this.PageRights.IsReadOnly }),

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
