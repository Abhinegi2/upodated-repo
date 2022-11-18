import { FuseUtils } from '@fuse/utils';
import { VTRTeachingVocationalEducationModel } from '../vt-daily-reportings/vt-teaching-vocational-education.model';
import { VTRCommunityHomeVisitModel } from './vt-community-home-visit.model';
import { VTRParentTeachersMeetingModel } from './vt-parent-teachers-meeting.model';
import { VTRTrainingOfTeacherModel } from './vt-training-of-teacher.model';
import { VTROnJobTrainingCoordinationModel } from './vt-on-job-training-coordination.model';
import { VTRAssessorInOtherSchoolForExamModel } from './vt-assessor-in-other-school-for-exam.model';
import { VTRVisitToIndustryModel } from './vt-visit-to-industry.model';
import { VTRVisitToEducationalInstitutionModel } from './vt-visit-to-educational-institution.model';
import { VTRAssignmentFromVocationalDepartmentModel } from './vt-assignment-from-vocational-department.model';
import { VTRTeachingNonVocationalSubjectModel } from './vt-teaching-non-vocational-subject.model';
import { VTRWorkAssignedByHeadMasterModel } from './vt-work-assigned-by-head-master.model';
import { VTRHolidayModel } from './vt-holiday.model';
import { VTRObservationDayModel } from './vt-observation-day.model';
import { VTRLeaveModel } from './vt-leave.model';
import { ModuleUnitSessionModel } from 'app/models/module-unit-session-model';

export class VTDailyReportingModel {
    VTId: string;
    VTDailyReportingId: string;
    ReportingDate: any;
    ReportType: string;
    WorkingDayTypeIds: string;

    TeachingVocationalEducations: VTRTeachingVocationalEducationModel[];

    ParentTeachersMeeting: VTRParentTeachersMeetingModel;
    CommunityHomeVisit: VTRCommunityHomeVisitModel;
    TrainingOfTeacher: VTRTrainingOfTeacherModel;
    OnJobTrainingCoordination: VTROnJobTrainingCoordinationModel;
    AssessorInOtherSchoolForExam: VTRAssessorInOtherSchoolForExamModel;

    VisitToIndustry: VTRVisitToIndustryModel;
    VisitToIndustries: VTRVisitToIndustryModel[];

    VisitToEducationalInstitution: VTRVisitToEducationalInstitutionModel;
    VisitToEducationalInstitutions: VTRVisitToEducationalInstitutionModel[];

    AssignmentFromVocationalDepartment: VTRAssignmentFromVocationalDepartmentModel;
    TeachingNonVocationalSubject: VTRTeachingNonVocationalSubjectModel;
    Holiday: VTRHolidayModel;
    ObservationDay: VTRObservationDayModel;
    Leave: VTRLeaveModel;

    UnitSessionsModels: ModuleUnitSessionModel[];
    SchoolEventCelebration: string;
    WorkAssignedByHeadMaster: string;
    SchoolExamDuty: string;
    OtherWork: string;
    ObservationDetails: string;
    OBStudentCount: number;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.TeachingVocationalEducations = <VTRTeachingVocationalEducationModel[]>[];
        this.VisitToIndustries = <VTRVisitToIndustryModel[]>[];
        this.VisitToEducationalInstitutions = <VTRVisitToEducationalInstitutionModel[]>[];
        this.UnitSessionsModels = <ModuleUnitSessionModel[]>[];

        this.VTId = vtDailyReportingItem.VTId || FuseUtils.NewGuid();
        this.VTDailyReportingId = vtDailyReportingItem.VTDailyReportingId || FuseUtils.NewGuid();
        this.ReportingDate = vtDailyReportingItem.ReportingDate || '';
        this.ReportType = vtDailyReportingItem.ReportType || '';
        this.WorkingDayTypeIds = vtDailyReportingItem.WorkingDayTypeIds || '';

        this.SchoolEventCelebration = vtDailyReportingItem.SchoolEventCelebration || '';
        this.WorkAssignedByHeadMaster = vtDailyReportingItem.WorkAssignedByHeadMaster || '';
        this.SchoolExamDuty = vtDailyReportingItem.SchoolExamDuty || '';
        this.OtherWork = vtDailyReportingItem.OtherWork || '';
        this.ObservationDetails = vtDailyReportingItem.ObservationDetails || '';
        this.OBStudentCount = vtDailyReportingItem.OBStudentCount || '0';

