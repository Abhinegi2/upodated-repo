import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class JobRoleService {
    constructor(private http: BaseService) { }

    getJobRoles(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.JobRole.GetAll)
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
            .HttpPost(this.http.Services.JobRole.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getJobRoleById(jobRoleId: string) {
        let requestParams = {
            DataId: jobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.JobRole.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateJobRole(formData: any) {
        return this.http
            .HttpPost(this.http.Services.JobRole.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteJobRoleById(jobRoleId: string) {
        var jobRoleParams = {
            DataId: jobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.JobRole.Delete, jobRoleParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
