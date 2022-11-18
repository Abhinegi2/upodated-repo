
export class UnitSessionModel {
    UnitId: string;
    ClassId: string;
    ModuleTypeId: string;
    UnitName: string;
    SessionId: string;
    SessionName: string;

    constructor(sessionItem?: any) {
        sessionItem = sessionItem || {};

        this.UnitId = sessionItem.UnitId || '';
        this.ClassId = sessionItem.ClassId || '';
        this.ModuleTypeId = sessionItem.ModuleTypeId || '';
        this.UnitName = sessionItem.UnitName || '';
        this.SessionId = sessionItem.SessionId || '';
        this.SessionName = sessionItem.SessionName || '';
    }
}