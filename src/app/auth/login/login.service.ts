import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { tap, retry, catchError } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';


@Injectable({
    providedIn: "root"
})
export class LoginService {
    private _loginDataSource = new Subject<any>();
    loginResponce$ = this._loginDataSource.asObservable();

    constructor(private http: BaseService) { }
    private loginData: any;

    loginUser(formData: any): Observable<any> {
        return this.http
            .HttpPost("Account/LoginByUserId", formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.handleError),
                tap(logResp => {
                    return logResp;
                })
            );
    }

    updateUserDetailsOnPage() {
        this._loginDataSource.next(this.loginData);
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = "Unknown error!";
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
