import { FuseUtils } from '@fuse/utils';

export class DataValueModel {
    DataValueId: string;
    DataTypeId: string;
    ParentId: string;
    Code: string;
    Name: string;
    Description: string;
    DisplayOrder: any;
    IsActive: boolean;
    RequestType: any;

    constructor(dataValueItem?: any) {
        dataValueItem = dataValueItem || {};

        this.DataValueId = dataValueItem.DataValueId || '1';
        this.DataTypeId = dataValueItem.DataTypeId || '';
        this.ParentId = dataValueItem.ParentId || '';
        this.Code = dataValueItem.Code || '';
        this.Name = dataValueItem.Name || '';
        this.Description = dataValueItem.Description || '';
        this.DisplayOrder = dataValueItem.DisplayOrder || '';
        this.IsActive = dataValueItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
