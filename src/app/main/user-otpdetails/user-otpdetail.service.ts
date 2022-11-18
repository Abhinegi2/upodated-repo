import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class UserOTPDetailService {
    constructor(private http: BaseService) { }

    getUserOTPDetails(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.UserOTPDetail.GetAll)
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
            .HttpPost(this.http.Services.UserOTPDetail.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getUserOTPDetailById(otpId: string) {
        let requestParams = {
            DataId: otpId
        };

        return this.http
            .HttpPost(this.http.Services.UserOTPDetail.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateUserOTPDetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.UserOTPDetail.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteUserOTPDetailById(otpId: string) {
        var userOTPDetailParams = {
            DataId: otpId
        };

        return this.http
            .HttpPost(this.http.Services.UserOTPDetail.Delete, userOTPDetailParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
