export class whatsappBroadcastingModel {
    CampainID: string;
    TemplateID: string;
    TemplateMessage: string;
    TemplateFlowId: string;
    UserType: string;
    RequestType: any;
    ConditionId: string;

    constructor(messageTemplateItem?: any) {
        messageTemplateItem = messageTemplateItem || {};

        this.CampainID = messageTemplateItem.CampainID || 1;
        this.TemplateID = messageTemplateItem.TemplateID || '';
        this.ConditionId = messageTemplateItem.ConditionId || '';
        this.TemplateMessage = messageTemplateItem.TemplateMessage || '';
        this.UserType = messageTemplateItem.UserType || '';
        this.TemplateFlowId = messageTemplateItem.TemplateFlowId || '';
        this.RequestType = 0; // New
    }
}
