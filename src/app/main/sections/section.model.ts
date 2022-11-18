import { FuseUtils } from '@fuse/utils';

export class SectionModel {
    SectionId: string;
    Name: string;
    Description: string;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(sectionItem?: any) {
        sectionItem = sectionItem || {};

        this.SectionId = sectionItem.SectionId || FuseUtils.NewGuid();
        this.Name = sectionItem.Name || '';
        this.Description = sectionItem.Description || '';
        this.Remarks = sectionItem.Remarks || '';
        this.IsActive = sectionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
