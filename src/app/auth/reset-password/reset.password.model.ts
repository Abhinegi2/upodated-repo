export class ResetPasswordModel {
    UserId: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(accountItem?: any) {
        accountItem = accountItem || {};

        this.UserId = accountItem.UserId || '';
        this.NewPassword = accountItem.NewPassword || '';
        this.ConfirmPassword = accountItem.ConfirmPassword || '';
    }
}
