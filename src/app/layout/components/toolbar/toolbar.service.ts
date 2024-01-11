import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";

import { BaseService } from 'app/services/base.service';
import { RouteConstants } from "app/constants/route.constant";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    constructor(private http: BaseService) { }

    saveUserLocation(userId: string, latitude: number, longitude: number,Designation:string): Observable<any> {
      const payload = {
        UserId: userId,
        Latitude: latitude,
        Longitude: longitude,
        Designation:Designation
      };
        return this.http
        .HttpPost(this.http.Services.Account.CheckIn, payload)
        .pipe(
            retry(this.http.Services.RetryServieNo),
            catchError(this.http.HandleError),
            tap(response => {
                return response.Results;
            })
        );
    }
}
