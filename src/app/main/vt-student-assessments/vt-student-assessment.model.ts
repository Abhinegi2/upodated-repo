import { FuseUtils } from '@fuse/utils';

export class VTStudentAssessmentModel {
    VTStudentAssessmentId: string;
    VTId: string;
    VTClassId: string;
    TestimonialType: string;
    StudentName: string;
    StudentGender: string;
    StudentPhoto: string;
    OJTCompany: string;
    OJTCompanyAddress: string;
    OJTFieldSuperName: string;
    OJTFieldSuperMobile: string;
    OJTFieldSuperEmail: string;
    GroupPhoto: string;
    TestimonialTitle: string;
    TestimonialDetails: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentAssessmentItem?: any) {
        vtStudentAssessmentItem = vtStudentAssessmentItem || {};

        this.VTStudentAssessmentId = vtStudentAssessmentItem.VTStudentAssessmentId || FuseUtils.NewGuid();
        this.VTId = FuseUtils.NewGuid();
        this.VTClassId = vtStudentAssessmentItem.VTClassId || FuseUtils.NewGuid();
        this.TestimonialType = vtStudentAssessmentItem.TestimonialType || '';
        this.StudentName = vtStudentAssessmentItem.StudentName || '';
        this.StudentGender = vtStudentAssessmentItem.StudentGender || '';
        this.StudentPhoto = vtStudentAssessmentItem.StudentPhoto || '';
        this.OJTCompany = vtStudentAssessmentItem.OJTCompany || '';
        this.OJTCompanyAddress = vtStudentAssessmentItem.OJTCompanyAddress || '';
        this.OJTFieldSuperName = vtStudentAssessmentItem.OJTFieldSuperName || '';
        this.OJTFieldSuperMobile = vtStudentAssessmentItem.OJTFieldSuperMobile || '';
        this.OJTFieldSuperEmail = vtStudentAssessmentItem.OJTFieldSuperEmail || '';
        this.GroupPhoto = vtStudentAssessmentItem.GroupPhoto || '';
        this.TestimonialTitle = vtStudentAssessmentItem.TestimonialTitle || '';
        this.TestimonialDetails = vtStudentAssessmentItem.TestimonialDetails || '';
        this.IsActive = vtStudentAssessmentItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
