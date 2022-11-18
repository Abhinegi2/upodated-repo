import { FuseUtils } from '@fuse/utils';

export class ClusterModel {
    ClusterId: string;
    DivisionId: string;
    DistrictId: string;
    BlockId: string;
    ClusterName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(clusterItem?: any) {
        clusterItem = clusterItem || {};

        this.ClusterId = clusterItem.ClusterId || FuseUtils.NewGuid();
        this.DivisionId = clusterItem.DivisionId || '';
        this.DistrictId = clusterItem.DistrictId || '';
        this.BlockId = clusterItem.BlockId || '';
        this.ClusterName = clusterItem.ClusterName || '';
        this.Description = clusterItem.Description || '';
        this.IsActive = clusterItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
