import { FuseUtils } from '@fuse/utils';

export class VTRCommunityHomeVisitModel {    
    VocationalParentsCount: number;
    OtherParentsCount: number;
    CommunityVisitDetails: string;

    constructor(vtDailyReportingItem?: any) {
        vtDailyReportingItem = vtDailyReportingItem || {};
        
        this.VocationalParentsCount = vtDailyReportingItem.VocationalParentsCount || '';
        this.OtherParentsCount = vtDailyReportingItem.OtherParentsCount || '';
        this.CommunityVisitDetails = vtDailyReportingItem.CommunityVisitDetails || '';
    }
}
