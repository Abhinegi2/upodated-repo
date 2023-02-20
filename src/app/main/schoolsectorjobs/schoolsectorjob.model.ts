import { FuseUtils } from '@fuse/utils';

export class SchoolSectorJobModel {
    SchoolSectorJobId: string;
    SchoolId: string;
    SectorId: string;
    JobRoleId: string;
    DateOfAllocation: Date;
    DateOfRemoval?: Date;
    IsActive: boolean;
    RequestType: any;

    constructor(schoolsectorjobItem?: any) {
        schoolsectorjobItem = schoolsectorjobItem || {};

        this.SchoolSectorJobId = schoolsectorjobItem.SchoolSectorJobId || FuseUtils.NewGuid();
        this.SchoolId = schoolsectorjobItem.SchoolId || '';
        this.SectorId = schoolsectorjobItem.SectorId || '';
        this.JobRoleId = schoolsectorjobItem.JobRoleId || '';
        this.DateOfAllocation = schoolsectorjobItem.DateOfAllocation || '';
        this.DateOfRemoval = schoolsectorjobItem.DateOfRemoval || '';
        this.IsActive = schoolsectorjobItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
