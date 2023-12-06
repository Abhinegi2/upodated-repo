import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTFieldIndustryVisitConductedService } from '../vt-field-industry-visit-conducted.service';
import { VTFieldIndustryVisitConductedModel } from '../vt-field-industry-visit-conducted.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';
import { StudentAttendanceModel } from 'app/models/student.attendance.model';
import { el } from 'date-fns/locale';
import { FileUploadModel } from 'app/models/file.upload.model';
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

@Component({
  selector: 'vt-field-industry-visit-conducted',
  templateUrl: './create-vt-field-industry-visit-conducted.component.html',
  styleUrls: ['./create-vt-field-industry-visit-conducted.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTFieldIndustryVisitConductedComponent extends BaseComponent<VTFieldIndustryVisitConductedModel> implements OnInit {
  vtFieldIndustryVisitConductedForm: FormGroup;
  vtFieldIndustryVisitConductedModel: VTFieldIndustryVisitConductedModel;
  unitSessionsModels: ModuleUnitSessionModel[];
  studentAttendanceModel: StudentAttendanceModel[];
  sectionList: DropdownModel[];
  dataSource: any;
  displayColumns: string[] = ['StudentName', 'PresentStatus'];
  classTaughtList: [DropdownModel];
  moduleTaughtList: [DropdownModel];
  unitList: DropdownModel[];
  sessionList: DropdownModel[];
  fieldVisitPhotoFile: FileUploadModel;
  minReportingDate: Date;

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
  SectionInputId: string;
  CanUserChangeInput: boolean;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtFieldIndustryVisitConductedService: VTFieldIndustryVisitConductedService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtFieldIndustryVisitConducted Model
    this.vtFieldIndustryVisitConductedModel = new VTFieldIndustryVisitConductedModel();
    this.unitSessionsModels = <ModuleUnitSessionModel[]>[];
    this.fieldVisitPhotoFile = new FileUploadModel();
    this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
  }

  ngOnInit(): void {
    this.vtFieldIndustryVisitConductedService.getDropdownForVTFieldIndustry(this.UserModel).subscribe((response) => {
      if (response[1].Success) {
        this.classTaughtList = response[1].Results;
      }

      if (response[2].Success) {
        this.moduleTaughtList = response[2].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtFieldIndustryVisitConductedModel = new VTFieldIndustryVisitConductedModel();

            if (response[0].Success) {
              this.schoolList = response[0].Results;
              this.filteredSchoolItems = this.schoolList.slice();
              this.loadFormInputs(this.schoolList, 'SchoolId');
            }

            this.CanUserChangeInput = true;

          } else {
            var vtFieldIndustryVisitConductedId: string = params.get('vtFieldIndustryVisitConductedId')

            this.vtFieldIndustryVisitConductedService.getVTFieldIndustryVisitConductedById(vtFieldIndustryVisitConductedId)
              .subscribe((response: any) => {
                this.vtFieldIndustryVisitConductedModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtFieldIndustryVisitConductedModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtFieldIndustryVisitConductedModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.unitSessionsModels = this.vtFieldIndustryVisitConductedModel.UnitSessionsModels;
                this.schoolsectorjobService.getSchoolSectorJobById(this.vtFieldIndustryVisitConductedModel.SSJId)
                  .subscribe((response: any) => {
                    var schoolsectorjobModel = response.Result;

                    this.vtFieldIndustryVisitConductedModel.SchoolId = schoolsectorjobModel.SchoolId;
                    this.vtFieldIndustryVisitConductedModel.SectorId = schoolsectorjobModel.SectorId;
                    this.vtFieldIndustryVisitConductedModel.JobRoleId = schoolsectorjobModel.JobRoleId;
                    this.setInputs(this.vtFieldIndustryVisitConductedModel.SchoolId, 'SchoolId', 'SchoolById').then(sResp => {
                      this.setInputs(this.vtFieldIndustryVisitConductedModel.SectorId, 'SectorId', 'SectorById').then(vvResp => {
                        this.setInputs(this.vtFieldIndustryVisitConductedModel.JobRoleId, 'JobRoleId', 'JobRoleById').then(vvResp => {
                          this.setInputs(this.vtFieldIndustryVisitConductedModel.AcademicYearId, 'AcademicYearId', 'AcademicYearById').then(vResp => {
                            this.setInputs(this.vtFieldIndustryVisitConductedModel.ClassTaughtId, 'ClassTaughtId', 'ClassById').then(vResp => {
                              this.setInputs(this.vtFieldIndustryVisitConductedModel.SectionIds, 'SectionIds', 'SectionById').then(vResp => {
                                this.vtFieldIndustryVisitConductedForm = this.createVTFieldIndustryVisitConductedForm();
                              });
                            });
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
    this.vtFieldIndustryVisitConductedForm = this.createVTFieldIndustryVisitConductedForm();
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
            this.vtFieldIndustryVisitConductedForm.controls['SchoolId'].setValue(null);
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
    this.resetFormInputs();
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'YearsBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years"
      }).subscribe((response) => {

        if (response.Success) {
          this.academicYearList = response.Results;
          if (response.Results.length == 1) {
            this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidVTACS]));
            this.vtFieldIndustryVisitConductedForm.controls['JobRoleId'].setValue(null);
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
      this.commonService.GetMasterDataByType({ DataType: 'ClassesByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes' }).subscribe((response) => {
        if (response.Success) {
          this.classList = response.Results;
          this.loadFormInputs(response.Results, 'ClassTaughtId');
        }
        resolve(true);
      });
    });
    return promise;
  }

  onChangeClassForTaught(classId): Promise<any> {
    this.resetInputsAfter('Class');
    this.setFormInputs();

    console.log(this.SchoolInputId, this.SectorInputId, this.JobRoleInputId, this.AcademicYearInputId, classId);

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'SectionsByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, DataTypeID4: this.AcademicYearInputId, DataTypeID5: classId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sections' }).subscribe((response) => {
        if (response.Success) {
          this.sectionList = response.Results;
        }
        resolve(true);
      });
    });
    return promise;
  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('SchoolId').value : this.vtFieldIndustryVisitConductedModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('SectorId').value : this.vtFieldIndustryVisitConductedModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('JobRoleId').value : this.vtFieldIndustryVisitConductedModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('AcademicYearId').value : this.vtFieldIndustryVisitConductedModel.AcademicYearId;
    this.ClassInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('ClassTaughtId').value : this.vtFieldIndustryVisitConductedModel.ClassTaughtId;
    this.SectionInputId = this.CanUserChangeInput == true ? this.vtFieldIndustryVisitConductedForm.get('SectionIds').value : this.vtFieldIndustryVisitConductedModel.SectionIds;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.vtFieldIndustryVisitConductedForm.controls[InputName].enable();
    }

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.vtFieldIndustryVisitConductedForm.controls[InputName].setValue(inputId);
      this.vtFieldIndustryVisitConductedForm.controls[InputName].disable();

      if (InputName == 'SchoolId') {
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        this.onChangeJobRole(inputId);
      } else if (InputName == 'AcademicYearId') {
        this.onChangeAcademicYear(inputId);
      } else if (InputName == 'ClassTaughtId') {
        this.onChangeClassForTaught(inputId);
      }

    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.vtFieldIndustryVisitConductedForm.controls['SectorId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['JobRoleId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['AcademicYearId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['ClassTaughtId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    }

    if (input == 'Sector') {
      this.vtFieldIndustryVisitConductedForm.controls['JobRoleId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['AcademicYearId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['ClassTaughtId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    }

    if (input == 'JobRole') {
      this.vtFieldIndustryVisitConductedForm.controls['AcademicYearId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['ClassTaughtId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    }

    if (input == 'AcademicYear') {
      this.vtFieldIndustryVisitConductedForm.controls['ClassTaughtId'].setValue(null);
      this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    }

    if (input == 'Class') {
      this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
  }

  resetFormInputs(): void {
    this.vtFieldIndustryVisitConductedForm.controls['AcademicYearId'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['ClassTaughtId'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['SectionIds'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['ReportingDate'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FieldVisitTheme'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FieldVisitActivities'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['ModuleId'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['UnitId'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['SessionIds'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVOrganisation'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVOrganisationAddress'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVDistance'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVPictureFile'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['IsFVPictureFile'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVContactPersonName'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVContactPersonMobile'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVContactPersonEmail'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVContactPersonDesignation'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVOrganisationInterestStatus'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FVOrignisationOJTStatus'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['FeedbackFromOrgnisation'].setValue(null);
    this.vtFieldIndustryVisitConductedForm.controls['Remarks'].setValue(null);
  }

  setInputs(parentId, InputId, dataType): Promise<any> {

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: dataType, ParentId: parentId, SelectTitle: 'Select'
      }).subscribe((response) => {
        if (response.Success) {
          if (InputId == 'SchoolId') {
            this.schoolList = response.Results;
            this.filteredSchoolItems = this.schoolList.slice();
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          } else if (InputId == 'AcademicYearId') {
            this.academicYearList = response.Results;
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          } else if (InputId == 'ClassTaughtId') {
            this.classList = response.Results;
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          } else if (InputId == 'SectionIds') {
            this.sectionList = response.Results;
            this.vtFieldIndustryVisitConductedForm.controls[InputId].disable();
          }
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeSectionForTaught(sectionId) {
    this.setFormInputs();
    if (sectionId != null) {
      let classId = this.vtFieldIndustryVisitConductedForm.get("ClassTaughtId").value;

      this.commonService.GetMasterDataByType({ DataType: 'GetSchoolSectorJobId', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'SSJ' }).subscribe((response) => {
        if (response.Success) {
          let SSJID = response.Results[1].Id;

          this.commonService.getStudentsByClassId({
            DataId: SSJID,
            DataId1: classId,
            DataId2: sectionId
          }).subscribe(response => {
            if (response.Success) {
              let studentAttendancesControls = <FormArray>this.vtFieldIndustryVisitConductedForm.get('StudentAttendances');
              studentAttendancesControls.clear();

              response.Results.forEach(studentItem => {
                studentAttendancesControls.push(this.formBuilder.group(studentItem));
              });

              let initialFormValues = this.vtFieldIndustryVisitConductedForm.value;
            }
          });
        }

      });
    }
    else {
      let studentAttendancesControls = <FormArray>this.vtFieldIndustryVisitConductedForm.get('StudentAttendances');
      studentAttendancesControls.clear();
    }
  }
  onChangeCourseModule(moduleItem): void {
    this.setFormInputs();
    let classId = this.vtFieldIndustryVisitConductedForm.get('ClassTaughtId').value;

    if (classId != '' && moduleItem.Id != null) {

      this.commonService.GetMasterDataByType({ DataType: 'GetSchoolSectorJobId', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'SSJ' }).subscribe((response) => {
        if (response.Success) {
          let SSJID = response.Results[1].Id;

          this.commonService.GetUnitsByClassAndModuleId({ DataId: classId, DataId1: moduleItem.Id, DataId2: SSJID, SelectTitle: 'Unit Taught' }).subscribe((response: any) => {
            if (response.Success) {
              this.unitList = response.Results;
            }
          });
        }
      });
    }
    else {
      this.unitList = <DropdownModel[]>[];
      this.sessionList = <DropdownModel[]>[];
    }
  }

  onChangeUnitsTaught(unitItem): void {
    let classId = this.vtFieldIndustryVisitConductedForm.get('ClassTaughtId').value;

    if (classId != '' && unitItem.Id != null) {
      this.commonService.GetSessionsByUnitId({ DataId: unitItem.Id, SelectTitle: 'Sessions Taught' }).subscribe((response: any) => {
        if (response.Success) {
          this.sessionList = response.Results;
        }
      });
    }
    else {
      this.sessionList = <DropdownModel[]>[];
    }
  }

  addUnitSession() {
    let moduleCtrl = this.vtFieldIndustryVisitConductedForm.get('ModuleId');
    let unitCtrl = this.vtFieldIndustryVisitConductedForm.get('UnitId');
    let sessionIdsCtrl = this.vtFieldIndustryVisitConductedForm.get('SessionIds');

    if (moduleCtrl.value != '' && unitCtrl.value != '' && sessionIdsCtrl.value != '') {
      this.unitSessionsModels.push(
        new ModuleUnitSessionModel({
          ModuleId: moduleCtrl.value.Id, ModuleName: moduleCtrl.value.Name,
          UnitId: unitCtrl.value.Id, UnitName: unitCtrl.value.Name,
          SessionIds: sessionIdsCtrl.value.map(x => x.Id), SessionNames: sessionIdsCtrl.value.map(x => x.Name).join(", ")
        }));

      moduleCtrl.setValue('');
      unitCtrl.setValue('');
      sessionIdsCtrl.setValue('');

      this.unitList = <DropdownModel[]>[];
      this.sessionList = <DropdownModel[]>[];
    }
  }

  removeUnitSession(sessionItem) {
    const sessionIndex = this.unitSessionsModels.indexOf(sessionItem);
    this.unitSessionsModels.splice(sessionIndex, 1);
  }

  uploadedFieldVisitPhotoFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        this.vtFieldIndustryVisitConductedForm.get('FVPictureFile').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.FieldVisit).then((response: FileUploadModel) => {
        this.fieldVisitPhotoFile = response;

        this.vtFieldIndustryVisitConductedForm.get('IsFVPictureFile').setValue(false);
        this.setMandatoryFieldControl(this.vtFieldIndustryVisitConductedForm, 'FVPictureFile', this.Constants.DefaultImageState);
      });
    }
  }

  saveOrUpdateVTFieldIndustryVisitConductedDetails() {
    if (!this.vtFieldIndustryVisitConductedForm.valid) {
      this.validateAllFormFields(this.vtFieldIndustryVisitConductedForm);
      return;
    }

    if (this.unitSessionsModels.length == 0) {
      this.dialogService.openShowDialog("Please add course module taught first!");
      return;
    }

    this.vtFieldIndustryVisitConductedModel = this.vtFieldIndustryVisitConductedService.getFieldIndustryVisitModelFromFormGroup(this.vtFieldIndustryVisitConductedForm);
    this.vtFieldIndustryVisitConductedModel.VTId = this.UserModel.UserTypeId;
    this.vtFieldIndustryVisitConductedModel.UnitSessionsModels = this.unitSessionsModels;
    this.vtFieldIndustryVisitConductedModel.FVPictureFile = (this.fieldVisitPhotoFile.Base64Data != '' ? this.setUploadedFile(this.fieldVisitPhotoFile) : null);

    this.vtFieldIndustryVisitConductedService.createOrUpdateVTFieldIndustryVisitConducted(this.vtFieldIndustryVisitConductedModel)
      .subscribe((vtFieldIndustryVisitConductedResp: any) => {

        if (vtFieldIndustryVisitConductedResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTFieldIndustryVisitConducted.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtFieldIndustryVisitConductedResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTFieldIndustryVisitConducted deletion errors =>', error);
      });
  }

  //Create vtFieldIndustryVisitConducted form and returns {FormGroup}
  createVTFieldIndustryVisitConductedForm(): FormGroup {
    return this.formBuilder.group({
      VTFieldIndustryVisitConductedId: new FormControl(this.vtFieldIndustryVisitConductedModel.VTFieldIndustryVisitConductedId),

      SchoolId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      AcademicYearId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassTaughtId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.ClassTaughtId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionIds: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.SectionIds, disabled: this.PageRights.IsReadOnly }),
      ReportingDate: new FormControl({ value: new Date(this.vtFieldIndustryVisitConductedModel.ReportingDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      FieldVisitTheme: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FieldVisitTheme, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(150)),
      FieldVisitActivities: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FieldVisitActivities, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(200)),
      ModuleId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.ModuleId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50)]),
      UnitId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.UnitId, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50)]),
      SessionIds: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.SessionIds, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50)]),
      FVOrganisation: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVOrganisation, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      FVOrganisationAddress: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVOrganisationAddress, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      FVDistance: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVDistance, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      FVPictureFile: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVPictureFile, disabled: this.PageRights.IsReadOnly }, Validators.required),
      FVContactPersonName: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVContactPersonName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      FVContactPersonMobile: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVContactPersonMobile, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      FVContactPersonEmail: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVContactPersonEmail, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.Email)]),
      FVContactPersonDesignation: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVContactPersonDesignation, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      FVOrganisationInterestStatus: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVOrganisationInterestStatus, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      FVOrignisationOJTStatus: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVOrignisationOJTStatus, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      FeedbackFromOrgnisation: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FeedbackFromOrgnisation, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      Remarks: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.Remarks, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
      FVStudentSafety: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.FVStudentSafety, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      IsFVPictureFile: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
      StudentAttendances: this.formBuilder.array(this.vtFieldIndustryVisitConductedModel.StudentAttendances.map(studentModel => this.setStudentAttendanceFormGroup(studentModel)))
    });
  }

  private setStudentAttendanceFormGroup(studentAttendanceItem) {
    return this.formBuilder.group({
      StudentId: this.formBuilder.control({ value: studentAttendanceItem.StudentId, disabled: true }),
      ClassId: this.formBuilder.control({ value: studentAttendanceItem.ClassId, disabled: true }),
      StudentName: this.formBuilder.control({ value: studentAttendanceItem.StudentName, disabled: true }),
      IsPresent: this.formBuilder.control({ value: studentAttendanceItem.IsPresent, disabled: true })
    });
  }
}
