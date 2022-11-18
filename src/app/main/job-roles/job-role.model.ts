import { FuseUtils } from '@fuse/utils';

export class JobRoleModel {
    JobRoleId: string;
    SectorId: string;
    JobRoleName: string;
    QPCode: string;
    DisplayOrder: number;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(jobRoleItem?: any) {
        jobRoleItem = jobRoleItem || {};

        this.JobRoleId = jobRoleItem.JobRoleId || FuseUtils.NewGuid();
        this.SectorId = jobRoleItem.SectorId || FuseUtils.NewGuid();
        this.JobRoleName = jobRoleItem.JobRoleName || '';
        this.QPCode = jobRoleItem.QPCode || '';
        this.DisplayOrder = jobRoleItem.DisplayOrder || '';
        this.Remarks = jobRoleItem.Remarks || '';
        this.IsActive = jobRoleItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