        if (vtDailyReportingItem.TeachingVocationalEducations != undefined) {
            vtDailyReportingItem.TeachingVocationalEducations.forEach(tveItem => {
                let teachingVocationalEducation = new VTRTeachingVocationalEducationModel();
                teachingVocationalEducation.ClassTaughtId = tveItem.ClassTaughtId || '';
                teachingVocationalEducation.ClassSectionIds = tveItem.ClassSectionIds || '';
                teachingVocationalEducation.ActivityTypeIds = tveItem.ActivityTypeIds || '';
                teachingVocationalEducation.ModuleId = tveItem.ModuleId || '';
                teachingVocationalEducation.UnitId = tveItem.UnitId || '';
                teachingVocationalEducation.SessionsTaught = tveItem.SessionsTaught || '';
                teachingVocationalEducation.ClassTypeId = tveItem.ClassTypeId || '';
                teachingVocationalEducation.ClassTime = tveItem.ClassTime || '';
                teachingVocationalEducation.ClassPictureFile = tveItem.ClassPictureFile || '';
                teachingVocationalEducation.LessonPlanPictureFile = tveItem.LessonPlanPictureFile || '';
                teachingVocationalEducation.ReasonOfNotConductingTheClassIds = tveItem.ReasonOfNotConductingTheClassIds || '';
                teachingVocationalEducation.ReasonDetails = tveItem.ReasonDetails || '';

                this.TeachingVocationalEducations.push(teachingVocationalEducation);
            });
        }

        //Training Of Teacher
        if (vtDailyReportingItem.TrainingOfTeacher != null) {
            this.TrainingOfTeacher = new VTRTrainingOfTeacherModel();
            vtDailyReportingItem.TrainingOfTeacher = vtDailyReportingItem.TrainingOfTeacher || new VTRTrainingOfTeacherModel();

            this.TrainingOfTeacher.TrainingBy = vtDailyReportingItem.TrainingOfTeacher.TrainingBy || '';
            this.TrainingOfTeacher.TrainingTypeId = vtDailyReportingItem.TrainingOfTeacher.TrainingTypeId || '';
            this.TrainingOfTeacher.TrainingTopicIds = vtDailyReportingItem.TrainingOfTeacher.TrainingTopicIds || '';
            this.TrainingOfTeacher.TrainingDetails = vtDailyReportingItem.TrainingOfTeacher.TrainingDetails || '';
        }

        //On Job Training Activity
        if (vtDailyReportingItem.OnJobTrainingCoordination != null) {
            this.OnJobTrainingCoordination = new VTROnJobTrainingCoordinationModel();
            vtDailyReportingItem.OnJobTrainingCoordination = vtDailyReportingItem.OnJobTrainingCoordination || new VTROnJobTrainingCoordinationModel();

            this.OnJobTrainingCoordination.OnJobTrainingActivityId = vtDailyReportingItem.OnJobTrainingCoordination.OnJobTrainingActivityId || '';
            this.OnJobTrainingCoordination.IndustryName = vtDailyReportingItem.OnJobTrainingCoordination.IndustryName || '';
            this.OnJobTrainingCoordination.IndustryContactPerson = vtDailyReportingItem.OnJobTrainingCoordination.IndustryContactPerson || '';
            this.OnJobTrainingCoordination.IndustryContactNumber = vtDailyReportingItem.OnJobTrainingCoordination.IndustryContactNumber || '';
            this.OnJobTrainingCoordination.OJTActivityDetails = vtDailyReportingItem.OnJobTrainingCoordination.OJTActivityDetails || '';
        }

