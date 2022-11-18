import { FuseUtils } from '@fuse/utils';

export class VCIndustryExposureVisitModel {
    TypeOfIndustryLinkage: string;
    ContactPersonName: string;
    ContactPersonMobile: string;
    ContactPersonEmail: string;

    constructor(vcDailyReportingItem?: any) {
        vcDailyReportingItem = vcDailyReportingItem || {};

        this.TypeOfIndustryLinkage = vcDailyReportingItem.TypeOfIndustryLinkage || '';
        this.ContactPersonName = vcDailyReportingItem.ContactPersonName || '';
        this.ContactPersonMobile = vcDailyReportingItem.ContactPersonMobile || '';
        this.ContactPersonEmail = vcDailyReportingItem.ContactPersonEmail || '';
    }
}
