import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTStudentAssessmentService {
    constructor(private http: BaseService) { }

    getVTStudentAssessments(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTStudentAssessment.GetAll)
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
            .HttpPost(this.http.Services.VTStudentAssessment.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStudentAssessmentById(vtStudentAssessmentId: string) {
        var requestParams = {
            DataId: vtStudentAssessmentId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentAssessment.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTStudentAssessment(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTStudentAssessment.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTStudentAssessmentById(vtStudentAssessmentId: string) {
        var vtStudentAssessmentParams = {
            DataId: vtStudentAssessmentId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentAssessment.Delete, vtStudentAssessmentParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
