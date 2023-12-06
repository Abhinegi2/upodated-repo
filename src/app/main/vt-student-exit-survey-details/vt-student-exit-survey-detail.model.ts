import { FuseUtils } from '@fuse/utils';
import { VTStudentDetailModel } from './vt-student-detail.model';

export class VTStudentExitSurveyDetailModel {
    VTStudentDetail: VTStudentDetailModel;

    // Academic Information
    ExitStudentId: string;
    AcademicYear: string;
    StudentUniqueId: string;
    SeatNo: string;
    State: string;
    Division: string;
    District: string
    NameOfSchool: string;
    UdiseCode: string;
    Class: string;
    Sector: string;
    JobRole: string;
    VTPName: string;
    VCName: string;
    VTName: string;
    VTMobile: string;

    // Personal Information
    StudentFirstName: string;
    StudentMiddleName: string;
    StudentLastName: string;
    StudentFullName: string;
    Gender: string;
    DOB: string;
    FatherName: string;
    MotherName: string;
    Category: string;
    Religion: string;
    StudentMobileNo: string;
    StudentWhatsAppNo: string;
    ParentMobileNo: string;

    // Residential Information
    CityOfResidence: String;
    DistrictOfResidence: string;
    BlockOfResidence: string;
    PinCode: string;
    StudentAddress: string;

    // Education post 10th
    WillContHigherStudies: string;
    IsFullTime: string;
    CourseToPursue: string;
    StreamOfEducation: string;
    WillContVocEdu: string;
    WillContVocational11: string;
    ReasonsNOTToContinue: string;
    WillContSameSector: string;
    SectorTrade: string;
    OtherSector: string;

    // Employment Details
    CurrentlyEmployed: string;
    WorkTitle: string;
    DetailsOfEmployment: string;
    WillBeFullTime: string;
    SectorsOfEmployment: string;
    IsVSCompleted: string;

    // Support
    WantToPursueAnySkillTraining: string;
    IsFulltimeWillingness: string;
    HveRegisteredOnEmploymentPortal: string;
    EmploymentPortalName: string;
    WillingToGetRegisteredOnNAPS: string;
    WantToKnowAboutOpportunities: string;
    CanLahiGetInTouch: string;

    // Status & Remarks
    CollectedEmailId: string;
    SurveyCompletedByStudentORParent: string;
    DateOfIntv: Date;
    Remark: string;

    // Class 12
    DoneInternship: string;
    InternshipCompletedSector: string;
    ContinueEductionPost12th: string;
    IntrestedInJobOrSelfEmploymentPost12th: string;
    PreferredLocations: string;
    ParticularLocation: string;
    DifferentProgramOpportunities: string;
    OtherStreamStudying: string;

