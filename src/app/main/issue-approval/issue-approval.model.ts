import { FuseUtils } from '@fuse/utils';

export class IssueApprovalModel {
    VTIssueReportingId: string;
    VCIssueReportingId: string;
    HMIssueReportingId: string;
    HMId: string;
    VCId: string;
    VTId: string;
    IssueReportDate: any;
    MainIssue: string;
    SubIssue: string;
    StudentClass: string;
    Month: string;
    StudentType: string;
    NoOfStudents: any;
    IssueDetails: string;
    ApprovalStatus: string;
    Remarks: string;
    // AssignForAction: string;
    // VocationalCoordinator: string;
    IsActive: boolean;
    RequestType: any;

    constructor(issueApprovalItem?: any) {
        issueApprovalItem = issueApprovalItem || {};

        this.VCIssueReportingId = issueApprovalItem.VCIssueReportingId || FuseUtils.NewGuid();
        this.VTIssueReportingId = issueApprovalItem.VTIssueReportingId || FuseUtils.NewGuid();
        this.HMIssueReportingId = issueApprovalItem.HMIssueReportingId || FuseUtils.NewGuid();
        this.VCId = issueApprovalItem.VCId || '';
        this.HMId = issueApprovalItem.HMId || '';
        this.VTId = issueApprovalItem.VTId || '';
        this.IssueReportDate = issueApprovalItem.IssueReportDate || '';
        this.MainIssue = issueApprovalItem.MainIssue || '';
        this.SubIssue = issueApprovalItem.SubIssue || '';
        this.StudentClass = issueApprovalItem.StudentClass || '';
        this.Month = issueApprovalItem.Month || '';
        this.StudentType = issueApprovalItem.StudentType || '';
        this.NoOfStudents = issueApprovalItem.NoOfStudents || '';
        this.IssueDetails = issueApprovalItem.IssueDetails || '';
        this.ApprovalStatus = issueApprovalItem.ApprovalStatus || '';
        this.Remarks = issueApprovalItem.Remarks || '';
        // this.AssignForAction = issueApprovalItem.AssignForAction || '';
        // this.VocationalCoordinator = issueApprovalItem.VocationalCoordinator || '';
        this.IsActive = issueApprovalItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
