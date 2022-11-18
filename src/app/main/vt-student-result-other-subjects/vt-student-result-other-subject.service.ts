import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTStudentResultOtherSubjectService {
    constructor(private http: BaseService) { }

    getVTStudentResultOtherSubjects(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTStudentResultOtherSubject.GetAll)
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
            .HttpPost(this.http.Services.VTStudentResultOtherSubject.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStudentResultOtherSubjectById(vtStudentResultOtherSubjectId: string) {
        var requestParams = {
            DataId: vtStudentResultOtherSubjectId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentResultOtherSubject.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTStudentResultOtherSubject(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTStudentResultOtherSubject.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTStudentResultOtherSubjectById(vtStudentResultOtherSubjectId: string) {
        var vtStudentResultOtherSubjectParams = {
            DataId: vtStudentResultOtherSubjectId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentResultOtherSubject.Delete, vtStudentResultOtherSubjectParams)
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
