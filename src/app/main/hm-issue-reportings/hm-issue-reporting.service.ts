import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class HMIssueReportingService {
    constructor(private http: BaseService) { }

    getHMIssueReportings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.HMIssueReporting.GetAll)
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
            .HttpPost(this.http.Services.HMIssueReporting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getHMIssueReportingById(hmIssueReportingId: string) {
        let requestParams = {
            DataId: hmIssueReportingId
        };

        return this.http
            .HttpPost(this.http.Services.HMIssueReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateHMIssueReporting(formData: any) {
        return this.http
            .HttpPost(this.http.Services.HMIssueReporting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteHMIssueReportingById(hmIssueReportingId: string) {
        var hmIssueReportingParams = {
            DataId: hmIssueReportingId
        };

        return this.http
            .HttpPost(this.http.Services.HMIssueReporting.Delete, hmIssueReportingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforHMIssueReporting(userModel: UserModel): Observable<any[]> {
        let SchoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', UserId: userModel.UserTypeId, roleId: userModel.RoleCode, SelectTitle: 'School' });
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' }, false);
        let classesAffectedRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'ClassesAffected', SelectTitle: 'Classes Affected' }, false);
        let studentTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StudentType', SelectTitle: 'Student Type' });
        let mainIssueRequest = this.http.GetMasterDataByType({ DataType: 'MainIssue', UserId: userModel.RoleCode, SelectTitle: 'Main Issue' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([SchoolRequest, monthRequest, classesAffectedRequest, studentTypeRequest, mainIssueRequest]);
    }
}
