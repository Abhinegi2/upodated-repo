import { FuseUtils } from '@fuse/utils';

export class DRPIndustryExposureVisitModel {
    TypeOfIndustryLinkage: string;
    ContactPersonName: string;
    ContactPersonMobile: string;
    ContactPersonEmail: string;

    constructor(dailyReportingItem?: any) {
        dailyReportingItem = dailyReportingItem || {};

        this.TypeOfIndustryLinkage = dailyReportingItem.TypeOfIndustryLinkage || '';
        this.ContactPersonName = dailyReportingItem.ContactPersonName || '';
        this.ContactPersonMobile = dailyReportingItem.ContactPersonMobile || '';
        this.ContactPersonEmail = dailyReportingItem.ContactPersonEmail || '';
    }
}
