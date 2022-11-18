import { FuseUtils } from '@fuse/utils';

export class VTPSectorForAcademicYearModel {
    VTPSectorId: string;
    AcademicYearId: string;
    VTPId: string;
    SectorId: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtpSectorItem?: any) {
        vtpSectorItem = vtpSectorItem || {};

        this.VTPSectorId = vtpSectorItem.VTPSectorId || FuseUtils.NewGuid();
        this.AcademicYearId = vtpSectorItem.AcademicYearId || '';
        this.VTPId = vtpSectorItem.VTPId || '';
        this.SectorId = vtpSectorItem.SectorId || '';
        this.IsActive = vtpSectorItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
