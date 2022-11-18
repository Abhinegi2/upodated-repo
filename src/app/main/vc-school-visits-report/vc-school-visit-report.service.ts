import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class VCSchoolVisitReportService {
    constructor(private http: BaseService) { }

    getVCSchoolVisits(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VCSchoolVisitReport.GetAll)
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
            .HttpPost(this.http.Services.VCSchoolVisitReport.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVCSchoolVisitReportingById(VCSchoolVisitReportingId: string) {
        let requestParams = {
            DataId: VCSchoolVisitReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCSchoolVisitReport.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVCSchoolVisit(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VCSchoolVisitReport.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVCSchoolVisitReportById(VCSchoolVisitReportingId: string) {
        var vcSchoolVisitReportParams = {
            DataId: VCSchoolVisitReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCSchoolVisitReport.Delete, vcSchoolVisitReportParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVCSchoolVisitReporting(userModel: UserModel): Observable<any[]> {

        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' });
        let vtByVCRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'SchoolsByUserId', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId }, false);
        let districtRequest = this.http.GetMasterDataByType({ DataType: 'DistrictForBlock', UserId: userModel.DefaultStateId, SelectTitle: 'District' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([monthRequest, vtByVCRequest, schoolRequest, districtRequest]);
    }
}
