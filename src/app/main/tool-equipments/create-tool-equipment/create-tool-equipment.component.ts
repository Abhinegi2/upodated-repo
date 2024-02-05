import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { ToolEquipmentService } from '../tool-equipment.service';
import { ToolEquipmentModel } from '../tool-equipment.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

@Component({
  selector: 'tool-equipment',
  templateUrl: './create-tool-equipment.component.html',
  styleUrls: ['./create-tool-equipment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateToolEquipmentComponent extends BaseComponent<ToolEquipmentModel> implements OnInit {
  toolEquipmentForm: FormGroup;
  toolEquipmentModel: ToolEquipmentModel;
  vtpId: string;
  vcId: string;
  schoolId: string;
  AcademicYearId: string;
  academicYearAllList: [DropdownModel];
  vtpList: DropdownModel[];
  vtpFilterList: any;
  vcList: DropdownModel[];
  VCList: any = [];
  vtList: DropdownModel[];
  VTList: any = [];
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
    private toolEquipmentService: ToolEquipmentService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default toolEquipment Model
    this.toolEquipmentModel = new ToolEquipmentModel();
    this.toolEquipmentForm = this.createToolEquipmentForm();
  }

  ngOnInit(): void {

    this.toolEquipmentService.initToolsAndEquipmentsData(this.UserModel).subscribe(results => {

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.toolEquipmentModel = new ToolEquipmentModel();

            if (results[0].Success) {
              this.schoolList = results[0].Results;
              this.filteredSchoolItems = this.schoolList.slice();
              this.loadFormInputs(this.schoolList, 'SchoolId');
            }

            this.CanUserChangeInput = true;

          } else {
            var toolEquipmentId: string = params.get('toolEquipmentId')

            this.toolEquipmentService.getToolEquipmentById(toolEquipmentId)
              .subscribe((response: any) => {
                this.toolEquipmentModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.toolEquipmentModel.RequestType = this.Constants.PageType.Edit;
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.toolEquipmentModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.schoolsectorjobService.getSchoolSectorJobById(this.toolEquipmentModel.SSJId)
                  .subscribe((response: any) => {
                    var schoolsectorjobModel = response.Result;
                    this.toolEquipmentModel.SchoolId = schoolsectorjobModel.SchoolId;
                    this.toolEquipmentModel.SectorId = schoolsectorjobModel.SectorId;
                    this.toolEquipmentModel.JobRoleId = schoolsectorjobModel.JobRoleId;
                    this.setInputs(this.toolEquipmentModel.SchoolId, 'SchoolId', 'SchoolById').then(sResp => {
                      this.setInputs(this.toolEquipmentModel.SectorId, 'SectorId', 'SectorById').then(vvResp => {
                        this.setInputs(this.toolEquipmentModel.JobRoleId, 'JobRoleId', 'JobRoleById').then(vvResp => {
                          this.setInputs(this.toolEquipmentModel.AcademicYearId, 'AcademicYearId', 'AcademicYearById').then(vResp => {
                            this.toolEquipmentForm = this.createToolEquipmentForm();
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
            this.toolEquipmentForm.controls['SchoolId'].setValue(null);
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
            this.toolEquipmentForm.controls['JobRoleId'].setValue(null);
          }
          this.loadFormInputs(response.Results, 'AcademicYearId');
        }
        resolve(true);
      });
      this.setUserAction();
    });

  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('SchoolId').value : this.toolEquipmentModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('SectorId').value : this.toolEquipmentModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('JobRoleId').value : this.toolEquipmentModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('AcademicYearId').value : this.toolEquipmentModel.AcademicYearId;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.toolEquipmentForm.controls[InputName].enable();
    }

    console.log(response);
    console.log('innside load');

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.toolEquipmentForm.controls[InputName].setValue(inputId);
      this.toolEquipmentForm.controls[InputName].disable();

      if (InputName == 'SchoolId') {
        console.log('inside scg');
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        this.onChangeJobRole(inputId);
      }
    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.toolEquipmentForm.controls['SectorId'].setValue(null);
      this.toolEquipmentForm.controls['JobRoleId'].setValue(null);
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'Sector') {
      this.toolEquipmentForm.controls['JobRoleId'].setValue(null);
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
    }

    if (input == 'JobRole') {
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
  }

  resetFormInputs(): void {
    this.toolEquipmentForm.controls['TEReceiveStatus'].setValue(null);
    this.toolEquipmentForm.controls['ReceiptDate'].setValue(null);
    this.toolEquipmentForm.controls['TEStatus'].setValue(null);
    this.toolEquipmentForm.controls['RMStatus'].setValue(null);
    this.toolEquipmentForm.controls['RMFundStatus'].setValue(null);
    this.toolEquipmentForm.controls['Details'].setValue(null);
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
            this.toolEquipmentForm.controls[InputId].disable();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
            this.toolEquipmentForm.controls[InputId].disable();
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
            this.toolEquipmentForm.controls[InputId].disable();
          } else if (InputId == 'AcademicYearId') {
            this.academicYearList = response.Results;
            this.toolEquipmentForm.controls[InputId].disable();
          }
        }
        resolve(true);
      });

    });
    return promise;
  }

  saveOrUpdateToolEquipmentDetails() {
    if (!this.toolEquipmentForm.valid) {
      this.validateAllFormFields(this.toolEquipmentForm);
      return;
    }
    this.setValueFromFormGroup(this.toolEquipmentForm, this.toolEquipmentModel);

    if (this.UserModel.RoleCode == 'VT') {
      this.toolEquipmentModel.VTId = this.UserModel.UserTypeId;
    }

    this.toolEquipmentService.createOrUpdateToolEquipment(this.toolEquipmentModel)
      .subscribe((toolEquipmentResp: any) => {

        if (toolEquipmentResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.ToolEquipment.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(toolEquipmentResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('ToolEquipment deletion errors =>', error);
      });
  }

  //Create toolEquipment form and returns {FormGroup}
  createToolEquipmentForm(): FormGroup {
    return this.formBuilder.group({
      VTPId: new FormControl({ value: this.toolEquipmentModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.toolEquipmentModel.VCId, disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.toolEquipmentModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      VTId: new FormControl({ value: (this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.toolEquipmentModel.VTId), disabled: this.PageRights.IsReadOnly }),
      ToolEquipmentId: new FormControl(this.toolEquipmentModel.ToolEquipmentId),
      AcademicYearId: new FormControl({ value: this.toolEquipmentModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.toolEquipmentModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.toolEquipmentModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ReceiptDate: new FormControl({ value: this.getDateValue(this.toolEquipmentModel.ReceiptDate), disabled: this.PageRights.IsReadOnly }),
      TEReceiveStatus: new FormControl({ value: this.toolEquipmentModel.TEReceiveStatus, disabled: this.PageRights.IsReadOnly }, Validators.required),
      TEStatus: new FormControl({ value: this.toolEquipmentModel.TEStatus, disabled: this.PageRights.IsReadOnly }),
      RMStatus: new FormControl({ value: this.toolEquipmentModel.RMStatus, disabled: this.PageRights.IsReadOnly }, Validators.required),
      RMFundStatus: new FormControl({ value: this.toolEquipmentModel.RMFundStatus, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Details: new FormControl({ value: this.toolEquipmentModel.Details, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(350)),
    });
  }

  onChangeOnTEReceiveStatusType(chk) {
    if (chk.value == "No") {
      this.toolEquipmentForm.controls["ReceiptDate"].clearValidators();
      this.toolEquipmentForm.controls["ReceiptDate"].setValue(null);
      this.toolEquipmentForm.controls["TEStatus"].clearValidators();
      this.toolEquipmentForm.controls["TEStatus"].setValue(null);
    }
    else {
      this.toolEquipmentForm.controls["ReceiptDate"].setValidators([Validators.required]);
      this.toolEquipmentForm.controls["TEStatus"].setValidators([Validators.required]);
    }

    this.toolEquipmentForm.controls["ReceiptDate"].updateValueAndValidity();
    this.toolEquipmentForm.controls["TEStatus"].updateValueAndValidity();
  }
}
