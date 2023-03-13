import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolSectorJobService } from '../schoolsectorjob.service';
import { SchoolSectorJobModel } from '../schoolsectorjob.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'schoolsectorjob',
  templateUrl: './create-schoolsectorjob.component.html',
  styleUrls: ['./create-schoolsectorjob.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolSectorJobComponent extends BaseComponent<SchoolSectorJobModel> implements OnInit {
  schoolsectorjobForm: FormGroup;
  schoolsectorjobModel: SchoolSectorJobModel;
  minAllocationDate: Date;


  schoolList: [DropdownModel];
  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolsectorjobService: SchoolSectorJobService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default schoolsectorjob Model
    this.schoolsectorjobModel = new SchoolSectorJobModel();
  }

  ngOnInit(): void {

    this.schoolsectorjobService.getSchoolSectorJob().subscribe(results => {

      if (results[0].Success) {
        this.schoolList = results[0].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.schoolsectorjobModel = new SchoolSectorJobModel();

          } else {
            var schoolsectorjobId: string = params.get('schoolsectorjobId')

            this.schoolsectorjobService.getSchoolSectorJobById(schoolsectorjobId)
              .subscribe((response: any) => {
                this.schoolsectorjobModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.schoolsectorjobModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolsectorjobModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.onChangeSchool(this.schoolsectorjobModel.SchoolId).then(response => {
                  this.onChangeSector(this.schoolsectorjobModel.SectorId).then(response => {
                    this.schoolsectorjobForm = this.createSchoolSectorJobForm();
                    this.IsLoading = true;
                  });
                });

                // this.schoolsectorjobForm = this.createSchoolSectorJobForm();
              });
          }
        }
      });
    });

    this.schoolsectorjobForm = this.createSchoolSectorJobForm();
  }


  onChangeSector(sectorId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: "Job Role" }).subscribe((response) => {
        if (response.Success) {
          this.jobRoleList = response.Results;

          if (this.IsLoading) {
            this.schoolsectorjobForm.controls['JobRoleId'].setValue(null);
          }
        }

        resolve(true);
      });
    });
  }

  onChangeSchool(schoolId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'SectorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: schoolId, SelectTitle: "Sector" }).subscribe((response) => {
        if (response.Success) {
          this.sectorList = response.Results;

          if (this.IsLoading) {
            this.schoolsectorjobForm.controls['SectorId'].setValue(null);
            this.schoolsectorjobForm.controls['JobRoleId'].setValue(null);
            this.jobRoleList = <DropdownModel[]>[];
          }
        }

        resolve(true);
      });
    });
  }

  saveOrUpdateSchoolSectorJobDetails() {
    if (!this.schoolsectorjobForm.valid) {
      this.validateAllFormFields(this.schoolsectorjobForm);
      return;
    }

    this.setValueFromFormGroup(this.schoolsectorjobForm, this.schoolsectorjobModel);

    this.schoolsectorjobService.createOrUpdateSchoolSectorJob(this.schoolsectorjobModel)
      .subscribe((schoolsectorjobResp: any) => {

        if (schoolsectorjobResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolSectorJob.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolsectorjobResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolSectorJob deletion errors =>', error);
      });
  }

  //Create schoolsectorjob form and returns {FormGroup}
  createSchoolSectorJobForm(): FormGroup {
    return this.formBuilder.group({
      SchoolSectorJobId: new FormControl(this.schoolsectorjobModel.SchoolSectorJobId),
      SchoolId: new FormControl({ value: this.schoolsectorjobModel.SchoolId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.schoolsectorjobModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleId: new FormControl({ value: this.schoolsectorjobModel.JobRoleId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfAllocation: new FormControl({ value: new Date(this.schoolsectorjobModel.DateOfAllocation), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfRemoval: new FormControl({ value: this.getDateValue(this.schoolsectorjobModel.DateOfRemoval), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.schoolsectorjobModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
