import { FuseUtils } from '@fuse/utils';

export class VocationalcoordinatordetailModel {
    VocationalcoordinatordetailId: string;
    StateCode: string;
    DivisionId: string;
    DistrictCode: string;
    BlockName: string;
    Address: string;
    City: string;
    Pincode: string;
    BusinessType: string;
    EmployeeCount: any;
    Outlets: string;
    Contact1: string;
    Mobile1: string;
    Designation1: string;
    EmailId1: string;
    Contact2: string;
    Mobile2: string;
    Designation2: string;
    EmailId2: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vocationalcoordinatordetailItem?: any) {
        vocationalcoordinatordetailItem = vocationalcoordinatordetailItem || {};

        this.VocationalcoordinatordetailId = vocationalcoordinatordetailItem.VocationalcoordinatordetailId || FuseUtils.NewGuid();
        this.StateCode = vocationalcoordinatordetailItem.StateCode || '';
        this.DivisionId = vocationalcoordinatordetailItem.DivisionId || '';
        this.DistrictCode = vocationalcoordinatordetailItem.DistrictCode || '';
        this.BlockName = vocationalcoordinatordetailItem.BlockName || '';
        this.Address = vocationalcoordinatordetailItem.Address || '';
        this.City = vocationalcoordinatordetailItem.City || '';
        this.Pincode = vocationalcoordinatordetailItem.Pincode || '';
        this.BusinessType = vocationalcoordinatordetailItem.BusinessType || '';
        this.EmployeeCount = vocationalcoordinatordetailItem.EmployeeCount || '';
        this.Outlets = vocationalcoordinatordetailItem.Outlets || '';
        this.Contact1 = vocationalcoordinatordetailItem.Contact1 || '';
        this.Mobile1 = vocationalcoordinatordetailItem.Mobile1 || '';
        this.Designation1 = vocationalcoordinatordetailItem.Designation1 || '';
        this.EmailId1 = vocationalcoordinatordetailItem.EmailId1 || '';
        this.Contact2 = vocationalcoordinatordetailItem.Contact2 || '';
        this.Mobile2 = vocationalcoordinatordetailItem.Mobile2 || '';
        this.Designation2 = vocationalcoordinatordetailItem.Designation2 || '';
        this.EmailId2 = vocationalcoordinatordetailItem.EmailId2 || '';
        this.IsActive = vocationalcoordinatordetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
