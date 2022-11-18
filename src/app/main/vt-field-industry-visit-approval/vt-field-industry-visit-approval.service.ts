import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTFieldIndustryVisitApprovalService {
    constructor(private http: BaseService) { }

    approvedVTFieldIndustryVisitConducted(formData: any) {
       
        return this.http
            .HttpPost(this.http.Services.VTFieldIndustryVisitConducted.Approved, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    } 
}
