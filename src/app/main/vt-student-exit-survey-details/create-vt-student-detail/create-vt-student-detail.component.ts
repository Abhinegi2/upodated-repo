import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTStudentExitSurveyDetailService } from '../vt-student-exit-survey-detail.service';
import { VTStudentDetailModel } from '../vt-student-detail.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from "moment";

@Component({
  selector: 'vt-student--detail',
  templateUrl: './create-vt-student-detail.component.html',
  styleUrls: ['./create-vt-student-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class CreateVTStudentDetailComponent extends BaseComponent<VTStudentDetailModel> implements OnInit {
  vtStudentDetailForm: FormGroup;
  vtStudentDetailModel: VTStudentDetailModel;
  studentList: [DropdownModel];
  genderList: any;
  migrationReasonList: any;
  parentsOccupationList: any;
  currentEmployementStatusList: any;
  courseList: any;
  courseSelectionReasonList: any;
  postCourseCpmletionPlanningList: any;
  educationDiscontinueReasonList: any;
  plansList: any;
  age: number;
  districtList: any;
  classList: any = [];
  socialCategoryList: any;
  sectorList: any;
  sectorFilteredOptions: any;
  jobRoleList: any;
  vtpList: any;
  blockList: any;
  natureOfWorkList: any;
  sectorOfEmployementList: any;
  courseToBePursueList: any;
  streamOfEducationList: any;
  veNotContinuingReasonsList: any;
  topicsOfJobInterestList: any;
  preferredLocationForEmploymentList: any;
  divisionList: any;
  stateCode: string;
  schoolList: any;
  academicyearList: any;
  currentAcademicYearId: any;
  divisionId: any;
  ayList: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStudentExitSurveyDetailService: VTStudentExitSurveyDetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStudentDetail Model
    this.vtStudentDetailModel = new VTStudentDetailModel();
  }

  ngOnInit(): void {

    let today = new Date(Date.now());
    let currentYear = today.getFullYear();
    let lastYear = today.getFullYear() - 1;
    let lastToLastYear = today.getFullYear() - 2;
    let academicYr = lastYear + '-' + currentYear;
    let lastAcademicYear = lastToLastYear + '-' + lastYear;
    this.commonService.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' }).subscribe(response => {
      this.academicyearList = response.Results;
      response.Results.forEach(ayItem => {
        if (ayItem.Name == lastAcademicYear || ayItem.Name == academicYr) {
          this.ayList.push(ayItem);

        }
      });
    });

    this.stateCode = this.UserModel.DefaultStateId;
    this.commonService.GetMasterDataByType({ DataType: 'DistrictsBySateCode', ParentId: this.Constants.DefaultStateId, SelectTitle: 'District' }).subscribe((response: any) => {
      this.districtList = response.Results;
    });

    this.commonService.GetMasterDataByType({ DataType: 'Schools', UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'School'},false).subscribe((response: any) => {
      this.schoolList = response.Results;
      console.log(this.schoolList);
    });

    this.commonService.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Classes' }).subscribe((response: any) => {
      response.Results.forEach(classItem => {
        if (classItem.Name == 'Class 10' || classItem.Name == 'Class 12') {
          this.classList.push(classItem);
        }
      });
    });

    this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SocialCategory', SelectTitle: 'Social Category' }).subscribe((response: any) => {
      this.socialCategoryList = response.Results;
    });

    this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Gender', SelectTitle: 'Gender' }).subscribe((response) => {
      if (response.Success) {
        this.genderList = response.Results;
      }
    });

    this.commonService.GetMasterDataByType({  DataType: 'VTPBYVT', UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'VTP' }).subscribe((response: any) => {
      this.vtpList = response.Results;
      console.log(this.vtpList);
    });

    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.vtStudentDetailModel = new VTStudentDetailModel();

        } else {
          var exitStudentId: string = params.get('ExitStudentId')

          this.vtStudentExitSurveyDetailService.getVTStudentDetailById(exitStudentId)
            .subscribe((response: any) => {
              this.vtStudentDetailModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.vtStudentDetailModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.vtStudentDetailModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.vtStudentDetailForm = this.createVTStudentDetailForm();
            });
        }
      }
    });


    this.vtStudentDetailForm = this.createVTStudentDetailForm();
  }

  onChangeSchool(udise: any) {
    let udiseCode = this.schoolList.find(ay => ay.Name == udise);

    this.vtStudentDetailForm.get('UdiseCode').setValue(udiseCode.Description);
    this.commonService.GetMasterDataByType({ DataType: 'SectorsBySSJ', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: udiseCode.Id, SelectTitle: "Sector" }).subscribe((response) => {
      if (response.Success) {
        this.sectorList = response.Results;

        if (this.IsLoading) {
          this.vtStudentDetailForm.controls['Sector'].setValue(null);
          this.vtStudentDetailForm.controls['JobRole'].setValue(null);
          this.jobRoleList = <DropdownModel[]>[];
        }
      }
    });
  }


  onChangeSector(sectorId): Promise<any> {
    return new Promise((resolve, reject) => {
      let sectorItem = this.sectorList.find(s => s.Name == sectorId);
      this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorItem.Id, SelectTitle: "Job Role" }).subscribe((response) => {
        if (response.Success) {
          this.jobRoleList = response.Results;

          if (this.IsLoading) {
            this.vtStudentDetailForm.controls['JobRole'].setValue(null);
          }
        }

        resolve(true);
      });
    });
  }

  onChangeDistrict(districtId: any) {
    this.commonService.GetMasterDataByType({ DataType: 'Blocks', UserId: this.UserModel.DefaultStateId, ParentId: districtId, SelectTitle: 'Block' }).subscribe((response: any) => {
      this.blockList = response.Results;
    });
  }


  saveOrUpdateVTStudentDetailDetails() {
    if (!this.vtStudentDetailForm.valid) {
      this.validateAllFormFields(this.vtStudentDetailForm);
      return;
    }
    let firstName = this.vtStudentDetailForm.get('FirstName').value;
    let middleName = this.vtStudentDetailForm.get('MiddleName').value;
    let lastName = this.vtStudentDetailForm.get('LastName').value;
    let studentFullName = firstName + ' ' + middleName + ' ' + lastName;
    this.vtStudentDetailForm.get('StudentFullName').setValue(studentFullName);

    this.setValueFromFormGroup(this.vtStudentDetailForm, this.vtStudentDetailModel);
    let school = this.vtStudentDetailModel.NameOfSchool;
    school.substr(0, school.indexOf('-'));
    this.vtStudentDetailModel.VTId = this.UserModel.UserTypeId;

    this.vtStudentExitSurveyDetailService.createOrUpdateVTStudentDetail(this.vtStudentDetailModel)
      .subscribe((vtStudentDetailResp: any) => {

        if (vtStudentDetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTStudentExitSurveyDetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtStudentDetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTStudentDetail deletion errors =>', error);
      });
  }


  //Create vtStudentDetail form and returns {FormGroup}
  createVTStudentDetailForm(): FormGroup {
    return this.formBuilder.group({
      ExitStudentId: new FormControl(this.vtStudentDetailModel.ExitStudentId),
      VTId: new FormControl(this.vtStudentDetailModel.VTId),
      AcademicYear: new FormControl({ value: this.vtStudentDetailModel.AcademicYear }),
      FirstName: new FormControl({ value: this.vtStudentDetailModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.FirstCharsCapital), Validators.required]),
      MiddleName: new FormControl({ value: this.vtStudentDetailModel.MiddleName, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.FirstCharsCapital)),
      LastName: new FormControl({ value: this.vtStudentDetailModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.FirstCharsCapital), Validators.required]),
      StudentFullName: new FormControl({ value: this.vtStudentDetailModel.StudentFullName, disabled: this.PageRights.IsReadOnly }),
      FatherName: new FormControl({ value: this.vtStudentDetailModel.FatherName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      MotherName: new FormControl({ value: this.vtStudentDetailModel.MotherName, disabled: this.PageRights.IsReadOnly }, [Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars), Validators.required]),
      StudentUniqueId: new FormControl({ value: this.vtStudentDetailModel.StudentUniqueId, disabled: this.PageRights.IsReadOnly }),
      NameOfSchool: new FormControl({ value: this.vtStudentDetailModel.NameOfSchool, disabled: this.PageRights.IsReadOnly }, Validators.required),
      UdiseCode: new FormControl({ value: this.vtStudentDetailModel.UdiseCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Gender: new FormControl({ value: this.vtStudentDetailModel.Gender, disabled: this.PageRights.IsReadOnly }),
      DOB: new FormControl({ value: new Date(this.vtStudentDetailModel.DOB), disabled: this.PageRights.IsReadOnly }),
      District: new FormControl({ value: this.vtStudentDetailModel.District, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Class: new FormControl({ value: this.vtStudentDetailModel.Class, disabled: this.PageRights.IsReadOnly }),
      Category: new FormControl({ value: this.vtStudentDetailModel.Category, disabled: this.PageRights.IsReadOnly }),
      Sector: new FormControl({ value: this.vtStudentDetailModel.Sector, disabled: this.PageRights.IsReadOnly },),
      JobRole: new FormControl({ value: this.vtStudentDetailModel.JobRole, disabled: this.PageRights.IsReadOnly }),
      VTPId: new FormControl({ value: this.vtStudentDetailModel.VTId, disabled: this.PageRights.IsReadOnly }, Validators.required)
    });
  }
}
