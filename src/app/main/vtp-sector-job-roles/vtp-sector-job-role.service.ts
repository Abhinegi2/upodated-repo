import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTPSectorJobRoleService {
    constructor(private http: BaseService) { }

    getVTPSectorJobRoles(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTPSectorJobRole.GetAll)
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
            .HttpPost(this.http.Services.VTPSectorJobRole.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTPSectorJobRoleById(vtpSectorJobRoleId: string) {
        var requestParams = {
            DataId: vtpSectorJobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.VTPSectorJobRole.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTPSectorJobRole(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTPSectorJobRole.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTPSectorJobRoleById(vtpSectorJobRoleId: string) {
        var vtpSectorJobRoleParams = {
            DataId: vtpSectorJobRoleId
        };

        return this.http
            .HttpPost(this.http.Services.VTPSectorJobRole.Delete, vtpSectorJobRoleParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVTPSectorJobRole(): Observable<any[]> {


        let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'VTP' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let JobRoleRequest = this.http.GetMasterDataByType({ DataType: 'JobRoles', SelectTitle: 'Job Role' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([vtpRequest, sectorRequest, JobRoleRequest]);
    }
}
