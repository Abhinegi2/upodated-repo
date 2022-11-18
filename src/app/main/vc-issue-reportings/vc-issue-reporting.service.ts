import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class VCIssueReportingService {
    constructor(private http: BaseService) { }

    getVCIssueReportings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VCIssueReporting.GetAll)
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
            .HttpPost(this.http.Services.VCIssueReporting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVCIssueReportingById(vcIssueReportingId: string) {
        let requestParams = {
            DataId: vcIssueReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCIssueReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVCIssueReporting(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VCIssueReporting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVCIssueReportingById(vcIssueReportingId: string) {
        var vcIssueReportingParams = {
            DataId: vcIssueReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCIssueReporting.Delete, vcIssueReportingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVCIssueReporting(userModel: UserModel): Observable<any[]> {
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' }, false);
        let classesAffectedRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'ClassesAffected', SelectTitle: 'Classes Affected' }, false);
        let studentTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StudentType', SelectTitle: 'Student Type' });
        let mainIssueRequest = this.http.GetMasterDataByType({ DataType: 'MainIssue', UserId: userModel.RoleCode, SelectTitle: 'Main Issue' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([monthRequest, classesAffectedRequest, studentTypeRequest, mainIssueRequest]);
    }
}
