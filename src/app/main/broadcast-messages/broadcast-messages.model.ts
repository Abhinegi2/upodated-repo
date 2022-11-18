import { FuseUtils } from '@fuse/utils';

export class BroadcastMessagesModel {
    BroadcastMessageId: string;
    MessageText: string;
    FromDate: Date;
    ToDate: Date;
    ApplicableFor: any;
    IsActive: boolean;
    RequestType: any;

    constructor(broadcastMessageItem?: any) {
        broadcastMessageItem = broadcastMessageItem || {};

        this.BroadcastMessageId = broadcastMessageItem.BroadcastMessageId || FuseUtils.NewGuid();
        this.MessageText = broadcastMessageItem.MessageText || '';
        this.FromDate = broadcastMessageItem.FromDate || '';
        this.ToDate = broadcastMessageItem.ToDate || '';
        this.ApplicableFor = broadcastMessageItem.ApplicableFor || '';
        this.IsActive = broadcastMessageItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
