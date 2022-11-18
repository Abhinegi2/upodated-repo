import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VTPSectorForAcademicYearService {
    constructor(private http: BaseService) { }

    GetAllByCriteria(filters: any): Observable<any> {
        filters.isCurrentYear = true;
        return this.http
            .HttpPost(this.http.Services.VTPSectorForAcademicYear.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    transferVTPSectors(userModel: any, vtpSectorIds: any) {
        var vtpSectorParams = {
            Id: 0,
            FromEntityId: vtpSectorIds,
            UserId: userModel.UserId,
        };

        return this.http
            .HttpPost(this.http.Services.VTPSectorForAcademicYear.Transfer, vtpSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
