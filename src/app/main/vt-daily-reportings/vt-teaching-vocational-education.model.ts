import { FuseUtils } from '@fuse/utils';
import { StudentAttendanceModel } from 'app/models/student.attendance.model';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';

export class VTRTeachingVocationalEducationModel {

    SequenceNo: number;
    DidYouTeachToday: boolean
    ClassTaughtId: string;
    ClassSectionIds: string;
    ActivityTypeIds: string;
    ModuleId: string;
    UnitId: string;
    SessionsTaught: string;
    ClassTypeId: string;
    ClassTime: number;
    ClassPictureFile: any;
    LessonPlanPictureFile: any;
    ReasonOfNotConductingTheClassIds: string;
    ReasonDetails: string;

    UnitSessionsModels: ModuleUnitSessionModel[]
    StudentAttendances: StudentAttendanceModel[];

    IsActive: boolean;
    RequestType: any;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.SequenceNo = vtDailyReportingItem.SequenceNo || 1;
        this.DidYouTeachToday = vtDailyReportingItem.DidYouTeachToday || true;
        this.ClassTaughtId = vtDailyReportingItem.ClassTaughtId || '';
        this.ClassSectionIds = vtDailyReportingItem.ClassSectionIds || '';
        this.ActivityTypeIds = vtDailyReportingItem.ActivityTypeIds || '';
        this.ModuleId = vtDailyReportingItem.ModuleId || '';
        this.UnitId = vtDailyReportingItem.UnitId || '';
        this.SessionsTaught = vtDailyReportingItem.SessionsTaught || '';
        this.ClassTypeId = vtDailyReportingItem.ClassTypeId || '';
        this.ClassTime = vtDailyReportingItem.ClassTime || '';
        this.ClassPictureFile = vtDailyReportingItem.ClassPictureFile || '';
        this.LessonPlanPictureFile = vtDailyReportingItem.LessonPlanPictureFile || '';
        this.ReasonOfNotConductingTheClassIds = vtDailyReportingItem.ReasonOfNotConductingTheClassIds || '';
        this.ReasonDetails = vtDailyReportingItem.ReasonDetails || '';

        this.UnitSessionsModels = vtDailyReportingItem.UnitSessionsModels || <ModuleUnitSessionModel[]>[];
        this.StudentAttendances = vtDailyReportingItem.StudentAttendances || <StudentAttendanceModel[]>[];

        this.IsActive = vtDailyReportingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
