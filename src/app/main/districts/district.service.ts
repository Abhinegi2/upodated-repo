import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class DistrictService {
    constructor(private http: BaseService) { }

    getDistricts(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.District.GetAll)
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
            .HttpPost(this.http.Services.District.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getDistrictById(districtId: string) {
        let requestParams = {
            DataId: districtId
        };

        return this.http
            .HttpPost(this.http.Services.District.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateDistrict(formData: any) {
        return this.http
            .HttpPost(this.http.Services.District.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteDistrictById(districtCode: string) {
        var districtParams = {
            DataId: districtCode
        };

        return this.http
            .HttpPost(this.http.Services.District.Delete, districtParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforDistrict(userModel: UserModel): Observable<any[]> {
        let stateRequest = this.http.GetMasterDataByType({ DataType: 'States', SelectTitle: 'State' });
        let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', ParentId: userModel.DefaultStateId, SelectTitle: 'Division' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([stateRequest, divisionRequest]);
    }
}
