export class ReportFilterModel {
    AcademicYearId: string;
    DivisionId: string;
    DistrictId: string;
    SectorId: string;
    JobRoleId: string;
    ClassId: string;
    VTPId: string;
    PageIndex: number;
    PageSize: number;
    IgnoreCriteria: boolean;

    constructor() {
        this.AcademicYearId = '';
        this.DivisionId = '';
        this.DistrictId = '';
        this.SectorId = '';
        this.JobRoleId = '';
        this.ClassId = '';
        this.VTPId = '';
        this.PageIndex = 1;
        this.PageSize = 10000;
    }
}
