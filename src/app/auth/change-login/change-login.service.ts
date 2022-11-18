import { Injectable } from "@angular/core";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class ChangeLoginService {
    constructor(private http: BaseService) { }

    changeUserLoginId(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Account.ChangeLogin, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
