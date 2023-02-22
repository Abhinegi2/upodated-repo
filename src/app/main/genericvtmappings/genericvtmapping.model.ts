import { FuseUtils } from '@fuse/utils';

export class GenericVTMappingModel {
    GenericVTMappingId: string;
    VTPId: string;
    VCId: string;
    GenericVTId:String;
    IsActive: boolean;
    RequestType: any;

    constructor(genericvtmappingItem?: any) {
        genericvtmappingItem = genericvtmappingItem || {};

        this.GenericVTMappingId = genericvtmappingItem.GenericVTMappingId || FuseUtils.NewGuid();
        this.VTPId = genericvtmappingItem.VTId || '';
        this.VCId = genericvtmappingItem.VTId || '';
        this.GenericVTId = genericvtmappingItem.GenericVTId || '';
        this.IsActive = genericvtmappingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
