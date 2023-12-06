import { Injectable, OnInit, Component, ElementRef, ViewChild } from "@angular/core";
import { AppConstants } from "app/app.constants";
import { CommonService } from "../../services/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar"
import { UserModel } from 'app/models/user.model';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageRightModel } from 'app/models/page.right.model';
import { FileUploadModel } from "app/models/file.upload.model";
import { RouteConstants } from "app/constants/route.constant";
import { environment } from "environments/environment";
import { isMoment } from "moment";

@Component({
    providers: [AppConstants],
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
@Injectable()
export class BaseComponent<T> implements OnInit {
    public Constants: AppConstants;
    public appInfo = environment;
    public IsLoading: boolean = false;
    //public PageRights: any = { IsView: true, IsEdit: true, IsDelete: true, IsReadOnly: false, ActionType: 'New' };
    public PageRights: PageRightModel
    public UnsubscribeAll: Subject<any>;
    public DateFormatPipe = new DatePipe('en-US');
    public AllowedImageExtensions = ".jpg, .jpeg, .png, .gif, .tif, .bmp";
    public AllowedExcelExtensions = ".xls, .xlsx";
    public AllowedPDFExtensions = ".pdf";

    @ViewChild('scrollScreen') scrollContainer: ElementRef;

    public get CurrentDate(): Date {
        return new Date();
    }

    public get CurrentDateTime(): string {
        let currentDate = new Date();

        let dateTimeValue = this.DateFormatPipe.transform(currentDate, this.Constants.ServerDateFormat);

        return dateTimeValue;
    }

    public get MinimumAgeDate(): Date {
        let maxDate = new Date(Date.now());

        maxDate.setDate(maxDate.getDate());
        maxDate.setFullYear(maxDate.getFullYear() - 18);

        return maxDate;
    }

    public get MaxDateOfBirthStudent(): Date {
        let maxDate = new Date(Date.now());

        maxDate.setDate(maxDate.getDate());
        maxDate.setFullYear(maxDate.getFullYear() - 11);

        return maxDate;
    }

    public get MinimumAgeChildrenDate(): Date {
        let maxDate = new Date(Date.now());

        maxDate.setDate(maxDate.getDate());
        maxDate.setFullYear(maxDate.getFullYear() - 10);

        return maxDate;
    }

    private _currentUser: UserModel;
    public get UserModel(): UserModel {
        return this._currentUser;
    }

    public set UserModel(value: UserModel) {
        if (value == null) {
            //this.UserModel = JSON.parse(sessionStorage.getItem("currentUser"));
        }
        this._currentUser = value;
    }

    constructor(
        public commonService: CommonService,
        public router: Router,
        public routeParams: ActivatedRoute,
        public snackBar: MatSnackBar
    ) {
        this.Constants = new AppConstants();
        this.initPageRights();

        // Set the private defaults
        this.UnsubscribeAll = new Subject();

        var _currentUserText = sessionStorage.getItem("currentUser");
        if (_currentUserText != null) {
            this.UserModel = JSON.parse(_currentUserText);
            AppConstants.UserId = this.UserModel.UserId;
            AppConstants.IsAdmin = this.UserModel.IsAdmin;
            AppConstants.AuthToken = this.UserModel.AuthToken;
        }
    }

    ngOnInit() { }

    showActionMessage(messageText: string, messageType: string) {
        this.snackBar.open(messageText, this.Constants.Html.Dismiss, {
            duration: this.Constants.Html.Duration,
            verticalPosition: "top",
            horizontalPosition: "end",
            panelClass: [messageType]
        });
    }

    showNoDataFoundSnackBar() {
        this.snackBar.open(
            this.Constants.Messages.NoDataFoundMessage,
            this.Constants.Html.Dismiss,
            {
                duration: this.Constants.Html.Duration,
                panelClass: [this.Constants.Html.InfoSnackbar]
            }
        );
    }

    showErrorMessage(messageText: string, messageType: string) {
        this.snackBar.open(messageText, this.Constants.Html.Dismiss, {
            duration: this.Constants.Html.Duration,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: [messageType]
        });
    }

    getErrorMessage(formGroup: FormGroup, controlId: string): string {
        let errorText = '';
        let isNumericCtrl = false;

        // if (controlId == 'ClassTypeId') {
        //     debugger;
        // }

        let messageText = controlId.replace(/(_|-)/g, ' ').trim()
            .replace(/\w\S*/g, function (str) {
                return str.charAt(0).toUpperCase() + str.substr(1)
            })
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
            .replace('Id', '');

        let controlName = controlId.substring(0, 1).toLowerCase() + controlId.substring(1, controlId.length);

        try {
            let fieldCtrl: any = document.getElementsByName(controlName)[0];
            try {
                messageText = fieldCtrl.labels[0].innerText.replace('*', '').trim()
            } catch (error) {
                messageText = fieldCtrl.parentElement.innerText.replace('*', '').trim()
            }
        } catch (error) {
        }

        if (formGroup.controls[controlId].hasError('required')) {
            errorText = messageText + ' is required';
        }
        else if (formGroup.controls[controlId].hasError('minlength')) {
            try {
                isNumericCtrl = (document.getElementsByName(controlName)[0]).hasAttribute('digitOnly');
            } catch (error) { }

            errorText = 'Min ' + formGroup.controls[controlId].errors.minlength.requiredLength + (isNumericCtrl ? ' digits' : ' chars') + ' are required';
        }
        else if (formGroup.controls[controlId].hasError('maxlength')) {
            try {
                isNumericCtrl = (document.getElementsByName(controlName)[0]).hasAttribute('digitOnly');
            } catch (error) { }

            errorText = 'Max ' + formGroup.controls[controlId].errors.maxlength.requiredLength + (isNumericCtrl ? ' digits' : ' chars') + ' are required';
        }
        else if (formGroup.controls[controlId].hasError('pattern')) {
            errorText = 'Invalid ' + messageText;
        }
        else if (formGroup.controls[controlId].hasError('matDatepickerParse')) {
            errorText = messageText + ' is required';
        }

        return errorText;
    }

    setValueFromFormGroup(formGroup: FormGroup, formModel: T): T {
        for (let roleProp of Object.keys(formGroup.controls)) {
            let controlValue = formGroup.controls[roleProp].value;

            if (controlValue != null) {
                if (formModel[roleProp] != controlValue) {
                    formModel[roleProp] = controlValue;

                    if (roleProp.indexOf('Date') > -1 && controlValue != null && controlValue != "") {
                        if (isMoment(controlValue)) {
                            let currentTime = new Date();
                            controlValue.set({ "hour": currentTime.getHours(), "minute": currentTime.getMinutes(), "second": currentTime.getSeconds() });
                        }

                        formModel[roleProp] = this.DateFormatPipe.transform(controlValue, this.Constants.ServerDateFormat);
                    }
                }
            }
            else {
                formModel[roleProp] = null;
            }
        }

        return formModel;
    }

    getHtmlMessage(errors: string[]): string {
        let errorMessages = '';

        if (errors.length > 1) {
            errorMessages = '<ul style="list-style: none; margin: 0; padding: 0;">';

            for (let errorText of errors) {
                errorMessages += '<li>' + errorText + '</li>';
            }
            errorMessages = errorMessages + '</ul>';
        }
        else if (errors.length = 1) {
            errorMessages = '<div style="margin: 0; padding: 0;">' + errors[0] + '';
        }
        return errorMessages;
    }

    getDateValue(dateText: any): any {
        if (dateText != null && dateText != undefined && dateText != "")
            return new Date(dateText);
        else
            return '';
    }

    onChangeDateEnableDisableCheckBox(formControl: FormGroup, evt) {
        if (evt.value == null) {
            formControl.controls['IsActive'].enable();
            formControl.get('IsActive').setValue(true);
        }
        else {
            formControl.controls['IsActive'].disable();
            formControl.get('IsActive').setValue(false);
        }
    }

    clearDateValueInFormControl(formControl: FormGroup, controlName: string, event) {
        event.stopPropagation();
        formControl.get(controlName).setValue(null);
        formControl.controls['IsActive'].enable();
        formControl.get('IsActive').setValue(true);
    }

    getDateFromYMD(year: number, month: number, day: number): Date {
        let maxDate = new Date(Date.now());

        maxDate.setDate(maxDate.getDate());
        maxDate.setFullYear(maxDate.getFullYear() - year);
        maxDate.setMonth(maxDate.getMonth() - month);
        maxDate.setDate(maxDate.getDay() - day);

        return maxDate;
    }

    readBase64FromFile(file: File | Blob): Observable<any> {
        const reader = new FileReader();
        let fileLoadingEnd = fromEvent(reader, 'loadend').pipe(
            map((read: any) => {
                return read.target.result;
            })
        );

        reader.readAsDataURL(file);

        return fileLoadingEnd;
    }

    initPageRights() {
        var userRoleTransactionJson = sessionStorage.getItem('userRoleTransactions');

        if (userRoleTransactionJson != undefined) {
            let userRoleTransactions = JSON.parse(userRoleTransactionJson);

            let userPageRights = userRoleTransactions.find(ut => ut.RouteUrl === window.location.pathname);
            if (userPageRights != undefined && userPageRights != null) {
                this.PageRights = new PageRightModel(userPageRights);
            }
            else if (window.location.pathname !== '/login') {
                this.commonService.openShowDialog("You are not authorized to access this page. Please contact the administrator.");
                //this.router.navigate([RouteConstants.Login]);

                // Logout current user and clear all resources
                this.commonService.authenticationService.logout();
            }
        }
    }

    getUploadedFileData(event: any, contentType: string) {
        let promise = new Promise((resolve, reject) => {

            if (event.target.files.length > 0) {
                const uploadedFile = event.target.files[0];

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

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    validateAllFormFields(formGroup: FormGroup | FormArray) {
        formGroup.markAsTouched()

        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    validateDynamicFormArrayFields(group: FormGroup | FormArray) {
        group.markAsTouched()
        for (let i in group.controls) {
            if (group.controls[i] instanceof FormControl) {
                group.controls[i].markAsTouched();
            } else {
                this.validateDynamicFormArrayFields(group.controls[i]);
            }
        }
    }

    setUploadedFile(fileUploaded: FileUploadModel) {
        if (fileUploaded == null)
            return null;

        return new FileUploadModel({
            UserId: this.UserModel.UserTypeId,
            UserRole: this.UserModel.RoleCode,
            ContentId: null,
            FilePath: null,
            ContentType: fileUploaded.ContentType,
            FileName: fileUploaded.FileName,
            FileType: fileUploaded.FileType,
            FileSize: fileUploaded.FileSize,
            Base64Data: fileUploaded.Base64Data
        });
    }

    debugHTMLObjects(htmlObject: any) {
        console.log(htmlObject);
        //<!-- Debug HTML Objects  {{ debugHTMLObjects(tveItem) }} -->
    }

    setMandatoryFieldControl(formControl: FormGroup, controlName: string, chkControl: any) {
        if (chkControl.checked) {
            formControl.controls[controlName].clearValidators();
        }
        else {
            formControl.controls[controlName].setValidators([Validators.required]);
        }
        formControl.controls[controlName].updateValueAndValidity();
    }

    setDefaultImage(formGroup: FormGroup, controlId: string) {
        formGroup.get(controlId).setValue(this.Constants.DefaultImageUrl);
    }

    maskingStudentAadhaarNo(aadhaarNo): string {
        let aadhaarResult = aadhaarNo;
        if (this.PageRights.ActionType == this.Constants.Actions.View && aadhaarNo != '') {
            aadhaarResult = aadhaarNo.replace(/\d(?=\d{4})/g, "*");
        }

        return aadhaarResult;
    }

    scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scroll({ top: this.scrollContainer.nativeElement.scrollHeight, left: 0, behavior: 'smooth' });
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    setFormControlInitialState(formGroup: FormGroup, controlList: string[]) {
        controlList.forEach(controlId => {
            formGroup.controls[controlId].patchValue('');
            formGroup.controls[controlId].updateValueAndValidity();
            formGroup.controls[controlId].markAsPristine();
            formGroup.controls[controlId].markAsUntouched();
        });
    }

    clearFormControlAsInitialState(formControl: any) {
        try {
            formControl.patchValue(null);
            formControl.clearValidators();
            formControl.updateValueAndValidity();
            formControl.markAsPristine();
            formControl.markAsUntouched();
        }
        catch (error) {
            console.error('FormControl error message : ', error);
            //throw new Error('An error occurred');
        }
    }

    isValidRequiredFields(formControl: any): boolean {
        return formControl.touched && formControl.status == 'INVALID' && (formControl.value == null || formControl.value == undefined);
    }

}
