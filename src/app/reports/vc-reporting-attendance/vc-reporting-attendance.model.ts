import { FuseUtils } from '@fuse/utils';

export class VCReportingAttendanceReportModel {
    AcademicYear: string;
    SchoolAllottedYear: string;
    Phase: string;
    VTPName: string;
    VCName: string;
    VCMobile: string;
    VCEmail: string;
    TotalDays: number;
    NoOfSundays: number;
    VCReportsSubmitted: Date;
    MonthYear: number;
    WorkingDays: string;
    Holidays: string;
    Leave: string;
    NumberOfSchools: number;
    SchoolVisitDays: number;

    constructor() { }
}
