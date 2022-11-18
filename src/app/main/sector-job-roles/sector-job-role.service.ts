import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SectorJobRoleService {
    constructor(private http: BaseService) { }

    getSectorJobRoles(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.SectorJobRole.GetAll)
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
            .HttpPost(this.http.Services.SectorJobRole.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getSectorJobRoleById(sectorJobRoleId: string) {
        let requestParams = {
            DataId: sectorJobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.SectorJobRole.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateSectorJobRole(formData: any) {
        return this.http
            .HttpPost(this.http.Services.SectorJobRole.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteSectorJobRoleById(sectorJobRoleId: string) {
        var sectorJobRoleParams = {
            DataId: sectorJobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.SectorJobRole.Delete, sectorJobRoleParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforSectorJobRole(): Observable<any[]> {
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let jobRoleRequest = this.http.GetMasterDataByType({ DataType: 'JobRoles', SelectTitle: 'Job Role' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([sectorRequest, jobRoleRequest]);
    }
}
