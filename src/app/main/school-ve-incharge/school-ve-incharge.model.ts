import { FuseUtils } from '@fuse/utils';

export class SchoolVEInchargeModel {
    VEIId: string;
    VTPId: string;
    VCId: string;
    VTId: string;
    SchoolId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    FullName: string;
    Mobile: string;
    Mobile1: string;
    Email: string;
    Gender: string;
    DateOfJoining: Date;
    DateOfResignationFromRoleSchool: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolVEInchargeItem?: any) {
        schoolVEInchargeItem = schoolVEInchargeItem || {};

        this.VEIId = schoolVEInchargeItem.VEIId || FuseUtils.NewGuid();
        this.VTPId = schoolVEInchargeItem.VTPId || '';
        this.VCId = schoolVEInchargeItem.VCId || '';
        this.VTId = schoolVEInchargeItem.VTId || '';
        this.SchoolId = schoolVEInchargeItem.VTSchoolSectorId || '';
        this.FirstName = schoolVEInchargeItem.FirstName || '';
        this.MiddleName = schoolVEInchargeItem.MiddleName || '';
        this.LastName = schoolVEInchargeItem.LastName || '';
        this.FullName = schoolVEInchargeItem.FullName || '';
        this.Mobile = schoolVEInchargeItem.Mobile || '';
        this.Mobile1 = schoolVEInchargeItem.Mobile1 || '';
        this.Email = schoolVEInchargeItem.Email || '';
        this.Gender = schoolVEInchargeItem.Gender || '';
        this.DateOfJoining = schoolVEInchargeItem.DateOfJoining || '';
        this.DateOfResignationFromRoleSchool = schoolVEInchargeItem.DateOfResignationFromRoleSchool || '';
        this.IsActive = schoolVEInchargeItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
