export class SettingModel {
    RoleId: string;
    UserId: string;

    constructor(schoolItem?: any) {
        schoolItem = schoolItem || {};

        this.RoleId = schoolItem.RoleId || '';
        this.UserId = schoolItem.UserId || '';
    }
}
