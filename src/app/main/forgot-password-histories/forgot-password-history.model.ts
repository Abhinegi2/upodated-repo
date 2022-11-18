import { FuseUtils } from '@fuse/utils';

export class ForgotPasswordHistoryModel {
    ForgotPasswordId: string;
    EmailId: string;
    PasswordResetUrl: string;
    UserIPAddress: string;
    RequestDate: any;
    ResetPasswordDate: any;
    RequestType: any;

    constructor(forgotPasswordHistoryItem?: any) {
        forgotPasswordHistoryItem = forgotPasswordHistoryItem || {};

        this.ForgotPasswordId = forgotPasswordHistoryItem.ForgotPasswordId || FuseUtils.NewGuid();
        this.EmailId = forgotPasswordHistoryItem.EmailId || '';
        this.PasswordResetUrl = forgotPasswordHistoryItem.PasswordResetUrl || '';
        this.UserIPAddress = forgotPasswordHistoryItem.UserIPAddress || '';
        this.RequestDate = forgotPasswordHistoryItem.RequestDate || '';
        this.ResetPasswordDate = forgotPasswordHistoryItem.ResetPasswordDate || '';
        this.RequestType = 0; // New
    }
}
