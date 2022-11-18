import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class RoleService {
    constructor(private http: BaseService) { }

    getRoles(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.Role.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetAllByCriteria(filters:any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Role.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getRoleById(roleId: string) {
        var requestParams = {
            DataId: roleId
        };

        //.HttpGet(this.http.Services.School.GetById + '?roleId=' + roleId)
        return this.http.HttpPost(this.http.Services.Role.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateRole(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Role.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteRoleById(roleId: string) {
        var roleParams = {
            DataId: roleId
        };

        return this.http
            .HttpPost(this.http.Services.Role.Delete, roleParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
