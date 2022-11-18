import { FuseUtils } from '@fuse/utils';

export class VTReportingAttendanceModel {
    SrNo: number;
    AcademicYear: string;
    SchoolAllottedYear: string;
    PhaseName: string;
    VTPName: string;
    VCName: string;
    VCMobile: string;
    VCEmail: string;
    VTName: string;
    VTMobile: string;
    VTEmail: string;
    VTDateOfJoining: Date;
    HMName: string;
    HMMobile: string;
    HMEmail: string;
    SchoolManagement: string;
    DivisionName: string;
    DistrictName: string;
    BlockName: string;
    UDISE: string;
    SchoolName: string;
    SectorName: string;
    MonthYear: string;
    TotalDays: number;
    WorkingDays: number;
    NoOfSundays: number;
    GovtHolidays: number;
    ObservationDays: number;
    VTReportSubmitted: Date;
    VTWorkingDays: number;
    VTHolidays: number;
    VTObservationDays: number;
    VTLeaveDays: number;
    TeachingDays: number;
    NonTeachingDays: number;

    constructor() { }
}
