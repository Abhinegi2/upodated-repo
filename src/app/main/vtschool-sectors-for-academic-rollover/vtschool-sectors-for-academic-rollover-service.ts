import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTSchoolSectorsForAcademicRolloverService {
    constructor(private http: BaseService) { }

    getSchoolVTPSectors(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SchoolVTPSector.GetAll)
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
            .HttpPost(this.http.Services.VTSchoolSectorForAcademicRolloverTransfer.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSchoolVTPSectorById(schoolVTPSectorId: string) {
        let requestParams = {
            DataId: schoolVTPSectorId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolVTPSector.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    VTSchoolSectorForAcademicRolloverTransfer(userModel: any, vtSchoolSectorIds: any) {
        var vtSchoolSectorParams = {
            Id: 0,
            FromEntityId: vtSchoolSectorIds,
            UserId: userModel.UserId,
        };

        return this.http
            .HttpPost(this.http.Services.VTSchoolSectorForAcademicRolloverTransfer.Transfer, vtSchoolSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSchoolVTPSectorById(schoolVTPSectorId: string) {
        var schoolVTPSectorParams = {
            DataId: schoolVTPSectorId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolVTPSector.Delete, schoolVTPSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownForSchoolVTPSector(): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', SelectTitle: 'School' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, schoolRequest]);
    }
}
