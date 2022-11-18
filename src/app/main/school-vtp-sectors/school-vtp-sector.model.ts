import { FuseUtils } from '@fuse/utils';

export class SchoolVTPSectorModel {
    SchoolVTPSectorId: string;
    AcademicYearId: string;
    VTPId: string;
    SectorId: string;
    SchoolId: string;
    Remarks: string;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolVTPSectorItem?: any) {
        schoolVTPSectorItem = schoolVTPSectorItem || {};

        this.SchoolVTPSectorId = schoolVTPSectorItem.SchoolVTPSectorId || FuseUtils.NewGuid();
        this.AcademicYearId = schoolVTPSectorItem.AcademicYearId || '';
        this.VTPId = schoolVTPSectorItem.VTPId || '';
        this.SectorId = schoolVTPSectorItem.SectorId || '';
        this.SchoolId = schoolVTPSectorItem.SchoolId || '';
        this.Remarks = schoolVTPSectorItem.Remarks || '';
        this.IsActive = schoolVTPSectorItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
