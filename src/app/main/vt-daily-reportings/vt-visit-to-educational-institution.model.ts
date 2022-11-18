import { FuseUtils } from '@fuse/utils';

export class VTRVisitToEducationalInstitutionModel {
    EducationalInstituteVisitCount: number;
    EducationalInstitute: string;
    InstituteContactPerson: string;
    InstituteContactNumber: number;
    InstituteVisitDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.EducationalInstituteVisitCount = vtDailyReportingItem.EducationalInstituteVisitCount || 1;
        this.EducationalInstitute = vtDailyReportingItem.EducationalInstitute || '';
        this.InstituteContactPerson = vtDailyReportingItem.InstituteContactPerson || '';
        this.InstituteContactNumber = vtDailyReportingItem.InstituteContactNumber || '';
        this.InstituteVisitDetails = vtDailyReportingItem.InstituteVisitDetails || '';
    }
}
