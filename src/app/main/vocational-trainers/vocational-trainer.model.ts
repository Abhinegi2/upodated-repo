import { FuseUtils } from '@fuse/utils';

export class VocationalTrainerModel {
    AcademicYear: string;
    VTId: string;
    VCId: string;
    VTPId: string;
 // FirstName: string;
 // MiddleName: string;
 // LastName: string;
    FullName: string;
    Mobile: string;
    Mobile1: string;
    Email: string;
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

    constructor(vocationalTrainerItem?: any) {
        vocationalTrainerItem = vocationalTrainerItem || {};

        this.AcademicYear = vocationalTrainerItem.AcademicYear || '';
        this.VTId = vocationalTrainerItem.VTId || FuseUtils.NewGuid();
        this.VCId = vocationalTrainerItem.VCId || '';
        this.VTPId = vocationalTrainerItem.VTPId || '';
     // this.FirstName = vocationalTrainerItem.FirstName || '';
     // this.MiddleName = vocationalTrainerItem.MiddleName || '';
     // this.LastName = vocationalTrainerItem.LastName || '';
        this.FullName = vocationalTrainerItem.FullName || '';
        this.Mobile = vocationalTrainerItem.Mobile || '';
        this.Mobile1 = vocationalTrainerItem.Mobile1 || '';
        this.Email = vocationalTrainerItem.Email || '';
        this.Gender = vocationalTrainerItem.Gender || '';
        this.DateOfBirth = vocationalTrainerItem.DateOfBirth || '';
        this.SocialCategory = vocationalTrainerItem.SocialCategory || '';
        this.NatureOfAppointment = vocationalTrainerItem.NatureOfAppointment || '';
        this.AcademicQualification = vocationalTrainerItem.AcademicQualification || '';
        this.ProfessionalQualification = vocationalTrainerItem.ProfessionalQualification || '';
        this.ProfessionalQualificationDetails = vocationalTrainerItem.ProfessionalQualificationDetails || '';
        this.IndustryExperienceMonths = vocationalTrainerItem.IndustryExperienceMonths || '';
        this.TrainingExperienceMonths = vocationalTrainerItem.TrainingExperienceMonths || '';
        this.AadhaarNumber = vocationalTrainerItem.AadhaarNumber || '';
        this.DateOfJoining = vocationalTrainerItem.DateOfJoining || '';
        this.DateOfResignation = vocationalTrainerItem.DateOfResignation || '';
        this.IsActive = vocationalTrainerItem.IsActive || true;
        this.RequestType = 0; // New
    }

    getVocationalTrainerTestData(): any {
        this.VTId = FuseUtils.NewGuid();
        this.VCId = '1398448d-96f8-4c0f-9c62-a51ff0579379';
        this.VTPId = '10f9cec0-043f-40a1-9109-fbf81954d038';
     // this.FirstName = 'Aarti';
     // this.MiddleName = 'Sunder';
     // this.LastName = 'Patil';
        this.FullName = 'Aarti Sunder Patil';
        this.Mobile = '9665818833';
        this.Mobile1 = '9665818834';
        this.Email = 'aarti.patil@email.com';
        this.Gender = '87';
        this.DateOfBirth = new Date('1992/05/27');
        this.SocialCategory = '54';
        this.NatureOfAppointment = '58';
        this.AcademicQualification = '62';
        this.ProfessionalQualification = '70';
        this.ProfessionalQualificationDetails = 'B.p.ed';
        this.IndustryExperienceMonths = '36';
        this.TrainingExperienceMonths = '36';
        this.AadhaarNumber = '376584619135';
        this.DateOfJoining = new Date('2022/08/15');
        this.DateOfResignation = null;
        this.IsActive = true;
        this.RequestType = 0; // New

        return this;
    }
}
