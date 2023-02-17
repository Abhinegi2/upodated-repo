import { FuseUtils } from '@fuse/utils';

export class VTAcademicClassSectionModel {
    VTAcademicClassSectionId: string;
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

    constructor(vtacademicclasssectionItem?: any) {
        vtacademicclasssectionItem = vtacademicclasssectionItem || {};

        this.VTAcademicClassSectionId = vtacademicclasssectionItem.VTAcademicClassSectionId || FuseUtils.NewGuid();
        this.StateCode = vtacademicclasssectionItem.StateCode || '';
        this.DivisionId = vtacademicclasssectionItem.DivisionId || '';
        this.DistrictCode = vtacademicclasssectionItem.DistrictCode || '';
        this.BlockName = vtacademicclasssectionItem.BlockName || '';
        this.Address = vtacademicclasssectionItem.Address || '';
        this.City = vtacademicclasssectionItem.City || '';
        this.Pincode = vtacademicclasssectionItem.Pincode || '';
        this.BusinessType = vtacademicclasssectionItem.BusinessType || '';
        this.EmployeeCount = vtacademicclasssectionItem.EmployeeCount || '';
        this.Outlets = vtacademicclasssectionItem.Outlets || '';
        this.Contact1 = vtacademicclasssectionItem.Contact1 || '';
        this.Mobile1 = vtacademicclasssectionItem.Mobile1 || '';
        this.Designation1 = vtacademicclasssectionItem.Designation1 || '';
        this.EmailId1 = vtacademicclasssectionItem.EmailId1 || '';
        this.Contact2 = vtacademicclasssectionItem.Contact2 || '';
        this.Mobile2 = vtacademicclasssectionItem.Mobile2 || '';
        this.Designation2 = vtacademicclasssectionItem.Designation2 || '';
        this.EmailId2 = vtacademicclasssectionItem.EmailId2 || '';
        this.IsActive = vtacademicclasssectionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
