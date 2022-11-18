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

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtFieldIndustryVisitConductedService: VTFieldIndustryVisitConductedService,
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
      if (response[0].Success) {
        this.classTaughtList = response[0].Results;
      }

      if (response[1].Success) {
        this.moduleTaughtList = response[1].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtFieldIndustryVisitConductedModel = new VTFieldIndustryVisitConductedModel();

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

                this.commonService.GetSectionsByVTClassId({ DataId: this.UserModel.UserTypeId, DataId1: this.vtFieldIndustryVisitConductedModel.ClassTaughtId }).subscribe(response => {
                  if (response.Success) {
                    this.sectionList = response.Results;

                    this.vtFieldIndustryVisitConductedForm = this.createVTFieldIndustryVisitConductedForm();
                  }
                });

              });
          }
        }
      });
    });

    this.vtFieldIndustryVisitConductedForm = this.createVTFieldIndustryVisitConductedForm();
  }

  onChangeClassForTaught(classId): void {
    if (classId != null) {
      this.commonService.GetSectionsByVTClassId({ DataId: this.UserModel.UserTypeId, DataId1: classId }).subscribe(response => {
        if (response.Success) {
          this.sectionList = response.Results;
        }
      });

      let moduleItem = this.vtFieldIndustryVisitConductedForm.get('ModuleId').value;
      if (moduleItem != null && moduleItem.Id != null) {
        this.onChangeCourseModule(moduleItem);
      }
    }

    this.sectionList = <DropdownModel[]>[];
    this.unitList = <DropdownModel[]>[];
    this.sessionList = <DropdownModel[]>[];
    this.unitSessionsModels = <ModuleUnitSessionModel[]>[];

    this.vtFieldIndustryVisitConductedForm.get("SectionIds").setValue(null);

    let studentAttendancesControls = <FormArray>this.vtFieldIndustryVisitConductedForm.get('StudentAttendances');
    studentAttendancesControls.clear();
  }

  onChangeSectionForTaught(sectionId) {
    if (sectionId != null) {
      let classId = this.vtFieldIndustryVisitConductedForm.get("ClassTaughtId").value;

      this.commonService.getStudentsByClassId({ DataId: this.UserModel.UserTypeId, DataId1: classId, DataId2: sectionId }).subscribe(response => {
        if (response.Success) {
          let studentAttendancesControls = <FormArray>this.vtFieldIndustryVisitConductedForm.get('StudentAttendances');
          studentAttendancesControls.clear();

          response.Results.forEach(studentItem => {
            studentAttendancesControls.push(this.formBuilder.group(studentItem));
          });

          let initialFormValues = this.vtFieldIndustryVisitConductedForm.value;
          this.vtFieldIndustryVisitConductedForm.reset(initialFormValues);
        }
      });
    }
    else {
      let studentAttendancesControls = <FormArray>this.vtFieldIndustryVisitConductedForm.get('StudentAttendances');
      studentAttendancesControls.clear();
    }
  }

  onChangeCourseModule(moduleItem): void {
    let classId = this.vtFieldIndustryVisitConductedForm.get('ClassTaughtId').value;

    if (classId != '' && moduleItem.Id != null) {
      this.commonService.GetUnitsByClassAndModuleId({ DataId: classId, DataId1: moduleItem.Id, DataId2: this.UserModel.UserTypeId, SelectTitle: 'Unit Taught' }).subscribe((response: any) => {
        if (response.Success) {
          this.unitList = response.Results;
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
      ClassTaughtId: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.ClassTaughtId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReportingDate: new FormControl({ value: new Date(this.vtFieldIndustryVisitConductedModel.ReportingDate), disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionIds: new FormControl({ value: this.vtFieldIndustryVisitConductedModel.SectionIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
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
