import { FuseUtils } from '@fuse/utils';

export class VCHolidayModel {
    HolidayTypeId: string;
    HolidayDetails: string;

    constructor(vcDailyReportingItem?: any) {
        vcDailyReportingItem = vcDailyReportingItem || {};

        this.HolidayTypeId = vcDailyReportingItem.HolidayTypeId || '';
        this.HolidayDetails = vcDailyReportingItem.HolidayDetails || '';
    }
}
