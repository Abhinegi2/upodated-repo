import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { SiteHeaderService } from '../site-header.service';
import { SiteHeaderModel } from '../site-header.model';

@Component({
  selector: 'site-header',
  templateUrl: './create-site-header.component.html',
  styleUrls: ['./create-site-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSiteHeaderComponent extends BaseComponent<SiteHeaderModel> implements OnInit {
  siteHeaderForm: FormGroup;
  siteHeaderModel: SiteHeaderModel;

  stakeholdersList = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private siteHeaderService: SiteHeaderService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default siteHeader Model
    this.siteHeaderModel = new SiteHeaderModel();
  }

  ngOnInit(): void {
    this.commonService.GetMasterDataByType({ DataType: 'RoleCodes', UserId: this.UserModel.UserId, SelectTitle: 'RoleCodes' }).subscribe((response: any) => {
      this.stakeholdersList = response.Results;
    });
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.siteHeaderModel = new SiteHeaderModel();

        } else {
          var siteHeaderId: string = params.get('siteHeaderId')

          this.siteHeaderService.getSiteHeaderById(siteHeaderId)
            .subscribe((response: any) => {
              this.siteHeaderModel = response.Result;

              if(response.Result.Stakeholders !== null){
                this.siteHeaderModel.StakeHolders = response.Result.Stakeholders.split(",");
              }

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.siteHeaderModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.siteHeaderModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.siteHeaderForm = this.createSiteHeaderForm();
            });
        }
      }
    });

    this.siteHeaderForm = this.createSiteHeaderForm();
  }

  saveOrUpdateSiteHeaderDetails() {
    this.setValueFromFormGroup(this.siteHeaderForm, this.siteHeaderModel);

    let stakeholdersList = this.siteHeaderForm.get("StakeHolders").value;

    if (stakeholdersList){
      this.siteHeaderModel.StakeHolders = stakeholdersList.join(",");

    }

    this.siteHeaderService.createOrUpdateSiteHeader(this.siteHeaderModel)
      .subscribe((siteHeaderResp: any) => {

        if (siteHeaderResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SiteHeader.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(siteHeaderResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SiteHeader deletion errors =>', error);
      });
  }

  //Create siteHeader form and returns {FormGroup}
  createSiteHeaderForm(): FormGroup {
    return this.formBuilder.group({
      SiteHeaderId: new FormControl(this.siteHeaderModel.SiteHeaderId),
      ShortName: new FormControl({ value: this.siteHeaderModel.ShortName, disabled: this.PageRights.IsReadOnly }, Validators.required),
      LongName: new FormControl({ value: this.siteHeaderModel.LongName, disabled: this.PageRights.IsReadOnly }),
      Description: new FormControl({ value: this.siteHeaderModel.Description, disabled: this.PageRights.IsReadOnly }),
      StakeHolders: new FormControl({ value: this.siteHeaderModel.StakeHolders, disabled: this.PageRights.IsReadOnly }),
      DisplayOrder: new FormControl({ value: this.siteHeaderModel.DisplayOrder, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Remarks: new FormControl({ value: this.siteHeaderModel.Remarks, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.siteHeaderModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
