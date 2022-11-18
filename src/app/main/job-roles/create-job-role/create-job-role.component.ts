import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { JobRoleService } from '../job-role.service';
import { JobRoleModel } from '../job-role.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'job-role',
  templateUrl: './create-job-role.component.html',
  styleUrls: ['./create-job-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateJobRoleComponent extends BaseComponent<JobRoleModel> implements OnInit {
  jobRoleForm: FormGroup;
  jobRoleModel: JobRoleModel;
  sectorList: [DropdownModel];
  remarkText: string;

  sectorCtrl = new FormControl();
  sectorFilteredOptions: Observable<DropdownModel[]>;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private jobRoleService: JobRoleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default jobRole Model
    this.jobRoleModel = new JobRoleModel();
  }

  ngOnInit(): void {

    this.commonService
      .GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' }, false)
      .subscribe((response: any) => {

        if (response.Success) {
          this.sectorList = response.Results;

          this.sectorFilteredOptions = this.sectorCtrl.valueChanges.pipe(startWith(''),
            map(sector => sector? this.sectorFilter(sector): this.sectorList.slice())
          );
        }

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.jobRoleModel = new JobRoleModel();

            } else {
              var jobRoleId: string = params.get('jobRoleId')

              this.jobRoleService.getJobRoleById(jobRoleId)
                .subscribe((response: any) => {
                  this.jobRoleModel = response.Result;
                  this.remarkText = this.jobRoleModel.Remarks;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.jobRoleModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.jobRoleModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }
                  this.sectorCtrl.setValue(this.jobRoleModel.SectorId);

                  this.jobRoleForm = this.createJobRoleForm();
                });
            }
          }
        });
      });


    this.jobRoleForm = this.createJobRoleForm();
  }

  private sectorFilter(sectorName: string): DropdownModel[] {
    const filterValue = sectorName.toLowerCase();

    return this.sectorList.filter(x => x.Name.toLowerCase().indexOf(filterValue) === 0);
  }

  getSectorName(sectorId: string) {
    let sectorName: string = '';

    if (this.sectorList != undefined) {
      let sectorItem = this.sectorList.find(s => s.Id === sectorId);
      sectorName = (sectorItem != null ? sectorItem.Name : '');
    }

    return sectorName;
  }

  saveOrUpdateJobRoleDetails() {
    this.setValueFromFormGroup(this.jobRoleForm, this.jobRoleModel);
    this.jobRoleModel.Remarks = this.remarkText;
    this.jobRoleModel.SectorId = this.sectorCtrl.value;

    this.jobRoleService.createOrUpdateJobRole(this.jobRoleModel)
      .subscribe((jobRoleResp: any) => {

        if (jobRoleResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.JobRole.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(jobRoleResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('JobRole deletion errors =>', error);
      });
  }

  onChangeSector(evt) {
    var sectorItem = this.sectorList.find(x => x.Id == evt.option.value);
    var jobRoleText = this.jobRoleForm.get('JobRoleName').value;

    this.remarkText = (sectorItem == null ? '' : sectorItem.Name + '-') + jobRoleText;
    this.jobRoleForm.get('Remarks').setValue(this.remarkText);
  }

  onChangeJobRole(evt) {
    //var sectorItem = this.sectorList.find(x => x.Id == this.jobRoleForm.get('SectorId').value);
    var sectorItem = this.sectorList.find(x => x.Id == this.sectorCtrl.value);
    var jobRoleText = this.jobRoleForm.get('JobRoleName').value;

    this.remarkText = sectorItem.Name + (jobRoleText == null ? '' : '-' + jobRoleText);
    this.jobRoleForm.get('Remarks').setValue(this.remarkText);
  }

  //Create jobRole form and returns {FormGroup}
  createJobRoleForm(): FormGroup {
    return this.formBuilder.group({
      JobRoleId: new FormControl(this.jobRoleModel.JobRoleId),
      SectorId: new FormControl({ value: this.jobRoleModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      JobRoleName: new FormControl({ value: this.jobRoleModel.JobRoleName, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
      QPCode: new FormControl({ value: this.jobRoleModel.QPCode, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.QPCode)]),
      DisplayOrder: new FormControl({ value: this.jobRoleModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Remarks: new FormControl({ value: this.jobRoleModel.Remarks, disabled: true }),
      IsActive: new FormControl({ value: this.jobRoleModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
