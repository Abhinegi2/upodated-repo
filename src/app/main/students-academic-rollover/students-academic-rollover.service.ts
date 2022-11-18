import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class StudentsAcademicRolloverService {
    constructor(private http: BaseService) { }

    getVTSchoolSectors(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTSchoolSector.GetAll)
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
            .HttpPost(this.http.Services.VTSchoolSector.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTSchoolSectorById(vtSchoolSectorId: string) {
        let requestParams = {
            DataId: vtSchoolSectorId
        };

        return this.http
            .HttpPost(this.http.Services.VTSchoolSector.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTSchoolSector(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTSchoolSector.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTSchoolSectorById(vtSchoolSectorId: string) {
        var vtSchoolSectorParams = {
            DataId: vtSchoolSectorId
        };

        return this.http
            .HttpPost(this.http.Services.VTSchoolSector.Delete, vtSchoolSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownForStudents(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', ParentId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByUserId', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, SelectTitle: 'Vocational Training Provider' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'SchoolsByVT', ParentId: userModel.UserTypeId, SelectTitle: 'School' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'Class' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtpRequest, schoolRequest, classRequest]);
    }

    StudentForAcademicRolloverTransfer(formData: any) {
        return this.http
            .HttpPost(this.http.Services.StudentForAcademicRolloverTransfer.Transfer, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    GetSchoolByCriteria(filters: any): Observable<any> {
        // var SchoolParams = {
        //     UserTypeId: VTId,
        //     UserId: filters.UserId,
        //     Name: filters.Name,
        //     CharBy: filters.CharBy,
        //     RequestFrom: filters.RequestFrom,
        //     PageIndex: filters.PageIndex,
        //     PageSize: filters.PageSize,
        //     isCurrentYear: filters.isCurrentYear,
        //     IgnoreCriteria: filters.IgnoreCriteria,
        //     SchoolId: SchoolId,
        //     PageSizeOptions: filters.PageSizeOptions,
        //     ShowFirstLastButtons: true,
        //     SortOrder: "asc",
        //     ClassId: classId,
        // };

        return this.http
            .HttpPost(this.http.Services.StudentForAcademicRolloverTransfer.GetSchoolByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    // GetSchoolByCriteria(filters: any): Observable<any> {

    //     return this.http
    //         .HttpPost(this.http.Services.StudentForAcademicRolloverTransfer.GetSchoolByCriteria, filters)
    //         .pipe(
    //             retry(this.http.Services.RetryServieNo),
    //             catchError(this.http.HandleError),
    //             tap(response => {
    //                 return response.Results;
    //             })
    //         );
    // }

    GetClassIdByCriteria(VTId: any, ClassId: any): Observable<any> {
        var ClassParams = {
            VTId: VTId,
            ClassId: ClassId


        };

        return this.http
            .HttpPost(this.http.Services.StudentForAcademicRolloverTransfer.GetClassIdByCriteria, ClassParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetTargetVocationalTrainers(targetVTParam: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.StudentForAcademicRolloverTransfer.GetTargetVocationalTrainers, targetVTParam)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }


    getVocationalTrainerById(vtId: string) {
        var requestParams = {
            DataId: vtId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }
}
