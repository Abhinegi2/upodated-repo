import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { CountryService } from '../country.service';
import { CountryModel } from '../country.model';

@Component({
  selector: 'country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateCountryComponent extends BaseComponent<CountryModel> implements OnInit {
  countryForm: FormGroup;
  countryModel: CountryModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default country Model
    this.countryModel = new CountryModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.countryModel = new CountryModel();

        } else {
          var countryCode: string = params.get('countryCode')

          this.countryService.getCountryById(countryCode)
            .subscribe((response: any) => {
              this.countryModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.countryModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.countryModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.countryForm = this.createCountryForm();
            });
        }
      }
    });

    this.countryForm = this.createCountryForm();
  }

  saveOrUpdateCountryDetails() {
    this.setValueFromFormGroup(this.countryForm, this.countryModel);

    this.countryService.createOrUpdateCountry(this.countryModel)
      .subscribe((countryResp: any) => {

        if (countryResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Country.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(countryResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Country deletion errors =>', error);
      });
  }

  //Create country form and returns {FormGroup}
  createCountryForm(): FormGroup {
    return this.formBuilder.group({
      CountryCode: new FormControl(this.countryModel.CountryCode),
      CountryName: new FormControl({ value: this.countryModel.CountryName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ISDCode: new FormControl({ value: this.countryModel.ISDCode, disabled: this.PageRights.IsReadOnly }),
      ISOCode: new FormControl({ value: this.countryModel.ISOCode, disabled: this.PageRights.IsReadOnly }),
      CurrencyName: new FormControl({ value: this.countryModel.CurrencyName, disabled: this.PageRights.IsReadOnly }),
      CurrencyCode: new FormControl({ value: this.countryModel.CurrencyCode, disabled: this.PageRights.IsReadOnly }),
      CountryIcon: new FormControl({ value: this.countryModel.CountryIcon, disabled: this.PageRights.IsReadOnly }),
      Description: new FormControl({ value: this.countryModel.Description, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.countryModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
