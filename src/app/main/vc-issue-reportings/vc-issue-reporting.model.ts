import { FuseUtils } from '@fuse/utils';

export class VCIssueReportingModel {
    VCIssueReportingId: string;
    AcademicYearId: string;
    VCId: string;
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
    StudentType: string;
    NoOfStudents: any;
    IssueDetails: string;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vcIssueReportingItem?: any) {
        vcIssueReportingItem = vcIssueReportingItem || {};

        this.VCIssueReportingId = vcIssueReportingItem.VCIssueReportingId || FuseUtils.NewGuid();
        this.AcademicYearId = vcIssueReportingItem.AcademicYearId || '';
        this.VCId = vcIssueReportingItem.VCId || '';
        this.SSJId = vcIssueReportingItem.SSJId || '';
        this.IssueReportDate = vcIssueReportingItem.IssueReportDate || '';
        this.MainIssue = vcIssueReportingItem.MainIssue || '';
        this.SubIssue = vcIssueReportingItem.SubIssue || '';
        this.StudentClass = vcIssueReportingItem.StudentClass || '';
        this.SectionIds = vcIssueReportingItem.SectionIds || '';
        this.Month = vcIssueReportingItem.Month || '';
        this.StudentType = vcIssueReportingItem.StudentType || '';
        this.NoOfStudents = vcIssueReportingItem.NoOfStudents || '';
        this.IssueDetails = vcIssueReportingItem.IssueDetails || '';

        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.IsActive = vcIssueReportingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
