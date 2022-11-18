import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SiteSubHeaderService } from '../site-sub-header.service';
import { SiteSubHeaderModel } from '../site-sub-header.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'site-sub-header',
  templateUrl: './create-site-sub-header.component.html',
  styleUrls: ['./create-site-sub-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSiteSubHeaderComponent extends BaseComponent<SiteSubHeaderModel> implements OnInit {
  siteSubHeaderForm: FormGroup;
  siteSubHeaderModel: SiteSubHeaderModel;

  siteHeaderList: [DropdownModel];
  filteredSiteHeaderItems: any;
  transactionList: [DropdownModel];
  filteredTransactionItems: any;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private siteSubHeaderService: SiteSubHeaderService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default siteSubHeader Model
    this.siteSubHeaderModel = new SiteSubHeaderModel();
  }

  ngOnInit(): void {

    this.siteSubHeaderService.getDropdownforSiteHeaderTransaction().subscribe((results) => {
      if (results[0].Success) {
        this.siteHeaderList = results[0].Results;
        this.filteredSiteHeaderItems = this.siteHeaderList.slice();
      }

      if (results[1].Success) {
        this.transactionList = results[1].Results;
        this.filteredTransactionItems = this.transactionList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.siteSubHeaderModel = new SiteSubHeaderModel();

          } else {
            var siteSubHeaderId: string = params.get('siteSubHeaderId')

            this.siteSubHeaderService.getSiteSubHeaderById(siteSubHeaderId)
              .subscribe((response: any) => {
                this.siteSubHeaderModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.siteSubHeaderModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.siteSubHeaderModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.siteSubHeaderForm = this.createSiteSubHeaderForm();
              });
          }
        }
      });
    });

    this.siteSubHeaderForm = this.createSiteSubHeaderForm();
  }

  saveOrUpdateSiteSubHeaderDetails() {
    this.setValueFromFormGroup(this.siteSubHeaderForm, this.siteSubHeaderModel);

    this.siteSubHeaderService.createOrUpdateSiteSubHeader(this.siteSubHeaderModel)
      .subscribe((siteSubHeaderResp: any) => {

        if (siteSubHeaderResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SiteSubHeader.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(siteSubHeaderResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SiteSubHeader deletion errors =>', error);
      });
  }

  //Create siteSubHeader form and returns {FormGroup}
  createSiteSubHeaderForm(): FormGroup {
    return this.formBuilder.group({
      SiteSubHeaderId: new FormControl(this.siteSubHeaderModel.SiteSubHeaderId),
      SiteHeaderId: new FormControl({ value: this.siteSubHeaderModel.SiteHeaderId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      TransactionId: new FormControl({ value: this.siteSubHeaderModel.TransactionId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      IsHeaderMenu: new FormControl({ value: this.siteSubHeaderModel.IsHeaderMenu, disabled: this.PageRights.IsReadOnly }),
      DisplayOrder: new FormControl({ value: this.siteSubHeaderModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Remarks: new FormControl({ value: this.siteSubHeaderModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.siteSubHeaderModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
