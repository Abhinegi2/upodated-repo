import { FuseUtils } from '@fuse/utils';

export class StudentEnrollmentModel {
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
    JobRoleName: string;
    ClassName: string;
    TotalEnrollmentStudents: number;
    EnrolledBoys: number;
    EnrolledGirls: number;
    NewEnrollment: number;
    Dropout: number;
    constructor() { }
}
