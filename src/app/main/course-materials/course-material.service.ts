import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";
import { CommonService } from "app/services/common.service";

@Injectable()
export class CourseMaterialService {
    constructor(private http: BaseService, private commonService: CommonService) { }

    getCourseMaterials(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.CourseMaterial.GetAll)
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
            .HttpPost(this.http.Services.CourseMaterial.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getCourseMaterialById(courseMaterialId: string) {
        let requestParams = {
            DataId: courseMaterialId
        };

        return this.http
            .HttpPost(this.http.Services.CourseMaterial.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateCourseMaterial(formData: any) {
        return this.http
            .HttpPost(this.http.Services.CourseMaterial.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteCourseMaterialById(courseMaterialId: string) {
        var courseMaterialParams = {
            DataId: courseMaterialId
        };

        return this.http
            .HttpPost(this.http.Services.CourseMaterial.Delete, courseMaterialParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    initCourseMaterialsData(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', UserId: userModel.UserTypeId, SelectTitle: 'Academic Year' }, false);
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' }, false);
        let vcRequest = this.http.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Vocational Coordinator' }, false);

        let vtpRequest = null;
        if (userModel.RoleCode == 'HM') {
            // vtpRequest = this.commonService.GetVTPByHMId(userModel.AcademicYearId, userModel.UserTypeId);
            vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' }, false);
        }
        else {
            vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' }, false);
        }

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtpRequest, vtRequest, vcRequest]);
    }

    getAcademicYearClass(userModel: UserModel): Observable<any[]> {
        let SchoolRequest = this.commonService.GetMasterDataByType({ DataType: 'Schools', UserId: userModel.UserTypeId, roleId: userModel.RoleCode, SelectTitle: 'School' }, false);
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYearsByVT', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        //let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'Class' });
        let academicYearAllRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', UserId: userModel.UserTypeId, SelectTitle: 'Academic Year' }, false);

        let vtpRequest = null;
        if (userModel.RoleCode == 'HM') {
            // vtpRequest = this.commonService.GetVTPByHMId(userModel.AcademicYearId, userModel.UserTypeId);
            vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' }, false);
        }
        else {
            vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' }, false);
        }

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([SchoolRequest, academicYearRequest, vtpRequest, academicYearAllRequest]);
    }
}