        //Assessor In Other School Exam
        if (vtDailyReportingItem.AssessorInOtherSchoolForExam != null) {
            this.AssessorInOtherSchoolForExam = new VTRAssessorInOtherSchoolForExamModel();
            vtDailyReportingItem.AssessorInOtherSchoolForExam = vtDailyReportingItem.AssessorInOtherSchoolForExam || new VTRAssessorInOtherSchoolForExamModel();

            this.AssessorInOtherSchoolForExam.SchoolName = vtDailyReportingItem.AssessorInOtherSchoolForExam.SchoolName || '';
            this.AssessorInOtherSchoolForExam.Udise = vtDailyReportingItem.AssessorInOtherSchoolForExam.Udise || '';
            this.AssessorInOtherSchoolForExam.ClassId = vtDailyReportingItem.AssessorInOtherSchoolForExam.ClassId || '';
            this.AssessorInOtherSchoolForExam.BoysPresent = vtDailyReportingItem.AssessorInOtherSchoolForExam.BoysPresent || '';
            this.AssessorInOtherSchoolForExam.GirlsPresent = vtDailyReportingItem.AssessorInOtherSchoolForExam.GirlsPresent || '';
            this.AssessorInOtherSchoolForExam.ExamDetails = vtDailyReportingItem.AssessorInOtherSchoolForExam.ExamDetails || '';
        }

        //Assignment From vocational department
        if (vtDailyReportingItem.AssignmentFromVocationalDepartment != null) {
            this.AssignmentFromVocationalDepartment = new VTRAssignmentFromVocationalDepartmentModel();
            vtDailyReportingItem.AssignmentFromVocationalDepartment = vtDailyReportingItem.AssignmentFromVocationalDepartment || new VTRAssignmentFromVocationalDepartmentModel();

            this.AssignmentFromVocationalDepartment.AssigmentNumber = vtDailyReportingItem.AssignmentFromVocationalDepartment.AssigmentNumber || '';
            this.AssignmentFromVocationalDepartment.AssignmentDetails = vtDailyReportingItem.AssignmentFromVocationalDepartment.AssignmentDetails || '';
            this.AssignmentFromVocationalDepartment.AssignmentPhotoFile = vtDailyReportingItem.AssignmentFromVocationalDepartment.AssignmentPhotoFile || '';
        }

        // Parent Teachers Meeting : Start
        if (vtDailyReportingItem.ParentTeachersMeeting != null) {
            this.ParentTeachersMeeting = new VTRParentTeachersMeetingModel();
            vtDailyReportingItem.ParentTeachersMeeting = vtDailyReportingItem.ParentTeachersMeeting || new VTRParentTeachersMeetingModel();

            this.ParentTeachersMeeting.VocationalParentsCount = vtDailyReportingItem.ParentTeachersMeeting.VocationalParentsCount || '';
            this.ParentTeachersMeeting.OtherParentsCount = vtDailyReportingItem.ParentTeachersMeeting.OtherParentsCount || '';
            this.ParentTeachersMeeting.PTADetails = vtDailyReportingItem.ParentTeachersMeeting.PTADetails || '';
        }
        // Parent Teachers Meeting : End

        //Community Home Visit : Start
        if (vtDailyReportingItem.CommunityHomeVisit != null) {
            this.CommunityHomeVisit = new VTRCommunityHomeVisitModel();
            vtDailyReportingItem.CommunityHomeVisit = vtDailyReportingItem.CommunityHomeVisit || new VTRCommunityHomeVisitModel();

            this.CommunityHomeVisit.VocationalParentsCount = vtDailyReportingItem.CommunityHomeVisit.VocationalParentsCount || '';
            this.CommunityHomeVisit.OtherParentsCount = vtDailyReportingItem.CommunityHomeVisit.OtherParentsCount || '';
            this.CommunityHomeVisit.CommunityVisitDetails = vtDailyReportingItem.CommunityHomeVisit.CommunityVisitDetails || '';
        }
        //Community Home Visit : End

        // Industry Visit : Start
        if (vtDailyReportingItem.VisitToIndustry != null) {
            this.VisitToIndustry = new VTRVisitToIndustryModel();
            vtDailyReportingItem.VisitToIndustry = vtDailyReportingItem.VisitToIndustry || new VTRVisitToIndustryModel();

            this.VisitToIndustry.IndustryVisitCount = vtDailyReportingItem.VisitToIndustry.IndustryVisitCount || 1;
            this.VisitToIndustry.IndustryName = vtDailyReportingItem.VisitToIndustry.IndustryName || '';
            this.VisitToIndustry.IndustryContactPerson = vtDailyReportingItem.VisitToIndustry.IndustryContactPerson || '';
            this.VisitToIndustry.IndustryContactNumber = vtDailyReportingItem.VisitToIndustry.IndustryContactNumber || '';
            this.VisitToIndustry.IndustryVisitDetails = vtDailyReportingItem.VisitToIndustry.IndustryVisitDetails || '';
        }

