import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';

@Injectable()
export class whatsappBroadcastingService {
    constructor(private http: BaseService) { }

    getMessageTemplates(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.MessageTemplate.GetAll)
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
            .HttpPost(this.http.Services.MessageTemplate.GetAllByCriteria, filters)
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
            .HttpPost(this.http.Services.MessageTemplate.GetById, requestParams)
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
            .HttpPost(this.http.Services.MessageTemplate.CreateOrUpdate, formData)
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
            .HttpPost(this.http.Services.MessageTemplate.Delete, messageTemplateParams)
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
}
