import { FuseUtils } from '@fuse/utils';

export class VocationalcoordinatordetailModel {
    VocationalcoordinatordetailId: string;
    VCId: string;
    MiddleName: string;
    FullName: string;
    Mobile1: string;
    Gender: string;
    DateOfJoining: Date;
    DateOfResignation?: Date;
 
    IsActive: boolean;
    RequestType: any;

    constructor(vocationalcoordinatordetailItem?: any) {
        vocationalcoordinatordetailItem = vocationalcoordinatordetailItem || {};

        this.VocationalcoordinatordetailId = vocationalcoordinatordetailItem.VocationalcoordinatordetailId || FuseUtils.NewGuid();
        this.VCId = vocationalcoordinatordetailItem.VCId || '';
        this.MiddleName = vocationalcoordinatordetailItem.MiddleName || '';
        this.Mobile1 = vocationalcoordinatordetailItem.Mobile1 || '';
        this.Gender = vocationalcoordinatordetailItem.Gender || '';
        this.DateOfJoining = vocationalcoordinatordetailItem.DateOfJoining || '';
        this.DateOfResignation = vocationalcoordinatordetailItem.DateOfResignation || '';
        this.IsActive = vocationalcoordinatordetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
