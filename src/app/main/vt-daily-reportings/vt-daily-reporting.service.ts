import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { UserModel } from 'app/models/user.model';
import { CommonService } from 'app/services/common.service';
import { VTDailyReportingModel } from './vt-daily-reporting.model';
import { FormArray, FormGroup } from '@angular/forms';
import { VTRParentTeachersMeetingModel } from './vt-parent-teachers-meeting.model';
import { VTRCommunityHomeVisitModel } from './vt-community-home-visit.model';
import { VTRTrainingOfTeacherModel } from './vt-training-of-teacher.model';
import { VTROnJobTrainingCoordinationModel } from './vt-on-job-training-coordination.model';
import { VTRAssessorInOtherSchoolForExamModel } from './vt-assessor-in-other-school-for-exam.model';
import { VTRVisitToIndustryModel } from './vt-visit-to-industry.model';
import { VTRVisitToEducationalInstitutionModel } from './vt-visit-to-educational-institution.model';
import { VTRAssignmentFromVocationalDepartmentModel } from './vt-assignment-from-vocational-department.model';
import { VTRTeachingNonVocationalSubjectModel } from './vt-teaching-non-vocational-subject.model';
import { VTRHolidayModel } from './vt-holiday.model';
import { VTRLeaveModel } from './vt-leave.model';
import { VTRTeachingVocationalEducationModel } from './vt-teaching-vocational-education.model';

@Injectable()
export class VTDailyReportingService {
    constructor(private http: CommonService) { }

