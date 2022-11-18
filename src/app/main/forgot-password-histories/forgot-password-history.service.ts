import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class ForgotPasswordHistoryService {
    constructor(private http: BaseService) { }

    getForgotPasswordHistories(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.ForgotPasswordHistory.GetAll)
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
            .HttpPost(this.http.Services.ForgotPasswordHistory.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getForgotPasswordHistoryById(forgotPasswordId: string) {
        let requestParams = {
            DataId: forgotPasswordId
        };

        return this.http
            .HttpPost(this.http.Services.ForgotPasswordHistory.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateForgotPasswordHistory(formData: any) {
        return this.http
            .HttpPost(this.http.Services.ForgotPasswordHistory.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteForgotPasswordHistoryById(forgotPasswordId: string) {
        var forgotPasswordHistoryParams = {
            DataId: forgotPasswordId
        };

        return this.http
            .HttpPost(this.http.Services.ForgotPasswordHistory.Delete, forgotPasswordHistoryParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
