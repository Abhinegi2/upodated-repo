import { FuseUtils } from '@fuse/utils';

export class HeadMasterModel {
    AcademicYearId: string;
    HMId: string;
    AcademicYear: string;
    SchoolId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    FullName: string;
    Mobile: string;
    Mobile1: string;
    Email: string;
    Gender: string;
    YearsInSchool: number;
    DateOfJoining: Date;
    DateOfResignation: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(headMasterItem?: any) {
        headMasterItem = headMasterItem || {};

        this.AcademicYear = ''
        this.HMId = headMasterItem.HMId || FuseUtils.NewGuid();
        this.SchoolId = headMasterItem.VTSchoolSectorId || '';
        this.FirstName = headMasterItem.FirstName || '';
        this.MiddleName = headMasterItem.MiddleName || '';
        this.LastName = headMasterItem.LastName || '';
        this.FullName = headMasterItem.FullName || '';
        this.Mobile = headMasterItem.Mobile || '';
        this.Mobile1 = headMasterItem.Mobile1 || '';
        this.Email = headMasterItem.Email || '';
        this.Gender = headMasterItem.Gender || '';
        this.YearsInSchool = headMasterItem.YearsInSchool || '';
        this.DateOfJoining = headMasterItem.DateOfJoining || '';
        this.DateOfResignation = headMasterItem.DateOfResignation || '';
        this.IsActive = headMasterItem.IsActive || true;
        this.RequestType = 0; // New
    }

    getHeadMasterTestData(): any {
        this.AcademicYearId = '';
        this.HMId = FuseUtils.NewGuid();
        this.FirstName = 'Aakash';
        this.MiddleName = 'D';
        this.LastName = 'Sharma';
        this.FullName = 'Aakash D Sharma';
        this.Mobile = '9665823753';
        this.Mobile1 = '9665238754';
        this.Email = 'ashok.b.patil@email.com';
        this.Gender = '86';
        this.DateOfJoining = new Date('2008/09/23');
        this.DateOfResignation = null;
        this.IsActive = true;
        this.RequestType = 0; // New

        return this;
    }
}
