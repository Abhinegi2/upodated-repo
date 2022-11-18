import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTIssueApprovalService {
    constructor(private http: BaseService) { }

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
}
