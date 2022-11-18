import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class AccountTransactionService {
    constructor(private http: BaseService) { }

    getAccountTransactions(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.AccountTransaction.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getAllRoles(): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.RoleTransaction.GetAllRoles, {})
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
            .HttpPost(this.http.Services.AccountTransaction.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getAccountTransactionById(accountTransactionId: string) {
        let requestParams = {
            DataId: accountTransactionId
        };

        return this.http
            .HttpPost(this.http.Services.AccountTransaction.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateAccountTransaction(formData: any) {
        return this.http
            .HttpPost(this.http.Services.AccountTransaction.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteAccountTransactionById(accountTransactionId: string) {
        var accountTransactionParams = {
            DataId: accountTransactionId
        };

        return this.http
            .HttpPost(this.http.Services.AccountTransaction.Delete, accountTransactionParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }
}
