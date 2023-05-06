import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { FuseUtils } from '@fuse/utils';

export class StudentClassModel {
    StudentId: string;
    VTId: string;
    SchoolId: string;
    StudentUniqueNumber: string;
    SectorId: string;
    JobRoleId: string;
    GVTId: string;
    AcademicYearId: string;
    ClassId: string;
    SectionId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    FullName: string;
    Gender: string;
    FatherName: string
    MotherName: string
    GuardianName: string;
    Mobile: string;
    SecondMobileNo: string;
    AssessmentToBeConducted: string;
    DateOfBirth: Date;
    Stream: string;
    CSWNStatus: string;
    IsStudentVE9And10: string;
    IsSameStudentTrade: string;
    StudentUniqueId: string;
    SocialCategory: string;
    WhatappNo: string;
    DateOfEnrollment: Date;
    DateOfDropout: Date;
    DropoutReason: string;
    IsActive: boolean;
    RequestType: any;
    VTPId: string;
    VCId: string;
    constructor(studentClassItem?: any) {
        studentClassItem = studentClassItem || {};

        this.StudentId = studentClassItem.StudentId || FuseUtils.NewGuid();
        this.VTId = studentClassItem.VTId || FuseUtils.NewGuid();
        this.SchoolId = studentClassItem.SchoolId || FuseUtils.NewGuid();
        this.SectorId = studentClassItem.SectorId || '';
        this.SectorId = studentClassItem.SectorId || '';
        this.JobRoleId = studentClassItem.JobRoleId || '';

        this.GVTId = studentClassItem.GVTId || '';

        this.StudentUniqueNumber = studentClassItem.StudentUniqueNumber || '';

        this.AcademicYearId = studentClassItem.AcademicYearId || '';
        this.ClassId = studentClassItem.ClassId || '';
        this.SectionId = studentClassItem.SectionId || '';
        this.DateOfEnrollment = studentClassItem.DateOfEnrollment || '';
        this.FirstName = studentClassItem.FirstName || '';
        this.MiddleName = studentClassItem.MiddleName || '';
        this.LastName = studentClassItem.LastName || '';
        this.FullName = studentClassItem.FullName || '';
        this.Gender = studentClassItem.Gender || '';
        this.FatherName = studentClassItem.FatherName || '';
        this.SecondMobileNo = studentClassItem.SecondMobileNo || '';
        this.MotherName = studentClassItem.MotherName || '';
        this.GuardianName = studentClassItem.GuardianName || '';
        this.Mobile = studentClassItem.Mobile || '';
        this.IsSameStudentTrade = studentClassItem.IsSameStudentTrade || '';
        this.StudentUniqueId = studentClassItem.StudentUniqueId || '';
        this.IsStudentVE9And10 = studentClassItem.IsStudentVE9And10 || '';
        this.AssessmentToBeConducted = studentClassItem.AssessmentToBeConducted || '';
        this.DateOfBirth = studentClassItem.DateOfBirth || '';
        this.Stream = studentClassItem.Stream || '';
        this.CSWNStatus = studentClassItem.CSWNStatus || '';
        this.SocialCategory = studentClassItem.SocialCategory || '';
        this.WhatappNo = studentClassItem.WhatappNo || '';
        this.DateOfDropout = studentClassItem.DateOfDropout || '';
        this.DropoutReason = studentClassItem.DropoutReason || '';
        this.IsActive = studentClassItem.IsActive || true;
        this.RequestType = 0; // New
        this.VTPId = studentClassItem.VTId || '';
        this.VCId = studentClassItem.VTId || '';
    }
}
