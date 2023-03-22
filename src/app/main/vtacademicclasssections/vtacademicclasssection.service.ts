import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTAcademicClassSectionService {
    constructor(private http: BaseService) { }

    getVTAcademicClassSections(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTAcademicClassSection.GetAll)
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
            .HttpPost(this.http.Services.VTAcademicClassSection.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTAcademicClassSectionById(vtacademicclasssectionId: string) {
        let requestParams = {
            DataId: vtacademicclasssectionId
        };

        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTAcademicClassSection(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTAcademicClassSectionById(vtacademicclasssectionId: string) {
        var vtacademicclasssectionParams = {
            DataId: vtacademicclasssectionId
        };

        return this.http
            .HttpPost(this.http.Services.VTAcademicClassSection.Delete, vtacademicclasssectionParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getVTAcademicClassSection(userModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', UserId: userModel.UserTypeId, SelectTitle: 'Academic Year' }, false);
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'Classes' });
        let sectionRequest = this.http.GetMasterDataByType({ DataType: 'Sections', SelectTitle: 'Section' });
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'UsersByRole', RoleId: 'VT', ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' }, false);
        let gvtRequest = this.http.GetMasterDataByType({ DataType: 'GenericVocationalTrainers', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Generic Vocational Trainer' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, classRequest, sectionRequest, vtRequest, gvtRequest]);
    }
}
