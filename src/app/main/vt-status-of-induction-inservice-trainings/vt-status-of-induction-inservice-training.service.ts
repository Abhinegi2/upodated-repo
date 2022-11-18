import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTStatusOfInductionInserviceTrainingService {
    constructor(private http: BaseService) { }

    getVTStatusOfInductionInserviceTrainings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTStatusOfInductionInserviceTraining.GetAll)
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
            .HttpPost(this.http.Services.VTStatusOfInductionInserviceTraining.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStatusOfInductionInserviceTrainingById(vtStatusOfInductionInserviceTrainingId: string) {
        var requestParams = {
            DataId: vtStatusOfInductionInserviceTrainingId
        };

        return this.http
            .HttpPost(this.http.Services.VTStatusOfInductionInserviceTraining.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTStatusOfInductionInserviceTraining(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTStatusOfInductionInserviceTraining.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTStatusOfInductionInserviceTrainingById(vtStatusOfInductionInserviceTrainingId: string) {
        var vtStatusOfInductionInserviceTrainingParams = {
            DataId: vtStatusOfInductionInserviceTrainingId
        };

        return this.http
            .HttpPost(this.http.Services.VTStatusOfInductionInserviceTraining.Delete, vtStatusOfInductionInserviceTrainingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
