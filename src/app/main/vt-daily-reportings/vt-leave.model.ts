import { FuseUtils } from '@fuse/utils';

export class VTRLeaveModel {
    LeaveTypeId: string;
    LeaveModeId: string;
    LeaveApprovalStatus: string;
    LeaveApprover: string;
    LeaveReason: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.LeaveTypeId = vtDailyReportingItem.LeaveTypeId || '';
        this.LeaveModeId = vtDailyReportingItem.LeaveModeId || '';
        this.LeaveApprovalStatus = vtDailyReportingItem.LeaveApprovalStatus || '';
        this.LeaveApprover = vtDailyReportingItem.LeaveApprover || '';
        this.LeaveReason = vtDailyReportingItem.LeaveReason || '';
    }
}
