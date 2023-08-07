import { FuseUtils } from '@fuse/utils';

export class VocationalCoordinatorModel {
    AcademicYear: string;
    VCId: string;
    // VTPId: string;
    // FirstName: string;
    // MiddleName: string;
    // LastName: string;
    FullName: string;
    Mobile: string;
    Mobile1: string;
    EmailId: string;
    // NatureOfAppointment: string;
    Gender: string;
    DateOfJoining: Date;
    DateOfResignation: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(vocationalCoordinatorItem?: any) {
        vocationalCoordinatorItem = vocationalCoordinatorItem || {};
        this.AcademicYear = vocationalCoordinatorItem.AcademicYear || '';
        this.VCId = vocationalCoordinatorItem.VCId || FuseUtils.NewGuid();
        // this.VTPId = vocationalCoordinatorItem.VTPId || '';
        // this.FirstName = vocationalCoordinatorItem.FirstName || '';
        // this.MiddleName = vocationalCoordinatorItem.MiddleName || '';
        // this.LastName = vocationalCoordinatorItem.LastName || '';
        this.FullName = vocationalCoordinatorItem.FullName || '';
        this.Mobile = vocationalCoordinatorItem.Mobile || '';
        this.Mobile1 = vocationalCoordinatorItem.Mobile1 || '';
        this.EmailId = vocationalCoordinatorItem.EmailId || '';
        // this.NatureOfAppointment = vocationalCoordinatorItem.NatureOfAppointment || '';
        this.Gender = vocationalCoordinatorItem.Gender || '';
        this.DateOfJoining = vocationalCoordinatorItem.DateOfJoining || '';
        this.DateOfResignation = vocationalCoordinatorItem.DateOfResignation || '';
        this.IsActive = vocationalCoordinatorItem.IsActive || true;
        this.RequestType = 0; // New
    }

    getVocationalCoordinatorTestData(): any {
        // this.AcademicYearId = '';
        this.VCId = FuseUtils.NewGuid();
        // this.VTPId = '10f9cec0-043f-40a1-9109-fbf81954d038';
        // this.FirstName = 'Ashok';
        // this.MiddleName = 'B';
        // this.LastName = 'Patil';
        // this.FullName = 'Ashok B Patil';
        this.Mobile = '9665818753';
        this.Mobile1 = '9665818754';
        this.EmailId = 'ashok.b.patil@email.com';
        // this.NatureOfAppointment = '58';
        this.Gender = '86';
        this.DateOfJoining = new Date('1991/08/16');
        this.DateOfResignation = null;
        this.IsActive = true;
        this.RequestType = 0; // New

        return this;
    }
}
