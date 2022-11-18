import { FuseUtils } from '@fuse/utils';

export class ToolEquipmentModel {
    ToolEquipmentId: string;
    VTPId: string;
    VCId: string;
    SchoolId: string; 
    VTId: string;
    AcademicYearId: string;
    SectorId: string;
    JobRoleId: string;
    ReceiptDate: Date;
    TEReceiveStatus: string;
    TEStatus: string;
    RMStatus: string;
    RMFundStatus: string;
    Details: string;
    IsActive: boolean;
    RequestType: any;

    constructor(toolEquipmentItem?: any) {
        toolEquipmentItem = toolEquipmentItem || {};

        this.ToolEquipmentId = toolEquipmentItem.ToolEquipmentId || FuseUtils.NewGuid();
        this.VTId = toolEquipmentItem.VTId || FuseUtils.NewGuid();
        this.AcademicYearId = toolEquipmentItem.AcademicYearId || '';
        this.SectorId = toolEquipmentItem.SectorId || '';
        this.JobRoleId = toolEquipmentItem.JobRoleId || '';
        this.ReceiptDate = toolEquipmentItem.ReceiptDate || '';
        this.TEReceiveStatus = toolEquipmentItem.TEReceiveStatus || '';
        this.TEStatus = toolEquipmentItem.TEStatus || '';
        this.RMStatus = toolEquipmentItem.RMStatus || '';
        this.RMFundStatus = toolEquipmentItem.RMFundStatus || '';
        this.Details = toolEquipmentItem.Details || '';
        this.IsActive = toolEquipmentItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
