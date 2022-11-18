import { Injectable } from "@angular/core";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { Observable } from "rxjs";

@Injectable()
export class VTTransferService {
    constructor(private http: BaseService) { }


    GetSchoolStudentsByVTId(vtId: string): Observable<any> {
        var requestParams = {
            DataId: vtId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.GetSchoolStudentsByVTId, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    saveVTTransfers(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.VTTransfer, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
