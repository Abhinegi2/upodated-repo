import { FuseUtils } from '@fuse/utils';

export class VTMonthlyAttendanceModel {
    VTId: string;
    UserId: string;
    ReportDate: Date;

    constructor(reportItem?: any) {
        reportItem = reportItem || {};

        this.VTId = reportItem.VTId || FuseUtils.NewGuid();
        this.UserId = reportItem.UserId || '';
        this.ReportDate = reportItem.ReportDate || '';
    }

}
