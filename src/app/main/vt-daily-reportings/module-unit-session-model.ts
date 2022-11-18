
export class ModuleUnitSessionModel {
    ModuleId: string;
    UnitId: string;
    SessionIds: [string];

    constructor(sessionItem?: any) {
        sessionItem = sessionItem || {};

        this.ModuleId = sessionItem.ModuleId || '';
        this.UnitId = sessionItem.UnitId || '';
        this.SessionIds = sessionItem.SessionIds || <string[]>[];;
    }
}