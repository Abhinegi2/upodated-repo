import { FuseUtils } from '@fuse/utils';

export class VTRWorkAssignedByHeadMasterModel {
    WorkingDayTypeIds: string;
    OtherWork: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.WorkingDayTypeIds = vtDailyReportingItem.WorkingDayTypeIds || '';
        this.OtherWork = vtDailyReportingItem.OtherWork || '';
    }
}
