import { FuseUtils } from '@fuse/utils';

export class SiteSubHeaderModel {
    SiteSubHeaderId: string;
    SiteHeaderId: string;
    TransactionId: string;
    IsHeaderMenu: boolean;
    DisplayOrder: any;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(siteSubHeaderItem?: any) {
        siteSubHeaderItem = siteSubHeaderItem || {};

        this.SiteSubHeaderId = siteSubHeaderItem.SiteSubHeaderId || FuseUtils.NewGuid();
        this.SiteHeaderId = siteSubHeaderItem.SiteHeaderId || FuseUtils.NewGuid();
        this.TransactionId = siteSubHeaderItem.TransactionId || FuseUtils.NewGuid();
        this.IsHeaderMenu = siteSubHeaderItem.IsHeaderMenu || true;
        this.DisplayOrder = siteSubHeaderItem.DisplayOrder || '';
        this.Remarks = siteSubHeaderItem.Remarks || '';
        this.IsActive = siteSubHeaderItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
