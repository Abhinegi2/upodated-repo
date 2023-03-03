import { FuseUtils } from '@fuse/utils';

export class VocationaltrainerdetailModel {
    VocationaltrainerdetailId: string;
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

    constructor(vocationaltrainerdetailItem?: any) {
        vocationaltrainerdetailItem = vocationaltrainerdetailItem || {};

        this.VocationaltrainerdetailId = vocationaltrainerdetailItem.VocationaltrainerdetailId || FuseUtils.NewGuid();
        this.StateCode = vocationaltrainerdetailItem.StateCode || '';
        this.DivisionId = vocationaltrainerdetailItem.DivisionId || '';
        this.DistrictCode = vocationaltrainerdetailItem.DistrictCode || '';
        this.BlockName = vocationaltrainerdetailItem.BlockName || '';
        this.Address = vocationaltrainerdetailItem.Address || '';
        this.City = vocationaltrainerdetailItem.City || '';
        this.Pincode = vocationaltrainerdetailItem.Pincode || '';
        this.BusinessType = vocationaltrainerdetailItem.BusinessType || '';
        this.EmployeeCount = vocationaltrainerdetailItem.EmployeeCount || '';
        this.Outlets = vocationaltrainerdetailItem.Outlets || '';
        this.Contact1 = vocationaltrainerdetailItem.Contact1 || '';
        this.Mobile1 = vocationaltrainerdetailItem.Mobile1 || '';
        this.Designation1 = vocationaltrainerdetailItem.Designation1 || '';
        this.EmailId1 = vocationaltrainerdetailItem.EmailId1 || '';
        this.Contact2 = vocationaltrainerdetailItem.Contact2 || '';
        this.Mobile2 = vocationaltrainerdetailItem.Mobile2 || '';
        this.Designation2 = vocationaltrainerdetailItem.Designation2 || '';
        this.EmailId2 = vocationaltrainerdetailItem.EmailId2 || '';
        this.IsActive = vocationaltrainerdetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
