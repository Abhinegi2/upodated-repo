import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VocationaltrainerdetailService {
    constructor(private http: BaseService) { }

    getVocationaltrainerdetails(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.Vocationaltrainerdetail.GetAll)
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
            .HttpPost(this.http.Services.Vocationaltrainerdetail.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationaltrainerdetailById(vocationaltrainerdetailId: string) {
        let requestParams = {
            DataId: vocationaltrainerdetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVocationaltrainerdetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVocationaltrainerdetailById(vocationaltrainerdetailId: string) {
        var vocationaltrainerdetailParams = {
            DataId: vocationaltrainerdetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.Delete, vocationaltrainerdetailParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getStateDivisions(): Observable<any[]> {
        let stateRequest = this.http.GetMasterDataByType({ DataType: 'States', SelectTitle: 'States' });
        let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', SelectTitle: 'Division' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([stateRequest, divisionRequest]);
    }
}
