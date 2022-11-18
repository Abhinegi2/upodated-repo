import { FuseUtils } from '@fuse/utils';

export class TransactionModel {
    TransactionId: string;
    Code: string;
    Name: string;
    PageTitle: string;
    PageDescription: string;
    UrlAction: string;
    UrlController: string;
    UrlPara: string;
    RouteUrl: string;
    DisplayOrder: any;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(transactionItem?: any) {
        transactionItem = transactionItem || {};

        this.TransactionId = transactionItem.TransactionId || FuseUtils.NewGuid();
        this.Code = transactionItem.Code || '';
        this.Name = transactionItem.Name || '';
        this.PageTitle = transactionItem.PageTitle || '';
        this.PageDescription = transactionItem.PageDescription || '';
        this.UrlAction = transactionItem.UrlAction || '';
        this.UrlController = transactionItem.UrlController || '';
        this.UrlPara = transactionItem.UrlPara || '';
        this.RouteUrl = transactionItem.RouteUrl || '';
        this.DisplayOrder = transactionItem.DisplayOrder || '';
        this.Remarks = transactionItem.Remarks || '';
        this.IsActive = transactionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
