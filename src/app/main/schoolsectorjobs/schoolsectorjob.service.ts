import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SchoolSectorJobService {
    constructor(private http: BaseService) { }

    getSchoolSectorJobs(): Observable<any> {
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

    getSchoolSectorJobById(schoolsectorjobId: string) {
        let requestParams = {
            DataId: schoolsectorjobId
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

    deleteSchoolSectorJobById(schoolsectorjobId: string) {
        var schoolsectorjobParams = {
            DataId: schoolsectorjobId
        };

        return this.http
            .HttpPost(this.http.Services.SchoolSectorJob.Delete, schoolsectorjobParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getSchoolSectorJob(): Observable<any[]> {
        // let stateRequest = this.http.GetMasterDataByType({ DataType: 'States', SelectTitle: 'States' });
        // let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', SelectTitle: 'Division' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', SelectTitle: 'School' }, false);
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([schoolRequest, sectorRequest]);
    }
}
