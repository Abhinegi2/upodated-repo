import { FuseUtils } from '@fuse/utils';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';
import { StudentAttendanceModel } from 'app/models/student.attendance.model';

export class VTGuestLectureConductedModel {
    VTGuestLectureId: string;
    VTId: string;
    SchoolId: string;
    SectorId: string;
    JobRoleId: string;
    AcademicYearId: string;
    SSJId: string;
    ClassTaughtId: string;
    SectionIds: string;
    ReportingDate: any;
    GLType: string;
    GLTopic: string;
    ModuleId: string;
    UnitId: string;
    SessionIds: string;
    ClassTime: number;
    MethodologyIds: string;
    GLMethodologyDetails: string;
    GLLecturerPhotoFile: any;
    GLConductedBy: string;
    GLPersonDetails: string;
    GLName: string;
    GLMobile: string;
    GLEmail: string;
    GLQualification: string;
    GLAddress: string;
    GLWorkStatus: string;
    GLCompany: string;
    GLDesignation: string;
    GLWorkExperience: any;
    GLPhotoFile: any;
    Remarks: any;
    UnitSessionsModels: ModuleUnitSessionModel[];
    StudentAttendances: StudentAttendanceModel[];
    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtGuestLectureConductedItem?: any) {
        vtGuestLectureConductedItem = vtGuestLectureConductedItem || {};

        this.VTGuestLectureId = vtGuestLectureConductedItem.VTGuestLectureId || FuseUtils.NewGuid();
        this.VTId = vtGuestLectureConductedItem.VTId || FuseUtils.NewGuid();
        this.SSJId = vtGuestLectureConductedItem.SSJId || '';
        this.AcademicYearId = vtGuestLectureConductedItem.AcademicYearId || '';
        this.SectorId = vtGuestLectureConductedItem.SectorId || '';
        this.JobRoleId = vtGuestLectureConductedItem.JobRoleId || '';
        this.ClassTaughtId = vtGuestLectureConductedItem.ClassTaughtId || '';
        this.SectionIds = vtGuestLectureConductedItem.SectionIds || '';
        this.ReportingDate = vtGuestLectureConductedItem.ReportingDate || '';
        this.GLType = vtGuestLectureConductedItem.GLType || '';
        this.GLTopic = vtGuestLectureConductedItem.GLTopic || '';
        this.ModuleId = vtGuestLectureConductedItem.ModuleId || '';
        this.UnitId = vtGuestLectureConductedItem.UnitId || '';
        this.SessionIds = vtGuestLectureConductedItem.SessionIds || '';
        this.ClassTime = vtGuestLectureConductedItem.ClassTime || '';
        this.MethodologyIds = vtGuestLectureConductedItem.MethodologyIds || '';
        this.GLMethodologyDetails = vtGuestLectureConductedItem.GLMethodologyDetails || '';
        this.GLLecturerPhotoFile = vtGuestLectureConductedItem.GLLecturerPhotoFile || null;
        this.GLConductedBy = vtGuestLectureConductedItem.GLConductedBy || '';
        this.GLPersonDetails = vtGuestLectureConductedItem.GLPersonDetails || '';
        this.GLName = vtGuestLectureConductedItem.GLLecturerName || '';
        this.GLMobile = vtGuestLectureConductedItem.GLMobile || '';
        this.GLEmail = vtGuestLectureConductedItem.GLEmail || '';
        this.GLQualification = vtGuestLectureConductedItem.GLQualification || '';
        this.GLAddress = vtGuestLectureConductedItem.GLAddress || '';
        this.GLWorkStatus = vtGuestLectureConductedItem.GLWorkStatus || '';
        this.GLCompany = vtGuestLectureConductedItem.GLCompany || '';
        this.GLDesignation = vtGuestLectureConductedItem.GLDesignation || '';
        this.GLWorkExperience = vtGuestLectureConductedItem.GLWorkExperience || '';
        this.GLPhotoFile = vtGuestLectureConductedItem.GLPhotoFile || '';
        this.Remarks = vtGuestLectureConductedItem.Remarks || '';
        this.UnitSessionsModels = <ModuleUnitSessionModel[]>[];
        this.StudentAttendances = <StudentAttendanceModel[]>[];
        this.IsActive = vtGuestLectureConductedItem.IsActive || true;
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.RequestType = 0; // New
    }
}
