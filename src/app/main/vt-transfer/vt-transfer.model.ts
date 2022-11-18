export class VTTransferModel {
    FromVTPId: string;
    FromVCId: string;
    FromVTId: string;
    FromSchoolId: string;

    ToVTPId: string;
    ToVCId: string;
    ToVTId: string;

    constructor(transferItem?: any) {
        transferItem = transferItem || {};

        this.FromVTPId = transferItem.FromVTPId || '';
        this.FromVCId = transferItem.FromVCId || '';
        this.FromVTId = transferItem.FromVTId || '';
        this.FromSchoolId = transferItem.FromSchoolId || '';
        
        this.ToVTPId = transferItem.ToVTPId || '';
        this.ToVCId = transferItem.ToVCId || '';
        this.ToVTId = transferItem.ToVTId || '';
    }
}
