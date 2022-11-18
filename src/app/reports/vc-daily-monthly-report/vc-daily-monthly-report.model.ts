import { FuseUtils } from '@fuse/utils';

export class VCDailyMonthlyModel {
  AcademicYearId: string;
  VTPId: string;
  VCId: string;
  SchoolId: string;
  DivisionId: string;
  DistrictId: string;
  SectorId: string;
  ReportDate: Date;

  constructor(vcDailyMonthlyItem?: any) {
    vcDailyMonthlyItem = vcDailyMonthlyItem || {};
    this.AcademicYearId = vcDailyMonthlyItem.AcademicYearId || '';
    this.VTPId = vcDailyMonthlyItem.VTPId || null;
    this.VCId = vcDailyMonthlyItem.VCId || FuseUtils.NewGuid();;
    this.VCId = vcDailyMonthlyItem.VTId || '';
    this.SchoolId = vcDailyMonthlyItem.SchoolId || '';
    this.DivisionId = vcDailyMonthlyItem.DivisionId || '';
    this.DistrictId = vcDailyMonthlyItem.DistrictId || '';
    this.SectorId = vcDailyMonthlyItem.SectorId || '';
    this.ReportDate = vcDailyMonthlyItem.ReportDate || '';
  }
}
