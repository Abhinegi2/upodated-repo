import { Injectable } from "@angular/core";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { Observable } from "rxjs";

@Injectable()
export class SettingService {
    constructor(private http: BaseService) { }

    saveSettings(formData: any) {
        return this.http
            .HttpPost(this.http.Services.CommonService.SaveLighthouseSettings, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getAllRoles(): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.RoleTransaction.GetAllRoles, {})
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }
}
