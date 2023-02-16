import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { UserModel } from "app/models/user.model";
import { CommonService } from "app/services/common.service";

@Injectable()
export class SchoolSectorJobService {
    constructor(private http: CommonService) { }

    getSchoolSectorJob(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SchoolSectorJob.GetAll)
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
            .HttpPost(this.http.Services.SchoolSectorJob.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSchoolSectorJobById(schoolSectorJobId: string) {
        let requestParams = {
            DataId: schoolSectorJobId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolSectorJob.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSchoolSectorJob(formData: any) {
        return this.http
            .HttpPost(this.http.Services.SchoolSectorJob.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSchoolSectorJobById(schoolSectorJobId: string) {
        var schoolSectorJobParams = {
            DataId: schoolSectorJobId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolSectorJob.Delete, schoolSectorJobParams)
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
        let academicYearAllRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', ParentId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'Classes' });
        let sectionRequest = this.http.GetMasterDataByType({ DataType: 'Sections', SelectTitle: 'Section' });
        let vtpRequest = this.http.GetVTPByAYId(userModel.RoleCode,userModel.UserTypeId,userModel.AcademicYearId)

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtpRequest, sectorRequest, classRequest, sectionRequest, academicYearAllRequest]);
    }
}
