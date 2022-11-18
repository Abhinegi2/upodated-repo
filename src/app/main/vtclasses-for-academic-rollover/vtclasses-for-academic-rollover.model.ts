import { FuseUtils } from '@fuse/utils';

export class VTClassForAcademicRolloverModel {
    // VTClassId: string;
    // AcademicYearId: string;
    // VTId: string;
    // ClassId: string;
    // SectionIds: string;
    // IsActive: boolean;
    // RequestType: any;
    Id: number;
    DataTypeId: string;
    UserId: string;

    constructor(vtClassForAcademicRolloverItem?: any) {
        vtClassForAcademicRolloverItem = vtClassForAcademicRolloverItem || {};

        //this.VTClassId = vtClassForAcademicRolloverItem.VTClassId || FuseUtils.NewGuid();
        // this.AcademicYearId = vtClassItem.AcademicYearId || '';
        // this.VTId = vtClassItem.VTId || '';
        // this.ClassId = vtClassItem.ClassId || '';
        // this.SectionIds = vtClassItem.SectionIds || '';
        // this.IsActive = vtClassItem.IsActive || true;
        // this.RequestType = 0; // New
        this.Id = vtClassForAcademicRolloverItem.Id || 0;
        this.DataTypeId = vtClassForAcademicRolloverItem.DataTypeId || '';
        this.UserId = vtClassForAcademicRolloverItem.UserId || '';
    }
}
