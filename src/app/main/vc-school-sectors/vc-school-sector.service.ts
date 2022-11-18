import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class VCSchoolSectorService {
    constructor(private http: BaseService) { }

    getVCSchoolSectors(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VCSchoolSector.GetAll)
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
            .HttpPost(this.http.Services.VCSchoolSector.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVCSchoolSectorById(vcSchoolSectorId: string) {
        let requestParams = {
            DataId: vcSchoolSectorId
        };

        return this.http
            .HttpPost(this.http.Services.VCSchoolSector.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVCSchoolSector(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VCSchoolSector.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVCSchoolSectorById(vcSchoolSectorId: string) {
        var vcSchoolSectorParams = {
            DataId: vcSchoolSectorId
        };

        return this.http
            .HttpPost(this.http.Services.VCSchoolSector.Delete, vcSchoolSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getAcademicYearVC(): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' }, false);
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let vocationalCoordinatorRequest = this.http.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Vocational Coordinator' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtpRequest, sectorRequest, vocationalCoordinatorRequest]);
    }

    getVocationalCoordinatorById(vcId: string) {
        let requestParams = {
            DataId: vcId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalCoordinator.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }
}
