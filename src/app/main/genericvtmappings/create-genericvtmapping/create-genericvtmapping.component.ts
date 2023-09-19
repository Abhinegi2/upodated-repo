import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { GenericVTMappingService } from '../genericvtmapping.service';
import { GenericVTMappingModel } from '../genericvtmapping.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { VocationalCoordinatorService } from 'app/main/vocational-coordinators/vocational-coordinator.service';

@Component({
  selector: 'genericvtmapping',
  templateUrl: './create-genericvtmapping.component.html',
  styleUrls: ['./create-genericvtmapping.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateGenericVTMappingComponent extends BaseComponent<GenericVTMappingModel> implements OnInit {
  genericvtmappingForm: FormGroup;
  genericvtmappingModel: GenericVTMappingModel;
  UserId: string;
  userList: DropdownModel[];
  userFilterList: any;
  gvtList: [DropdownModel];
  vtpList: [DropdownModel];
  vcList: [DropdownModel];
  vtList: [DropdownModel];
  filteredVcItems: any;
  filteredVtItems: any;
  filteredGVTItems: any;
  filteredVtpItems: any;


  minAllocationDate: Date;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private genericvtmappingService: GenericVTMappingService,
    private vocationalCoordinatorService: VocationalCoordinatorService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default genericvtmapping Model
    this.genericvtmappingModel = new GenericVTMappingModel();
  }

  ngOnInit(): void {

    this.genericvtmappingService.getGenericVTMapping(this.UserModel).subscribe(results => {

      if (results[0].Success) {
        this.gvtList = results[0].Results;
        this.filteredGVTItems = this.gvtList.slice();
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVtpItems = this.vtpList.slice();
      }
      this.genericvtmappingForm.controls['DateOfAllocation'].disable();
      
      if (results[2].Success) {
        this.vcList = results[2].Results;
        this.filteredVcItems = this.vcList.slice();
      }
      this.genericvtmappingForm.controls['DateOfAllocationVC'].disable();


      if (results[3].Success) {
        this.vtList = results[3].Results;
        this.filteredVtItems = this.vtList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.genericvtmappingModel = new GenericVTMappingModel();            

          } else {
            var genericvtmappingId: string = params.get('genericvtmappingId')

            this.genericvtmappingService.getGenericVTMappingById(genericvtmappingId)
              .subscribe((response: any) => {
                this.genericvtmappingModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.genericvtmappingModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.genericvtmappingModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.genericvtmappingForm = this.createGenericVTMappingForm();

              });
          }
        }
      });
    });

    this.genericvtmappingForm = this.createGenericVTMappingForm();
  }

  onVTPIdChange():void{
    const vtpId = this.genericvtmappingForm.get('VTPId').value;
    const dateOfAllocationVTPControl = this.genericvtmappingForm.get('DateOfAllocation');
    if(vtpId){
      dateOfAllocationVTPControl.setValidators([Validators.required]);
      this.genericvtmappingForm.controls['DateOfAllocation'].enable();
    }else{
    dateOfAllocationVTPControl.clearValidators();
  }
  }



// Inside your component class
onVCIdChange(): void {

  const vcId = this.genericvtmappingForm.get('VCId').value;
  const dateOfAllocationVCControl = this.genericvtmappingForm.get('DateOfAllocationVC'); 


  if (vcId) {
    dateOfAllocationVCControl.setValidators([Validators.required]);
    this.genericvtmappingForm.controls['DateOfAllocationVC'].enable();
  } else {
    dateOfAllocationVCControl.clearValidators();
  }
}

onChangeDateOfAllocation(): void{
  const dateOfAllocationVT = this.genericvtmappingForm.get('DateOfAllocation');
  if(dateOfAllocationVT) {
    this.genericvtmappingForm.get('DateOfAllocationVC').setValue(null);
  }
}

  saveOrUpdateGenericVTMappingDetails() {
    if (!this.genericvtmappingForm.valid) {
      this.validateAllFormFields(this.genericvtmappingForm);
      return;
    }

    this.setValueFromFormGroup(this.genericvtmappingForm, this.genericvtmappingModel);

    this.genericvtmappingService.createOrUpdateGenericVTMapping(this.genericvtmappingModel)
      .subscribe((genericvtmappingResp: any) => {

        if (genericvtmappingResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.GenericVTMapping.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(genericvtmappingResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('GenericVTMapping deletion errors =>', error);
      });
  }

  //Create genericvtmapping form and returns {FormGroup}
  createGenericVTMappingForm(): FormGroup {
    return this.formBuilder.group({
      GenericVTMappingId: new FormControl(this.genericvtmappingModel.GenericVTMappingId),
      SSJId: new FormControl({ value: this.genericvtmappingModel.SSJId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VTPId: new FormControl({ value: this.genericvtmappingModel.VTPId, disabled: this.PageRights.IsReadOnly }),
      VCId: new FormControl({ value: this.genericvtmappingModel.VCId, disabled: this.PageRights.IsReadOnly }),
      VTId: new FormControl({ value: this.genericvtmappingModel.VTId, disabled: this.PageRights.IsReadOnly }),
      DateOfAllocation: new FormControl({ value: this.getDateValue(this.genericvtmappingModel.DateOfAllocation), disabled: this.PageRights.IsReadOnly }),
      DateOfRemoval: new FormControl({ value: this.getDateValue(this.genericvtmappingModel.DateOfRemoval), disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.genericvtmappingModel.IsActive, disabled: this.PageRights.IsReadOnly }),
      DateOfAllocationVC: new FormControl({ value: this.getDateValue(this.genericvtmappingModel.DateOfAllocationVC), disabled: this.PageRights.IsReadOnly }),
    });
  }
}
