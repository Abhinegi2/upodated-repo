import { FuseUtils } from '@fuse/utils';

export class DRPHolidayModel {
    HolidayTypeId: string;
    HolidayDetails: string;

    constructor(dailyReportingItem?: any) {
        dailyReportingItem = dailyReportingItem || {};

        this.HolidayTypeId = dailyReportingItem.HolidayTypeId || '';
        this.HolidayDetails = dailyReportingItem.HolidayDetails || '';
    }
}
