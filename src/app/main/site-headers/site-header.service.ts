import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SiteHeaderService {
    constructor(private http: BaseService) { }

    getSiteHeaders(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SiteHeader.GetAll)
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
            .HttpPost(this.http.Services.SiteHeader.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSiteHeaderById(siteHeaderId: string) {
        let requestParams = {
            DataId: siteHeaderId
        };

        return this.http
            .HttpPost(this.http.Services.SiteHeader.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSiteHeader(formData: any) {
        return this.http
            .HttpPost(this.http.Services.SiteHeader.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSiteHeaderById(siteHeaderId: string) {
        var siteHeaderParams = {
            DataId: siteHeaderId
        };

        return this.http
            .HttpPost(this.http.Services.SiteHeader.Delete, siteHeaderParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
