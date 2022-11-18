import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { FuseUtils } from '@fuse/utils';

export class StudentClassModel {
    StudentId: string;
    VTId: string;
    SchoolId: string;
    AcademicYearId: string;
    ClassId: string;
    SectionId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    FullName: string;
    Gender: string;
    Mobile: string;
    DateOfEnrollment: Date;
    DateOfDropout: Date;
    DropoutReason: string;
    IsActive: boolean;
    RequestType: any;
    VTPId:string;
    VCId:string;
    constructor(studentClassItem?: any) {
        studentClassItem = studentClassItem || {};

        this.StudentId = studentClassItem.StudentId || FuseUtils.NewGuid();
        this.VTId = studentClassItem.VTId || FuseUtils.NewGuid();
        this.SchoolId = studentClassItem.SchoolId || FuseUtils.NewGuid();
        this.AcademicYearId = studentClassItem.AcademicYearId || '';
        this.ClassId = studentClassItem.ClassId || '';
        this.SectionId = studentClassItem.SectionId || '';
        this.DateOfEnrollment = studentClassItem.DateOfEnrollment || '';
        this.FirstName = studentClassItem.FirstName || '';
        this.MiddleName = studentClassItem.MiddleName || '';
        this.LastName = studentClassItem.LastName || '';
        this.FullName = studentClassItem.FullName || '';
        this.Gender = studentClassItem.Gender || '';
        this.Mobile = studentClassItem.Mobile || '';
        this.DateOfDropout = studentClassItem.DateOfDropout || '';
        this.DropoutReason = studentClassItem.DropoutReason || '';
        this.IsActive = studentClassItem.IsActive || true;
        this.RequestType = 0; // New
        this.VTPId = studentClassItem.VTId || '';
        this.VCId = studentClassItem.VTId || '';
    }
}
