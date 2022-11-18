import { FuseUtils } from '@fuse/utils';

export class AccountTransactionModel {
    AccountTransactionId: string;
    RoleId: string;
    AccountId: string;
    TransactionId: string;
    Rights: boolean;
    CanAdd: boolean;
    CanEdit: boolean;
    CanDelete: boolean;
    CanView: boolean;
    CanExport: boolean;
    ListView: boolean;
    BasicView: boolean;
    DetailView: boolean;
    IsPublic: boolean;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(accountTransactionItem?: any) {
        accountTransactionItem = accountTransactionItem || {};

        this.AccountTransactionId = accountTransactionItem.AccountTransactionId || FuseUtils.NewGuid();
        this.RoleId = accountTransactionItem.RoleId || '';
        this.AccountId = accountTransactionItem.AccountId || '';
        this.TransactionId = accountTransactionItem.TransactionId || '';
        this.Rights = accountTransactionItem.Rights || true;
        this.CanAdd = accountTransactionItem.CanAdd || true;
        this.CanEdit = accountTransactionItem.CanEdit || true;
        this.CanDelete = accountTransactionItem.CanDelete || true;
        this.CanView = accountTransactionItem.CanView || true;
        this.CanExport = accountTransactionItem.CanExport || true;
        this.ListView = accountTransactionItem.ListView || true;
        this.BasicView = accountTransactionItem.BasicView || true;
        this.DetailView = accountTransactionItem.DetailView || true;
        this.IsPublic = accountTransactionItem.IsPublic || true;
        this.Remarks = accountTransactionItem.Remarks || '';
        this.IsActive = accountTransactionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
