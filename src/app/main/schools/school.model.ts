import { FuseUtils } from '@fuse/utils';

export class SchoolModel {
    SchoolId: string;
    SchoolName: string;
    SchoolCategoryId: string;
    SchoolTypeId: string;
    SchoolManagementId: string;
    Udise: string;
    AcademicYearId: string;
    PhaseId: string;
    StateName: string;
    DivisionId: string;
    DistrictCode: string;
    BlockName: string;
    BlockId: string;
    ClusterId: string;
    Village: string;
    Panchayat: string;
    Pincode: string;
    Demography: string;
    IsImplemented: boolean;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolItem?: any) {
        schoolItem = schoolItem || {};

        this.SchoolId = schoolItem.SchoolId || FuseUtils.NewGuid();
        this.SchoolName = schoolItem.SchoolName || '';
        this.SchoolCategoryId = schoolItem.SchoolCategoryId || '';
        this.SchoolTypeId = schoolItem.SchoolTypeId || '';
        this.SchoolManagementId = schoolItem.SchoolManagementId || '';
        this.Udise = schoolItem.Udise || '';
        this.AcademicYearId = schoolItem.AcademicYearId || '';
        this.PhaseId = schoolItem.PhaseId || '';
        this.StateName = schoolItem.StateName || '';
        this.DivisionId = schoolItem.DivisionId || '';
        this.DistrictCode = schoolItem.DistrictCode || '';
        this.BlockName = schoolItem.BlockName || '';
        this.BlockId = schoolItem.BlockId || '';
        this.ClusterId = schoolItem.ClusterId || '';
        this.Village = schoolItem.Village || '';
        this.Panchayat = schoolItem.Panchayat || '';
        this.Pincode = schoolItem.Pincode || '';
        this.Demography = schoolItem.Demography || '';
        this.IsImplemented = schoolItem.IsImplemented || true
        this.IsActive = schoolItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
