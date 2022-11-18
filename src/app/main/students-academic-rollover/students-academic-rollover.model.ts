import { FuseUtils } from '@fuse/utils';

export class StudentsAcademicRolloverModel {
    //VTSchoolSectorId: string;
    // VTId: string;
    // VCId: string;
    // AcademicYearId: string;
    // SchoolId: string;
    // SectorId: string;
    // JobRoleId: string;
    // DateOfAllocation: Date;
    // DateOfRemoval?: Date;
    // IsActive: boolean;
    // RequestType: any;
    Id: string;
    DataTypeId: string;
    UserId: string;
    DataTypeIdNew:string;

    constructor(vtSchoolSectorForAcademicRolloverItem?: any) {
        vtSchoolSectorForAcademicRolloverItem = vtSchoolSectorForAcademicRolloverItem || {};

        //this.VTSchoolSectorId = vtSchoolSectorForAcademicRolloverItem.VTSchoolSectorId || FuseUtils.NewGuid();
        // this.VTId = vtSchoolSectorItem.VTId || '';
        // this.VCId = vtSchoolSectorItem.VCId || '';
        // this.AcademicYearId = vtSchoolSectorItem.AcademicYearId || '';
        // this.SchoolId = vtSchoolSectorItem.SchoolId || '';
        // this.SectorId = vtSchoolSectorItem.SectorId || '';
        // this.JobRoleId = vtSchoolSectorItem.JobRoleId || '';
        // this.DateOfAllocation = vtSchoolSectorItem.DateOfAllocation || '';
        // this.DateOfRemoval = vtSchoolSectorItem.DateOfRemoval || '';
        // this.IsActive = vtSchoolSectorItem.IsActive || true;
        // this.RequestType = 0; // New
        this.Id = vtSchoolSectorForAcademicRolloverItem.Id || '';
        this.DataTypeId = vtSchoolSectorForAcademicRolloverItem.DataTypeId || '';
        this.DataTypeIdNew = vtSchoolSectorForAcademicRolloverItem.DataTypeIdNew || '';
        this.UserId = vtSchoolSectorForAcademicRolloverItem.UserId || '';
    }
}
