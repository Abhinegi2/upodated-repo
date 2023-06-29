import { FuseUtils } from '@fuse/utils';

export class GenericVTMappingModel {
    GenericVTMappingId: string;
    UserType: string;
    UserId: string;
    GVTId: string;
    DateOfAllocation: Date;
    DateOfAllocationVC: Date;
    DateOfRemoval?: Date;
    IsActive: boolean;
    RequestType: any;
    VTPId: string;
    VCId: string;
    VTId: string;

    constructor(genericvtmappingItem?: any) {
        genericvtmappingItem = genericvtmappingItem || {};

        this.GenericVTMappingId = genericvtmappingItem.GenericVTMappingId || FuseUtils.NewGuid();
        this.UserType = genericvtmappingItem.UserType || '';
        this.UserId = genericvtmappingItem.UserId || '';
        this.VTPId = genericvtmappingItem.VTPId || '';
        this.VCId = genericvtmappingItem.VCId || '';
        this.VTId = genericvtmappingItem.VTId || '';
        this.GVTId = genericvtmappingItem.GVTId || '';
        this.DateOfAllocation = genericvtmappingItem.DateOfAllocation || '';
        this.DateOfRemoval = genericvtmappingItem.DateOfRemoval || '';
        this.DateOfAllocationVC = genericvtmappingItem.DateOfAllocationVC || '';
        this.IsActive = genericvtmappingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
