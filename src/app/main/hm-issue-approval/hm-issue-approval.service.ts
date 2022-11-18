import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class HMIssueApprovalService {
    constructor(private http: BaseService) { }

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
}
