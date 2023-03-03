import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VocationalcoordinatordetailService {
    constructor(private http: BaseService) { }

    getVocationalcoordinatordetails(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.Vocationalcoordinatordetail.GetAll)
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
            .HttpPost(this.http.Services.Vocationalcoordinatordetail.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationalcoordinatordetailById(vocationalcoordinatordetailId: string) {
        let requestParams = {
            DataId: vocationalcoordinatordetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationalcoordinatordetail.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVocationalcoordinatordetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Vocationalcoordinatordetail.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVocationalcoordinatordetailById(vocationalcoordinatordetailId: string) {
        var vocationalcoordinatordetailParams = {
            DataId: vocationalcoordinatordetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationalcoordinatordetail.Delete, vocationalcoordinatordetailParams)
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
