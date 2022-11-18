import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class BroadcastMessagesService {
    constructor(private http: BaseService) { }

    getBroadcastMessages(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.BroadcastMessages.GetAll)
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
            .HttpPost(this.http.Services.BroadcastMessages.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getBroadcastMessagesById(broadcastMessagesId: string) {
        var requestParams = {
            DataId: broadcastMessagesId
        };

        return this.http
            .HttpPost(this.http.Services.BroadcastMessages.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateBroadcastMessages(formData: any) {
        return this.http
            .HttpPost(this.http.Services.BroadcastMessages.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteBroadcastMessagesById(broadcastMessageId: string) {
        var broadcastMessagesParams = {
            DataId: broadcastMessageId
        };

        return this.http
            .HttpPost(this.http.Services.BroadcastMessages.Delete, broadcastMessagesParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
