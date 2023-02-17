import { FuseUtils } from '@fuse/utils';

export class SchoolSectorJobModel {
    SchoolSectorJobId: string;
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

    constructor(schoolsectorjobItem?: any) {
        schoolsectorjobItem = schoolsectorjobItem || {};

        this.SchoolSectorJobId = schoolsectorjobItem.SchoolSectorJobId || FuseUtils.NewGuid();
        this.StateCode = schoolsectorjobItem.StateCode || '';
        this.DivisionId = schoolsectorjobItem.DivisionId || '';
        this.DistrictCode = schoolsectorjobItem.DistrictCode || '';
        this.BlockName = schoolsectorjobItem.BlockName || '';
        this.Address = schoolsectorjobItem.Address || '';
        this.City = schoolsectorjobItem.City || '';
        this.Pincode = schoolsectorjobItem.Pincode || '';
        this.BusinessType = schoolsectorjobItem.BusinessType || '';
        this.EmployeeCount = schoolsectorjobItem.EmployeeCount || '';
        this.Outlets = schoolsectorjobItem.Outlets || '';
        this.Contact1 = schoolsectorjobItem.Contact1 || '';
        this.Mobile1 = schoolsectorjobItem.Mobile1 || '';
        this.Designation1 = schoolsectorjobItem.Designation1 || '';
        this.EmailId1 = schoolsectorjobItem.EmailId1 || '';
        this.Contact2 = schoolsectorjobItem.Contact2 || '';
        this.Mobile2 = schoolsectorjobItem.Mobile2 || '';
        this.Designation2 = schoolsectorjobItem.Designation2 || '';
        this.EmailId2 = schoolsectorjobItem.EmailId2 || '';
        this.IsActive = schoolsectorjobItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
