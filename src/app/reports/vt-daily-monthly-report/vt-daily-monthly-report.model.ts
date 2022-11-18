import { FuseUtils } from '@fuse/utils';

export class VTDailyMonthlyModel {
    AcademicYearId: string;
    VTPId: string;
    VCId: string;
    VTId: string;
    SchoolId: string;
    DivisionId: string;
    DistrictId: string;
    SectorId: string;
    ReportDate: Date;

    constructor(vtDailyMonthlyItem?: any) {
        vtDailyMonthlyItem = vtDailyMonthlyItem || {};
        this.AcademicYearId = vtDailyMonthlyItem.AcademicYearId || '';
        this.VTPId = vtDailyMonthlyItem.VTPId || null;
        this.VCId = vtDailyMonthlyItem.VCId || '';
        this.VTId = vtDailyMonthlyItem.VTId || FuseUtils.NewGuid();
        this.VTId = vtDailyMonthlyItem.VTId || '';
        this.SchoolId = vtDailyMonthlyItem.SchoolId || '';
        this.DivisionId = vtDailyMonthlyItem.DivisionId || '';
        this.DistrictId = vtDailyMonthlyItem.DistrictId || '';
        this.SectorId = vtDailyMonthlyItem.SectorId || '';
        this.ReportDate = vtDailyMonthlyItem.ReportDate || '';
    }
}
