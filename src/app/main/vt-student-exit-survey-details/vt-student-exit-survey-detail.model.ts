import { FuseUtils } from '@fuse/utils';
import { VTStudentDetailModel } from './vt-student-detail.model';

export class VTStudentExitSurveyDetailModel {
    VTStudentDetail: VTStudentDetailModel;
    VTStudentExitSurveyDetailId: string;
    VTId: string;
    ExitStudentId: string;
    SeatNo: string;
    DateOfIntv: Date;
    CityOfResidence: String;
    DistrictOfResidence: string;
    BlockOfResidence: string;
    PinCode: string;
    Religion:string;
    StudentMobileNo: Number;
    StudentWANo: Number;
    ParentMobileNo: Number;    
    DoneInternship: number;
    //CurrentlyEmployed: number;

    DetailsOfEmployment: string;
    IsFullTime: string;
    SectorsOfEmployment: string;
    IsRelevantToVocCourse: number;
    WillContHigherStudies: string;
    WillBeFullTime: string;
    CourseToPursue: string;
    OtherCourse: string;
    StreamOfEducation: string;
    WillingToContSkillTraining: string;
    SkillTrainingType: string;
    CourseForTraining: string;
    CourseNameIfOther: string;
    SectorForTraining: string;
    OtherSectorsIfAny: string;

    WantToPursueAnySkillTraining: string;
    TrainingType: string;
    SectorForSkillTraining: string;
    OthersIfAny: string;
    WillingToGoForTechHighEdu: string;
    WantToKnowAbtSkillsUnivByGvt: string;

    WantToKnowAbtPgmsForJobsNContEdu: string;
    InterestedInJobOrSelfEmployment: number;
    TopicsOfInterest: any;
    CanSendTheUpdates: number;
    WantToKnowAboutOpportunities: number;
    CanLahiGetInTouch: number;
    CollectedEmailId: string;
    SurveyCompletedByStudentORParent: string;
    Remark: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentExitSurveyDetailItem?: any) {
        vtStudentExitSurveyDetailItem = vtStudentExitSurveyDetailItem || {};

        this.VTStudentExitSurveyDetailId = vtStudentExitSurveyDetailItem.VTStudentExitSurveyDetailId || FuseUtils.NewGuid();
        this.VTId = vtStudentExitSurveyDetailItem.VTId || FuseUtils.NewGuid();
        this.ExitStudentId = vtStudentExitSurveyDetailItem.ExitStudentId || FuseUtils.NewGuid();
        this.SeatNo = vtStudentExitSurveyDetailItem.SeatNo || '';
        this.DateOfIntv = vtStudentExitSurveyDetailItem.DateOfIntv || '';
        this.CityOfResidence = vtStudentExitSurveyDetailItem.CityOfResidence || '';
        this.DistrictOfResidence = vtStudentExitSurveyDetailItem.DistrictOfResidence || '';
        this.BlockOfResidence = vtStudentExitSurveyDetailItem.BlockOfResidence || '';
        this.PinCode = vtStudentExitSurveyDetailItem.PinCode || '';
        this.StudentMobileNo = vtStudentExitSurveyDetailItem.StudentMobileNo || '';
        this.ParentMobileNo = vtStudentExitSurveyDetailItem.ParentMobileNo || '';        
        this.StudentWANo = vtStudentExitSurveyDetailItem.StudentWANo || '';
        this.DoneInternship = vtStudentExitSurveyDetailItem.DoneInternship || '';
        this.WillingToContSkillTraining = vtStudentExitSurveyDetailItem.WillingToContSkillTraining || '';
        this.DetailsOfEmployment = vtStudentExitSurveyDetailItem.DetailsOfEmployment || '';
        this.IsFullTime = vtStudentExitSurveyDetailItem.IsFullTime || '';
        this.SectorsOfEmployment = vtStudentExitSurveyDetailItem.SectorsOfEmployment || '';
        this.IsRelevantToVocCourse = vtStudentExitSurveyDetailItem.IsRelevantToVocCourse || '';
        this.WillContHigherStudies = vtStudentExitSurveyDetailItem.WillContHigherStudies || '';
        this.WillBeFullTime = vtStudentExitSurveyDetailItem.WillBeFullTime || '';
        this.CourseToPursue = vtStudentExitSurveyDetailItem.CourseToPursue || '';
        this.OtherCourse = vtStudentExitSurveyDetailItem.OtherCourse || '';
        this.StreamOfEducation = vtStudentExitSurveyDetailItem.StreamOfEducation || '';
        this.SkillTrainingType = vtStudentExitSurveyDetailItem.SkillTrainingType || '';
        this.CourseForTraining = vtStudentExitSurveyDetailItem.CourseForTraining || '';
        this.CourseNameIfOther = vtStudentExitSurveyDetailItem.CourseNameIfOther || '';
        this.SectorForTraining = vtStudentExitSurveyDetailItem.SectorForTraining || '';
        this.OtherSectorsIfAny = vtStudentExitSurveyDetailItem.OtherSectorsIfAny || '';
        this.WantToPursueAnySkillTraining = vtStudentExitSurveyDetailItem.WantToPursueAnySkillTraining || '';
        this.TrainingType = vtStudentExitSurveyDetailItem.TrainingType || '';
        this.SectorForSkillTraining = vtStudentExitSurveyDetailItem.SectorForSkillTraining || '';
        this.OthersIfAny = vtStudentExitSurveyDetailItem.OthersIfAny || '';
        this.InterestedInJobOrSelfEmployment = vtStudentExitSurveyDetailItem.InterestedInJobOrSelfEmployment || '';
        this.TopicsOfInterest = vtStudentExitSurveyDetailItem.TopicsOfInterest || '';
        this.WillingToGoForTechHighEdu = vtStudentExitSurveyDetailItem.WillingToGoForTechHighEdu || '';
        this.WantToKnowAbtSkillsUnivByGvt = vtStudentExitSurveyDetailItem.WantToKnowAbtSkillsUnivByGvt || null;
        this.CanSendTheUpdates = vtStudentExitSurveyDetailItem.CanSendTheUpdates || '';
        this.WantToKnowAboutOpportunities = vtStudentExitSurveyDetailItem.WantToKnowAboutOpportunities || '';
        this.CanLahiGetInTouch = vtStudentExitSurveyDetailItem.CanLahiGetInTouch || '';
        this.CollectedEmailId = vtStudentExitSurveyDetailItem.CollectedEmailId || '';
        this.SurveyCompletedByStudentORParent = vtStudentExitSurveyDetailItem.SurveyCompletedByStudentORParent || '';
        this.Remark = vtStudentExitSurveyDetailItem.Remark || '';
        this.IsActive = vtStudentExitSurveyDetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
