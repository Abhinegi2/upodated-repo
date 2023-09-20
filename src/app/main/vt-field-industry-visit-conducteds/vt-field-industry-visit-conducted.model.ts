import { FuseUtils } from '@fuse/utils';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';
import { StudentAttendanceModel } from 'app/models/student.attendance.model';

export class VTFieldIndustryVisitConductedModel {
    VTId: string;
    VTFieldIndustryVisitConductedId: string;
    SchoolId: string;
    SectorId: string;
    JobRoleId: string;
    AcademicYearId: string;
    SSJId: string;
    ClassTaughtId: string;
    SectionIds: string;
    ReportingDate: any;
    FieldVisitTheme: string;
    FieldVisitActivities: string;
    ModuleId: string;
    UnitId: string;
    SessionIds: string;
    FVOrganisation: string;
    FVOrganisationAddress: string;
    FVDistance: number;
    FVPictureFile: any;
    FVContactPersonName: string;
    FVContactPersonMobile: string;
    FVContactPersonEmail: string;
    FVContactPersonDesignation: string;
    FVOrganisationInterestStatus: string;
    FVOrignisationOJTStatus: string;
    FeedbackFromOrgnisation: string;
    Remarks: string;
    FVStudentSafety: string;
    UnitSessionsModels: ModuleUnitSessionModel[];
    StudentAttendances: StudentAttendanceModel[];
    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtFieldIndustryVisitConductedItem?: any) {
        vtFieldIndustryVisitConductedItem = vtFieldIndustryVisitConductedItem || {};

        this.VTId = vtFieldIndustryVisitConductedItem.VTId || FuseUtils.NewGuid();
        this.VTFieldIndustryVisitConductedId = vtFieldIndustryVisitConductedItem.VTFieldIndustryVisitConductedId || FuseUtils.NewGuid();
        this.SSJId = vtFieldIndustryVisitConductedItem.SSJId || '';
        this.AcademicYearId = vtFieldIndustryVisitConductedItem.AcademicYearId || '';
        this.SectorId = vtFieldIndustryVisitConductedItem.SectorId || '';
        this.JobRoleId = vtFieldIndustryVisitConductedItem.JobRoleId || '';
        this.ClassTaughtId = vtFieldIndustryVisitConductedItem.ClassTaughtId || '';
        this.ReportingDate = vtFieldIndustryVisitConductedItem.ReportingDate || '';
        this.SectionIds = vtFieldIndustryVisitConductedItem.SectionIds || '';
        this.FieldVisitTheme = vtFieldIndustryVisitConductedItem.FieldVisitTheme || '';
        this.FieldVisitActivities = vtFieldIndustryVisitConductedItem.FieldVisitActivities || '';
        this.ModuleId = vtFieldIndustryVisitConductedItem.ModuleId || '';
        this.UnitId = vtFieldIndustryVisitConductedItem.UnitId || '';
        this.SessionIds = vtFieldIndustryVisitConductedItem.SessionIds || '';
        this.FVOrganisation = vtFieldIndustryVisitConductedItem.FVOrganisation || '';
        this.FVOrganisationAddress = vtFieldIndustryVisitConductedItem.FVOrganisationAddress || '';
        this.FVDistance = vtFieldIndustryVisitConductedItem.FVDistance || '';
        this.FVPictureFile = vtFieldIndustryVisitConductedItem.FVPictureFile || '';
        this.FVContactPersonName = vtFieldIndustryVisitConductedItem.FVContactPersonName || '';
        this.FVContactPersonMobile = vtFieldIndustryVisitConductedItem.FVContactPersonMobile || '';
        this.FVContactPersonEmail = vtFieldIndustryVisitConductedItem.FVContactPersonEmail || '';
        this.FVContactPersonDesignation = vtFieldIndustryVisitConductedItem.FVContactPersonDesignation || '';
        this.FVOrganisationInterestStatus = vtFieldIndustryVisitConductedItem.FVOrganisationInterestStatus || '';
        this.FVOrignisationOJTStatus = vtFieldIndustryVisitConductedItem.FVOrignisationOJTStatus || '';
        this.FeedbackFromOrgnisation = vtFieldIndustryVisitConductedItem.FeedbackFromOrgnisation || '';
        this.Remarks = vtFieldIndustryVisitConductedItem.Remarks || '';
        this.FVStudentSafety = vtFieldIndustryVisitConductedItem.FVStudentSafety || '';
        this.UnitSessionsModels = <ModuleUnitSessionModel[]>[];
        this.StudentAttendances = <StudentAttendanceModel[]>[];
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.IsActive = vtFieldIndustryVisitConductedItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
