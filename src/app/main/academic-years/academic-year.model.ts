import { FuseUtils } from '@fuse/utils';

export class AcademicYearModel {
    AcademicYearId: string;
    PhaseId: string;
    YearName: string;
    Description: string;
    IsCurrentAcademicYear: boolean;
    IsActive: boolean;
    RequestType: any;

    constructor(academicYearItem?: any) {
        academicYearItem = academicYearItem || {};

        this.AcademicYearId = academicYearItem.AcademicYearId || FuseUtils.NewGuid();
        this.PhaseId = academicYearItem.PhaseId || '';
        this.YearName = academicYearItem.YearName || '';
        this.Description = academicYearItem.Description || '';
        this.IsCurrentAcademicYear = academicYearItem.IsCurrentAcademicYear || false;
        this.IsActive = academicYearItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
