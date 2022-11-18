import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { ComplaintRegistrationService } from '../complaint-registration.service';
import { ComplaintRegistrationModel } from '../complaint-registration.model';
import { FileUploadModel } from 'app/models/file.upload.model';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseUtils } from '@fuse/utils';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'complaint-registration',
  templateUrl: './create-complaint-registration.component.html',
  styleUrls: ['./create-complaint-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateComplaintRegistrationComponent extends BaseComponent<ComplaintRegistrationModel> implements OnInit {
  complaintRegistrationForm: FormGroup;
  complaintRegistrationModel: ComplaintRegistrationModel;
  attachmentFile: FileUploadModel;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private complaintRegistrationService: ComplaintRegistrationService,
    private dialogService: DialogService,
    private fuseConfigService: FuseConfigService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Configure the layout
    this.fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };

    this.attachmentFile = new FileUploadModel();
  }

  ngOnInit(): void {

    // Set the default ComplaintRegistration Model
    this.complaintRegistrationModel = new ComplaintRegistrationModel();

    this.complaintRegistrationForm = this.createComplaintRegistrationForm();
  }

  uploadedScreenshotFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedImageExtensions.indexOf(fileExtn) == -1) {
        this.complaintRegistrationForm.get('ScreenshotFile').setValue(null);
        this.dialogService.openShowDialog("Please upload Image file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.ComplaintScreenshot).then((response: FileUploadModel) => {
        this.attachmentFile = response;
      });
    }
  }

  complaintRegistration() {
    if (!this.complaintRegistrationForm.valid) {
      this.validateAllFormFields(this.complaintRegistrationForm);
      return;
    }

    this.setValueFromFormGroup(this.complaintRegistrationForm, this.complaintRegistrationModel);

    if (this.attachmentFile.Base64Data != '') {
      this.complaintRegistrationModel.ScreenshotFile = new FileUploadModel({
        UserId: FuseUtils.NewGuid(),
        ContentId: null,
        FilePath: null,
        ContentType: this.attachmentFile.ContentType,
        FileName: this.attachmentFile.FileName,
        FileType: this.attachmentFile.FileType,
        FileSize: this.attachmentFile.FileSize,
        Base64Data: this.attachmentFile.Base64Data
      });
    }

    this.complaintRegistrationService.createOrUpdateComplaintRegistration(this.complaintRegistrationModel)
      .subscribe((complaintRegistrationResp: any) => {

        if (complaintRegistrationResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Login]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(complaintRegistrationResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Complaint Registration deletion errors =>', error);
      });
  }

  //Create Complaint Registration form and returns {FormGroup}
  createComplaintRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      ComplaintRegistrationId: new FormControl(this.complaintRegistrationModel.ComplaintRegistrationId),
      UserType: new FormControl({ value: this.complaintRegistrationModel.UserType, disabled: false }, Validators.required),
      UserName: new FormControl({ value: this.complaintRegistrationModel.UserName, disabled: false }, [Validators.required, Validators.maxLength(150)]),
      EmailId: new FormControl({ value: this.complaintRegistrationModel.EmailId, disabled: false }, [Validators.required, Validators.maxLength(150), Validators.pattern(this.Constants.Regex.Email)]),
      Subject: new FormControl({ value: this.complaintRegistrationModel.Subject, disabled: false }, [Validators.required, Validators.maxLength(200)]),
      IssueDetails: new FormControl({ value: this.complaintRegistrationModel.IssueDetails, disabled: false }, [Validators.required, Validators.maxLength(4000)]),
      ScreenshotFile: new FormControl({ value: this.complaintRegistrationModel.ScreenshotFile, disabled: false }),
    });
  }
}
