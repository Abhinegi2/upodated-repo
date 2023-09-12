import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

import { DropdownModel } from 'app/models/dropdown.model';
import { EmailBroadcastingModel } from '../email-broadcating.model';
import { EmailBroadcastingService } from '../email-broadcating.service';
import { RouteConstants } from 'app/constants/route.constant';

import Quill from 'quill';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FileUploadModel } from 'app/models/file.upload.model';
import { EmailAddressModel } from '../email-address.model';


@Component({
  selector: 'app-create-email-brodcasting',
  templateUrl: './create-email-brodcasting.component.html',
  styleUrls: ['./create-email-brodcasting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class CreateEmailBrodcastingComponent extends BaseComponent<EmailBroadcastingModel> implements OnInit {
  emailTemplateForm: FormGroup;
  emailBroadcastingModel: EmailBroadcastingModel;
  messageTypeList: [DropdownModel];
  messageSubTypeList: [DropdownModel];
  messageVariablesList: [DropdownModel];
  filteredMessageVariablesItems: any;
  emailDocUploadFile: FileUploadModel;
  isAllowEmail: boolean = false;
  imageUpload: FileUploadModel;
   editor: any;
  messageApplicableList: string[] = ['SMS', 'Whatsapp', 'Email'];
  quillConfig = {
    // Quill configuration options
    // Example: modules, formats, etc.
  };
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  emailContentControl: any;
  emailImages: any;
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private messageTemplatesService: EmailBroadcastingService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default headMaster Model
    this.emailBroadcastingModel = new EmailBroadcastingModel();
    this.emailTemplateForm = this.createMessageTemplateForm();
    this.emailDocUploadFile = new FileUploadModel();
    

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
            this.emailBroadcastingModel = new EmailBroadcastingModel();

          } else {
            console.log(this.emailBroadcastingModel, "emailBroadcastingModel")
            var messageTemplateId: string = params.get('Id');

            this.messageTemplatesService.getMessageTemplateById(messageTemplateId)
              .subscribe((response: any) => {
                this.emailBroadcastingModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.emailBroadcastingModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.emailBroadcastingModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }
                this.emailTemplateForm = this.createMessageTemplateForm();
              });
          }
        }
      });
    });
    this.isAllowEmail= true;
    this.emailBroadcastingModel.EBSEmailModels = new EmailAddressModel(this.emailBroadcastingModel.EBSEmailModels);
    this.emailTemplateForm = this.formBuilder.group({
      ...this.emailTemplateForm.controls,
      emailGroup: this.formBuilder.group({
        User_email: new FormControl({ value: this.emailBroadcastingModel.EBSEmailModels.User_email, disabled: this.PageRights.IsReadOnly }),
      })
      
    });
    this.emailTemplateForm = this.createMessageTemplateForm();
  }

  ngAfterViewInit() {
    this.editor = new Quill('#editor-container', {
      theme: 'snow',
      content: 'Message',
       modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }, 'paragraph'],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'align': [] }],
          [{ 'color': [] }], // Text color dropdown
          [{ 'font': [] }], // Font family dropdown
          [ { 'size': ['small', false, 'large', 'huge'] }], // Font size dropdown
          ['clean']
        ],
      },
      
    });
    this.editor.getModule('toolbar').addHandler('image', () => {
      // Handle the image upload dialog
      this.selectImage();
    });
    this.editor.on('text-change', () => {
      this.emailTemplateForm.controls['Body'].setValue(this.editor.root.innerHTML);
    });
  }
  selectImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = (event) => {
      
      const file = input.files[0];
      if (file) {
        this.uploadImage(file);
      }
    };
  }
  uploadImage(input) {
    this.getUploadedImageData(input, this.Constants.DocumentType.EmailAttachments).then((response: FileUploadModel) => {
      const emailAttachments = response;
      if (emailAttachments.Base64Data != '') {
        this.setUploadedFile(emailAttachments);
      }
      this.messageTemplatesService.UploadImg(this.setUploadedFile(emailAttachments))
      .subscribe((messageTemplateResp: any) => {
        this.insertImage(messageTemplateResp.FilePath);
      }, error => {
        console.log('MessageTemplate deletion errors =>', error);
      });
    });
  }

  insertImage(imageUrl: string) {
    const range = this.editor.getSelection();
    if (range){
      this.editor.insertEmbed(range.index, 'image', imageUrl);
    }
  }

  uploadedEmailDocumentUploadFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();
      if (this.AllowedPDFExtensions.indexOf(fileExtn) == -1) {
        this.emailTemplateForm.get('EmailDocUpload').setValue(null);
        this.dialogService.openShowDialog("Please upload pdf file only.");
        return;
      }
      this.getUploadedFileData(event, this.Constants.DocumentType.EmailAttachments).then((response: FileUploadModel) => {
        const emailAttachments = response;
        if (emailAttachments.Base64Data != '') {
          this.setUploadedFile(emailAttachments);
        }
        this.messageTemplatesService.UploadImg(this.setUploadedFile(emailAttachments))
        .subscribe((messageTemplateResp: any) => {
          this.emailImages = messageTemplateResp.FilePath;
        }, error => {
          console.log('MessageTemplate deletion errors =>', error);
        });
      });
    }
  }

  getUploadedImageData(event: any, contentType: string) {
    let promise = new Promise((resolve, reject) => {

        if (event) {
            const uploadedFile = event;
            let fileUploadData = new FileUploadModel();
            fileUploadData.ContentType = contentType;
            fileUploadData.FileName = uploadedFile.name;
            fileUploadData.FileType = uploadedFile.type;
            fileUploadData.FileSize = uploadedFile.size;

            this.readBase64FromFile(uploadedFile).subscribe(response => {
                fileUploadData.Base64Data = response;
                fileUploadData.UploadFile = uploadedFile;

                resolve(fileUploadData);
            });
        }
        else {
            resolve(null);
        }
    });
    return promise;
}
  getEditorContent(): string {
    return this.editor.root.innerHTML;
  }

  saveOrUpdateMessageTemplateDetails() {
    if (!this.emailTemplateForm.valid) {
      this.validateAllFormFields(this.emailTemplateForm);
      return;
    }
    const receiverEmail =  this.emailTemplateForm.controls.emailGroup.get('User_email').value;
    const bodydata =  this.emailTemplateForm.controls['Body'].value;
    const Subject =  this.emailTemplateForm.controls['Subject'].value;
    const Attachments= this.emailImages;
    const emaiBroadcastingData = {
      email:  receiverEmail,
      subject: Subject,
      body: bodydata,
      attachments: Attachments,
    };
    this.messageTemplatesService.SendEmailBroadcasting(emaiBroadcastingData)
      .subscribe((messageTemplateResp: any) => {
        if (messageTemplateResp.Success) {
          console.log("test")
        }
        else {
          var errorMessages = this.getHtmlMessage(messageTemplateResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('MessageTemplate deletion errors =>', error);
      });

    this.setValueFromFormGroup(this.emailTemplateForm, this.emailBroadcastingModel);
    this.emailBroadcastingModel = this.messageTemplatesService.getEmailBroadcastingModelFromFormGroup(this.emailTemplateForm);


    this.messageTemplatesService.createOrUpdateMessageTemplate(this.emailBroadcastingModel)
      .subscribe((messageTemplateResp: any) => {
        if (messageTemplateResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );
            this.router.navigate([RouteConstants.EmailBroadcasting.List]);
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
      Id: new FormControl({ value: this.emailBroadcastingModel.Id, disabled: this.PageRights.IsReadOnly }),
      Subject: new FormControl({ value: this.emailBroadcastingModel.Subject, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(350)]),
      Body: new FormControl({ value: this.emailBroadcastingModel.Body, disabled: this.PageRights.IsReadOnly }), // Update the value here
      Email: new FormControl({ value: this.emailBroadcastingModel.Email, disabled: this.PageRights.IsReadOnly }), // Update the value here
      EmailDocumentFile: new FormControl({ value: this.emailBroadcastingModel.EmailDocumentFile, disabled: this.PageRights.IsReadOnly }),
      IsActive: new FormControl({ value: this.emailBroadcastingModel.IsActive, disabled: this.PageRights.IsReadOnly })
    });
  }
}
