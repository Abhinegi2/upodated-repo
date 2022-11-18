import { FuseUtils } from '@fuse/utils';

export class VCLeaveModel {
    LeaveTypeId: string;
    LeaveModeId: string;
    LeaveApprovalStatus: string;
    LeaveApprover: string;
    LeaveReason: string;

    constructor(vcDailyReportingItem?: any) {
        vcDailyReportingItem = vcDailyReportingItem || {};

        this.LeaveTypeId = vcDailyReportingItem.LeaveTypeId || '';
        this.LeaveModeId = vcDailyReportingItem.LeaveModeId || '';
        this.LeaveApprovalStatus = vcDailyReportingItem.LeaveApprovalStatus || '';
        this.LeaveApprover = vcDailyReportingItem.LeaveApprover || '';
        this.LeaveReason = vcDailyReportingItem.LeaveReason || '';
    }
}
