import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTStudentAssessmentService } from '../vt-student-assessment.service';
import { VTStudentAssessmentModel } from '../vt-student-assessment.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'vt-student-assessment',
  templateUrl: './create-vt-student-assessment.component.html',
  styleUrls: ['./create-vt-student-assessment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTStudentAssessmentComponent extends BaseComponent<VTStudentAssessmentModel> implements OnInit {
  vtStudentAssessmentForm: FormGroup;
  vtStudentAssessmentModel: VTStudentAssessmentModel;
  genderList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStudentAssessmentService: VTStudentAssessmentService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStudentAssessment Model
    this.vtStudentAssessmentModel = new VTStudentAssessmentModel();
  }

  ngOnInit(): void {
    this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Gender', SelectTitle: 'Gender' }).subscribe((results) => {
      if (results.Success) {
        this.genderList = results.Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtStudentAssessmentModel = new VTStudentAssessmentModel();

          } else {
            var vtStudentAssessmentId: string = params.get('vtStudentAssessmentId')

            this.vtStudentAssessmentService.getVTStudentAssessmentById(vtStudentAssessmentId)
              .subscribe((response: any) => {
                this.vtStudentAssessmentModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vtStudentAssessmentModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtStudentAssessmentModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.vtStudentAssessmentForm = this.createVTStudentAssessmentForm();
              });
          }
        }
      });
    });

    this.vtStudentAssessmentForm = this.createVTStudentAssessmentForm();
  }

  saveOrUpdateVTStudentAssessmentDetails() {
    if (!this.vtStudentAssessmentForm.valid) {
      this.validateAllFormFields(this.vtStudentAssessmentForm);  
      return;
    }
    this.setValueFromFormGroup(this.vtStudentAssessmentForm, this.vtStudentAssessmentModel);
    this.vtStudentAssessmentModel.VTId = this.UserModel.UserTypeId;
    this.vtStudentAssessmentModel.StudentPhoto = null;
    this.vtStudentAssessmentModel.GroupPhoto = null;

    this.vtStudentAssessmentService.createOrUpdateVTStudentAssessment(this.vtStudentAssessmentModel)
      .subscribe((vtStudentAssessmentResp: any) => {

        if (vtStudentAssessmentResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTStudentAssessment.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtStudentAssessmentResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTStudentAssessment deletion errors =>', error);
      });
  }

  //Create vtStudentAssessment form and returns {FormGroup}
  createVTStudentAssessmentForm(): FormGroup {
    return this.formBuilder.group({
      VTStudentAssessmentId: new FormControl(this.vtStudentAssessmentModel.VTStudentAssessmentId),
      TestimonialType: new FormControl({ value: this.vtStudentAssessmentModel.TestimonialType, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharsWithSpace)]),
      StudentName: new FormControl({ value: this.vtStudentAssessmentModel.StudentName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      StudentGender: new FormControl({ value: this.vtStudentAssessmentModel.StudentGender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      StudentPhoto: new FormControl({ value: this.vtStudentAssessmentModel.StudentPhoto, disabled: this.PageRights.IsReadOnly }),
      OJTCompany: new FormControl({ value: this.vtStudentAssessmentModel.OJTCompany, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150), Validators.pattern(this.Constants.Regex.CharsWithSpace)]),
      OJTCompanyAddress: new FormControl({ value: this.vtStudentAssessmentModel.OJTCompanyAddress, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(350), Validators.pattern(this.Constants.Regex.CharsWithSpace)]),
      OJTFieldSuperName: new FormControl({ value: this.vtStudentAssessmentModel.OJTFieldSuperName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150), Validators.pattern(this.Constants.Regex.CharsWithTitleCase)]),
      OJTFieldSuperMobile: new FormControl({ value: this.vtStudentAssessmentModel.OJTFieldSuperMobile, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.maxLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      OJTFieldSuperEmail: new FormControl({ value: this.vtStudentAssessmentModel.OJTFieldSuperEmail, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      GroupPhoto: new FormControl({ value: this.vtStudentAssessmentModel.GroupPhoto, disabled: this.PageRights.IsReadOnly }),
      TestimonialTitle: new FormControl({ value: this.vtStudentAssessmentModel.TestimonialTitle, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150), Validators.pattern(this.Constants.Regex.CharsWithSpace)]),
      TestimonialDetails: new FormControl({ value: this.vtStudentAssessmentModel.TestimonialDetails, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(250), Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)]),
    });
  }
}
