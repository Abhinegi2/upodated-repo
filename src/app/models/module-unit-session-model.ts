
export class ModuleUnitSessionModel {
    ClassId: string;
    SectionId: string;
    ModuleId: string;
    ModuleName: string;    
    UnitId: string;
    UnitName: string;
    SessionIds: [string];
    SessionNames: [string];

    constructor(sessionItem?: any) {
        sessionItem = sessionItem || {};

        this.ClassId = sessionItem.ClassId || '';
        this.SectionId = sessionItem.SectionId || '';
        this.ModuleId = sessionItem.ModuleId || '';
        this.ModuleName = sessionItem.ModuleName || '';
        this.UnitId = sessionItem.UnitId || '';
        this.UnitName = sessionItem.UnitName || '';
        this.SessionIds = sessionItem.SessionIds || <string[]>[];;
        this.SessionNames = sessionItem.SessionNames || '';
    }
}