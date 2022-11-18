import { FuseUtils } from '@fuse/utils';

export class ChangeLoginModel {
    RoleId:string;
    AccountId: string;
    NewLoginId: string;

    constructor(accountItem?: any) {
        accountItem = accountItem || {};

        this.RoleId = accountItem.RoleId || '';
        this.AccountId = accountItem.AccountId || '';
        this.NewLoginId = accountItem.NewLoginId || '';
    }
}
