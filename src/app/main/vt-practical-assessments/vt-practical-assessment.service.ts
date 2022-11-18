import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTPracticalAssessmentService {
    constructor(private http: BaseService) { }

    getVTPracticalAssessments(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTPracticalAssessment.GetAll)
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
            .HttpPost(this.http.Services.VTPracticalAssessment.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTPracticalAssessmentById(vtPracticalAssessmentId: string) {
        var requestParams = {
            DataId: vtPracticalAssessmentId
        };

        return this.http
            .HttpPost(this.http.Services.VTPracticalAssessment.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTPracticalAssessment(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTPracticalAssessment.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTPracticalAssessmentById(vtPracticalAssessmentId: string) {
        var vtPracticalAssessmentParams = {
            DataId: vtPracticalAssessmentId
        };

        return this.http
            .HttpPost(this.http.Services.VTPracticalAssessment.Delete, vtPracticalAssessmentParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
