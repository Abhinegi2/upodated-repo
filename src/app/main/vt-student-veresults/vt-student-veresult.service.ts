import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTStudentVEResultService {
    constructor(private http: BaseService) { }

    getVTStudentVEResults(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTStudentVEResult.GetAll)
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
            .HttpPost(this.http.Services.VTStudentVEResult.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStudentVEResultById(vtStudentVEResultId: string) {
        var requestParams = {
            DataId: vtStudentVEResultId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentVEResult.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTStudentVEResult(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTStudentVEResult.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTStudentVEResultById(vtStudentVEResultId: string) {
        var vtStudentVEResultParams = {
            DataId: vtStudentVEResultId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentVEResult.Delete, vtStudentVEResultParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getClassesAndStudents(): Observable<any[]> {
        let studentRequest = this.http.GetMasterDataByType({ DataType: 'Students', SelectTitle: 'Student' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([studentRequest]);
    }
}
