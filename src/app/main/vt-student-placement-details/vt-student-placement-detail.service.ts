import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTStudentPlacementDetailService {
    constructor(private http: BaseService) { }

    getVTStudentPlacementDetails(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTStudentPlacementDetail.GetAll)
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
            .HttpPost(this.http.Services.VTStudentPlacementDetail.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStudentPlacementDetailById(vtStudentPlacementDetailId: string) {
        var requestParams = {
            DataId: vtStudentPlacementDetailId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentPlacementDetail.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTStudentPlacementDetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTStudentPlacementDetail.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTStudentPlacementDetailById(vtStudentPlacementDetailId: string) {
        var vtStudentPlacementDetailParams = {
            DataId: vtStudentPlacementDetailId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentPlacementDetail.Delete, vtStudentPlacementDetailParams)
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
