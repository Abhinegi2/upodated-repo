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

  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];
  academicYearList: [DropdownModel];
  classList: [DropdownModel];

  SchoolInputId: string;
  SectorInputId: string;
  JobRoleInputId: string;
  AcademicYearInputId: string;
  ClassInputId: string;
  CanUserChangeInput: boolean;

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
        this.loadFormInputs(this.schoolList, 'SchoolId');
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.courseMaterialModel = new CourseMaterialModel();

            this.CanUserChangeInput = true;

          } else {
            var courseMaterialId: string = params.get('courseMaterialId')

            this.courseMaterialService.getCourseMaterialById(courseMaterialId)
              .subscribe((response: any) => {
                this.courseMaterialModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.Edit;
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.courseMaterialModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.schoolsectorjobService.getSchoolSectorJobById(this.courseMaterialModel.SSJId)
                  .subscribe((response: any) => {
                    var schoolsectorjobModel = response.Result;

                    this.courseMaterialModel.SchoolId = schoolsectorjobModel.SchoolId;
                    this.courseMaterialModel.SectorId = schoolsectorjobModel.SectorId;
                    this.courseMaterialModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                    this.onChangeSchool(this.courseMaterialModel.SchoolId).then(sResp => {
                      this.onChangeSector(this.courseMaterialModel.SectorId).then(vvResp => {
                        this.onChangeJobRole(this.courseMaterialModel.JobRoleId).then(vvResp => {
                          this.onChangeAcademicYear(this.courseMaterialModel.AcademicYearId).then(vResp => {
                            this.courseMaterialForm = this.createCourseMaterialForm();
                          });
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

  onChangeSchool(schoolId): Promise<any> {
    this.resetInputsAfter('School');
    this.setFormInputs();

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'SectorsBySSJ', ParentId: schoolId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sectors'
      }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (response.Results.length == 1) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidSchoolSectorJob]));
            this.courseMaterialForm.controls['SchoolId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'SectorId');
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeSector(sectorId): Promise<any> {
    this.resetInputsAfter('Sector');
    this.setFormInputs();

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'JobRolesBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: sectorId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Job Role"
      }).subscribe((response) => {

        if (response.Success) {
          this.jobRoleList = response.Results;
          this.loadFormInputs(response.Results, 'JobRoleId');
        }

        resolve(true);
      });
    });
  }


  onChangeJobRole(jobRoleId): Promise<any> {
    this.resetInputsAfter('JobRole');
    this.setFormInputs();

    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'YearsBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years"
      }).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;

          if (response.Results.length == 1) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidVTACS]));
            this.courseMaterialForm.controls['JobRoleId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'AcademicYearId');
        }
        resolve(true);
      });
    });
  }


  onChangeAcademicYear(academicYearId): Promise<any> {
    this.resetInputsAfter('AcademicYear');
    this.setFormInputs();

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'ClassesByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes'
      }).subscribe((response) => {

        if (response.Success) {
          this.classList = response.Results;
          this.loadFormInputs(response.Results, 'ClassId');
        }
        resolve(true);
      });
    });

    this.setUserAction();

    return promise;
  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.courseMaterialForm.get('SchoolId').value : this.courseMaterialModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.courseMaterialForm.get('SectorId').value : this.courseMaterialModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.courseMaterialForm.get('JobRoleId').value : this.courseMaterialModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.courseMaterialForm.get('AcademicYearId').value : this.courseMaterialModel.AcademicYearId;
    this.ClassInputId = this.CanUserChangeInput == true ? this.courseMaterialForm.get('ClassId').value : this.courseMaterialModel.ClassId;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.courseMaterialForm.controls[InputName].enable();
    }

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.courseMaterialForm.controls[InputName].setValue(inputId);
      this.courseMaterialForm.controls[InputName].disable();
      if (InputName == 'SchoolId') {
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        this.onChangeJobRole(inputId);
      } else if (InputName == 'AcademicYearId') {
        this.onChangeAcademicYear(inputId);
      }
    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.courseMaterialForm.controls['SectorId'].setValue(null);
      this.courseMaterialForm.controls['JobRoleId'].setValue(null);
      this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
      this.courseMaterialForm.controls['ClassId'].setValue(null);
    }

    if (input == 'Sector') {
      this.courseMaterialForm.controls['JobRoleId'].setValue(null);
      this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
      this.courseMaterialForm.controls['ClassId'].setValue(null);
    }

    if (input == 'JobRole') {
      this.courseMaterialForm.controls['AcademicYearId'].setValue(null);
      this.courseMaterialForm.controls['ClassId'].setValue(null);
    }

    if (input == 'AcademicYear') {
      this.courseMaterialForm.controls['ClassId'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
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
}
