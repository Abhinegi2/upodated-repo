import { FuseUtils } from '@fuse/utils';

export class DistrictModel {
    DistrictCode: string;
    StateCode: string;
    DivisionId: string;
    DistrictName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(districtItem?: any) {
        districtItem = districtItem || {};

        this.DistrictCode = districtItem.DistrictCode || '';
        this.StateCode = districtItem.StateCode || '';
        this.DivisionId = districtItem.DivisionId || '';
        this.DistrictName = districtItem.DistrictName || '';
        this.Description = districtItem.Description || '';
        this.IsActive = districtItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
