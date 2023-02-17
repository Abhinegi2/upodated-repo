import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class GenericVTMappingService {
    constructor(private http: BaseService) { }

    getGenericVTMappings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.GenericVTMapping.GetAll)
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
            .HttpPost(this.http.Services.GenericVTMapping.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getGenericVTMappingById(genericvtmappingId: string) {
        let requestParams = {
            DataId: genericvtmappingId
        };

        return this.http
            .HttpPost(this.http.Services.GenericVTMapping.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateGenericVTMapping(formData: any) {
        return this.http
            .HttpPost(this.http.Services.GenericVTMapping.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteGenericVTMappingById(genericvtmappingId: string) {
        var genericvtmappingParams = {
            DataId: genericvtmappingId
        };

        return this.http
            .HttpPost(this.http.Services.GenericVTMapping.Delete, genericvtmappingParams)
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
