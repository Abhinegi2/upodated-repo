import { FuseUtils } from '@fuse/utils';

export class BlockModel {
    BlockId: string;
    DivisionId: string;
    DistrictId: string;
    BlockName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(blockItem?: any) {
        blockItem = blockItem || {};

        this.BlockId = blockItem.BlockId || FuseUtils.NewGuid();
        this.DivisionId = blockItem.DivisionId || '';
        this.DistrictId = blockItem.DistrictId || '';
        this.BlockName = blockItem.BlockName || '';
        this.Description = blockItem.Description || '';
        this.IsActive = blockItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
