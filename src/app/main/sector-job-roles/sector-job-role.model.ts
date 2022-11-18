import { FuseUtils } from '@fuse/utils';

export class SectorJobRoleModel {
    SectorJobRoleId: string;
    SectorId: string;
    JobRoleId: string;
    QPCode: string;
    Remarks: string;    
    IsActive: boolean;
    RequestType: any;

    constructor(sectorJobRoleItem?: any) {
        sectorJobRoleItem = sectorJobRoleItem || {};

        this.SectorJobRoleId = sectorJobRoleItem.SectorJobRoleId || FuseUtils.NewGuid();
        this.SectorId = sectorJobRoleItem.SectorId || FuseUtils.NewGuid();
        this.JobRoleId = sectorJobRoleItem.JobRoleId || FuseUtils.NewGuid();
        this.QPCode = sectorJobRoleItem.QPCode || '';
        this.Remarks = sectorJobRoleItem.Remarks || '';
        this.IsActive = sectorJobRoleItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
