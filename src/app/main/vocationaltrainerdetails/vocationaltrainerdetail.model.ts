import { FuseUtils } from '@fuse/utils';

export class VocationaltrainerdetailModel {
    VocationaltrainerdetailId: string;
    VTId: string;
    // VCId: string;
    // VTPId: string;
    // FirstName: string;
    MiddleName: string;
    // LastName: string;
    // FullName: string;
    // Mobile: string;
    Mobile1: string;
    // Email: string;
    Gender: string;
    DateOfBirth: Date;
    SocialCategory: string;
    NatureOfAppointment: string;
    AcademicQualification: string;
    ProfessionalQualification: string;
    ProfessionalQualificationDetails: string;
    IndustryExperienceMonths: any;
    TrainingExperienceMonths: any;
    AadhaarNumber: string;
    DateOfJoining: Date;
    DateOfResignation?: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(vocationaltrainerdetailItem?: any) {
        vocationaltrainerdetailItem = vocationaltrainerdetailItem || {};

        this.VocationaltrainerdetailId = vocationaltrainerdetailItem.VocationaltrainerdetailId || FuseUtils.NewGuid();
        this.VTId = vocationaltrainerdetailItem.VTId || '';
        // this.VCId = vocationaltrainerdetailItem.VCId || '';
        // this.VTPId = vocationaltrainerdetailItem.VTPId || '';
        // this.FirstName = vocationaltrainerdetailItem.FirstName || '';
        this.MiddleName = vocationaltrainerdetailItem.MiddleName || '';
        // this.LastName = vocationaltrainerdetailItem.LastName || '';
        // this.FullName = vocationaltrainerdetailItem.FullName || '';
        // this.Mobile = vocationaltrainerdetailItem.Mobile || '';
        this.Mobile1 = vocationaltrainerdetailItem.Mobile1 || '';
        // this.Email = vocationaltrainerdetailItem.Email || '';
        this.Gender = vocationaltrainerdetailItem.Gender || '';
        this.DateOfBirth = vocationaltrainerdetailItem.DateOfBirth || '';
        this.SocialCategory = vocationaltrainerdetailItem.SocialCategory || '';
        this.NatureOfAppointment = vocationaltrainerdetailItem.NatureOfAppointment || '';
        this.AcademicQualification = vocationaltrainerdetailItem.AcademicQualification || '';
        this.ProfessionalQualification = vocationaltrainerdetailItem.ProfessionalQualification || '';
        this.ProfessionalQualificationDetails = vocationaltrainerdetailItem.ProfessionalQualificationDetails || '';
        this.IndustryExperienceMonths = vocationaltrainerdetailItem.IndustryExperienceMonths || '';
        this.TrainingExperienceMonths = vocationaltrainerdetailItem.TrainingExperienceMonths || '';
        this.AadhaarNumber = vocationaltrainerdetailItem.AadhaarNumber || '';
        this.DateOfJoining = vocationaltrainerdetailItem.DateOfJoining || '';
        this.DateOfResignation = vocationaltrainerdetailItem.DateOfResignation || '';
        this.IsActive = vocationaltrainerdetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
