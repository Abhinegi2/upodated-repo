import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { CourseModuleService } from '../course-module.service';
import { CourseModuleModel } from '../course-module.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'course-module',
  templateUrl: './create-course-module.component.html',
  styleUrls: ['./create-course-module.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateCourseModuleComponent extends BaseComponent<CourseModuleModel> implements OnInit {
  courseModuleForm: FormGroup;
  courseModuleModel: CourseModuleModel;

  classList: [DropdownModel];
  moduleTypeList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];
  sessionName: string = '';
  sessionList: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default courseModule Model
    this.courseModuleModel = new CourseModuleModel();
  }

  ngOnInit(): void {

    this.courseModuleService.getClassCourseModuleSector().subscribe(results => {
      if (results[0].Success) {
        this.classList = results[0].Results;
      }

      if (results[1].Success) {
        this.moduleTypeList = results[1].Results;
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.courseModuleModel = new CourseModuleModel();

          } else {
            var courseModuleId: string = params.get('courseModuleId')

            this.courseModuleService.getCourseModuleById(courseModuleId)
              .subscribe((response: any) => {
                this.courseModuleModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.courseModuleModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.courseModuleModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.sessionList = this.courseModuleModel.Sessions;
                this.courseModuleForm = this.createCourseModuleForm();

                this.onChangeSector(this.courseModuleModel.SectorId);
              });
          }
        }
      });
    });

    this.courseModuleForm = this.createCourseModuleForm();
  }

  onChangeSector(sectorId): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe(response => {
      if (response.Success) {
        this.jobRoleList = response.Results;
      }
    });
  }

  addSession() {
    if (this.sessionName != '') {
      this.sessionList.push({ SessionName: this.sessionName, DisplayOrder: 1 });
      this.sessionName = '';
    }
  }

  removeSession(sessionItem) {
    const sessionIndex = this.sessionList.indexOf(sessionItem);
    this.sessionList.splice(sessionIndex, 1);
  }

  saveOrUpdateCourseModuleDetails(): void {
    this.setValueFromFormGroup(this.courseModuleForm, this.courseModuleModel);
    
    this.courseModuleModel.Sessions = [];
    this.sessionList.forEach((sessionItem, sIndex) => {
      this.courseModuleModel.Sessions.push({ SessionName: sessionItem.SessionName, DisplayOrder: sIndex + 1 });
    });

    this.courseModuleService.createOrUpdateCourseModule(this.courseModuleModel)
      .subscribe((courseModuleResp: any) => {

        if (courseModuleResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.CourseModule.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(courseModuleResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('CourseModule deletion errors =>', error);
      });
  }

  //Create courseModule form and returns {FormGroup}
  createCourseModuleForm(): FormGroup {
    return this.formBuilder.group({
      CourseModuleId: new FormControl(this.courseModuleModel.CourseModuleId),
      ClassId: new FormControl({ value: this.courseModuleModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ModuleTypeId: new FormControl({ value: this.courseModuleModel.ModuleTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.courseModuleModel.SectorId, disabled: this.PageRights.IsReadOnly }),
      JobRoleId: new FormControl({ value: this.courseModuleModel.JobRoleId, disabled: this.PageRights.IsReadOnly }),
      UnitName: new FormControl({ value: this.courseModuleModel.UnitName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(250)]),
      DisplayOrder: new FormControl({ value: this.courseModuleModel.DisplayOrder, disabled: this.PageRights.IsReadOnly },[Validators.required, Validators.maxLength(2)]),
      Sessions: new FormControl({ value: this.courseModuleModel.Sessions, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.courseModuleModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
