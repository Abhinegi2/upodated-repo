import { FuseUtils } from '@fuse/utils';

export class SiteHeaderModel {
    SiteHeaderId: string;
    ShortName: string;
    LongName: string;
    Description: string;
    DisplayOrder: any;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(siteHeaderItem?: any) {
        siteHeaderItem = siteHeaderItem || {};

        this.SiteHeaderId = siteHeaderItem.SiteHeaderId || FuseUtils.NewGuid();
        this.ShortName = siteHeaderItem.ShortName || '';
        this.LongName = siteHeaderItem.LongName || '';
        this.Description = siteHeaderItem.Description || '';
        this.DisplayOrder = siteHeaderItem.DisplayOrder || '';
        this.Remarks = siteHeaderItem.Remarks || '';
        this.IsActive = siteHeaderItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
