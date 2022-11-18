import { FuseUtils } from '@fuse/utils';

export class ChangePasswordModel {
    UserId: string;
    Password: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(accountItem?: any) {
        accountItem = accountItem || {};

        this.UserId = accountItem.UserId || '';
        this.Password = accountItem.Password || '';
        this.NewPassword = accountItem.NewPassword || '';
        this.ConfirmPassword = accountItem.ConfirmPassword || '';
    }
}
