import { FuseUtils } from '@fuse/utils';

export class EmailAddressModel {
    EmailBroadcastingId: string;
    User_email: string;


    constructor(messageTemplateItem?: any) {
        messageTemplateItem = messageTemplateItem || {};

        this.EmailBroadcastingId = messageTemplateItem.EmailBroadcastingId || '';
        this.User_email = messageTemplateItem.User_email || '';
    }
}
