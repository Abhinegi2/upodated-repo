import { FuseUtils } from '@fuse/utils';

export class DRPLeaveModel {
    LeaveTypeId: string;
    LeaveApprovalStatus: string;
    LeaveApprover: string;
    LeaveReason: string;

    constructor(dailyReportingItem?: any) {
        dailyReportingItem = dailyReportingItem || {};

        this.LeaveTypeId = dailyReportingItem.LeaveTypeId || '';
        this.LeaveApprovalStatus = dailyReportingItem.LeaveApprovalStatus || '';
        this.LeaveApprover = dailyReportingItem.LeaveApprover || '';
        this.LeaveReason = dailyReportingItem.LeaveReason || '';
    }
}
