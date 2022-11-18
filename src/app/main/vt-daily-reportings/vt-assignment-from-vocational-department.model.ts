import { FuseUtils } from '@fuse/utils';

export class VTRAssignmentFromVocationalDepartmentModel {
    AssigmentNumber: string;
    AssignmentDetails: string;
    AssignmentPhotoFile: any;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.AssigmentNumber = vtDailyReportingItem.AssigmentNumber || '';
        this.AssignmentDetails = vtDailyReportingItem.AssignmentDetails || '';
        this.AssignmentPhotoFile = vtDailyReportingItem.AssignmentPhotoFile || '';
    }
}
