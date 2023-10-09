import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { HeadMasterService } from '../head-master.service';
import { HeadMasterModel } from '../head-master.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'head-master',
  templateUrl: './create-head-master.component.html',
  styleUrls: ['./create-head-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateHeadMasterComponent extends BaseComponent<HeadMasterModel> implements OnInit {
  headMasterForm: FormGroup;
  headMasterModel: HeadMasterModel;
  genderList: [DropdownModel];
  yearsInSchool: number;
  academicYearList: [DropdownModel];
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  VtId: any;
  AcademicYear: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private headMasterService: HeadMasterService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default headMaster Model
    this.headMasterModel = new HeadMasterModel();
    this.headMasterForm = this.createHeadMasterForm();
  }

  ngOnInit(): void {
    this.headMasterService.getDropdownforHeadMaster(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.schoolList = results[0].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }
      if (results[1].Success) {
        this.genderList = results[1].Results;
      }
      this.headMasterService.getInitHeadMastersData(this.UserModel).subscribe((results)=>{
        console.log(results);
        if(results[0].Success){
          this.academicYearList = results[0].Results;
          let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        
        this.AcademicYear = currentYearItem.Name;
        console.log(this.AcademicYear , "this.AcademicYear ");
        this.headMasterForm.controls['AcademicYear'].setValue(this.AcademicYear);
      }
        }
      })

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.headMasterModel = new HeadMasterModel();
          } else {
            var hmId: string = params.get('hmId')

            this.headMasterService.getHeadMasterById(hmId)
              .subscribe((response: any) => {
                this.headMasterModel = response.Result;
                console.log(response.Result);
                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.headMasterModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.headMasterModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeDateCalculateYear(this.headMasterModel.DateOfJoining);
                this.headMasterForm = this.createHeadMasterForm();
              });
          }
        }
      });
    });
  }
  onChangeDateCalculateYear(event) {
    let dateOfJoining = new Date(event.value);
    let today = new Date();
    this.yearsInSchool = today.getFullYear() - dateOfJoining.getFullYear();
    this.headMasterForm.get("YearsInSchool").patchValue(this.yearsInSchool);
  }

  saveOrUpdateHeadMasterDetails() {
    if (!this.headMasterForm.valid) {
      this.validateAllFormFields(this.headMasterForm);

      return;
    }

    this.headMasterModel.YearsInSchool = this.headMasterForm.get("YearsInSchool").value;
    this.setValueFromFormGroup(this.headMasterForm, this.headMasterModel);
    this.headMasterService.createOrUpdateHeadMaster(this.headMasterModel)
      .subscribe((headMasterResp: any) => {

        if (headMasterResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.HeadMaster.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(headMasterResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('HeadMaster deletion errors =>', error);
      });
  }

  //Create headMaster form and returns {FormGroup}
  createHeadMasterForm(): FormGroup {
    return this.formBuilder.group({
      HMId: new FormControl(this.headMasterModel.HMId),
      SchoolId: new FormControl({ value: this.headMasterModel.SchoolId, disabled: this.PageRights.IsReadOnly }, /*Validators.required*/),
      FirstName: new FormControl({ value: this.headMasterModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.OnlyChars)]),
      MiddleName: new FormControl({ value: this.headMasterModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.OnlyChars)]),
      LastName: new FormControl({ value: this.headMasterModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.OnlyChars)]),
      FullName: new FormControl({ value: this.headMasterModel.FullName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(150)]),
      Mobile: new FormControl({ value: this.headMasterModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Mobile1: new FormControl({ value: this.headMasterModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      AcademicYear: new FormControl({ value: this.headMasterModel.AcademicYear, disabled: this.PageRights.IsReadOnly }),
      Email: new FormControl({ value: this.headMasterModel.Email, disabled: (this.PageRights.IsReadOnly ) }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.Email)]),
      Gender: new FormControl({ value: this.headMasterModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(10)]),
      YearsInSchool: new FormControl({ value: this.headMasterModel.YearsInSchool, disabled: true }, Validators.pattern(this.Constants.Regex.Number)),
      DateOfJoining: new FormControl({ value: new Date(this.headMasterModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfResignation: new FormControl({ value: this.getDateValue(this.headMasterModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.headMasterModel.IsActive, disabled: this.PageRights.IsReadOnly })
    });
  }
}
