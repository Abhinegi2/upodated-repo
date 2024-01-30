import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { AppConstants } from "app/app.constants";
import { retry, catchError, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from "@angular/common/http";
import { ServiceConstants } from "app/constants/service.constant";
import { isMoment } from "moment";
import { DatePipe } from '@angular/common';

@Injectable()
export class BaseService extends HttpClient {
    public Services: ServiceConstants;
    public MyConstants: AppConstants;
    public httpUrl: string = "";
    private httpOptions: any;
    public DateFormatPipe = new DatePipe('en-US');

    constructor(public http: HttpClient, public httpHandler: HttpHandler) {
        super(httpHandler);

        this.Services = new ServiceConstants();
        this.MyConstants = new AppConstants();

        // 'Content-Type': 'application/json; charset=utf-8'
        // 'Content-Type': 'multipart/form-data'
        this.httpOptions = {  
            headers: new HttpHeaders({  
              'Content-Type': AppConstants.DefaultContentTypeHeader
            })  
          };  
    }

    HttpGet<T>(srvUrl) {
        this.httpUrl = this.Services.BaseUrl + srvUrl;

        return this.http.get(this.httpUrl, this.httpOptions).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(response => {
                return response;
            })
        );
    }

    HttpPost(srvUrl, formData: any, options?: any) {
        this.httpUrl = this.Services.BaseUrl + srvUrl;

        return this.http.post(this.httpUrl, formData, this.httpOptions).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(response => {
                return response;
            })
        );
    }

    HttpDelete(srvUrl, postBody: any) {
        this.httpUrl = this.Services.BaseUrl + srvUrl;

        return this.http.delete(this.httpUrl, this.httpOptions).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(response => { })
        );
    }

    HttpUpload(srvUrl: string, formData: FormData) {
       
        this.httpUrl = this.Services.BaseUrl + srvUrl;

        const httpOptions = {  
            headers: new HttpHeaders({  
              'processData': 'false',
              'contentType': 'false',
            })  
          };  

        return this.post(this.httpUrl, formData, httpOptions);
    }

    FormUrlParam(url, data) {
        let queryString: string = "";

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!queryString) {
                    queryString = `?${key}=${data[key]}`;
                } else {
                    queryString += `&${key}=${data[key]}`;
                }
            }
        }
        return url + queryString;
    }

    HandleError(error: HttpErrorResponse) {
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

    RefreshToken(response: Response) {
        const accessToken = response.headers.get(AppConstants.AccessTokenServer);
        if (accessToken) {
            sessionStorage.setItem(AppConstants.AccessTokenLocalStorage, `${accessToken}`);
        }
    }

    GetMasterDataByType(formData: any, isSelectOption?: boolean) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetAll;
        let selectTitle = (formData.SelectTitle == undefined ? "Select" : "Select " + formData.SelectTitle);

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                if (isSelectOption == undefined) {
                    response.Results.$values.unshift({ Id: null, Name: selectTitle, Description: "", SequenceNo: 1 });
                }
                return response;
            })
        );
    }

    getDateTimeFromControl(controlValue): string {
        let dateTimeValue = '';

        let currentTime = new Date();
        if (isMoment(controlValue)) {

            controlValue.set({ "hour": currentTime.getHours(), "minute": currentTime.getMinutes(), "second": currentTime.getSeconds() });
        }

        dateTimeValue = this.DateFormatPipe.transform(controlValue, this.MyConstants.ServerDateFormat);

        return dateTimeValue;
    }
}
