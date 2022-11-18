import { Injectable } from "@angular/core";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class ChangePasswordService {
    constructor(private http: BaseService) { }

    createOrUpdatePassword(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Account.ChangePassword, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    forgotPassword(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Account.ForgotPassword, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    resetPassword(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Account.ResetPassword, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
