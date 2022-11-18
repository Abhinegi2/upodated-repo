import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class CourseModuleService {
    constructor(private http: BaseService) { }

    getCourseModules(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.CourseModule.GetAll)
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
            .HttpPost(this.http.Services.CourseModule.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getCourseModuleById(courseModuleId: string) {
        let requestParams = {
            DataId: courseModuleId
        };

        return this.http
            .HttpPost(this.http.Services.CourseModule.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateCourseModule(formData: any) {
        return this.http
            .HttpPost(this.http.Services.CourseModule.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteCourseModuleById(courseModuleId: string) {
        var courseModuleParams = {
            DataId: courseModuleId
        };

        return this.http
            .HttpPost(this.http.Services.CourseModule.Delete, courseModuleParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getClassCourseModuleSector(): Observable<any[]> {
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Classes' });
        let moduleTypeRequest = this.http.GetMasterDataByType({ DataType: 'CourseModules', SelectTitle: 'Course Module' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([classRequest, moduleTypeRequest, sectorRequest]);
    }
}
