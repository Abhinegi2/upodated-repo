import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VocationalTrainingProviderService {
    constructor(private http: BaseService) { }

    getVocationalTrainingProviders(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VocationalTrainingProvider.GetAll)
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
            .HttpPost(this.http.Services.VocationalTrainingProvider.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationalTrainingProviderById(vtpId: string) {
        let requestParams = {
            DataId: vtpId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainingProvider.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVocationalTrainingProvider(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VocationalTrainingProvider.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVocationalTrainingProviderById(vtpId: string) {
        var vocationalTrainingProviderParams = {
            DataId: vtpId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainingProvider.Delete, vocationalTrainingProviderParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getInitVocationalCoordinatorProvidersData(): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest]);
    }

}
