import { FuseUtils } from '@fuse/utils';

export class CourseMaterialModel {
    // VTPId: string;
    // VCId: string;
    CourseMaterialId: string;
    SchoolId: string;
    SectorId: string;
    JobRoleId: string;
    SSJId: string;
    // VTId: string;
    AcademicYearId: string;
    ClassId: string;
    SectionIds: string;

    ReceiptDate: Date;
    Details: string;
    CMStatus: string;
    IsActive: boolean;
    RequestType: any;

    constructor(courseMaterialItem?: any) {
        courseMaterialItem = courseMaterialItem || {};

        this.CourseMaterialId = courseMaterialItem.CourseMaterialId || FuseUtils.NewGuid();
        // this.VTId = courseMaterialItem.VTId || FuseUtils.NewGuid();
        this.SSJId = courseMaterialItem.SSJId || '';
        this.AcademicYearId = courseMaterialItem.AcademicYearId || '';
        this.ClassId = courseMaterialItem.ClassId || '';
        this.SectionIds = courseMaterialItem.SectionIds || '';
        this.ReceiptDate = courseMaterialItem.ReceiptDate || '';
        this.Details = courseMaterialItem.Details || '';
        this.CMStatus = courseMaterialItem.CMStatus || '';
        this.IsActive = courseMaterialItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
