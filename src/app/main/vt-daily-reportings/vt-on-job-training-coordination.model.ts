import { FuseUtils } from '@fuse/utils';

export class VTROnJobTrainingCoordinationModel {
    OnJobTrainingActivityId: string;
    IndustryName: string;
    IndustryContactPerson: string;
    IndustryContactNumber: number;
    OJTActivityDetails: string;
    RequestType: any;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.OnJobTrainingActivityId = vtDailyReportingItem.OnJobTrainingActivityId || '';
        this.IndustryName = vtDailyReportingItem.IndustryName || '';
        this.IndustryContactPerson = vtDailyReportingItem.IndustryContactPerson || '';
        this.IndustryContactNumber = vtDailyReportingItem.IndustryContactNumber || '';
        this.OJTActivityDetails = vtDailyReportingItem.OJTActivityDetails || '';    
    }
}
