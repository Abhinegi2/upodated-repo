import { FuseUtils } from '@fuse/utils';

export class CourseModuleModel {
    CourseModuleId: string;
    ClassId: string;
    ModuleTypeId: string;
    SectorId: string;
    JobRoleId: string;
    UnitName: string;
    DisplayOrder: number;
    Sessions: any;
    IsActive: boolean;
    RequestType: any;

    constructor(courseModule?: any) {
        courseModule = courseModule || {};

        this.CourseModuleId = courseModule.CourseModuleId || FuseUtils.NewGuid();
        this.ClassId = courseModule.ClassId || '';
        this.ModuleTypeId = courseModule.ModuleTypeId || '';
        this.SectorId = courseModule.SectorId || '';
        this.JobRoleId = courseModule.JobRoleId || '';
        this.UnitName = courseModule.UnitName || '';
        this.DisplayOrder = courseModule.DisplayOrder || '';
        this.Sessions = courseModule.Sessions || [];
        this.IsActive = courseModule.IsActive || true;
        this.RequestType = 0; // New
    }
}
