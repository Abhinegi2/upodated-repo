import { FuseUtils } from '@fuse/utils';

export class VocationalcoordinatordetailModel {
    VocationalcoordinatordetailId: string;
    VCId: string;
    //VTPId: string;
    // FirstName: string;
    MiddleName: string;
    // LastName: string;
    FullName: string;
    // Mobile: string;
    Mobile1: string;
    // EmailId: string;
    // NatureOfAppointment: string;
    Gender: string;
    DateOfJoining: Date;
    DateOfResignation?: Date;
 
    IsActive: boolean;
    RequestType: any;

    constructor(vocationalcoordinatordetailItem?: any) {
        vocationalcoordinatordetailItem = vocationalcoordinatordetailItem || {};

        this.VocationalcoordinatordetailId = vocationalcoordinatordetailItem.VocationalcoordinatordetailId || FuseUtils.NewGuid();
        this.VCId = vocationalcoordinatordetailItem.VCId || '';
        // this.VTPId = vocationalcoordinatordetailItem .VTPId || '';
        // this.FirstName = vocationalcoordinatordetailItem .FirstName || '';
        this.MiddleName = vocationalcoordinatordetailItem.MiddleName || '';
        // this.LastName = vocationalcoordinatordetailItem .LastName || '';
        // this.FullName = vocationalcoordinatordetailItem .FullName || '';
        // this.Mobile = vocationalcoordinatordetailItem .Mobile || '';
        this.Mobile1 = vocationalcoordinatordetailItem.Mobile1 || '';
        // this.EmailId = vocationalcoordinatordetailItem .EmailId || '';
        // this.NatureOfAppointment = vocationalcoordinatordetailItem .NatureOfAppointment || '';
        this.Gender = vocationalcoordinatordetailItem.Gender || '';
        this.DateOfJoining = vocationalcoordinatordetailItem.DateOfJoining || '';
        this.DateOfResignation = vocationalcoordinatordetailItem.DateOfResignation || '';
        this.IsActive = vocationalcoordinatordetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
