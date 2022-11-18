import { FuseUtils } from '@fuse/utils';

export class VTRAssessorInOtherSchoolForExamModel {
    SchoolName: string;
    Udise: string;
    ClassId: string;
    BoysPresent: number;
    GirlsPresent: number;
    ExamDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.SchoolName = vtDailyReportingItem.SchoolName || '';
        this.Udise = vtDailyReportingItem.Udise || '';
        this.ClassId = vtDailyReportingItem.ClassId || '';
        this.BoysPresent = vtDailyReportingItem.BoysPresent || '';
        this.GirlsPresent = vtDailyReportingItem.GirlsPresent || '';
        this.ExamDetails = vtDailyReportingItem.ExamDetails || '';
    }
}
