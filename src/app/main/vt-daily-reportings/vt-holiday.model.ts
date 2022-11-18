import { FuseUtils } from '@fuse/utils';

export class VTRHolidayModel {
    HolidayTypeId: string;
    HolidayDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.HolidayTypeId = vtDailyReportingItem.HolidayTypeId || '';
        this.HolidayDetails = vtDailyReportingItem.HolidayDetails || '';
    }
}
