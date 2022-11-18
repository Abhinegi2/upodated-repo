
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    private userSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(
        private router: Router,
        private http: BaseService
    ) {
        var currentUserJson = sessionStorage.getItem('currentUser');
        this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(currentUserJson));
        this.currentUser = this.userSubject.asObservable();
    }

    public get authUser(): UserModel {
        return this.userSubject.value;
    }

    loginUser(formData: any): Observable<any> {
        return this.http
            .HttpPost("Account/LoginByUserId", formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.handleError),
                tap(logResp => {
                    this.userSubject.next(logResp.Result);
                    return logResp;
                })
            );
    }

    logoutUser(formData: any): Observable<any> {
        return this.http
            .HttpPost("Account/LogoutByUserId", formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.handleError),
                tap(logResp => {
                    this.userSubject.next(logResp.Result);
                    return logResp;
                })
            );
    }

    getUserTransactionsById(formData: any): Observable<any> {
        return this.http
            .HttpPost("Account/GetUserTransactionsById", formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.handleError),
                tap(tranResp => {
                    return tranResp;
                })
            );
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
        //window.alert(errorMessage);
        return throwError(errorMessage);
    }

    getCurrentUser(): UserModel {
        var currentUserJson = sessionStorage.getItem('currentUser');
        return (currentUserJson != undefined) ? JSON.parse(currentUserJson) : null;
    }

    getUserNavigations(): any {
        var userNavigationJson = sessionStorage.getItem('userNavigations');
        return (userNavigationJson != undefined) ? JSON.parse(userNavigationJson) : [];
    }

    resetLogin() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userNavigations');
        sessionStorage.removeItem('userRoleTransactions');        
        sessionStorage.clear();

        this.userSubject.next(null);
    }

    logout() {
        this.resetLogin();
        this.router.navigateByUrl('/login');
    }

    getIPAddress(): Observable<any> {
        return this.http.get("http://api.ipify.org/?format=json").pipe(
            retry(this.http.Services.RetryServieNo),
            catchError(this.handleError),
            tap(response => {
                return response;
            })
        );

        // return this.http
        //     .get('http://freegeoip.net/json/?callback')
        //     .map(response => response || {})
        //     .catch(this.handleError);
    }
}

