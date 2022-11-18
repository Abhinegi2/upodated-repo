import { FuseUtils } from '@fuse/utils';

export class SchoolClassModel {
    ClassId: string;
    Name: string;
    Description: string;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolClassItem?: any) {
        schoolClassItem = schoolClassItem || {};

        this.ClassId = schoolClassItem.ClassId || FuseUtils.NewGuid();
        this.Name = schoolClassItem.Name || '';
        this.Description = schoolClassItem.Description || '';
        this.Remarks = schoolClassItem.Remarks || '';
        this.IsActive = schoolClassItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
