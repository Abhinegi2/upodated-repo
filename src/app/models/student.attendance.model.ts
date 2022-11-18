export class StudentAttendanceModel {
    ClassId: string;
    SectionId: string;
    StudentId: string;
    StudentName: string;
    IsPresent: boolean;

    constructor(studentItem?: any) {
        studentItem = studentItem || {};

        this.ClassId = studentItem.ClassId || "";
        this.SectionId = studentItem.SectionId || "";
        this.StudentId = studentItem.StudentId || "";
        this.StudentName = studentItem.StudentName || "";
        this.IsPresent = studentItem.IsPresent || true;
    }
}
