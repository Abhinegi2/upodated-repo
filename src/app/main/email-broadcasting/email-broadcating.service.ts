import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';
import { EmailBroadcastingModel } from "./email-broadcating.model";
import { FormGroup } from "@angular/forms";
import { EmailAddressModel } from "./email-address.model";

@Injectable()
export class EmailBroadcastingService {
    constructor(private http: BaseService) { }

    getMessageTemplates(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.EmailBroadcasting.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetAllByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.EmailBroadcasting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getMessageTemplateById(messageTemplateId: string) {
        let requestParams = {
            DataId: messageTemplateId
        };

        return this.http
            .HttpPost(this.http.Services.EmailBroadcasting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateMessageTemplate(formData: any) {
        return this.http
            .HttpPost(this.http.Services.EmailBroadcasting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    SendEmailBroadcasting(emaiBroadcastingData) {
            return this.http
                .HttpPost(this.http.Services.EmailBroadcasting.SendEmailBroadcasting, emaiBroadcastingData)
                .pipe(
                    retry(this.http.Services.RetryServieNo),
                    catchError(this.http.HandleError),
                    tap(response => {
                        return response;
                    })
                );
        }

        UploadImg(emaiBroadcastingFilesData) {
            console.log(emaiBroadcastingFilesData,"hello3")
        
                return this.http
                    .HttpPost(this.http.Services.EmailBroadcasting.UploadImg, emaiBroadcastingFilesData)
                    .pipe(
                        retry(this.http.Services.RetryServieNo),
                        catchError(this.http.HandleError),
                        tap(response => {
                            return response;
                        })
                    );
            }
    deleteMessageTemplateById(messageTemplateId: string) {
        var messageTemplateParams = {
            DataId: messageTemplateId
        };

        return this.http
            .HttpPost(this.http.Services.EmailBroadcasting.Delete, messageTemplateParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforMessageTemplate(userModel: UserModel): Observable<any[]> {
        let messageTypeRequest = this.http.GetMasterDataByType({ DataType: 'MessageTypes', UserId: userModel.UserTypeId, ParentId: null, SelectTitle: 'School' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([messageTypeRequest]);
    }

    getEmailBroadcastingModelFromFormGroup(formGroup: FormGroup): EmailBroadcastingModel {
        let emailBroadcastingModel = new EmailBroadcastingModel();

        emailBroadcastingModel.Subject = formGroup.get("Subject").value;
        emailBroadcastingModel.Body = formGroup.get("Body").value;

        emailBroadcastingModel.EmailDocumentFile = formGroup.get('EmailDocumentFile').value;
        // Leave
        
        if (formGroup.controls.emailGroup != null) {
            emailBroadcastingModel.EBSEmailModels = new EmailAddressModel();
            emailBroadcastingModel.EBSEmailModels.User_email = formGroup.controls.emailGroup.get('User_email').value;
        }

        return emailBroadcastingModel;
    }
}
