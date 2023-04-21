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

  // academicYearList: [DropdownModel];
  // sectorList: [DropdownModel];
  // jobRoleList: [DropdownModel];

  vtpList: DropdownModel[];
  vtpFilterList: any;

  vcList: DropdownModel[];
  VCList: any = [];

  vtList: DropdownModel[];
  VTList: any = [];

  // schoolList: DropdownModel[];
  // filteredSchoolItems: any;



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
      //   if (results[0].Success) {
      //     this.vtpFilterList = results[0].Results;
      //     this.vtpList = this.vtpFilterList.slice();
      //   }
      //   if (results[1].Success) {
      //     this.academicYearAllList = results[1].Results;
      //   }

      //   let currentYearItem = this.academicYearAllList.find(ay => ay.IsSelected == true)
      //   if (currentYearItem != null) {
      //     this.AcademicYearId = currentYearItem.Id;
      //   }

      if (results[0].Success) {
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();
        this.loadFormInputs(this.schoolList, 'SchoolId');
      }


      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.toolEquipmentModel = new ToolEquipmentModel();

            this.CanUserChangeInput = true;

            // if (this.UserModel.RoleCode == 'VC') {
            //   this.toolEquipmentModel.VTId = this.UserModel.UserTypeId;

            //   this.commonService.getVTPByVC(this.UserModel).then(resp => {
            //     this.toolEquipmentModel.VTPId = resp[0].Id;
            //     this.toolEquipmentModel.VCId = resp[0].Name;

            //     this.toolEquipmentForm.get('VTPId').setValue(this.toolEquipmentModel.VTPId);
            //     this.toolEquipmentForm.controls['VTPId'].disable();

            //     this.onChangeVTP(this.toolEquipmentModel.VTPId).then(vtpResp => {
            //       this.toolEquipmentForm.get('VCId').setValue(this.toolEquipmentModel.VCId);
            //       this.toolEquipmentForm.controls['VCId'].disable();

            //       this.onChangeVC(this.toolEquipmentModel.VCId);
            //     });
            //   });
            // }
            // else if (this.UserModel.RoleCode == 'VT') {
            //   this.onChangeVT(this.UserModel.UserTypeId).then(vtpResp => {
            //     this.toolEquipmentForm = this.createToolEquipmentForm();
            //   });
            // }
          }
          else {
            var toolEquipmentId: string = params.get('toolEquipmentId')

            this.toolEquipmentService.getToolEquipmentById(toolEquipmentId)
              .subscribe((response: any) => {
                this.toolEquipmentModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                  this.toolEquipmentModel.RequestType = this.Constants.PageType.Edit;

                  // if (this.UserModel.RoleCode == "HM") {

                  //   this.toolEquipmentForm.get('VTPId').setValue(this.toolEquipmentModel.VTPId);
                  //   this.toolEquipmentForm.controls['VTPId'].disable();

                  //   this.onChangeVTP(this.toolEquipmentModel.VTPId).then(vtpResp => {
                  //     this.toolEquipmentForm.get('VCId').setValue(this.toolEquipmentModel.VCId);
                  //     this.toolEquipmentForm.controls['VCId'].disable();
                  //     this.toolEquipmentForm.get('SchoolId').setValue(this.toolEquipmentModel.SchoolId);
                  //     this.toolEquipmentForm.controls['SchoolId'].disable();

                  //     this.onChangeVC(this.toolEquipmentModel.VCId).then(vcResp => {
                  //       this.onChangeSchool(this.toolEquipmentModel.SchoolId).then(schoolResp => {
                  //         this.onChangeVT(this.toolEquipmentModel.VTId).then(vtResp => {

                  //         });
                  //       });
                  //     });
                  //   });
                  //   this.onChangeSector(this.toolEquipmentModel.SectorId);
                  // }
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.toolEquipmentModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                // if (this.UserModel.RoleCode == 'VT') {
                //   this.onChangeVT(this.UserModel.UserTypeId).then(vtpResp => {
                //     this.toolEquipmentForm = this.createToolEquipmentForm();
                //   });
                // }
                else {
                  // this.onChangeVTP(this.toolEquipmentModel.VTPId).then(vtpResp => {
                  //   this.onChangeVC(this.toolEquipmentModel.VCId).then(vcResp => {
                  //     this.onChangeSchool(this.toolEquipmentModel.SchoolId).then(schoolResp => {
                  //       this.onChangeVT(this.toolEquipmentModel.VTId).then(vtResp => {
                  //         this.toolEquipmentForm = this.createToolEquipmentForm();
                  //       });
                  //     });
                  //   });
                  // });
                  // this.onChangeSector(this.toolEquipmentModel.SectorId);

                  this.schoolsectorjobService.getSchoolSectorJobById(this.toolEquipmentModel.SSJId)
                    .subscribe((response: any) => {
                      var schoolsectorjobModel = response.Result;

                      this.toolEquipmentModel.SchoolId = schoolsectorjobModel.SchoolId;
                      this.toolEquipmentModel.SectorId = schoolsectorjobModel.SectorId;
                      this.toolEquipmentModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                      this.onChangeSchool(this.toolEquipmentModel.SchoolId).then(sResp => {
                        this.onChangeSector(this.toolEquipmentModel.SectorId).then(vvResp => {
                          this.onChangeJobRole(this.toolEquipmentModel.JobRoleId).then(vvResp => {
                            // this.onChangeAcademicYear(this.toolEquipmentModel.AcademicYearId).then(vResp => {
                            this.toolEquipmentForm = this.createToolEquipmentForm();
                            // });
                          });
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
    });
  }


  // onChangeAcademicYear(academicYearId): Promise<any> {
  //   this.resetInputsAfter('AcademicYear');
  //   this.setFormInputs();

  //   let promise = new Promise((resolve, reject) => {
  //     this.commonService.GetMasterDataByType({
  //       DataType: 'ClassesByACS', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes'
  //     }).subscribe((response) => {

  //       if (response.Success) {
  //         this.classList = response.Results;
  //         this.loadFormInputs(response.Results, 'ClassId');
  //       }
  //       resolve(true);
  //     });
  //   });

  //   this.setUserAction();

  //   return promise;
  // }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('SchoolId').value : this.toolEquipmentModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('SectorId').value : this.toolEquipmentModel.SectorId;
    this.JobRoleInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('JobRoleId').value : this.toolEquipmentModel.JobRoleId;
    this.AcademicYearInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('AcademicYearId').value : this.toolEquipmentModel.AcademicYearId;
    // this.ClassInputId = this.CanUserChangeInput == true ? this.toolEquipmentForm.get('ClassId').value : this.toolEquipmentModel.ClassId;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.toolEquipmentForm.controls[InputName].enable();
    }

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.toolEquipmentForm.controls[InputName].setValue(inputId);
      this.toolEquipmentForm.controls[InputName].disable();
      if (InputName == 'SchoolId') {
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        this.onChangeJobRole(inputId);
      }
      // else if (InputName == 'AcademicYearId') {
      //   this.onChangeAcademicYear(inputId);
      // }
    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.toolEquipmentForm.controls['SectorId'].setValue(null);
      this.toolEquipmentForm.controls['JobRoleId'].setValue(null);
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
      this.toolEquipmentForm.controls['ClassId'].setValue(null);
    }

    if (input == 'Sector') {
      this.toolEquipmentForm.controls['JobRoleId'].setValue(null);
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
      this.toolEquipmentForm.controls['ClassId'].setValue(null);
    }

    if (input == 'JobRole') {
      this.toolEquipmentForm.controls['AcademicYearId'].setValue(null);
      this.toolEquipmentForm.controls['ClassId'].setValue(null);
    }

    if (input == 'AcademicYear') {
      this.toolEquipmentForm.controls['ClassId'].setValue(null);
    }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
  }

  // onChangeVTP(vtpId): Promise<any> {
  //   let promise = new Promise((resolve, reject) => {

  //     let vcRequest = null;
  //     if (this.UserModel.RoleCode == 'HM') {
  //       vcRequest = this.commonService.GetVCByHMId(this.AcademicYearId, this.UserModel.UserTypeId, vtpId);
  //     }
  //     else {
  //       vcRequest = this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false);
  //     }


  //     vcRequest.subscribe((response: any) => {
  //       if (response.Success) {
  //         this.VCList = [];
  //         this.vtList = [];
  //         this.filteredSchoolItems = [];

  //         this.VCList = response.Results;
  //         this.vcList = this.VCList.slice();
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     }, error => {
  //       console.log(error);
  //       resolve(false);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeVC(vcId): Promise<any> {
  //   let promise = new Promise((resolve, reject) => {
  //     this.IsLoading = true;

  //     let schoolRequest = null;
  //     if (this.UserModel.RoleCode == 'HM') {
  //       schoolRequest = this.commonService.GetSchoolByHMId(this.AcademicYearId, this.UserModel.UserTypeId, vcId);
  //     }
  //     else {
  //       schoolRequest = this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }, false);
  //     }

  //     schoolRequest.subscribe((response: any) => {
  //       if (response.Success) {
  //         this.vcId = vcId;
  //         this.schoolList = response.Results;
  //         this.filteredSchoolItems = this.schoolList.slice();
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     }, error => {
  //       console.log(error);
  //       resolve(false);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeSchool(schoolId): Promise<any> {
  //   let promise = new Promise((resolve, reject) => {
  //     this.IsLoading = true;

  //     let vtRequest = null;
  //     if (this.UserModel.RoleCode == 'HM') {
  //       vtRequest = this.commonService.GetVTBySchoolIdHMId(this.AcademicYearId, this.UserModel.UserTypeId, this.vcId, schoolId);
  //     }
  //     else {
  //       vtRequest = this.commonService.GetMasterDataByType({ DataType: 'TrainersBySchool', ParentId: schoolId, SelectTitle: 'Vocational Trainer' }, false);
  //     }

  //     vtRequest.subscribe((response: any) => {
  //       if (response.Success) {
  //         this.VTList = response.Results;
  //         this.vtList = this.VTList.slice();
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     }, error => {
  //       console.log(error);
  //       resolve(false);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeVT(vtId): Promise<any> {
  //   let promise = new Promise((resolve, reject) => {
  //     this.IsLoading = true;
  //     this.toolEquipmentService.getAcademicYearSectorByUser(vtId).subscribe((results: any) => {
  //       if (results[0].Success) {
  //         this.academicYearList = results[0].Results;
  //       }

  //       if (results[1].Success) {
  //         this.sectorList = results[1].Results;
  //       }

  //       this.IsLoading = false;
  //       resolve(true);
  //     }, error => {
  //       console.log(error);
  //       resolve(false);
  //     });
  //   });
  //   return promise;
  // }

  // onChangeSector(sectorId: string) {
  //   this.commonService.GetMasterDataByType({ DataType: 'JobRolesForVT', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe(response => {
  //     if (response.Success) {
  //       this.jobRoleList = response.Results;
  //     }
  //   });
  // }

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
      this.toolEquipmentForm.controls["TEStatus"].clearValidators();
    }
    else {
      this.toolEquipmentForm.controls["ReceiptDate"].setValidators([Validators.required]);
      this.toolEquipmentForm.controls["TEStatus"].setValidators([Validators.required]);
    }

    this.toolEquipmentForm.controls["ReceiptDate"].updateValueAndValidity();
    this.toolEquipmentForm.controls["TEStatus"].updateValueAndValidity();
  }
}
