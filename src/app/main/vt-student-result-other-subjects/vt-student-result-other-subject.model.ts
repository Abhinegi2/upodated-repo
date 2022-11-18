import { FuseUtils } from '@fuse/utils';

export class VTStudentResultOtherSubjectModel {
    VTStudentResultOtherSubjectId: string;
    VTId: string;
    VTClassId: string;
    StudentId: string;
    SubjectName: string;
    SubjectNumber: any;
    SubjectMarks: any;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentResultOtherSubjectItem?: any) {
        vtStudentResultOtherSubjectItem = vtStudentResultOtherSubjectItem || {};

        this.VTStudentResultOtherSubjectId = vtStudentResultOtherSubjectItem.VTStudentResultOtherSubjectId || FuseUtils.NewGuid();
        this.VTId = vtStudentResultOtherSubjectItem.VTClassId || FuseUtils.NewGuid();
        this.VTClassId = vtStudentResultOtherSubjectItem.VTClassId || FuseUtils.NewGuid();
        this.StudentId = vtStudentResultOtherSubjectItem.StudentId || '';
        this.SubjectName = vtStudentResultOtherSubjectItem.SubjectName || '';
        this.SubjectNumber = vtStudentResultOtherSubjectItem.SubjectNumber || '';
        this.SubjectMarks = vtStudentResultOtherSubjectItem.SubjectMarks || '';
        this.IsActive = vtStudentResultOtherSubjectItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
