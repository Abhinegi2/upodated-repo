import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from 'app/services/authentication.service';
import { environment } from 'environments/environment';
import { AppConstants } from "app/app.constants";
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authenticationService.authUser;
        const isLoggedIn = user && user.AuthToken;
        const isApiUrl = request.url.startsWith(environment.ApiBaseUrl);

        if (isLoggedIn && isApiUrl) {
            //request = request.clone({ headers: request.headers.set('Content-Type', AppConstants.DefaultContentTypeHeader) });
            request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${user.AuthToken}`) });
            request = request.clone({ headers: request.headers.set('Accept', AppConstants.Accept) });
        }

        return next.handle(request)
            .pipe(
                tap((data: any) => {
                    if (data.type == 4) {
                        //console.log(data.status, data.statusText, data.url);
                    }
                }),
                catchError((error: any) => {
                    if (typeof error == 'string') {
                        console.error('An error occurred:', error);
                    }
                    else if (error.error instanceof ErrorEvent) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.error('An error occurred:', error.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
                    }
                    // return an observable with a user-facing error message
                    //return throwError(' : Something bad happened; please try again later.');
                    return throwError(' Please try again.');
                })
            );
    }
}