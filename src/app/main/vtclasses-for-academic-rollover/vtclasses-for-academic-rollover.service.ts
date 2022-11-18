import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class VTClassForAcademicRolloverService {
    constructor(private http: BaseService) { }

    getVTClasses(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTClass.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetAllByCriteria(filters: any): Observable<any> {
        filters.isCurrentYear == true
        return this.http
            .HttpPost(this.http.Services.VTClassForAcademicRolloverTransfer.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTClassById(vtClassId: string) {
        let requestParams = {
            DataId: vtClassId
        };

        return this.http
            .HttpPost(this.http.Services.VTClass.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTClass(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTClass.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTClassById(vtClassId: string) {
        var vtClassParams = {
            DataId: vtClassId
        };

        return this.http
            .HttpPost(this.http.Services.VTClass.Delete, vtClassParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getAcademicYearClassSection(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYearsByVT', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Classes' });
        let sectionRequest = this.http.GetMasterDataByType({ DataType: 'Sections', SelectTitle: 'Section' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, classRequest, sectionRequest]);
    }

    VTClassesForAcademicRolloverTransfer(userModel: any, vtClassIds: any) {
        var vtClassParams = {
            Id: 0,
            FromEntityId: vtClassIds,
            UserId: userModel.UserId,
        };

        return this.http
            .HttpPost(this.http.Services.VTClassForAcademicRolloverTransfer.Transfer, vtClassParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
