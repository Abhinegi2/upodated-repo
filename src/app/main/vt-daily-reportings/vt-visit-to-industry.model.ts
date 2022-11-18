import { FuseUtils } from '@fuse/utils';

export class VTRVisitToIndustryModel {
    IndustryVisitCount: number;
    IndustryName: string;
    IndustryContactPerson: string;
    IndustryContactNumber: number;
    IndustryVisitDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.IndustryVisitCount = vtDailyReportingItem.IndustryVisitCount || 1;
        this.IndustryName = vtDailyReportingItem.IndustryName || '';
        this.IndustryContactPerson = vtDailyReportingItem.IndustryContactPerson || '';
        this.IndustryContactNumber = vtDailyReportingItem.IndustryContactNumber || '';
        this.IndustryVisitDetails = vtDailyReportingItem.IndustryVisitDetails || '';
    }
}
