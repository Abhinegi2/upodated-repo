import { FuseUtils } from '@fuse/utils';

export class VTStudentDetailModel {
    ExitStudentId: string;
    VTId: string;
    
    FirstName: string;
    MiddleName: string;
    LastName: string;
    AcademicYear:string;
    StudentFullName: string;
    FatherName : string;
    MotherName: string;
    StudentUniqueId: string;
    NameOfSchool: string;
    UdiseCode: number;
    District: string;
    Class: string;
    Gender: string;
    DOB: string;
    Category: string;
    Sector:string;
    JobRole:string;
    VTPId: string;
    VTPName: string;
    VTMobile: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentDetailItem?: any) {
        vtStudentDetailItem = vtStudentDetailItem || {};

        this.ExitStudentId = vtStudentDetailItem.ExitStudentId || FuseUtils.NewGuid();
        this.VTId = vtStudentDetailItem.VTId || FuseUtils.NewGuid();
        
        this.FirstName = vtStudentDetailItem.FirstName || '';
        this.MiddleName = vtStudentDetailItem.MiddleName || '';
        this.LastName = vtStudentDetailItem.LastName || '';
        this.StudentFullName = vtStudentDetailItem.StudentFullName || '';
        this.FatherName = vtStudentDetailItem.FatherName || '';
        this.MotherName = vtStudentDetailItem.MotherName || '';
        this.StudentUniqueId = vtStudentDetailItem.StudentUniqueId || '';
        this.NameOfSchool = vtStudentDetailItem.NameOfSchool || '';
        this.UdiseCode = vtStudentDetailItem.UdiseCode || '';
        this.District = vtStudentDetailItem.District || '';
        this.Class = vtStudentDetailItem.Class || '';
        this.Gender = vtStudentDetailItem.Gender || '';
        this.DOB = vtStudentDetailItem.DOB || '';
        this.Category = vtStudentDetailItem.Category || '';
        this.Sector = vtStudentDetailItem.Sector || '';
        this.JobRole = vtStudentDetailItem.JobRole || '';
        this.VTPId = vtStudentDetailItem.VTPId || '';
        this.VTPName = vtStudentDetailItem.VTPName || '';
        this.VTMobile = vtStudentDetailItem.VTMobile || '';
        
        this.IsActive = true;
        this.RequestType = 0; // New
    }
}