    getVTDailyReportings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTDailyReporting.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetAllByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.VTDailyReporting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTDailyReportingById(vtDailyReportingId: string) {
        let requestParams = {
            DataId: vtDailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VTDailyReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTDailyReporting(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTDailyReporting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTDailyReportingById(vtDailyReportingId: string) {
        var vtDailyReportingParams = {
            DataId: vtDailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VTDailyReporting.Delete, vtDailyReportingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownForVTDailyReporting(currentUser: UserModel): Observable<any[]> {
        let reportTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTReportType', SelectTitle: 'Report Type' });
        let SchoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', UserId: currentUser.UserTypeId, roleId: currentUser.RoleCode, SelectTitle: 'School' }, false);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([reportTypeRequest, SchoolRequest]);
    }

    getDropdownForTeachingVocationalEducation(currentUser: UserModel): Observable<any[]> {
        let classRequest = this.http.GetClassesByVTId({ DataId: currentUser.LoginId, DataId1: currentUser.UserTypeId, SelectTitle: 'Class' });
        let moduleRequest = this.http.GetMasterDataByType({ DataType: 'CourseModules', SelectTitle: 'Modules Taught' });
        let otherWorkTypeRequest = this.http.GetMasterDataByType({ DataType: 'VTOtherWork', SelectTitle: 'Other Work Type' }, false);
        let classTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTClassType', SelectTitle: 'Class Type' });
        let activityTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTActivityType', SelectTitle: 'Activity Type' }, false);
        let classSectionRequest = this.http.GetClassSectionsByVTId({ DataId: currentUser.UserId, DataId1: currentUser.UserTypeId });
        let classStudentRequest = this.http.GetStudentsByVTId({ DataId1: currentUser.UserTypeId });
        let unitSessionRequest = this.http.GetCourseModuleUnitSessions({ DataId: currentUser.UserId, DataId1: currentUser.UserTypeId });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6        
        return forkJoin([classRequest, moduleRequest, otherWorkTypeRequest, classTypeRequest, activityTypeRequest, classSectionRequest, classStudentRequest, unitSessionRequest]);
    }

    getVTDailyReportingModelFromFormGroup(formGroup: FormGroup): VTDailyReportingModel {
        let dailyReportingModel = new VTDailyReportingModel();

        dailyReportingModel.ReportType = formGroup.get("ReportType").value;
        dailyReportingModel.ReportingDate = this.http.getDateTimeFromControl(formGroup.get("ReportingDate").value);
        dailyReportingModel.WorkingDayTypeIds = (dailyReportingModel.ReportType == '37') ? formGroup.get("WorkingDayTypeIds").value : [];

        dailyReportingModel.SchoolId = formGroup.get('SchoolId').value;
        dailyReportingModel.SectorId = formGroup.get('SectorId').value;
        dailyReportingModel.JobRoleId = formGroup.get('JobRoleId').value;
        dailyReportingModel.AcademicYearId = formGroup.get('AcademicYearId').value;

        // dailyReportingModel.ClassId = formGroup.get("ClassId").value;
        // dailyReportingModel.SectionIds = formGroup.get("SectionIds").value;

        // Teaching Vocational Education
        if (formGroup.controls.teachingVocationalEducationGroup != null) {
            dailyReportingModel.TeachingVocationalEducations = [];
            let teachingVocationalEducationControls = <FormArray>formGroup.controls.teachingVocationalEducationGroup.get("teachingVocationalEducations");

            for (let teachingVocationalEducationCtrl of teachingVocationalEducationControls.controls) {
                if (teachingVocationalEducationCtrl.get('ClassTaughtId').value == '')
                    continue;

                let teachingVocationalEducation = new VTRTeachingVocationalEducationModel();
                teachingVocationalEducation.SequenceNo = teachingVocationalEducationCtrl.get('SequenceNo').value || 1;
                teachingVocationalEducation.ClassTaughtId = teachingVocationalEducationCtrl.get('ClassTaughtId').value;
                teachingVocationalEducation.DidYouTeachToday = teachingVocationalEducationCtrl.get('DidYouTeachToday').value;
                teachingVocationalEducation.ClassSectionIds = teachingVocationalEducationCtrl.get('ClassSectionIds').value;
                teachingVocationalEducation.ActivityTypeIds = teachingVocationalEducationCtrl.get('ActivityTypeIds').value;
                teachingVocationalEducation.ClassTypeId = teachingVocationalEducationCtrl.get('ClassTypeId').value;
                teachingVocationalEducation.ClassTime = teachingVocationalEducationCtrl.get('ClassTime').value;
                //teachingVocationalEducation.ClassPicture = teachingVocationalEducationCtrl.get('ClassPicture').value;
                //teachingVocationalEducation.LessonPlanPicture = teachingVocationalEducationCtrl.get('LessonPlanPicture').value;
                teachingVocationalEducation.ReasonOfNotConductingTheClassIds = teachingVocationalEducationCtrl.get('ReasonOfNotConductingTheClassIds').value;
                teachingVocationalEducation.ReasonDetails = teachingVocationalEducationCtrl.get('ReasonDetails').value;

                teachingVocationalEducation.StudentAttendances = teachingVocationalEducationCtrl.get('StudentAttendances').value;

                //teachingVocationalEducation.ModuleId = teachingVocationalEducationCtrl.get('ModuleId').value;
                //teachingVocationalEducation.UnitId = teachingVocationalEducationCtrl.get('UnitId').value;
                //teachingVocationalEducation.SessionsTaught = teachingVocationalEducationCtrl.get('SessionsTaught').value;
                //teachingVocationalEducation.UnitSessionsModels = teachingVocationalEducationCtrl.get('UnitSessionsModels').value;

                dailyReportingModel.TeachingVocationalEducations.push(teachingVocationalEducation);
            }
        }

        // Training Of Teacher
        if (formGroup.controls.trainingOfTeacherGroup != null) {
            dailyReportingModel.TrainingOfTeacher = new VTRTrainingOfTeacherModel();
            dailyReportingModel.TrainingOfTeacher.TrainingBy = formGroup.controls.trainingOfTeacherGroup.get('TrainingBy').value;
            dailyReportingModel.TrainingOfTeacher.TrainingTypeId = formGroup.controls.trainingOfTeacherGroup.get('TrainingTypeId').value;
            dailyReportingModel.TrainingOfTeacher.TrainingTopicIds = formGroup.controls.trainingOfTeacherGroup.get('TrainingTopicIds').value;
            dailyReportingModel.TrainingOfTeacher.TrainingDetails = formGroup.controls.trainingOfTeacherGroup.get('TrainingDetails').value;
        }

        // On Job Training Coordination
        if (formGroup.controls.onJobTrainingCoordinationGroup != null) {
            dailyReportingModel.OnJobTrainingCoordination = new VTROnJobTrainingCoordinationModel();
            dailyReportingModel.OnJobTrainingCoordination.OnJobTrainingActivityId = formGroup.controls.onJobTrainingCoordinationGroup.get('OnJobTrainingActivityId').value;
            dailyReportingModel.OnJobTrainingCoordination.IndustryName = formGroup.controls.onJobTrainingCoordinationGroup.get('IndustryName').value;
            dailyReportingModel.OnJobTrainingCoordination.IndustryContactPerson = formGroup.controls.onJobTrainingCoordinationGroup.get('IndustryContactPerson').value;
            dailyReportingModel.OnJobTrainingCoordination.IndustryContactNumber = formGroup.controls.onJobTrainingCoordinationGroup.get('IndustryContactNumber').value;
            dailyReportingModel.OnJobTrainingCoordination.OJTActivityDetails = formGroup.controls.onJobTrainingCoordinationGroup.get('OJTActivityDetails').value;
        }

        // Assessor In Other School
        if (formGroup.controls.assessorInOtherSchoolGroup != null) {
            dailyReportingModel.AssessorInOtherSchoolForExam = new VTRAssessorInOtherSchoolForExamModel();
            dailyReportingModel.AssessorInOtherSchoolForExam.SchoolName = formGroup.controls.assessorInOtherSchoolGroup.get('SchoolName').value;
            dailyReportingModel.AssessorInOtherSchoolForExam.Udise = formGroup.controls.assessorInOtherSchoolGroup.get('Udise').value;
            dailyReportingModel.AssessorInOtherSchoolForExam.ClassId = formGroup.controls.assessorInOtherSchoolGroup.get('ClassId').value;
            dailyReportingModel.AssessorInOtherSchoolForExam.BoysPresent = formGroup.controls.assessorInOtherSchoolGroup.get('BoysPresent').value;
            dailyReportingModel.AssessorInOtherSchoolForExam.GirlsPresent = formGroup.controls.assessorInOtherSchoolGroup.get('GirlsPresent').value;
            dailyReportingModel.AssessorInOtherSchoolForExam.ExamDetails = formGroup.controls.assessorInOtherSchoolGroup.get('ExamDetails').value;
        }

        //5. School Event/ Celebration
        if (formGroup.controls.schoolEventCelebrationGroup != null) {
            dailyReportingModel.SchoolEventCelebration = formGroup.controls.schoolEventCelebrationGroup.get('SchoolEventCelebration').value;
        }

        // Parent Teachers Meeting
        if (formGroup.controls.parentTeacherMeetingGroup != null) {
            dailyReportingModel.ParentTeachersMeeting = new VTRParentTeachersMeetingModel();
            dailyReportingModel.ParentTeachersMeeting.VocationalParentsCount = formGroup.controls.parentTeacherMeetingGroup.get('VocationalParentsCount').value;
            dailyReportingModel.ParentTeachersMeeting.OtherParentsCount = formGroup.controls.parentTeacherMeetingGroup.get('OtherParentsCount').value;
            dailyReportingModel.ParentTeachersMeeting.PTADetails = formGroup.controls.parentTeacherMeetingGroup.get('PTADetails').value;
        }

        // Community Home Visit
        if (formGroup.controls.communityHomeVisitGroup != null) {
            dailyReportingModel.CommunityHomeVisit = new VTRCommunityHomeVisitModel();
            dailyReportingModel.CommunityHomeVisit.VocationalParentsCount = formGroup.controls.communityHomeVisitGroup.get('VocationalParentsCount').value;
            dailyReportingModel.CommunityHomeVisit.OtherParentsCount = formGroup.controls.communityHomeVisitGroup.get('OtherParentsCount').value;
            dailyReportingModel.CommunityHomeVisit.CommunityVisitDetails = formGroup.controls.communityHomeVisitGroup.get('CommunityVisitDetails').value;
        }

        // Industry Visit
        if (formGroup.controls.industryVisitGroup != null) {
            dailyReportingModel.VisitToIndustries = [];
            let industryVisitControls = <FormArray>formGroup.controls.industryVisitGroup.get("IndustryVisits");

            for (let industryVisitCtrl of industryVisitControls.controls) {
                dailyReportingModel.VisitToIndustry = new VTRVisitToIndustryModel();
                dailyReportingModel.VisitToIndustry.IndustryVisitCount = formGroup.controls.industryVisitGroup.get('IndustryVisitCount').value;
                dailyReportingModel.VisitToIndustry.IndustryName = industryVisitCtrl.get('IndustryName').value;
                dailyReportingModel.VisitToIndustry.IndustryContactPerson = industryVisitCtrl.get('IndustryContactPerson').value;
                dailyReportingModel.VisitToIndustry.IndustryContactNumber = industryVisitCtrl.get('IndustryContactNumber').value;
                dailyReportingModel.VisitToIndustry.IndustryVisitDetails = industryVisitCtrl.get('IndustryVisitDetails').value;

                dailyReportingModel.VisitToIndustries.push(dailyReportingModel.VisitToIndustry);
            }
        }

        // Visit to Educational Institute
        if (formGroup.controls.visitToEducationalInstituteGroup != null) {
            dailyReportingModel.VisitToEducationalInstitutions = [];
            let visitToEducationalInstitutionControls = <FormArray>formGroup.controls.visitToEducationalInstituteGroup.get("VisitToEducationalInstitutes");

            for (let visitToEducationalInstitutionCtrl of visitToEducationalInstitutionControls.controls) {
                dailyReportingModel.VisitToEducationalInstitution = new VTRVisitToEducationalInstitutionModel();
                dailyReportingModel.VisitToEducationalInstitution.EducationalInstituteVisitCount = formGroup.controls.visitToEducationalInstituteGroup.get('EducationalInstituteVisitCount').value;
                dailyReportingModel.VisitToEducationalInstitution.EducationalInstitute = visitToEducationalInstitutionCtrl.get('EducationalInstitute').value;
                dailyReportingModel.VisitToEducationalInstitution.InstituteContactPerson = visitToEducationalInstitutionCtrl.get('InstituteContactPerson').value;
                dailyReportingModel.VisitToEducationalInstitution.InstituteContactNumber = visitToEducationalInstitutionCtrl.get('InstituteContactNumber').value;
                dailyReportingModel.VisitToEducationalInstitution.InstituteVisitDetails = visitToEducationalInstitutionCtrl.get('InstituteVisitDetails').value;

                dailyReportingModel.VisitToEducationalInstitutions.push(dailyReportingModel.VisitToEducationalInstitution);
            }
        }

        // Assignment From Vocational Department
        if (formGroup.controls.assignmentFromVocationalDepartmentGroup != null) {
            dailyReportingModel.AssignmentFromVocationalDepartment = new VTRAssignmentFromVocationalDepartmentModel();
            dailyReportingModel.AssignmentFromVocationalDepartment.AssigmentNumber = formGroup.controls.assignmentFromVocationalDepartmentGroup.get('AssigmentNumber').value;
            dailyReportingModel.AssignmentFromVocationalDepartment.AssignmentDetails = formGroup.controls.assignmentFromVocationalDepartmentGroup.get('AssignmentDetails').value;
            //dailyReportingModel.AssignmentFromVocationalDepartment.AssignmentPhoto = formGroup.controls.assignmentFromVocationalDepartmentGroup.get('AssignmentPhoto').value;
        }

        // Teaching Non Vocational Subject  
        if (formGroup.controls.teachingNonVocationalSubjectGroup != null) {
            dailyReportingModel.TeachingNonVocationalSubject = new VTRTeachingNonVocationalSubjectModel();
            dailyReportingModel.TeachingNonVocationalSubject.OtherClassTakenDetails = formGroup.controls.teachingNonVocationalSubjectGroup.get('OtherClassTakenDetails').value;
            dailyReportingModel.TeachingNonVocationalSubject.OtherClassTime = formGroup.controls.teachingNonVocationalSubjectGroup.get('OtherClassTime').value;
        }

        // Work Assigned By Head Master
        if (formGroup.controls.workAssignedByHeadMasterGroup != null) {
            dailyReportingModel.WorkAssignedByHeadMaster = formGroup.controls.workAssignedByHeadMasterGroup.get('WorkAssignedByHeadMaster').value;
        }

        // School Exam Duty
        if (formGroup.controls.schoolExamDutyGroup != null) {
            dailyReportingModel.SchoolExamDuty = formGroup.controls.schoolExamDutyGroup.get('SchoolExamDuty').value;
        }

        // Other Work
        if (formGroup.controls.otherWorkGroup != null) {
            dailyReportingModel.OtherWork = formGroup.controls.otherWorkGroup.get('OtherWork').value;
        }

        // Holiday Type
        if (formGroup.controls.holidayGroup != null) {
            dailyReportingModel.Holiday = new VTRHolidayModel();
            dailyReportingModel.Holiday.HolidayTypeId = formGroup.controls.holidayGroup.get('HolidayTypeId').value;
            dailyReportingModel.Holiday.HolidayDetails = formGroup.controls.holidayGroup.get('HolidayDetails').value;
        }

        // Observation Day
        if (formGroup.controls.observationDayGroup != null) {

            dailyReportingModel.ObservationDetails = formGroup.controls.observationDayGroup.get('ObservationDetails').value;
            dailyReportingModel.OBStudentCount = formGroup.controls.observationDayGroup.get('OBStudentCount').value;

            // dailyReportingModel.ObservationDay = new VTRObservationDayModel();
            // dailyReportingModel.ObservationDay.ClassId = formGroup.controls.observationDayGroup.get('ClassId').value;
            // dailyReportingModel.ObservationDay.StudentId = formGroup.controls.observationDayGroup.get('StudentId').value;
            // dailyReportingModel.ObservationDay.IsPresent = formGroup.controls.observationDayGroup.get('IsPresent').value;
        }

        // Leave
        if (formGroup.controls.leaveGroup != null) {
            dailyReportingModel.Leave = new VTRLeaveModel();
            dailyReportingModel.Leave.LeaveTypeId = formGroup.controls.leaveGroup.get('LeaveTypeId').value;
            dailyReportingModel.Leave.LeaveModeId = formGroup.controls.leaveGroup.get('LeaveModeId').value;
            dailyReportingModel.Leave.LeaveApprovalStatus = formGroup.controls.leaveGroup.get('LeaveApprovalStatus').value;
            dailyReportingModel.Leave.LeaveApprover = formGroup.controls.leaveGroup.get('LeaveApprover').value;
            dailyReportingModel.Leave.LeaveReason = formGroup.controls.leaveGroup.get('LeaveReason').value;
        }

        return dailyReportingModel;
    }
}
