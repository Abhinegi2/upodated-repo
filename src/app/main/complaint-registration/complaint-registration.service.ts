import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class ComplaintRegistrationService {
    constructor(private http: BaseService) { }

    getComplaintRegistration(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.ComplaintRegistration.GetAll)
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
            .HttpPost(this.http.Services.ComplaintRegistration.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getComplaintRegistrationById(complaintRegistrationId: string) {
        var requestParams = {
            DataId: complaintRegistrationId
        };

        return this.http
            .HttpPost(this.http.Services.ComplaintRegistration.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateComplaintRegistration(formData: any) {
        return this.http
            .HttpPost(this.http.Services.ComplaintRegistration.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteComplaintRegistrationById(complaintRegistrationId: string) {
        var complaintRegistrationParams = {
            DataId: complaintRegistrationId
        };

        return this.http
            .HttpPost(this.http.Services.ComplaintRegistration.Delete, complaintRegistrationParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
