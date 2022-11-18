import { FuseUtils } from '@fuse/utils';

export class SchoolCategoryModel {
    SchoolCategoryId: string;
    CategoryName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolCategoryItem?: any) {
        schoolCategoryItem = schoolCategoryItem || {};

        this.SchoolCategoryId = schoolCategoryItem.SchoolCategoryId || FuseUtils.NewGuid();
        this.CategoryName = schoolCategoryItem.CategoryName || '';
        this.Description = schoolCategoryItem.Description || '';
        this.IsActive = schoolCategoryItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
