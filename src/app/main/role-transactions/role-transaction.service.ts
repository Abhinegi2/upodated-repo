import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class RoleTransactionService {
    constructor(private http: BaseService) { }

    getRoleTransactions(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.RoleTransaction.GetAll)
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
            .HttpPost(this.http.Services.RoleTransaction.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getRoleTransactionById(roleTransactionId: string) {
        let requestParams = {
            DataId: roleTransactionId
        };

        return this.http
            .HttpPost(this.http.Services.RoleTransaction.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateRoleTransaction(formData: any) {
        return this.http
            .HttpPost(this.http.Services.RoleTransaction.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteRoleTransactionById(roleTransactionId: string) {
        var roleTransactionParams = {
            DataId: roleTransactionId
        };

        return this.http
            .HttpPost(this.http.Services.RoleTransaction.Delete, roleTransactionParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforRoleTransaction(): Observable<any[]> {

        let roleRequest = this.getAllRoles();
        let transactionRequest = this.http.GetMasterDataByType({ DataType: 'Transactions', SelectTitle: 'Transaction' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([roleRequest, transactionRequest]);
    }
}
