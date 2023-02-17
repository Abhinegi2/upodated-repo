import { FuseUtils } from '@fuse/utils';

export class GenericVTMappingModel {
    GenericVTMappingId: string;
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

    constructor(genericvtmappingItem?: any) {
        genericvtmappingItem = genericvtmappingItem || {};

        this.GenericVTMappingId = genericvtmappingItem.GenericVTMappingId || FuseUtils.NewGuid();
        this.StateCode = genericvtmappingItem.StateCode || '';
        this.DivisionId = genericvtmappingItem.DivisionId || '';
        this.DistrictCode = genericvtmappingItem.DistrictCode || '';
        this.BlockName = genericvtmappingItem.BlockName || '';
        this.Address = genericvtmappingItem.Address || '';
        this.City = genericvtmappingItem.City || '';
        this.Pincode = genericvtmappingItem.Pincode || '';
        this.BusinessType = genericvtmappingItem.BusinessType || '';
        this.EmployeeCount = genericvtmappingItem.EmployeeCount || '';
        this.Outlets = genericvtmappingItem.Outlets || '';
        this.Contact1 = genericvtmappingItem.Contact1 || '';
        this.Mobile1 = genericvtmappingItem.Mobile1 || '';
        this.Designation1 = genericvtmappingItem.Designation1 || '';
        this.EmailId1 = genericvtmappingItem.EmailId1 || '';
        this.Contact2 = genericvtmappingItem.Contact2 || '';
        this.Mobile2 = genericvtmappingItem.Mobile2 || '';
        this.Designation2 = genericvtmappingItem.Designation2 || '';
        this.EmailId2 = genericvtmappingItem.EmailId2 || '';
        this.IsActive = genericvtmappingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
