import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { VocationalcoordinatordetailService } from '../vocationalcoordinatordetail.service';
import { VocationalcoordinatordetailModel } from '../vocationalcoordinatordetail.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'vocationalcoordinatordetail',
  templateUrl: './create-vocationalcoordinatordetail.component.html',
  styleUrls: ['./create-vocationalcoordinatordetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateVocationalcoordinatordetailComponent extends BaseComponent<VocationalcoordinatordetailModel> implements OnInit {
  vocationalcoordinatordetailForm: FormGroup;
  vocationalcoordinatordetailModel: VocationalcoordinatordetailModel;

  vtpList: [DropdownModel];
  genderList: [DropdownModel];
  vcList: [DropdownModel];
  filteredVCItems;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private vocationalcoordinatordetailService: VocationalcoordinatordetailService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default vocationalcoordinatordetail Model
    this.vocationalcoordinatordetailModel = new VocationalcoordinatordetailModel();
  }

  ngOnInit(): void {

    this.vocationalcoordinatordetailService.getDropdownforVocationalCoordinatorsDetail().subscribe((results: any) => {
      if (results[0].Success) {
        this.genderList = results[0].Results;
      }

      if (results[1].Success) {
        this.vcList = results[1].Results;
        this.filteredVCItems = this.vcList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.vocationalcoordinatordetailModel = new VocationalcoordinatordetailModel();

          } else {
            var vocationalcoordinatordetailId: string = params.get('vocationalcoordinatordetailId')

            this.vocationalcoordinatordetailService.getVocationalcoordinatordetailById(vocationalcoordinatordetailId)
              .subscribe((response: any) => {
                this.vocationalcoordinatordetailModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.vocationalcoordinatordetailModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.vocationalcoordinatordetailModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.vocationalcoordinatordetailForm = this.createVocationalcoordinatordetailForm();                
              });
          }
        }
      });
    });

    this.vocationalcoordinatordetailForm = this.createVocationalcoordinatordetailForm();
  }

  saveOrUpdateVocationalcoordinatordetailDetails() {
    if (!this.vocationalcoordinatordetailForm.valid) {
      this.validateAllFormFields(this.vocationalcoordinatordetailForm);  
      return;
    }

    this.setValueFromFormGroup(this.vocationalcoordinatordetailForm, this.vocationalcoordinatordetailModel);

    this.vocationalcoordinatordetailService.createOrUpdateVocationalcoordinatordetail(this.vocationalcoordinatordetailModel)
      .subscribe((vocationalcoordinatordetailResp: any) => {

        if (vocationalcoordinatordetailResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Vocationalcoordinatordetail.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(vocationalcoordinatordetailResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Vocationalcoordinatordetail deletion errors =>', error);
      });
  }

  //Create vocationalcoordinatordetail form and returns {FormGroup}
  createVocationalcoordinatordetailForm(): FormGroup {
    return this.formBuilder.group({
      VocationalcoordinatordetailId: new FormControl(this.vocationalcoordinatordetailModel.VocationalcoordinatordetailId),
      VCId: new FormControl({ value: this.vocationalcoordinatordetailModel.VCId, disabled: this.PageRights.IsReadOnly }),
      MiddleName: new FormControl({ value: this.vocationalcoordinatordetailModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      Mobile1: new FormControl({ value: this.vocationalcoordinatordetailModel.Mobile1, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.Constants.Regex.MobileNumber)]),
      Gender: new FormControl({ value: this.vocationalcoordinatordetailModel.Gender, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(50)]),
      DateOfJoining: new FormControl({ value: new Date(this.vocationalcoordinatordetailModel.DateOfJoining), disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfResignation: new FormControl({ value: this.getDateValue(this.vocationalcoordinatordetailModel.DateOfResignation), disabled: this.PageRights.IsReadOnly }),      IsActive: new FormControl({ value: this.vocationalcoordinatordetailModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