        //Visit To Educational Institution
        if (vtDailyReportingItem.VisitToEducationalInstitution != null) {
            this.VisitToEducationalInstitution = new VTRVisitToEducationalInstitutionModel();
            vtDailyReportingItem.VisitToEducationalInstitution = vtDailyReportingItem.VisitToEducationalInstitution || new VTRVisitToEducationalInstitutionModel();

            this.VisitToEducationalInstitution.EducationalInstituteVisitCount = vtDailyReportingItem.VisitToEducationalInstitution.EducationalInstituteVisitCount || 1;
            this.VisitToEducationalInstitution.EducationalInstitute = vtDailyReportingItem.VisitToEducationalInstitution.EducationalInstitute || '';
            this.VisitToEducationalInstitution.InstituteContactPerson = vtDailyReportingItem.VisitToEducationalInstitution.InstituteContactPerson || '';
            this.VisitToEducationalInstitution.InstituteContactNumber = vtDailyReportingItem.VisitToEducationalInstitution.InstituteContactNumber || '';
            this.VisitToEducationalInstitution.InstituteVisitDetails = vtDailyReportingItem.VisitToEducationalInstitution.InstituteVisitDetails || '';
        }

        //TeachingNonVocationalSubject
        if (vtDailyReportingItem.TeachingNonVocationalSubject != null) {
            this.TeachingNonVocationalSubject = new VTRTeachingNonVocationalSubjectModel();
            vtDailyReportingItem.TeachingNonVocationalSubject = vtDailyReportingItem.TeachingNonVocationalSubject || new VTRTeachingNonVocationalSubjectModel();

            this.TeachingNonVocationalSubject.OtherClassTakenDetails = vtDailyReportingItem.TeachingNonVocationalSubject.OtherClassTakenDetails || '';
            this.TeachingNonVocationalSubject.OtherClassTime = vtDailyReportingItem.TeachingNonVocationalSubject.OtherClassTime || '';
        }

        //Holiday
        if (vtDailyReportingItem.Holiday != null) {
            this.Holiday = new VTRHolidayModel();
            vtDailyReportingItem.Holiday = vtDailyReportingItem.Holiday || new VTRHolidayModel();
            this.Holiday.HolidayTypeId = vtDailyReportingItem.Holiday.HolidayTypeId || '';
            this.Holiday.HolidayDetails = vtDailyReportingItem.Holiday.HolidayDetails || '';
        }

        //Observation Day
        if (vtDailyReportingItem.ObservationDay != null) {
            this.ObservationDay = new VTRObservationDayModel();
            vtDailyReportingItem.ObservationDay = vtDailyReportingItem.ObservationDay || new VTRObservationDayModel();

            this.ObservationDay.VTId = vtDailyReportingItem.ObservationDay.VTId || '';
            this.ObservationDay.ClassId = vtDailyReportingItem.ObservationDay.ClassId || '';
            this.ObservationDay.StudentId = vtDailyReportingItem.ObservationDay.StudentId || '';
            this.ObservationDay.IsPresent = vtDailyReportingItem.ObservationDay.IsPresent || '';
        }

        // Leave
        if (vtDailyReportingItem.Leave != null) {
            this.Leave = new VTRLeaveModel();
            vtDailyReportingItem.Leave = vtDailyReportingItem.Leave || new VTRLeaveModel();

            this.Leave.LeaveTypeId = vtDailyReportingItem.Leave.LeaveTypeId || '';
            this.Leave.LeaveApprovalStatus = vtDailyReportingItem.Leave.LeaveApprovalStatus || '';
            this.Leave.LeaveApprover = vtDailyReportingItem.Leave.LeaveApprover || '';
            this.Leave.LeaveReason = vtDailyReportingItem.Leave.LeaveReason || '';
        }

        this.IsActive = vtDailyReportingItem.IsActive || true;
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.RequestType = 0; // New
    }
}
