import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SchoolClassService } from '../school-class.service';
import { SchoolClassModel } from '../school-class.model';

@Component({
  selector: 'school-class',
  templateUrl: './create-school-class.component.html',
  styleUrls: ['./create-school-class.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolClassComponent extends BaseComponent<SchoolClassModel> implements OnInit {
  schoolClassForm: FormGroup;
  schoolClassModel: SchoolClassModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolClassService: SchoolClassService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default schoolClass Model
    this.schoolClassModel = new SchoolClassModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.schoolClassModel = new SchoolClassModel();

        } else {
          var classId: string = params.get('classId')

          this.schoolClassService.getSchoolClassById(classId)
            .subscribe((response: any) => {
              this.schoolClassModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.schoolClassModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.schoolClassModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.schoolClassForm = this.createSchoolClassForm();
            });
        }
      }
    });

    this.schoolClassForm = this.createSchoolClassForm();
  }

  saveOrUpdateSchoolClassDetails() {
    this.setValueFromFormGroup(this.schoolClassForm, this.schoolClassModel);

    this.schoolClassService.createOrUpdateSchoolClass(this.schoolClassModel)
      .subscribe((schoolClassResp: any) => {

        if (schoolClassResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolClass.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolClassResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolClass deletion errors =>', error);
      });
  }

  //Create schoolClass form and returns {FormGroup}
  createSchoolClassForm(): FormGroup {
    return this.formBuilder.group({
      ClassId: new FormControl(this.schoolClassModel.ClassId),
      Name: new FormControl({ value: this.schoolClassModel.Name, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassCode: new FormControl({ value: this.schoolClassModel.ClassCode, disabled: this.PageRights.IsReadOnly , }, [Validators.maxLength(2), Validators.minLength(2), Validators.required, Validators.pattern(this.Constants.Regex.Number),]),
      Description: new FormControl({ value: this.schoolClassModel.Description, disabled: this.PageRights.IsReadOnly }),
      Remarks: new FormControl({ value: this.schoolClassModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.schoolClassModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