    VTStudentExitSurveyDetailId: string;
    VTId: string;
    AcademicYearId: string;
    TrainingType: string;
    IsRelevantToVocCourse: number;
    OtherCourse: string;
    WillingToContSkillTraining: string;
    SkillTrainingType: string;
    CourseForTraining: string;
    CourseNameIfOther: string;
    SectorForTraining: string;
    OtherSectorsIfAny: string;
    SectorForSkillTraining: string;
    OthersIfAny: string;
    WillingToGoForTechHighEdu: string;
    WantToKnowAbtSkillsUnivByGvt: string;
    WantToKnowAbtPgmsForJobsNContEdu: string;
    InterestedInJobOrSelfEmployment: number;
    TopicsOfInterest: any;
    CanSendTheUpdates: number;
    IsAssessmentRequired: boolean;
    AssessmentConducted: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentExitSurveyDetailItem?: any) {
        vtStudentExitSurveyDetailItem = vtStudentExitSurveyDetailItem || {};

        // Academic Information
        this.ExitStudentId = vtStudentExitSurveyDetailItem.ExitStudentId || FuseUtils.NewGuid();
        this.AcademicYear = vtStudentExitSurveyDetailItem.AcademicYear || null;
        this.StudentUniqueId = vtStudentExitSurveyDetailItem.StudentUniqueId || null;
        this.SeatNo = vtStudentExitSurveyDetailItem.SeatNo || null;
        this.State = vtStudentExitSurveyDetailItem.State || null;
        this.Division = vtStudentExitSurveyDetailItem.Division || null;
        this.District = vtStudentExitSurveyDetailItem.District || null;
        this.NameOfSchool = vtStudentExitSurveyDetailItem.NameOfSchool || null;
        this.UdiseCode = vtStudentExitSurveyDetailItem.UdiseCode || null;
        this.Class = vtStudentExitSurveyDetailItem.Class || null;
        this.Sector = vtStudentExitSurveyDetailItem.Sector || null;
        this.JobRole = vtStudentExitSurveyDetailItem.JobRole || null;
        this.VTPName = vtStudentExitSurveyDetailItem.VTPName || null;
        this.VCName = vtStudentExitSurveyDetailItem.VCName || null;
        this.VTName = vtStudentExitSurveyDetailItem.VTName || null;
        this.VTMobile = vtStudentExitSurveyDetailItem.VTMobile || null;

        // Personal Information
        this.StudentFirstName = vtStudentExitSurveyDetailItem.StudentFirstName || null;
        this.StudentMiddleName = vtStudentExitSurveyDetailItem.StudentMiddleName || null;
        this.StudentLastName = vtStudentExitSurveyDetailItem.StudentLastName || null;
        this.StudentFullName = vtStudentExitSurveyDetailItem.StudentFullName || null;
        this.Gender = vtStudentExitSurveyDetailItem.Gender || null;
        this.DOB = vtStudentExitSurveyDetailItem.DOB || null;
        this.FatherName = vtStudentExitSurveyDetailItem.FatherName || null;
        this.MotherName = vtStudentExitSurveyDetailItem.MotherName || null;
        this.Category = vtStudentExitSurveyDetailItem.Category || null;
        this.Religion = vtStudentExitSurveyDetailItem.Religion || null;
        this.StudentMobileNo = vtStudentExitSurveyDetailItem.StudentMobileNo || null;
        this.ParentMobileNo = vtStudentExitSurveyDetailItem.ParentMobileNo || null;
        this.StudentWhatsAppNo = vtStudentExitSurveyDetailItem.StudentWhatsAppNo || null;

        // Residential Information
        this.CityOfResidence = vtStudentExitSurveyDetailItem.CityOfResidence || null;
        this.DistrictOfResidence = vtStudentExitSurveyDetailItem.DistrictOfResidence || null;
        this.BlockOfResidence = vtStudentExitSurveyDetailItem.BlockOfResidence || null;
        this.PinCode = vtStudentExitSurveyDetailItem.PinCode || null;
        this.StudentAddress = vtStudentExitSurveyDetailItem.StudentAddress || null;

        // Education post 10th
        this.WillContHigherStudies = vtStudentExitSurveyDetailItem.WillContHigherStudies || null;
        this.IsFullTime = vtStudentExitSurveyDetailItem.IsFullTime || null;
        this.CourseToPursue = vtStudentExitSurveyDetailItem.CourseToPursue || null;
        this.StreamOfEducation = vtStudentExitSurveyDetailItem.StreamOfEducation || null;
        this.WillContVocEdu = vtStudentExitSurveyDetailItem.WillContVocEdu || null;
        this.WillContVocational11 = vtStudentExitSurveyDetailItem.WillContVocational11 || null;
        this.ReasonsNOTToContinue = vtStudentExitSurveyDetailItem.ReasonsNOTToContinue || null;
        this.WillContSameSector = vtStudentExitSurveyDetailItem.WillContSameSector || null;
        this.SectorForTraining = vtStudentExitSurveyDetailItem.SectorForTraining || null;
        this.OtherSector = vtStudentExitSurveyDetailItem.OtherSector || null;

        // Employment Details
        this.CurrentlyEmployed = vtStudentExitSurveyDetailItem.CurrentlyEmployed || null;
        this.WorkTitle = vtStudentExitSurveyDetailItem.WorkTitle || null;
        this.DetailsOfEmployment = vtStudentExitSurveyDetailItem.DetailsOfEmployment || null;
        this.WillBeFullTime = vtStudentExitSurveyDetailItem.WillBeFullTime || null;
        this.SectorsOfEmployment = vtStudentExitSurveyDetailItem.SectorsOfEmployment || null;
        this.IsVSCompleted = vtStudentExitSurveyDetailItem.IsVSCompleted || null;

        // Support
        this.WantToPursueAnySkillTraining = vtStudentExitSurveyDetailItem.WantToPursueAnySkillTraining || null;
        this.IsFulltimeWillingness = vtStudentExitSurveyDetailItem.IsFulltimeWillingness || null;
        this.HveRegisteredOnEmploymentPortal = vtStudentExitSurveyDetailItem.HveRegisteredOnEmploymentPortal || null;
        this.EmploymentPortalName = vtStudentExitSurveyDetailItem.EmploymentPortalName || null;
        this.WillingToGetRegisteredOnNAPS = vtStudentExitSurveyDetailItem.WillingToGetRegisteredOnNAPS || null;
        this.WantToKnowAboutOpportunities = vtStudentExitSurveyDetailItem.WantToKnowAboutOpportunities || null;
        this.CanLahiGetInTouch = vtStudentExitSurveyDetailItem.CanLahiGetInTouch || null;
        this.WantToKnowAbtPgmsForJobsNContEdu = vtStudentExitSurveyDetailItem.WantToKnowAbtPgmsForJobsNContEdu || null;

        // Status & Remarks
        this.CollectedEmailId = vtStudentExitSurveyDetailItem.CollectedEmailId || null;
        this.SurveyCompletedByStudentORParent = vtStudentExitSurveyDetailItem.SurveyCompletedByStudentORParent || null;
        this.DateOfIntv = vtStudentExitSurveyDetailItem.DateOfIntv || null;
        this.Remark = vtStudentExitSurveyDetailItem.Remark || null;

        // Class 12 
        this.DoneInternship = vtStudentExitSurveyDetailItem.DoneInternship || null;
        this.InternshipCompletedSector = vtStudentExitSurveyDetailItem.InternshipCompletedSector || null;
        this.ContinueEductionPost12th = vtStudentExitSurveyDetailItem.ContinueEductionPost12th || null;
        this.IntrestedInJobOrSelfEmploymentPost12th = vtStudentExitSurveyDetailItem.IntrestedInJobOrSelfEmploymentPost12th || null;
        this.PreferredLocations = vtStudentExitSurveyDetailItem.PreferredLocations || null;
        this.ParticularLocation = vtStudentExitSurveyDetailItem.ParticularLocation || null;
        this.OtherStreamStudying = vtStudentExitSurveyDetailItem.OtherStreamStudying || null;

        this.VTStudentExitSurveyDetailId = vtStudentExitSurveyDetailItem.VTStudentExitSurveyDetailId || FuseUtils.NewGuid();
        this.VTId = vtStudentExitSurveyDetailItem.VTId || FuseUtils.NewGuid();
        this.TrainingType = vtStudentExitSurveyDetailItem.TrainingType || null;
        this.WillingToContSkillTraining = vtStudentExitSurveyDetailItem.WillingToContSkillTraining || null;
        this.IsRelevantToVocCourse = vtStudentExitSurveyDetailItem.IsRelevantToVocCourse || null;
        this.OtherCourse = vtStudentExitSurveyDetailItem.OtherCourse || null;
        this.SkillTrainingType = vtStudentExitSurveyDetailItem.SkillTrainingType || null;
        this.CourseForTraining = vtStudentExitSurveyDetailItem.CourseForTraining || null;
        this.CourseNameIfOther = vtStudentExitSurveyDetailItem.CourseNameIfOther || null;
        this.OtherSectorsIfAny = vtStudentExitSurveyDetailItem.OtherSectorsIfAny || null;
        this.SectorForSkillTraining = vtStudentExitSurveyDetailItem.SectorForSkillTraining || null;
        this.OthersIfAny = vtStudentExitSurveyDetailItem.OthersIfAny || null;
        this.InterestedInJobOrSelfEmployment = vtStudentExitSurveyDetailItem.InterestedInJobOrSelfEmployment || null;
        this.TopicsOfInterest = vtStudentExitSurveyDetailItem.TopicsOfInterest || null;
        this.WillingToGoForTechHighEdu = vtStudentExitSurveyDetailItem.WillingToGoForTechHighEdu || null;
        this.WantToKnowAbtSkillsUnivByGvt = vtStudentExitSurveyDetailItem.WantToKnowAbtSkillsUnivByGvt || null;
        this.CanSendTheUpdates = vtStudentExitSurveyDetailItem.CanSendTheUpdates || null;
        this.SectorTrade = vtStudentExitSurveyDetailItem.SectorTrade || null;
        this.IsAssessmentRequired = vtStudentExitSurveyDetailItem.IsAssessmentRequired || false;
        this.AssessmentConducted = vtStudentExitSurveyDetailItem.AssessmentConducted || null;
        this.IsActive = vtStudentExitSurveyDetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
