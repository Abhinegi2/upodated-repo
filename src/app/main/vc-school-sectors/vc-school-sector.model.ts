import { FuseUtils } from '@fuse/utils';

export class VCSchoolSectorModel {
    VCSchoolSectorId: string;
    AcademicYearId: string;
    VCId: string;
    SchoolVTPSectorId: string;
    DateOfAllocation: Date;
    DateOfRemoval: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(vcSchoolSectorItem?: any) {
        vcSchoolSectorItem = vcSchoolSectorItem || {};

        this.VCSchoolSectorId = vcSchoolSectorItem.VCSchoolSectorId || FuseUtils.NewGuid();
        this.AcademicYearId = vcSchoolSectorItem.AcademicYearId || '';
        this.VCId = vcSchoolSectorItem.VCId || '';
        this.SchoolVTPSectorId = vcSchoolSectorItem.SchoolVTPSectorId || '';
        this.DateOfAllocation = vcSchoolSectorItem.DateOfAllocation || '';
        this.DateOfRemoval = vcSchoolSectorItem.DateOfRemoval || '';
        this.IsActive = vcSchoolSectorItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
