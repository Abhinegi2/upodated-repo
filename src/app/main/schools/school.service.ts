import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SchoolService {
    constructor(private http: BaseService) { }

    getSchools(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.School.GetAll)
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
            .HttpPost(this.http.Services.School.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSchoolById(schoolId: string) {
        let requestParams = {
            DataId: schoolId
        };

        return this.http.HttpPost(this.http.Services.School.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSchool(formData: any) {
        return this.http
            .HttpPost(this.http.Services.School.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSchoolById(schoolId: string) {
        let schoolParams = {
            DataId: schoolId
        };

        return this.http
            .HttpPost(this.http.Services.School.Delete, schoolParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforSchool(): Observable<any[]> {
        let schoolCategoryRequest = this.http.GetMasterDataByType({ DataType: 'SchoolCategories', SelectTitle: 'School Category' });
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let schoolTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SchoolType', SelectTitle: 'School Type' });
        let stateRequest = this.http.GetMasterDataByType({ DataType: 'States', SelectTitle: 'State' });
        let schoolManagementRequest = this.http.GetMasterDataByType({ DataType: 'BasicList', ParentId: 'SchoolManagement', SelectTitle: 'School Management' });
        let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([schoolCategoryRequest, academicYearRequest, schoolTypeRequest, stateRequest, schoolManagementRequest, vtpRequest]);
    }

    getInitSchoolsData(): Observable<any[]> {
        let stateRequest = this.http.GetMasterDataByType({ DataType: 'States', SelectTitle: 'State' });
        let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', ParentId: this.http.MyConstants.DefaultStateId, SelectTitle: 'Division' })
        let schoolCategoryRequest = this.http.GetMasterDataByType({ DataType: 'SchoolCategories', SelectTitle: 'School Category' });
        let schoolTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SchoolType', SelectTitle: 'School Type' });
        let schoolManagementRequest = this.http.GetMasterDataByType({ DataType: 'BasicList', ParentId: 'SchoolManagement', SelectTitle: 'School Management' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([stateRequest, divisionRequest, schoolCategoryRequest, schoolTypeRequest, schoolManagementRequest]);
    }
}
