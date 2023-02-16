import { FuseUtils } from '@fuse/utils';

export class SchoolSectorJobModel {
    SchoolSectorJobId: string;
    AcademicYearId: string;
    VTPId: string;
    VCId: string;
    SchoolId: string;    
    VTId: string;
    ClassId: string;
    SectionIds: string;
    IsActive: boolean;
    RequestType: any;
   

    constructor(schoolSectorJobItem?: any) {
        schoolSectorJobItem = schoolSectorJobItem || {};

        this.SchoolSectorJobId = schoolSectorJobItem.SchoolSectorJobId || FuseUtils.NewGuid();
        this.AcademicYearId = schoolSectorJobItem.AcademicYearId || '';
        this.VTPId = schoolSectorJobItem.VTPId || null;
        this.VCId = schoolSectorJobItem.VCId || null;
        this.SchoolId = schoolSectorJobItem.SchoolId || FuseUtils.NewGuid();
        this.VTId = schoolSectorJobItem.VTId || '';
        this.VTPId = schoolSectorJobItem.VTId || '';
        this.VCId = schoolSectorJobItem.VTId || '';
        this.ClassId = schoolSectorJobItem.ClassId || '';
        this.SchoolId = schoolSectorJobItem.SchoolId || '';
        this.SectionIds = schoolSectorJobItem.SectionIds || '';
        this.IsActive = schoolSectorJobItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
