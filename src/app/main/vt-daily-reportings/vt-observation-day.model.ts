import { FuseUtils } from '@fuse/utils';

export class VTRObservationDayModel {
    VTId: string;
    ClassId: string;
    StudentId: string;
    IsPresent: boolean;
    Remarks: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.VTId = vtDailyReportingItem.VTId || '';
        this.ClassId = vtDailyReportingItem.ClassId || '';
        this.StudentId = vtDailyReportingItem.StudentId || '';
        this.IsPresent = vtDailyReportingItem.IsPresent || '';
        this.Remarks = vtDailyReportingItem.Remarks || '';
    }
}
