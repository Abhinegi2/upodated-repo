import { FuseUtils } from '@fuse/utils';

export class VCSchoolVisitModel {
    VCSchoolVisitId: string;
    VCId : string;
    VCSchoolSectorId: string;
    ReportDate: Date;
    Month: string;
    VTReportSubmitted: string;
    VTWorkingDays: number;
    VTLeaveDays: number;
    VTTeachingDays: number;
    ClassVisited: string;
    ClassTeachingDays: number;
    BoysEnrolledCheck: number;
    GirlsEnrolledCheck: number;
    AvgStudentAttendance: number;
    CMAvailability: string;
    CMDate: Date;
    TEAvailability: string;
    TEDate: Date;
    NoOfGLConducted: number;
    NoOfFVConducted: number;
    SchoolHMVisited: string;
    HMRatingVTattendance: number;
    HMRatingSyllabuscompletion: number;
    HMRatingVtreporting: number;
    HMRatingVtqualityteaching: number;
    HMRatingVtglfvquality: number;
    HMRatingInitiativestaken: number;

    GeoLocation:string;
    Latitude:string;
    Longitude:string;
    IsActive: boolean;
    RequestType: any;

    constructor(vcSchoolVisitItem?: any) {
        vcSchoolVisitItem = vcSchoolVisitItem || {};

        this.VCSchoolVisitId = vcSchoolVisitItem.VCSchoolVisitId || FuseUtils.NewGuid();
        this.VCSchoolSectorId = vcSchoolVisitItem.VCSchoolSectorId || FuseUtils.NewGuid();
        this.VCId = vcSchoolVisitItem.VCId || FuseUtils.NewGuid();
        this.ReportDate = vcSchoolVisitItem.ReportDate || '';        
        this.Month = vcSchoolVisitItem.Month || '';
        this.VTReportSubmitted = vcSchoolVisitItem.VTReportSubmitted || '';
        this.VTWorkingDays = vcSchoolVisitItem.VTWorkingDays || '';
        this.VTLeaveDays = vcSchoolVisitItem.VTLeaveDays || '';
        this.VTTeachingDays = vcSchoolVisitItem.VTTeachingDays || '';
        this.ClassVisited = vcSchoolVisitItem.ClassVisited || '';
        this.ClassTeachingDays = vcSchoolVisitItem.ClassTeachingDays || '';
        this.BoysEnrolledCheck = vcSchoolVisitItem.BoysEnrolledCheck || '';
        this.GirlsEnrolledCheck = vcSchoolVisitItem.GirlsEnrolledCheck || '';
        this.AvgStudentAttendance = vcSchoolVisitItem.AvgStudentAttendance || '';
        this.CMAvailability = vcSchoolVisitItem.CMAvailability || '';
        this.CMDate = vcSchoolVisitItem.CMDate || '';
        this.TEAvailability = vcSchoolVisitItem.TEAvailability || '';
        this.TEDate = vcSchoolVisitItem.TEDate || '';
        this.NoOfGLConducted = vcSchoolVisitItem.NoOfGLConducted || '';
        this.NoOfFVConducted = vcSchoolVisitItem.NoOfFVConducted || '';
        this.SchoolHMVisited = vcSchoolVisitItem.SchoolHMVisited || '';
        this.HMRatingVTattendance = vcSchoolVisitItem.HMRatingVTattendance || '';
        this.HMRatingSyllabuscompletion = vcSchoolVisitItem.HMRatingSyllabuscompletion || '';
        this.HMRatingVtreporting = vcSchoolVisitItem.HMRatingVtreporting || '';
        this.HMRatingVtqualityteaching = vcSchoolVisitItem.HMRatingVtqualityteaching || '';
        this.HMRatingVtglfvquality = vcSchoolVisitItem.HMRatingVtglfvquality || '';
        this.HMRatingInitiativestaken = vcSchoolVisitItem.HMRatingInitiativestaken || '';
        
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.IsActive = vcSchoolVisitItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
