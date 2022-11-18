import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class IssueApprovalService {
    constructor(private http: BaseService) { }

    GetAllByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.IssueApproval.GetAllByCriteria, filters)
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

    getVTIssueReportingById(vtIssueReportingId: string) {
        let requestParams = {
            DataId: vtIssueReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VTIssueReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
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

    approvedHMIssueReporting(formData: any) {

        return this.http
            .HttpPost(this.http.Services.HMIssueReporting.Approved, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    approvedVCIssueReporting(formData: any) {

        return this.http
            .HttpPost(this.http.Services.VCIssueReporting.Approved, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    approvedVTIssueReporting(formData: any) {

        return this.http
            .HttpPost(this.http.Services.VTIssueReporting.Approved, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforIssueReporting(userModel: UserModel): Observable<any[]> {
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' }, false);
        let classesAffectedRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'ClassesAffected', SelectTitle: 'Classes Affected' }, false);
        let studentTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StudentType', SelectTitle: 'Student Type' });
        let mainIssueRequest = this.http.GetMasterDataByType({ DataType: 'MainIssueView', UserId: userModel.RoleCode, SelectTitle: 'Main Issue' });
        let issueStatusRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'IssueStatus', SelectTitle: 'Issue Status' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([monthRequest, classesAffectedRequest, studentTypeRequest, mainIssueRequest, issueStatusRequest]);
    }
}
