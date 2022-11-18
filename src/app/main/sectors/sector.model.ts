import { FuseUtils } from '@fuse/utils';

export class SectorModel {
    SectorId: string;
    SectorName: string;
    Description: string;
    DisplayOrder: number;
    IsActive: boolean;
    RequestType: any;

    constructor(sectorItem?: any) {
        sectorItem = sectorItem || {};

        this.SectorId = sectorItem.SectorId || FuseUtils.NewGuid();
        this.SectorName = sectorItem.SectorName || '';
        this.Description = sectorItem.Description || '';
        this.DisplayOrder = sectorItem.DisplayOrder || '';
        this.IsActive = sectorItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
