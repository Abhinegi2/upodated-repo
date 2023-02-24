import { FuseUtils } from '@fuse/utils';

export class VTAcademicClassSectionModel {
    VTAcademicClassSectionId: string;
    VTId: string;
    GVTId: string;
    AcademicYearId: string;
    ClassId: string;
    SectionId: string;
    DateOfAllocation: Date;
    DateOfRemoval?: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(vtacademicclasssectionItem?: any) {
        vtacademicclasssectionItem = vtacademicclasssectionItem || {};

        this.VTAcademicClassSectionId = vtacademicclasssectionItem.VTAcademicClassSectionId || FuseUtils.NewGuid();
        this.AcademicYearId = vtacademicclasssectionItem.AcademicYearId || '';
        this.ClassId = vtacademicclasssectionItem.ClassId || '';
        this.SectionId = vtacademicclasssectionItem.SectionId || '';
        this.VTId = vtacademicclasssectionItem.VTId || '';
        this.GVTId = vtacademicclasssectionItem.GVTId || '';
        this.DateOfAllocation = vtacademicclasssectionItem.DateOfAllocation || '';
        this.DateOfRemoval = vtacademicclasssectionItem.DateOfRemoval || '';
        this.IsActive = vtacademicclasssectionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
