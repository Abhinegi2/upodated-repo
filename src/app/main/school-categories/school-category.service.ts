import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SchoolCategoryService {
    constructor(private http: BaseService) { }

    getSchoolCategories(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SchoolCategory.GetAll)
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
            .HttpPost(this.http.Services.SchoolCategory.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSchoolCategoryById(schoolCategoryId: string) {
        let requestParams = {
            DataId: schoolCategoryId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolCategory.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSchoolCategory(formData: any) {
        return this.http
            .HttpPost(this.http.Services.SchoolCategory.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSchoolCategoryById(schoolCategoryId: string) {
        var schoolCategoryParams = {
            DataId: schoolCategoryId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolCategory.Delete, schoolCategoryParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
