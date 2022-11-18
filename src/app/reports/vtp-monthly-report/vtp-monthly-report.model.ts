import { FuseUtils } from '@fuse/utils';

export class VTPMonthlyModel {
    AcademicYearId: string;
    VTPId: string;
    VCId: string;
    VTId: string;
    SchoolId: string;
    DivisionId: string;
    DistrictId: string;
    SectorId: string;
    ReportDate: Date;

    constructor(vtpMonthlyItem?: any) {
        vtpMonthlyItem = vtpMonthlyItem || {};
        this.AcademicYearId = vtpMonthlyItem.AcademicYearId || '';
        this.VTPId = vtpMonthlyItem.VTPId || null;
        this.VCId = vtpMonthlyItem.VCId || '';
        this.VTId = vtpMonthlyItem.VTId || FuseUtils.NewGuid();
        this.VTId = vtpMonthlyItem.VTId || '';
        this.SchoolId = vtpMonthlyItem.SchoolId || '';
        this.DivisionId = vtpMonthlyItem.DivisionId || '';
        this.DistrictId = vtpMonthlyItem.DistrictId || '';
        this.SectorId = vtpMonthlyItem.SectorId || '';
        this.ReportDate = vtpMonthlyItem.ReportDate || '';
    }
}
