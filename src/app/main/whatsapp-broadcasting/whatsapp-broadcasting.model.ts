import { FuseUtils } from '@fuse/utils';

export class whatsappBroadcastingModel {
    CampainID: string;
    TemplateID: string;
    Variable2: string;
    Variable1: string;
    Variable3: string;
    TemplateMessage: string;
    GlificMessage: String;
    TemplateFlowId: string;
    UserType: string;
    RequestType: any;
    ConditionId: string;

    constructor(messageTemplateItem?: any) {
        messageTemplateItem = messageTemplateItem || {};

        this.CampainID = messageTemplateItem.CampainID ||  FuseUtils.NewGuid();
        this.TemplateID = messageTemplateItem.TemplateID || '';
        this.ConditionId = messageTemplateItem.ConditionId || '';
        this.TemplateMessage = messageTemplateItem.TemplateMessage || '';
        this.UserType = messageTemplateItem.UserType || '';
        this.TemplateFlowId = messageTemplateItem.TemplateFlowId || '';
        this.RequestType = 0; // New
    }
}
