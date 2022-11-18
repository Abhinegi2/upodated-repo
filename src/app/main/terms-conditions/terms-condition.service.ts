import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class TermsConditionService {
    constructor(private http: BaseService) { }

    getTermsConditions(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.TermsCondition.GetAll)
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
            .HttpPost(this.http.Services.TermsCondition.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getTermsConditionById(termsConditionId: string) {
        let requestParams = {
            DataId: termsConditionId
        };

        return this.http
            .HttpPost(this.http.Services.TermsCondition.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateTermsCondition(formData: any) {
        return this.http
            .HttpPost(this.http.Services.TermsCondition.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteTermsConditionById(termsConditionId: string) {
        var termsConditionParams = {
            DataId: termsConditionId
        };

        return this.http
            .HttpPost(this.http.Services.TermsCondition.Delete, termsConditionParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
