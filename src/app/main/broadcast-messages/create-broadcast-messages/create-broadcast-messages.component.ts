import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { BroadcastMessagesService } from '../broadcast-messages.service';
import { BroadcastMessagesModel } from '../broadcast-messages.model';

@Component({
  selector: 'broadcast-messages',
  templateUrl: './create-broadcast-messages.component.html',
  styleUrls: ['./create-broadcast-messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateBroadcastMessagesComponent extends BaseComponent<BroadcastMessagesModel> implements OnInit {
  broadcastMessagesForm: FormGroup;
  broadcastMessagesModel: BroadcastMessagesModel;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private broadcastMessagesService: BroadcastMessagesService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default BroadcastMessages Model
    this.broadcastMessagesModel = new BroadcastMessagesModel();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.broadcastMessagesModel = new BroadcastMessagesModel();

        } else {

          var broadcastMessageId: string = params.get('broadcastMessagesId');

          this.broadcastMessagesService.getBroadcastMessagesById(broadcastMessageId)
            .subscribe((response: any) => {
              this.broadcastMessagesModel = response.Result;
              this.broadcastMessagesModel.ApplicableFor = response.Result.ApplicableFor.split(',');

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.broadcastMessagesModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.broadcastMessagesModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.broadcastMessagesForm = this.createBroadcastMessagesForm();
            });
        }
      }
    });

    this.broadcastMessagesForm = this.createBroadcastMessagesForm();
  }

  saveOrUpdateBroadcastMessagesDetails() {
    if (!this.broadcastMessagesForm.valid) {
      this.validateAllFormFields(this.broadcastMessagesForm);  
      return;
    }
    var applicableFor = this.broadcastMessagesForm.get('ApplicableFor').value;

    this.setValueFromFormGroup(this.broadcastMessagesForm, this.broadcastMessagesModel);
    this.broadcastMessagesModel.ApplicableFor = applicableFor.join(',');

    this.broadcastMessagesService.createOrUpdateBroadcastMessages(this.broadcastMessagesModel)
      .subscribe((broadcastMessagesResp: any) => {

        if (broadcastMessagesResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.BroadcastMessages.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(broadcastMessagesResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Broadcast Messages deletion errors =>', error);
      });
  }

  //Create Broadcast Messages form and returns {FormGroup}
  createBroadcastMessagesForm(): FormGroup {
    return this.formBuilder.group({
      BroadcastMessageId: new FormControl(this.broadcastMessagesModel.BroadcastMessageId),
      MessageText: new FormControl({ value: this.broadcastMessagesModel.MessageText, disabled: this.PageRights.IsReadOnly }, Validators.required),
      FromDate: new FormControl({ value: new Date(this.broadcastMessagesModel.FromDate), disabled: this.PageRights.IsReadOnly }),
      ToDate: new FormControl({ value: new Date(this.broadcastMessagesModel.ToDate), disabled: this.PageRights.IsReadOnly }),
      ApplicableFor: new FormControl({ value: this.broadcastMessagesModel.ApplicableFor, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.broadcastMessagesModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
