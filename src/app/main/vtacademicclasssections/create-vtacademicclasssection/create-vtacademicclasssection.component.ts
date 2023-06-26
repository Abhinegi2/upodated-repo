import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VTAcademicClassSectionService } from '../vtacademicclasssection.service';
import { VTAcademicClassSectionModel } from '../vtacademicclasssection.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { VocationalTrainerService } from 'app/main/vocational-trainers/vocational-trainer.service';
import { AcademicYearComponent } from 'app/main/academic-years/academic-year.component';
import { isEmpty, result } from 'lodash';



@Component({
  selector: 'vtacademicclasssection',
  templateUrl: './create-vtacademicclasssection.component.html',
  styleUrls: ['./create-vtacademicclasssection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVTAcademicClassSectionComponent extends BaseComponent<VTAcademicClassSectionModel> implements OnInit {
  vtacademicclasssectionForm: FormGroup;
  vtacademicclasssectionModel: VTAcademicClassSectionModel;
  minAllocationDate: Date;

  academicYearList: [DropdownModel];
  classList: [DropdownModel];
  sectionList: [DropdownModel];
  vtList: [DropdownModel];
  filteredVTItems: any;
  filteredClassItem:any;
  gvtList: [DropdownModel];
  filteredGVTItems: any;
  selectedVTId: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vtacademicclasssectionService: VTAcademicClassSectionService,
    private vocationalTrainerService: VocationalTrainerService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vtacademicclasssection Model
    this.vtacademicclasssectionModel = new VTAcademicClassSectionModel();
  }

  ngOnInit(): void {

    this.vtacademicclasssectionService.getVTAcademicClassSection(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.classList = results[1].Results;
      }

      // if (results[2].Success) {
      //   this.sectionList = results[2].Results;
      // }

      if (results[3].Success) {
        this.vtList = results[3].Results;
        this.filteredVTItems = this.vtList.slice();
      }

      if (results[4].Success) {
        this.gvtList = results[4].Results;
        this.filteredGVTItems = this.gvtList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vtacademicclasssectionModel = new VTAcademicClassSectionModel();

          } else {
            var vtacademicclasssectionId: string = params.get('vtacademicclasssectionId')

            this.vtacademicclasssectionService.getVTAcademicClassSectionById(vtacademicclasssectionId)
              .subscribe((response: any) => {
                this.vtacademicclasssectionModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit){
                  this.vtacademicclasssectionModel.RequestType = this.Constants.PageType.Edit;
                  this.vtacademicclasssectionForm.controls['AcademicYearId'].disable();
                  this.vtacademicclasssectionForm.controls['ClassId'].disable();
                  // this.vtacademicclasssectionForm.controls['SectionId'].disable();
                  this.vtacademicclasssectionForm.controls['GVTId'].disable();
                  this.vtacademicclasssectionForm.controls['DateOfAllocation'].disable();
                  if(this.vtacademicclasssectionModel.VTId != null){
                  this.vtacademicclasssectionForm.controls['VTId'].disable();            
                  }
                }
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vtacademicclasssectionModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeVT(this.vtacademicclasssectionModel.VTId);
                this.onChangeClass(this.vtacademicclasssectionModel.ClassId);

                this.vtacademicclasssectionForm = this.createVTAcademicClassSectionForm();
              });
          }
        }
      });
    });

    this.vtacademicclasssectionForm = this.createVTAcademicClassSectionForm();
  }

  onChangeGvt(GVTId) {
  let promise = new Promise((resolve, reject) => {
    this.commonService.GetMasterDataByType({ DataType: 'ClassesByACS', DataTypeID5: GVTId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Classes' }).subscribe((response) => {
      if (response.Success) {
        if (response.Results.length == 2) {
          this.vtacademicclasssectionForm.controls['ClassId'].setValue(response.Results[1].Id);
          this.vtacademicclasssectionForm.controls['ClassId'].disable();
          this.onChangeClass(response.Results[1].Id);
        }else{
          this.vtacademicclasssectionForm.controls['ClassId'].setValue(null);
          this.vtacademicclasssectionForm.controls['ClassId'].enable();
        }
      }
      resolve(true);
    });
  });
  return promise;
}

  onChangeVT(accountId) {  
    if(accountId){
    this.vocationalTrainerService.getVocationalTrainerById(accountId).subscribe((response: any) => {
      var VtModel = response.Result;
      if (VtModel == null) {
        var errorMessages = this.getHtmlMessage(["The selected VT details are not present in <b>Vocational Trainner</b>.<br><br> Please visit the <a href='/vocational-trainers'><b>Vocational Trainer</b></a> page and provide required details for the selected VT."]);
        this.dialogService.openShowDialog(errorMessages);
        this.vtacademicclasssectionForm.controls['VTId'].setValue(null);
      } else {
        this.vtacademicclasssectionForm.controls["DateOfAllocation"].setValidators([Validators.required]);
      }
     });
   }else{
    return null;
   }
  }

  onChangeClass(classId) {

    let promise = new Promise((resolve) => {
      this.commonService.GetMasterDataByType({ DataType: 'SectionsByVTACS', ParentId: classId, UserId: this.UserModel.UserTypeId, roleId: this.UserModel.RoleCode, SelectTitle: 'Sections' }, false).subscribe((response) => {
        if (response.Success) {
          this.sectionList = response.Results;
        }
        resolve(true);
      });

    });

  }

  saveOrUpdateVTAcademicClassSectionDetails() {
    if (!this.vtacademicclasssectionForm.valid) {
      this.validateAllFormFields(this.vtacademicclasssectionForm);
      return;
    }

    this.setValueFromFormGroup(this.vtacademicclasssectionForm, this.vtacademicclasssectionModel);

    this.vtacademicclasssectionService.createOrUpdateVTAcademicClassSection(this.vtacademicclasssectionModel)
      .subscribe((vtacademicclasssectionResp: any) => {

        if (vtacademicclasssectionResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );
            this.router.navigate([RouteConstants.VTAcademicClassSection.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vtacademicclasssectionResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('VTAcademicClassSection deletion errors =>', error);
      });
  }

  //Create vtacademicclasssection form and returns {FormGroup}
  createVTAcademicClassSectionForm(): FormGroup {
    return this.formBuilder.group({
      VTAcademicClassSectionId: new FormControl(this.vtacademicclasssectionModel.VTAcademicClassSectionId),
      AcademicYearId: new FormControl({ value: this.vtacademicclasssectionModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ClassId: new FormControl({ value: this.vtacademicclasssectionModel.ClassId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectionId: new FormControl({ value: this.vtacademicclasssectionModel.SectionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VTId: new FormControl({ value: this.vtacademicclasssectionModel.VTId, disabled: this.PageRights.IsReadOnly }),
      GVTId: new FormControl({ value: this.vtacademicclasssectionModel.GVTId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfAllocation: new FormControl({ value: new Date(this.vtacademicclasssectionModel.DateOfAllocation), disabled: this.PageRights.IsReadOnly }),
      DateOfRemoval: new FormControl({ value: this.getDateValue(this.vtacademicclasssectionModel.DateOfRemoval), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.vtacademicclasssectionModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
