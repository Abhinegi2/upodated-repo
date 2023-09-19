import { FuseUtils } from '@fuse/utils';

export class StudentsAcademicRolloverModel {
    Id: string;
    DataTypeId: string;
    UserId: string;
    DataTypeIdNew:string;

    constructor(vtSchoolSectorForAcademicRolloverItem?: any) {
        vtSchoolSectorForAcademicRolloverItem = vtSchoolSectorForAcademicRolloverItem || {};
        this.Id = vtSchoolSectorForAcademicRolloverItem.Id || '';
        this.DataTypeId = vtSchoolSectorForAcademicRolloverItem.DataTypeId || '';
        this.DataTypeIdNew = vtSchoolSectorForAcademicRolloverItem.DataTypeIdNew || '';
        this.UserId = vtSchoolSectorForAcademicRolloverItem.UserId || '';
    }
}
