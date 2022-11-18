import { FuseUtils } from '@fuse/utils';

export class VTStudentVEResultModel {
    VTStudentVEResultId: string;
    VTId: string;
    VTClassId: string;
    StudentId: string;
    DateIssuence: any;
    ExternalMarks: string;
    TheoryMarks: any;
    InternalMarks: string;
    TotalMarks: any;
    Grade: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentVEResultItem?: any) {
        vtStudentVEResultItem = vtStudentVEResultItem || {};

        this.VTStudentVEResultId = vtStudentVEResultItem.VTStudentVEResultId || FuseUtils.NewGuid();
        this.VTId = vtStudentVEResultItem.VTClassId || FuseUtils.NewGuid();
        this.VTClassId = vtStudentVEResultItem.VTClassId || FuseUtils.NewGuid();
        this.StudentId = vtStudentVEResultItem.StudentId || '';
        this.DateIssuence = vtStudentVEResultItem.DateIssuence || '';
        this.ExternalMarks = vtStudentVEResultItem.ExternalMarks || '';
        this.TheoryMarks = vtStudentVEResultItem.TheoryMarks || '';
        this.InternalMarks = vtStudentVEResultItem.InternalMarks || '';
        this.TotalMarks = vtStudentVEResultItem.TotalMarks || '';
        this.Grade = vtStudentVEResultItem.Grade || '';
        this.IsActive = vtStudentVEResultItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
