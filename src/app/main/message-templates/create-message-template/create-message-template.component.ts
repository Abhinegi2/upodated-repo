import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

import { DropdownModel } from 'app/models/dropdown.model';
import { MessageTemplateModel } from '../message-template.model';
import { MessageTemplateService } from '../message-template.service';
import { RouteConstants } from 'app/constants/route.constant';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'message-template',
  templateUrl: './create-message-template.component.html',
  styleUrls: ['./create-message-template.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class CreateMessageTemplateComponent extends BaseComponent<MessageTemplateModel> implements OnInit {
  messageTemplateForm: FormGroup;
  messageTemplateModel: MessageTemplateModel;
  messageTypeList: [DropdownModel];
  messageSubTypeList: [DropdownModel];
  messageVariablesList: [DropdownModel];
  filteredMessageVariablesItems: any;
  messageApplicableList: string[] = ['SMS', 'Whatsapp', 'Email'];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private messageTemplatesService: MessageTemplateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default headMaster Model
    this.messageTemplateModel = new MessageTemplateModel();
    this.messageTemplateForm = this.createMessageTemplateForm();
  }

  ngOnInit(): void {
    this.messageTemplatesService.getDropdownforMessageTemplate(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.messageTypeList = results[0].Results;
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.messageTemplateModel = new MessageTemplateModel();

          } else {
            var messageTemplateId: string = params.get('messageTemplateId');

            this.messageTemplatesService.getMessageTemplateById(messageTemplateId)
              .subscribe((response: any) => {
                this.messageTemplateModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.messageTemplateModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.messageTemplateModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeMessageType(this.messageTemplateModel.MessageTypeId).then(mt => {
                  this.onChangeMessageSubType(this.messageTemplateModel.MessageSubTypeId).then(mst => {
                    this.messageTemplateForm = this.createMessageTemplateForm();
                  });
                });

              });
          }
        }
      });
    });
  }

  onChangeMessageType(messageId): Promise<any> {
    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'MessageSubTypes', ParentId: messageId, SelectTitle: 'Message Sub Type' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.messageSubTypeList = response.Results;
        }
      });

      this.IsLoading = false;
      resolve(true);
    });
    return promise;
  }

  onChangeMessageSubType(messageSubTypeId): Promise<any> {
    this.IsLoading = true;
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'MessageVariables', UserId: this.UserModel.LoginId, ParentId: messageSubTypeId, SelectTitle: 'Message Sub Type' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.messageVariablesList = response.Results;
          this.filteredMessageVariablesItems = this.messageVariablesList.slice();
        }
      });

      this.IsLoading = false;
      resolve(true);
    });
    return promise;
  }

  saveOrUpdateMessageTemplateDetails() {
    if (!this.messageTemplateForm.valid) {
      this.validateAllFormFields(this.messageTemplateForm);
      return;
    }

    this.setValueFromFormGroup(this.messageTemplateForm, this.messageTemplateModel);

    this.messageTemplatesService.createOrUpdateMessageTemplate(this.messageTemplateModel)
      .subscribe((messageTemplateResp: any) => {
        if (messageTemplateResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );
            this.router.navigate([RouteConstants.MessageTemplates.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(messageTemplateResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('MessageTemplate deletion errors =>', error);
      });
  }

  //Create MessageTemplate form and returns {FormGroup}
  createMessageTemplateForm(): FormGroup {
    return this.formBuilder.group({
      MessageTemplateId: new FormControl({ value: this.messageTemplateModel.MessageTemplateId, disabled: this.PageRights.IsReadOnly }),
      TemplateName: new FormControl({ value: this.messageTemplateModel.TemplateName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(150)]),
      TemplateFlowId: new FormControl({ value: this.messageTemplateModel.TemplateFlowId, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(200)]),
      MessageTypeId: new FormControl({ value: this.messageTemplateModel.MessageTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      MessageSubTypeId: new FormControl({ value: this.messageTemplateModel.MessageSubTypeId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      MessageFieldIds: new FormControl({ value: this.messageTemplateModel.MessageFieldIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
      ApplicableForIds: new FormControl({ value: this.messageTemplateModel.ApplicableForIds, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SMSMessage: new FormControl({ value: this.messageTemplateModel.SMSMessage, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(750)),
      WhatsappMessage: new FormControl({ value: this.messageTemplateModel.WhatsappMessage, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(3000)),
      EmailMessage: new FormControl({ value: this.messageTemplateModel.EmailMessage, disabled: this.PageRights.IsReadOnly }, Validators.maxLength(3000)),
      IsActive: new FormControl({ value: this.messageTemplateModel.IsActive, disabled: this.PageRights.IsReadOnly })
    });
  }
}
