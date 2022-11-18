import { FuseUtils } from '@fuse/utils';

export class VCMonthlyAttendanceModel {
    VCId: string;
    UserId: string;
    ReportDate: Date;

    constructor(reportItem?: any) {
        reportItem = reportItem || {};

        this.VCId = reportItem.VCId || FuseUtils.NewGuid();
        this.UserId = reportItem.UserId || '';
        this.ReportDate = reportItem.ReportDate || '';
    }

}
