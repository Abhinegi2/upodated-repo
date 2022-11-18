import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SiteSubHeaderService {
    constructor(private http: BaseService) { }

    getSiteSubHeaders(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SiteSubHeader.GetAll)
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
            .HttpPost(this.http.Services.SiteSubHeader.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSiteSubHeaderById(siteSubHeaderId: string) {
        let requestParams = {
            DataId: siteSubHeaderId
        };

        return this.http
            .HttpPost(this.http.Services.SiteSubHeader.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSiteSubHeader(formData: any) {
        return this.http
            .HttpPost(this.http.Services.SiteSubHeader.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSiteSubHeaderById(siteSubHeaderId: string) {
        var siteSubHeaderParams = {
            DataId: siteSubHeaderId
        };

        return this.http
            .HttpPost(this.http.Services.SiteSubHeader.Delete, siteSubHeaderParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforSiteHeaderTransaction(): Observable<any[]> {
        let siteHeaderRequest = this.http.GetMasterDataByType({ DataType: 'SiteHeaders', SelectTitle: 'Site Header' });
        let transactionRequest = this.http.GetMasterDataByType({ DataType: 'Transactions', SelectTitle: 'Transaction' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([siteHeaderRequest, transactionRequest]);
    }
}
