import { FuseUtils } from '@fuse/utils';

export class GenericVTMappingModel {
    GenericVTMappingId: string;
    UserType: string;
    UserId: string;
    GVTId: string;
    DateOfAllocation: Date;
    DateOfRemoval?: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(genericvtmappingItem?: any) {
        genericvtmappingItem = genericvtmappingItem || {};

        this.GenericVTMappingId = genericvtmappingItem.GenericVTMappingId || FuseUtils.NewGuid();
        this.UserType = genericvtmappingItem.UserType || '';
        this.UserId = genericvtmappingItem.UserId || '';
        this.GVTId = genericvtmappingItem.GVTId || '';
        this.DateOfAllocation = genericvtmappingItem.DateOfAllocation || '';
        this.DateOfRemoval = genericvtmappingItem.DateOfRemoval || '';
        this.IsActive = genericvtmappingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
