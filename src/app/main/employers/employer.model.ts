import { FuseUtils } from '@fuse/utils';

export class EmployerModel {
    EmployerId: string;
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

    constructor(employerItem?: any) {
        employerItem = employerItem || {};

        this.EmployerId = employerItem.EmployerId || FuseUtils.NewGuid();
        this.StateCode = employerItem.StateCode || '';
        this.DivisionId = employerItem.DivisionId || '';
        this.DistrictCode = employerItem.DistrictCode || '';
        this.BlockName = employerItem.BlockName || '';
        this.Address = employerItem.Address || '';
        this.City = employerItem.City || '';
        this.Pincode = employerItem.Pincode || '';
        this.BusinessType = employerItem.BusinessType || '';
        this.EmployeeCount = employerItem.EmployeeCount || '';
        this.Outlets = employerItem.Outlets || '';
        this.Contact1 = employerItem.Contact1 || '';
        this.Mobile1 = employerItem.Mobile1 || '';
        this.Designation1 = employerItem.Designation1 || '';
        this.EmailId1 = employerItem.EmailId1 || '';
        this.Contact2 = employerItem.Contact2 || '';
        this.Mobile2 = employerItem.Mobile2 || '';
        this.Designation2 = employerItem.Designation2 || '';
        this.EmailId2 = employerItem.EmailId2 || '';
        this.IsActive = employerItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
