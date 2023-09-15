import { FuseUtils } from '@fuse/utils';
import { EmailAddressModel } from './email-address.model';

export class EmailBroadcastingModel {
    Id: string;
    Subject: string;
    Email: string;
    EBSEmailModels: EmailAddressModel;
    Body: string;
    EmailDocumentFile: any;
    IsActive: boolean;
    RequestType: any;


    constructor(messageTemplateItem?: any) {
        messageTemplateItem = messageTemplateItem || {};

        this.Id = messageTemplateItem.Id || FuseUtils.NewGuid();
        this.Subject = messageTemplateItem.Subject || '';
        this.Body = messageTemplateItem.Body || '';
        this.Email = messageTemplateItem.Email || '';

        if (messageTemplateItem.EBSEmailModels != null) {
            this.EBSEmailModels = new EmailAddressModel();
            messageTemplateItem.EBSEmailModels = messageTemplateItem.EBSEmailModels || new EmailAddressModel();

            this.EBSEmailModels.User_email = messageTemplateItem.EBSEmailModels.User_email || '';
        }
        this.EmailDocumentFile = messageTemplateItem.EmailDocumentFile || '';
        this.IsActive = messageTemplateItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
