import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VCIssueApprovalService {
    constructor(private http: BaseService) { }

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
}
