import { FuseUtils } from '@fuse/utils';

export class HMIssueReportingModel {
    HMIssueReportingId: string;
    AcademicYearId: string;
    HMId: string;
    IssueReportDate: any;
    MainIssue: string;
    SubIssue: string;

    SchoolId: string;
    SectorId: string;
    JobRoleId: string;
    SSJId: string;
    StudentClass: string;
    SectionIds: string;

    Month: string;
    StudentType: any;
    NoOfStudents: string;
    IssueDetails: string;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(hmIssueReportingItem?: any) {
        hmIssueReportingItem = hmIssueReportingItem || {};

        this.HMIssueReportingId = hmIssueReportingItem.HMIssueReportingId || FuseUtils.NewGuid();
        this.HMId = hmIssueReportingItem.HMId || FuseUtils.NewGuid();
        this.AcademicYearId = hmIssueReportingItem.AcademicYearId || '';
        this.SSJId = hmIssueReportingItem.SSJId || '';
        this.IssueReportDate = hmIssueReportingItem.IssueReportDate || '';
        this.MainIssue = hmIssueReportingItem.MainIssue || '';
        this.SubIssue = hmIssueReportingItem.SubIssue || '';
        this.StudentClass = hmIssueReportingItem.StudentClass || '';
        this.SectionIds = hmIssueReportingItem.SectionIds || '';
        this.Month = hmIssueReportingItem.Month || '';
        this.StudentType = hmIssueReportingItem.StudentType || '';
        this.NoOfStudents = hmIssueReportingItem.NoOfStudents || '';
        this.IssueDetails = hmIssueReportingItem.IssueDetails || '';

        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.IsActive = hmIssueReportingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
