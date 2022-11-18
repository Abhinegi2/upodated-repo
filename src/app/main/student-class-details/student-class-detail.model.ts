import { FuseUtils } from '@fuse/utils';

export class StudentClassDetailModel {
    StudentId: string;
    FatherName: string;
    MotherName: string;
    GuardianName: string;
    DateOfBirth: Date;
    AadhaarNumber: string;
    StudentRollNumber: string;
    SocialCategory: string;
    Religion: string;
    CWSNStatus: string;
    Mobile: string;
    Mobile1: string;
    IsActive: boolean;
    RequestType: any;

    constructor(studentClassDetailItem?: any) {
        studentClassDetailItem = studentClassDetailItem || {};

        this.StudentId = studentClassDetailItem.StudentId || '';
        this.FatherName = studentClassDetailItem.FatherName || '';
        this.MotherName = studentClassDetailItem.MotherName || '';
        this.GuardianName = studentClassDetailItem.GuardianName || '';
        this.DateOfBirth = studentClassDetailItem.DateOfBirth || '';
        this.AadhaarNumber = studentClassDetailItem.AadhaarNumber || null;
        this.StudentRollNumber = studentClassDetailItem.AlternateId || '';
        this.SocialCategory = studentClassDetailItem.SocialCategory || '';
        this.Religion = studentClassDetailItem.Religion || '';
        this.CWSNStatus = studentClassDetailItem.CWSNStatus || '';
        this.Mobile = studentClassDetailItem.Mobile || '';
        this.Mobile1 = studentClassDetailItem.Mobile1 || '';
        this.IsActive = studentClassDetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
