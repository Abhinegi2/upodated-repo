import { FuseUtils } from '@fuse/utils';

export class VTPSectorJobRoleModel {
    VTPSectorJobRoleId: string;
    VTPId: string;
    SectorId: string;
    JobRoleId: string;
    VTPSectorJobRoleName: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtpSectorJobRoleItem?: any) {
        vtpSectorJobRoleItem = vtpSectorJobRoleItem || {};

        this.VTPSectorJobRoleId = vtpSectorJobRoleItem.VTPSectorJobRoleId || FuseUtils.NewGuid();
        this.VTPId = vtpSectorJobRoleItem.VTPId || FuseUtils.NewGuid();
        this.SectorId = vtpSectorJobRoleItem.SectorId || FuseUtils.NewGuid();
        this.JobRoleId = vtpSectorJobRoleItem.JobRoleId || FuseUtils.NewGuid();
        this.VTPSectorJobRoleName = vtpSectorJobRoleItem.VTPSectorJobRoleName || '';
        this.IsActive = vtpSectorJobRoleItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
