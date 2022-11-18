export class ClassSectionModel {
    ClassId: string;
    ClassName: string;
    SectionId: string;
    SectionName: string;

    constructor(studentItem?: any) {
        studentItem = studentItem || {};

        this.ClassId = studentItem.ClassId || "";
        this.ClassName = studentItem.ClassName || "";
        this.SectionId = studentItem.SectionId || "";
        this.SectionName = studentItem.SectionName || "";
    }
}
