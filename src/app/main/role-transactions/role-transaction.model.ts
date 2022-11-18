import { FuseUtils } from '@fuse/utils';

export class RoleTransactionModel {
    RoleTransactionId: string;
    RoleId: string;
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

    constructor(roleTransactionItem?: any) {
        roleTransactionItem = roleTransactionItem || {};

        this.RoleTransactionId = roleTransactionItem.RoleTransactionId || FuseUtils.NewGuid();
        this.RoleId = roleTransactionItem.RoleId || FuseUtils.NewGuid();
        this.TransactionId = roleTransactionItem.TransactionId || FuseUtils.NewGuid();
        this.Rights = roleTransactionItem.Rights || true;
        this.CanAdd = roleTransactionItem.CanAdd || true;
        this.CanEdit = roleTransactionItem.CanEdit || true;
        this.CanDelete = roleTransactionItem.CanDelete || true;
        this.CanView = roleTransactionItem.CanView || true;
        this.CanExport = roleTransactionItem.CanExport || true;
        this.ListView = roleTransactionItem.ListView || true;
        this.BasicView = roleTransactionItem.BasicView || true;
        this.DetailView = roleTransactionItem.DetailView || true;
        this.IsPublic = roleTransactionItem.IsPublic || true;
        this.Remarks = roleTransactionItem.Remarks || '';
        this.IsActive = roleTransactionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
