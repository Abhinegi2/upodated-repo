import { FuseUtils } from '@fuse/utils';

export class CourseMaterialModel {
    VTPId: string;
    VCId: string;
    SchoolId: string;    
    CourseMaterialId: string;
    VTId: string;
    AcademicYearId: string;
    ClassId: string;
    ReceiptDate: Date;
    Details: string;
    CMStatus: string;
    IsActive: boolean;
    RequestType: any;

    constructor(courseMaterialItem?: any) {
        courseMaterialItem = courseMaterialItem || {};

        this.CourseMaterialId = courseMaterialItem.CourseMaterialId || FuseUtils.NewGuid();
        this.VTId = courseMaterialItem.VTId || FuseUtils.NewGuid();
        this.AcademicYearId = courseMaterialItem.AcademicYearId || '';
        this.ClassId = courseMaterialItem.ClassId || '';
        this.ReceiptDate = courseMaterialItem.ReceiptDate || '';
        this.Details = courseMaterialItem.Details || '';
        this.CMStatus = courseMaterialItem.CMStatus || '';
        this.IsActive = courseMaterialItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
