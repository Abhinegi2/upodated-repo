export class whatsappBroadcastingModel {
    MessageTemplateId: string;
    TemplateName: string;
    TemplateFlowId: string;
    MessageTypeId: string;
    MessageSubTypeId: string;
    MessageFieldIds: string;
    SMSMessage: string;
    WhatsappMessage: string;
    EmailMessage: string;
    ApplicableForIds: string;
    IsActive: boolean;
    RequestType: any;

    constructor(messageTemplateItem?: any) {
        messageTemplateItem = messageTemplateItem || {};

        this.MessageTemplateId = messageTemplateItem.MessageTemplateId || 1;
        this.TemplateName = messageTemplateItem.TemplateName || '';
        this.TemplateFlowId = messageTemplateItem.TemplateFlowId || '';
        this.MessageTypeId = messageTemplateItem.MessageTypeId || '';
        this.MessageSubTypeId = messageTemplateItem.MessageSubTypeId || '';
        this.MessageFieldIds = messageTemplateItem.MessageFieldIds || '';
        this.ApplicableForIds = messageTemplateItem.ApplicableForIds || '';
        this.SMSMessage = messageTemplateItem.SMSMessage || '';
        this.WhatsappMessage = messageTemplateItem.WhatsappMessage || '';
        this.EmailMessage = messageTemplateItem.EmailMessage || '';
        this.IsActive = messageTemplateItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
