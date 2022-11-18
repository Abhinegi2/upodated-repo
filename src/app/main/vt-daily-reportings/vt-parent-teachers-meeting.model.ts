import { FuseUtils } from '@fuse/utils';

export class VTRParentTeachersMeetingModel {
    VocationalParentsCount: number;
    OtherParentsCount: number;
    PTADetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};

        this.VocationalParentsCount = vtDailyReportingItem.VocationalParentsCount || '';
        this.OtherParentsCount = vtDailyReportingItem.OtherParentsCount || '';
        this.PTADetails = vtDailyReportingItem.PTADetails || '';
    }
}
