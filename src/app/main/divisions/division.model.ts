import { FuseUtils } from '@fuse/utils';

export class DivisionModel {
    DivisionId: string;
    DivisionName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(divisionItem?: any) {
        divisionItem = divisionItem || {};

        this.DivisionId = divisionItem.DivisionId || FuseUtils.NewGuid();
        this.DivisionName = divisionItem.DivisionName || '';
        this.Description = divisionItem.Description || '';
        this.IsActive = divisionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
