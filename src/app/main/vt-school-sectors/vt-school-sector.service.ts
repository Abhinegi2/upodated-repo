import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";
import { CommonService } from "app/services/common.service";

@Injectable()
export class VTSchoolSectorService {
    constructor(private http: BaseService, private commonService: CommonService) { }

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

    getDropdownforVTSchoolSector(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', UserId: userModel.UserTypeId, SelectTitle: 'Academic Year' }, false);
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let vtpRequest = this.commonService.GetVTPByAYId(userModel.RoleCode,userModel.UserTypeId,userModel.AcademicYearId)
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' }, false);
        let vcRequest = this.http.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Vocational Coordinator' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtpRequest, sectorRequest, vtRequest,vcRequest]);
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
