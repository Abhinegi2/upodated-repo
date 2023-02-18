import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTAcademicClassSectionService {
    constructor(private http: BaseService) { }

    getVTAcademicClassSections(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTAcademicClassSection.GetAll)
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
            .HttpPost(this.http.Services.VTAcademicClassSection.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTAcademicClassSectionById(vtacademicclasssectionId: string) {
        let requestParams = {
            DataId: vtacademicclasssectionId
        };

        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTAcademicClassSection(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTAcademicClassSectionById(vtacademicclasssectionId: string) {
        var vtacademicclasssectionParams = {
            DataId: vtacademicclasssectionId
        };

        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.Delete, vtacademicclasssectionParams)
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
