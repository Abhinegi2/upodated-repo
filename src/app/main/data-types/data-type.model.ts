import { FuseUtils } from '@fuse/utils';

export class DataTypeModel {
    DataTypeId: string;
    Name: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(dataTypeItem?: any) {
        dataTypeItem = dataTypeItem || {};

        this.DataTypeId = dataTypeItem.DataTypeId || '1';
        this.Name = dataTypeItem.Name || '';
        this.Description = dataTypeItem.Description || '';
        this.IsActive = dataTypeItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
