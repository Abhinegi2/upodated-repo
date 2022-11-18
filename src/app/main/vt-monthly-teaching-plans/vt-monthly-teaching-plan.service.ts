import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTMonthlyTeachingPlanService {
    constructor(private http: BaseService) { }

    getVTMonthlyTeachingPlans(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTMonthlyTeachingPlan.GetAll)
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
            .HttpPost(this.http.Services.VTMonthlyTeachingPlan.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTMonthlyTeachingPlanById(vtMonthlyTeachingPlanId: string) {
        let requestParams = {
            DataId: vtMonthlyTeachingPlanId
        };

        return this.http
            .HttpPost(this.http.Services.VTMonthlyTeachingPlan.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTMonthlyTeachingPlan(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTMonthlyTeachingPlan.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTMonthlyTeachingPlanById(vtMonthlyTeachingPlanId: string) {
        var vtMonthlyTeachingPlanParams = {
            DataId: vtMonthlyTeachingPlanId
        };

        return this.http
            .HttpPost(this.http.Services.VTMonthlyTeachingPlan.Delete, vtMonthlyTeachingPlanParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
