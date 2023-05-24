import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VCSchoolVisitReportService } from '../vc-school-visit-report.service';
import { VCSchoolVisitReportModel } from '../vc-school-visit-report.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { FileUploadModel } from 'app/models/file.upload.model';

@Component({
  selector: 'vc-school-visit-report',
  templateUrl: './create-vc-school-visit-report.component.html',
  styleUrls: ['./create-vc-school-visit-report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVCSchoolVisitReportComponent extends BaseComponent<VCSchoolVisitReportModel> implements OnInit {
  vcSchoolVisitReportForm: FormGroup;
  vcSchoolVisitReportModel: VCSchoolVisitReportModel;
  monthList: [DropdownModel];
  minReportingDate: Date;
  schoolList: any;
  filteredSchoolItems: any;
  districtList: any;
  filteredDistrictItems: any;
  SVPhotoWithPrincipalPhotoFile: FileUploadModel;
  SVPhotoWithStudentsPhotoFile: FileUploadModel;
  sectorList: DropdownModel;
  jobRoleList: DropdownModel;
  vtList: any;
  displayedColumns: ['']

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
    private vcSchoolVisitService: VCSchoolVisitReportService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vcSchoolVisit Model
    this.vcSchoolVisitReportModel = new VCSchoolVisitReportModel();
    this.SVPhotoWithPrincipalPhotoFile = new FileUploadModel();
    this.SVPhotoWithStudentsPhotoFile = new FileUploadModel();

    let dateOfAllocation = new Date(this.UserModel.DateOfAllocation);
    let maxDate = new Date(Date.now());

    let Time = maxDate.getTime() - dateOfAllocation.getTime();
    let Days = Math.floor(Time / (1000 * 3600 * 24));
    if (Days < this.Constants.BackDatedReportingDays) {
      this.minReportingDate = new Date(this.UserModel.DateOfAllocation);
    }
    else {
      let past7days = maxDate;
      past7days.setDate(past7days.getDate() - this.Constants.BackDatedReportingDays)
      this.minReportingDate = past7days;
    }
  }

  ngOnInit(): void {
    this.vcSchoolVisitService.getDropdownforVCSchoolVisitReporting(this.UserModel).subscribe((response) => {
      if (response[0].Success) {
        this.monthList = response[0].Results;
      }

      if (response[1].Success) {
        this.vtList = response[1].Results;
      }

      if (response[2].Success) {
        this.schoolList = response[2].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      if (response[3].Success) {
        this.districtList = response[3].Results;
        this.filteredDistrictItems = this.districtList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vcSchoolVisitReportModel = new VCSchoolVisitReportModel();

            this.CanUserChangeInput = true;

          } else {
            var vcSchoolVisitReportingId: string = params.get('vcSchoolVisitReportingId')

            this.vcSchoolVisitService.getVCSchoolVisitReportingById(vcSchoolVisitReportingId)
              .subscribe((response: any) => {
                this.vcSchoolVisitReportModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vcSchoolVisitReportModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vcSchoolVisitReportModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeSchool(this.vcSchoolVisitReportModel.SchoolId);
                this.onChangeSector(this.vcSchoolVisitReportModel.SectorId);
                this.vcSchoolVisitReportForm = this.createVCSchoolVisitForm();
              });
          }
        }
      });
    });

    this.vcSchoolVisitReportForm = this.createVCSchoolVisitForm();
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
            this.vcSchoolVisitReportForm.controls['SchoolId'].setValue(null);
          }

          this.loadFormInputs(response.Results, 'SectorId');
        }
        resolve(true);
      });

    });

    this.commonService.GetMasterDataByType({ DataType: 'DistrictForSchool', ParentId: schoolId, SelectTitle: "District" }).subscribe((response) => {
      if (response.Success) {
        this.districtList = response.Results;
        this.filteredDistrictItems = this.districtList.slice();
      }
    });

    return promise;
  }

  onChangeSector(sectorId): Promise<any> {
    this.resetInputsAfter('Sector');
    this.setFormInputs();

    let promise = new Promise((resolve, reject) => {
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

    return promise;
  }

  onChangeJobRole(jobRoleId): void {
    this.resetInputsAfter('JobRole');
    this.setFormInputs();

    this.commonService.GetMasterDataByType({ DataType: 'VTForSSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: jobRoleId, SelectTitle: "Vocational Trainer" }).subscribe((response) => {
      if (response.Success) {
        this.vtList = response.Results;
      }
    });

    // return new Promise((resolve, reject) => {
    //   this.commonService.GetMasterDataByType({
    //     DataType: 'YearsBySSJ', DataTypeID1: this.SchoolInputId, DataTypeID2: this.SectorInputId, DataTypeID3: jobRoleId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: "Academic Years"
    //   }).subscribe((response) => {

    //     if (response.Success) {
    //       this.academicYearList = response.Results;
    //       if (response.Results.length == 1) {
    //         this.dialogService.openShowDialog(this.getHtmlMessage([this.Constants.Messages.InvalidVTACS]));
    //         this.vcSchoolVisitReportForm.controls['JobRoleId'].setValue(null);
    //       }

    //       this.loadFormInputs(response.Results, 'AcademicYearId');
    //     }
    //     resolve(true);
    //   });
    // });

  }

  setFormInputs() {
    this.SchoolInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('SchoolId').value : this.vcSchoolVisitReportModel.SchoolId;
    this.SectorInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('SectorId').value : this.vcSchoolVisitReportModel.SectorId;
    // this.JobRoleInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('JobRoleId').value : this.vcSchoolVisitReportModel.JobRoleId;
    // this.AcademicYearInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('AcademicYearId').value : this.vcSchoolVisitReportModel.AcademicYearId;
    // this.ClassInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('ClassTaughtId').value : this.vcSchoolVisitReportModel.ClassTaughtId;
    // this.SectionInputId = this.CanUserChangeInput == true ? this.vcSchoolVisitReportForm.get('SectionIds').value : this.vcSchoolVisitReportModel.SectionIds;
  }

  loadFormInputs(response, InputName) {

    if (!this.PageRights.IsReadOnly) {
      this.vcSchoolVisitReportForm.controls[InputName].enable();
    }

    if (response.length == 2) {
      var inputId = response[1].Id;
      this.vcSchoolVisitReportForm.controls[InputName].setValue(inputId);
      this.vcSchoolVisitReportForm.controls[InputName].disable();

      if (InputName == 'SchoolId') {
        this.onChangeSchool(inputId);
      } else if (InputName == 'SectorId') {
        this.onChangeSector(inputId);
      } else if (InputName == 'JobRoleId') {
        // this.onChangeJobRole(inputId);
      } else if (InputName == 'AcademicYearId') {
        // this.onChangeAcademicYear(inputId);
      } else if (InputName == 'ClassTaughtId') {
        // this.onChangeClassForTaught(inputId);
      }

    }
  }

  resetInputsAfter(input) {

    if (input == 'School') {
      this.vcSchoolVisitReportForm.controls['SectorId'].setValue(null);
      this.vcSchoolVisitReportForm.controls['JobRoleId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['AcademicYearId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['ClassTaughtId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['SectionIds'].setValue(null);
    }

    if (input == 'Sector') {
      this.vcSchoolVisitReportForm.controls['JobRoleId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['AcademicYearId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['ClassTaughtId'].setValue(null);
      // this.vcSchoolVisitReportForm.controls['SectionIds'].setValue(null);
    }

    // if (input == 'JobRole') {
    //   this.vcSchoolVisitReportForm.controls['AcademicYearId'].setValue(null);
    //   this.vcSchoolVisitReportForm.controls['ClassTaughtId'].setValue(null);
    //   this.vcSchoolVisitReportForm.controls['SectionIds'].setValue(null);
    // }

    // if (input == 'AcademicYear') {
    //   this.vcSchoolVisitReportForm.controls['ClassTaughtId'].setValue(null);
    //   this.vcSchoolVisitReportForm.controls['SectionIds'].setValue(null);
    // }

    // if (input == 'Class') {
    //   this.vcSchoolVisitReportForm.controls['SectionIds'].setValue(null);
    // }
  }

  setUserAction() {
    this.CanUserChangeInput = true;
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
            this.vcSchoolVisitReportForm.controls[InputId].disable();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
            this.vcSchoolVisitReportForm.controls[InputId].disable();
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
            this.vcSchoolVisitReportForm.controls[InputId].disable();
          }

          // else if (InputId == 'AcademicYearId') {
          //   this.academicYearList = response.Results;
          //   this.vcSchoolVisitReportForm.controls[InputId].disable();
          // } else if (InputId == 'ClassTaughtId') {
          //   this.classList = response.Results;
          //   this.vcSchoolVisitReportForm.controls[InputId].disable();
          // } else if (InputId == 'SectionIds') {
          //   this.sectionList = response.Results;
          //   this.vcSchoolVisitReportForm.controls[InputId].disable();
          // }
        }
        resolve(true);
      });

    });
    return promise;
  }

  // onChangeSchool(schoolId) {
  //   this.commonService.GetMasterDataByType({ DataType: 'SectorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: schoolId, SelectTitle: "Sector" }).subscribe((response) => {
  //     if (response.Success) {
  //       this.sectorList = response.Results;
  //     }
  //   });
  // }

  // onChangeSector(sectorId): void {
  //   this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: "Job Role" }).subscribe((response) => {
  //     if (response.Success) {
  //       this.jobRoleList = response.Results;
  //     }
  //   });
  // }

  uploadedSVPhotoWithPrincipalPhotoFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        this.vcSchoolVisitReportForm.get('SVPhotoWithPrincipal').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.VCSchoolVisit).then((response: FileUploadModel) => {
        this.SVPhotoWithPrincipalPhotoFile = response;

        this.vcSchoolVisitReportForm.get('IsSVPhotoWithPrincipal').setValue(false);
        this.setMandatoryFieldControl(this.vcSchoolVisitReportForm, 'SVPhotoWithPrincipal', this.Constants.DefaultImageState);
      });
    }
  }

  uploadedSVPhotoWithStudentsPhotoFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        this.vcSchoolVisitReportForm.get('SVPhotoWithStudents').setValue(null);
        this.dialogService.openShowDialog("Please upload image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.VCSchoolVisit).then((response: FileUploadModel) => {
        this.SVPhotoWithStudentsPhotoFile = response;

        this.vcSchoolVisitReportForm.get('IsSVPhotoWithStudents').setValue(false);
        this.setMandatoryFieldControl(this.vcSchoolVisitReportForm, 'SVPhotoWithStudents', this.Constants.DefaultImageState);
      });
    }
  }

  saveOrUpdateVCSchoolVisitReportDetails() {
    if (!this.vcSchoolVisitReportForm.valid) {
      this.validateAllFormFields(this.vcSchoolVisitReportForm);
      return;
    }
    this.setValueFromFormGroup(this.vcSchoolVisitReportForm, this.vcSchoolVisitReportModel);
    this.vcSchoolVisitReportModel.VCId = this.UserModel.UserTypeId;
    this.vcSchoolVisitReportModel.SVPhotoWithPrincipalFile = (this.SVPhotoWithPrincipalPhotoFile.Base64Data != '' ? this.setUploadedFile(this.SVPhotoWithPrincipalPhotoFile) : null);
    this.vcSchoolVisitReportModel.SVPhotoWithStudentFile = (this.SVPhotoWithStudentsPhotoFile.Base64Data != '' ? this.setUploadedFile(this.SVPhotoWithStudentsPhotoFile) : null);

    this.vcSchoolVisitService.createOrUpdateVCSchoolVisit(this.vcSchoolVisitReportModel)
      .subscribe((vcSchoolVisitResp: any) => {

        if (vcSchoolVisitResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VCSchoolVisitReport.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vcSchoolVisitResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VCSchoolVisit deletion errors =>', error);
      });
  }

  //Create vcSchoolVisit form and returns {FormGroup}
  createVCSchoolVisitForm(): FormGroup {
    return this.formBuilder.group({
      VCSchoolVisitReportingId: new FormControl(this.vcSchoolVisitReportModel.VCSchoolVisitReportingId),
      VCId: new FormControl({ value: this.UserModel.UserTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VCName: new FormControl({ value: this.UserModel.UserName, disabled: true }),
      CompanyName: new FormControl({ value: this.vcSchoolVisitReportModel.CompanyName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(200)]),
      Month: new FormControl({ value: this.vcSchoolVisitReportModel.Month, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(20)]),
      VisitDate: new FormControl({ value: new Date(this.vcSchoolVisitReportModel.VisitDate), disabled: this.PageRights.IsReadOnly }),
      SchoolId: new FormControl({ value: this.vcSchoolVisitReportModel.SchoolId, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      DistrictCode: new FormControl({ value: this.vcSchoolVisitReportModel.DistrictCode, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      SchoolEmailId: new FormControl({ value: this.vcSchoolVisitReportModel.SchoolEmailId, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(150), Validators.pattern(this.Constants.Regex.Email)]),
      PrincipalName: new FormControl({ value: this.vcSchoolVisitReportModel.PrincipalName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(150)]),
      PrincipalPhoneNo: new FormControl({ value: this.vcSchoolVisitReportModel.PrincipalPhoneNo, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.maxLength(10), Validators.pattern(this.Constants.Regex.Number)]),
      SectorId: new FormControl({ value: this.vcSchoolVisitReportModel.SectorId, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      JobRoleId: new FormControl({ value: this.vcSchoolVisitReportModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      VTId: new FormControl({ value: this.vcSchoolVisitReportModel.VTId, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      VTPhoneNo: new FormControl({ value: this.vcSchoolVisitReportModel.VTPhoneNo, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.Number)]),
      Labs: new FormControl({ value: this.vcSchoolVisitReportModel.Labs, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100)]),
      Books: new FormControl({ value: this.vcSchoolVisitReportModel.Books, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100)]),
      NoOfGLConducted: new FormControl({ value: this.vcSchoolVisitReportModel.NoOfGLConducted, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      NoOfIndustrialVisits: new FormControl({ value: this.vcSchoolVisitReportModel.NoOfIndustrialVisits, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      SVPhotoWithPrincipalFile: new FormControl({ value: this.vcSchoolVisitReportModel.SVPhotoWithPrincipalFile, disabled: this.PageRights.IsReadOnly }),
      SVPhotoWithStudentFile: new FormControl({ value: this.vcSchoolVisitReportModel.SVPhotoWithStudentFile, disabled: this.PageRights.IsReadOnly }),
      IsSVPhotoWithPrincipal: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
      IsSVPhotoWithStudents: new FormControl({ value: false, disabled: this.PageRights.IsReadOnly }),
      Class9Boys: new FormControl({ value: this.vcSchoolVisitReportModel.Class9Boys, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class9Girls: new FormControl({ value: this.vcSchoolVisitReportModel.Class9Girls, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class10Boys: new FormControl({ value: this.vcSchoolVisitReportModel.Class10Boys, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class10Girls: new FormControl({ value: this.vcSchoolVisitReportModel.Class10Girls, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class11Boys: new FormControl({ value: this.vcSchoolVisitReportModel.Class11Boys, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class11Girls: new FormControl({ value: this.vcSchoolVisitReportModel.Class11Girls, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class12Boys: new FormControl({ value: this.vcSchoolVisitReportModel.Class12Boys, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      Class12Girls: new FormControl({ value: this.vcSchoolVisitReportModel.Class12Girls, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      TotalBoys: new FormControl({ value: this.vcSchoolVisitReportModel.TotalBoys, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      TotalGirls: new FormControl({ value: this.vcSchoolVisitReportModel.TotalGirls, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)])
    });
  }
}
