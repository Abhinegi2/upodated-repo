import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTStudentPlacementDetailService } from '../vt-student-placement-detail.service';
import { VTStudentPlacementDetailModel } from '../vt-student-placement-detail.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vt-student-placement-detail',
  templateUrl: './create-vt-student-placement-detail.component.html',
  styleUrls: ['./create-vt-student-placement-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTStudentPlacementDetailComponent extends BaseComponent<VTStudentPlacementDetailModel> implements OnInit {
  vtStudentPlacementDetailForm: FormGroup;
  vtStudentPlacementDetailModel: VTStudentPlacementDetailModel;
  studentList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtStudentPlacementDetailService: VTStudentPlacementDetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtStudentPlacementDetail Model
    this.vtStudentPlacementDetailModel = new VTStudentPlacementDetailModel();
  }

  ngOnInit(): void {

    this.vtStudentPlacementDetailService.getClassesAndStudents().subscribe(results => {
        if (results[0].Success) {
          this.studentList = results[0].Results;
        }

        this.route.paramMap.subscribe(params => {
          if (params.keys.length > 0) {
            this.PageRights.ActionType = params.get('actionType');

            if (this.PageRights.ActionType == this.Constants.Actions.New) {
              this.vtStudentPlacementDetailModel = new VTStudentPlacementDetailModel();

            } else {
              var vtStudentPlacementDetailId: string = params.get('vtStudentPlacementDetailId')

              this.vtStudentPlacementDetailService.getVTStudentPlacementDetailById(vtStudentPlacementDetailId)
                .subscribe((response: any) => {
                  this.vtStudentPlacementDetailModel = response.Result;

                  if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                    this.vtStudentPlacementDetailModel.RequestType = this.Constants.PageType.Edit;
                  else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                    this.vtStudentPlacementDetailModel.RequestType = this.Constants.PageType.View;
                    this.PageRights.IsReadOnly = true;
                  }

                  this.vtStudentPlacementDetailForm = this.createVTStudentPlacementDetailForm();
                });
            }
          }
        });
      });

    this.vtStudentPlacementDetailForm = this.createVTStudentPlacementDetailForm();
  }

  saveOrUpdateVTStudentPlacementDetailDetails() {
    if (!this.vtStudentPlacementDetailForm.valid) {
      this.validateAllFormFields(this.vtStudentPlacementDetailForm);  
      return;
    }
    this.setValueFromFormGroup(this.vtStudentPlacementDetailForm, this.vtStudentPlacementDetailModel);
    this.vtStudentPlacementDetailModel.VTId= this.UserModel.UserTypeId;

    this.vtStudentPlacementDetailService.createOrUpdateVTStudentPlacementDetail(this.vtStudentPlacementDetailModel)
      .subscribe((vtStudentPlacementDetailResp: any) => {

        if (vtStudentPlacementDetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.VTStudentPlacementDetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtStudentPlacementDetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTStudentPlacementDetail deletion errors =>', error);
      });
  }

  //Create vtStudentPlacementDetail form and returns {FormGroup}
  createVTStudentPlacementDetailForm(): FormGroup {
    return this.formBuilder.group({
      VTStudentPlacementDetailId: new FormControl(this.vtStudentPlacementDetailModel.VTStudentPlacementDetailId),      
      StudentId: new FormControl({ value: this.vtStudentPlacementDetailModel.StudentId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      PlacementApplyStatus: new FormControl({ value: this.vtStudentPlacementDetailModel.PlacementApplyStatus, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)]),
      PlacementStatus: new FormControl({ value: this.vtStudentPlacementDetailModel.PlacementStatus, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)]),
      ApprenticeshipApplyStatus: new FormControl({ value: this.vtStudentPlacementDetailModel.ApprenticeshipApplyStatus, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)),
      ApprenticeshipStatus: new FormControl({ value: this.vtStudentPlacementDetailModel.ApprenticeshipStatus, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)),
      HigherEducationVE: new FormControl({ value: this.vtStudentPlacementDetailModel.HigherEducationVE, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)),
      HigherEductaionOther: new FormControl({ value: this.vtStudentPlacementDetailModel.HigherEductaionOther, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)),
      StudentPlacementStatus: new FormControl({ value: this.vtStudentPlacementDetailModel.StudentPlacementStatus, disabled: this.PageRights.IsReadOnly }, Validators.pattern(this.Constants.Regex.AlphaNumericWithDashDotMinusSpace)),
    });
  }
}
