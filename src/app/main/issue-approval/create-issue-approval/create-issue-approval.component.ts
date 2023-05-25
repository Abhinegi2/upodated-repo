import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { HMIssueReportingService } from '../../hm-issue-reportings/hm-issue-reporting.service';
import { VCIssueReportingService } from '../../vc-issue-reportings/vc-issue-reporting.service';
import { VTIssueReportingService } from '../../vt-issue-reportings/vt-issue-reporting.service';
// import { HMIssueReportingModel } from '../hm-issue-reportings/hm-issue-reporting.model';
import { IssueApprovalModel } from '../issue-approval.model';
import { IssueApprovalService } from '../issue-approval.service';
import { DropdownModel } from 'app/models/dropdown.model';
// import { Observable } from 'rxjs';
// import { UrlService } from 'app/common/shared/url.service';
import { SchoolSectorJobService } from 'app/main/schoolsectorjobs//schoolsectorjob.service';

@Component({
  selector: 'hm-issue-reporting',
  templateUrl: './create-issue-approval.component.html',
  styleUrls: ['./create-issue-approval.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateIssueApprovalComponent extends BaseComponent<IssueApprovalModel> implements OnInit {
  issueApprovalForm: FormGroup;
  issueApprovalModel: IssueApprovalModel;
  headMasterList: [DropdownModel];
  vtSchoolSectorList: [DropdownModel];
  mainIssueList: [DropdownModel];
  subIssueList: [DropdownModel];
  studentClassList: [DropdownModel];
  monthList: [DropdownModel];
  studentTypeList: any;
  // previousUrl: Observable<string> = this.urlService.previousUrl$;
  service: any;
  updateService: any;
  issueStatusList: any;
  type: any;
  backToApprovalPage: string;
  approvalParams: any;

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
  sectionList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    // private urlService: UrlService,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private issueApprovalService: IssueApprovalService,
    private hmIssueReportingService: HMIssueReportingService,
    private vtIssueReportingService: VTIssueReportingService,
    private vcIssueReportingService: VCIssueReportingService,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default hmIssueReporting Model
    this.issueApprovalModel = new IssueApprovalModel();
  }

  ngOnInit(): void {
    // this.urlService.previousUrl$.subscribe((previousUrl: string) => {
    //   console.log('previous url: ', previousUrl);
    // });

    this.issueApprovalService.getDropdownforIssueReporting(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.monthList = results[0].Results;
      }

      if (results[1].Success) {
        this.studentClassList = results[1].Results;
      }

      if (results[2].Success) {
        this.studentTypeList = results[2].Results;
      }

      if (results[3].Success) {
        this.mainIssueList = results[3].Results;
      }

      if (results[4].Success) {
        this.issueStatusList = results[4].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');
          this.type = params.get('type');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.issueApprovalModel = new IssueApprovalModel();

          } else {
            var issueReportingId: string = params.get('issueReportingId');

            if (this.type == 'HM') {
              this.service = this.issueApprovalService.getHMIssueReportingById(issueReportingId)
              this.backToApprovalPage = '/hm-issue-approval';
            }
            else if (this.type == 'VT') {
              this.service = this.issueApprovalService.getVTIssueReportingById(issueReportingId)
              this.backToApprovalPage = '/vt-issue-approval';
            }
            else if (this.type == 'VC') {
              this.service = this.issueApprovalService.getVCIssueReportingById(issueReportingId)
              this.backToApprovalPage = '/vc-issue-approval';
            }

            this.service.subscribe((response: any) => {
              this.issueApprovalModel = response.Result;
              // this.issueApprovalModel.StudentClass = response.Result.StudentClass.split(',');
              this.issueApprovalModel.SectionIds = response.Result.SectionIds.split(',');
              this.issueApprovalModel.Month = response.Result.Month.split(',');

              if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
                this.issueApprovalModel.RequestType = this.Constants.PageType.Edit;
                this.PageRights.IsReadOnly = true;
              }
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.issueApprovalModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.schoolsectorjobService.getSchoolSectorJobById(this.issueApprovalModel.SSJId)
                .subscribe((response: any) => {
                  var schoolsectorjobModel = response.Result;

                  this.issueApprovalModel.SchoolId = schoolsectorjobModel.SchoolId;
                  this.issueApprovalModel.SectorId = schoolsectorjobModel.SectorId;
                  this.issueApprovalModel.JobRoleId = schoolsectorjobModel.JobRoleId;

                  this.setInputs(this.issueApprovalModel.SchoolId, 'SchoolId', 'SchoolById').then(sResp => {
                    this.setInputs(this.issueApprovalModel.SectorId, 'SectorId', 'SectorById').then(vvResp => {
                      this.setInputs(this.issueApprovalModel.JobRoleId, 'JobRoleId', 'JobRoleById').then(vvResp => {
                        this.setInputs(this.issueApprovalModel.AcademicYearId, 'AcademicYearId', 'AcademicYearById').then(vResp => {
                          // this.onChangeAcademicYear(this.issueApprovalModel.AcademicYearId);
                          this.setInputs(this.issueApprovalModel.StudentClass, 'StudentClass', 'ClassById').then(vResp => {
                            this.onChangeClasses(this.issueApprovalModel.StudentClass).then(vResp => {
                              this.onChangeMainIssue(this.issueApprovalModel.MainIssue);
                              // this.hmIssueReportingForm = this.createHMIssueReportingForm();
                              this.onChangeMainIssue(this.issueApprovalModel.MainIssue);
                              this.issueApprovalForm.get('Remarks').setValue(this.issueApprovalModel.Remarks);
                              this.issueApprovalForm = this.createIssueApprovalForm();

                            });
                          });
                        });
                      });
                    });
                  });
                });

              // this.onChangeMainIssue(this.issueApprovalModel.MainIssue);
              // this.issueApprovalForm.get('Remarks').setValue(this.issueApprovalModel.Remarks);
              // this.issueApprovalForm = this.createIssueApprovalForm();
            });
          }
        }
      });
    });

    this.issueApprovalForm = this.createIssueApprovalForm();
  }


  onChangeClasses(classId): Promise<any> {
    // this.resetInputsAfter('Class');
    // this.setFormInputs();

    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({
        DataType: 'SectionsByACS', DataTypeID1: this.SchoolInputId,
        DataTypeID2: this.SectorInputId, DataTypeID3: this.JobRoleInputId,
        DataTypeID4: this.AcademicYearInputId, DataTypeID5: classId,
        UserId: this.UserModel.UserTypeId, roleId:
          this.UserModel.RoleCode, SelectTitle: 'Sections'
      }, false).subscribe((response) => {
        if (response.Success) {
          this.sectionList = response.Results;

          if (this.PageRights.ActionType == this.Constants.Actions.Edit) {
            this.issueApprovalForm.controls['SectionIds'].disable();
          }
        }
        resolve(true);
      });
    });

    return promise;
  }

  onChangeAcademicYear(academicYearId): Promise<any> {
    // this.resetInputsAfter('AcademicYear');
    // this.setFormInputs();

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({
        DataType: 'ClassesByACS', DataTypeID1: this.issueApprovalModel.SchoolId, DataTypeID2: this.issueApprovalModel.SectorId, DataTypeID3: this.issueApprovalModel.JobRoleId, ParentId: academicYearId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes'
      }, false).subscribe((response) => {

        if (response.Success) {
          this.classList = response.Results;

          // this.loadFormInputs(response.Results, 'StudentClass');
        }
        resolve(true);
      });
    });

    // this.setUserAction();

    return promise;
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
            this.issueApprovalForm.controls[InputId].disable();
          } else if (InputId == 'SectorId') {
            this.sectorList = response.Results;
            this.issueApprovalForm.controls[InputId].disable();
          } else if (InputId == 'JobRoleId') {
            this.jobRoleList = response.Results;
            this.issueApprovalForm.controls[InputId].disable();
          } else if (InputId == 'AcademicYearId') {
            this.academicYearList = response.Results;
            this.issueApprovalForm.controls[InputId].disable();
          } else if (InputId == 'StudentClass') {
            this.classList = response.Results;
            this.issueApprovalForm.controls[InputId].disable();
          }
        }
        resolve(true);
      });

    });
    return promise;
  }

  onChangeMainIssue(mainIssueId: string) {
    this.commonService.GetMasterDataByType({ DataType: 'SubIssueView', UserId: this.UserModel.RoleCode, ParentId: mainIssueId, SelectTitle: 'Sub Issue' }).subscribe((response: any) => {
      if (response.Success) {
        this.subIssueList = response.Results;
      }
    });
  }

  saveOrUpdateHMIssueReportingDetails() {
    if (!this.issueApprovalForm.valid) {
      this.validateAllFormFields(this.issueApprovalForm);
      return;
    }

    if (this.type == 'HM') {
      this.issueApprovalForm.addControl('HMIssueReportingId', this.formBuilder.control(this.issueApprovalModel.HMIssueReportingId));

      let hmIssueReportingId = this.issueApprovalForm.get('HMIssueReportingId').value;
      let approvalStatus = this.issueApprovalForm.get('ApprovalStatus').value;
      let remarks = this.issueApprovalForm.get('Remarks').value;

      this.approvalParams = {
        hmIssueReportingId: hmIssueReportingId,
        approvalStatus: approvalStatus,
        remarks: remarks
      }
      this.updateService = this.issueApprovalService.approvedHMIssueReporting(this.approvalParams);
    }
    else if (this.type == 'VC') {
      this.issueApprovalForm.addControl('VCIssueReportingId', this.formBuilder.control(this.issueApprovalModel.VCIssueReportingId));

      let vcIssueReportingId = this.issueApprovalForm.get('VCIssueReportingId').value;
      let approvalStatus = this.issueApprovalForm.get('ApprovalStatus').value;
      let remarks = this.issueApprovalForm.get('Remarks').value;

      this.approvalParams = {
        vcIssueReportingId: vcIssueReportingId,
        approvalStatus: approvalStatus,
        remarks: remarks
      }
      this.updateService = this.issueApprovalService.approvedVCIssueReporting(this.approvalParams);
    }
    else if (this.type == 'VT') {
      this.issueApprovalForm.addControl('VTIssueReportingId', this.formBuilder.control(this.issueApprovalModel.VTIssueReportingId));

      let vtIssueReportingId = this.issueApprovalForm.get('VTIssueReportingId').value;
      let approvalStatus = this.issueApprovalForm.get('ApprovalStatus').value;
      let remarks = this.issueApprovalForm.get('Remarks').value;

      this.approvalParams = {
        vtIssueReportingId: vtIssueReportingId,
        approvalStatus: approvalStatus,
        remarks: remarks
      }
      this.updateService = this.issueApprovalService.approvedVTIssueReporting(this.approvalParams);
    }

    this.updateService.subscribe((approvalResp: any) => {
      if (approvalResp.Success) {
        this.zone.run(() => {
          this.showActionMessage(
            this.Constants.Messages.RecordSavedMessage,
            this.Constants.Html.SuccessSnackbar
          );
          if (this.type == 'HM') {
            this.router.navigate([RouteConstants.HMIssueReporting.Approval]);
          }
          if (this.type == 'VC') {
            this.router.navigate([RouteConstants.VCIssueReporting.Approval]);
          }
          if (this.type == 'VT') {
            this.router.navigate([RouteConstants.VTIssueReporting.Approval]);
          }
        });
      }
      else {
        var errorMessages = this.getHtmlMessage(approvalResp.Errors)
        this.dialogService.openShowDialog(errorMessages);
      }
    }, error => {
      console.log('HMIssueReporting deletion errors =>', error);
    });
  }

  //Create hmIssueReporting form and returns {FormGroup}
  createIssueApprovalForm(): FormGroup {
    return this.formBuilder.group({
      IssueReportDate: new FormControl({ value: new Date(this.issueApprovalModel.IssueReportDate), disabled: this.PageRights.IsReadOnly }, Validators.required),

      SchoolId: new FormControl({ value: this.issueApprovalModel.SchoolId, disabled: this.PageRights.IsReadOnly }),
      SectorId: new FormControl({ value: this.issueApprovalModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.issueApprovalModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),

      AcademicYearId: new FormControl({ value: this.issueApprovalModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }),
      StudentClass: new FormControl({ value: this.issueApprovalModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionIds: new FormControl({ value: this.issueApprovalModel.SectionIds, disabled: this.PageRights.IsReadOnly }),



      MainIssue: new FormControl({ value: this.issueApprovalModel.MainIssue, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      SubIssue: new FormControl({ value: this.issueApprovalModel.SubIssue, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      // StudentClass: new FormControl({ value: this.issueApprovalModel.StudentClass, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      Month: new FormControl({ value: this.issueApprovalModel.Month, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      StudentType: new FormControl({ value: this.issueApprovalModel.StudentType, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      NoOfStudents: new FormControl({ value: this.issueApprovalModel.NoOfStudents, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.Number)]),
      IssueDetails: new FormControl({ value: this.issueApprovalModel.IssueDetails, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(50)),
      ApprovalStatus: new FormControl({ value: this.issueApprovalModel.ApprovalStatus, disabled: false }, Validators.maxLength(50)),
      Remarks: new FormControl({ value: this.issueApprovalModel.Remarks, disabled: false }, Validators.maxLength(350)),
      // AssignForAction: new FormControl({value: this.issueApprovalModel.AssignForAction, disabled: false }),
    });
  }
}
