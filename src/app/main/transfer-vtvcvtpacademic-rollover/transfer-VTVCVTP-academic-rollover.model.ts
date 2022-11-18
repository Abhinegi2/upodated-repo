import { FuseUtils } from '@fuse/utils';

export class TransferVTVCVTPAcademicRolloverModel {
    Id: number;
    UserId: string;
    DataTypeId: string;
    DataTypeIdNew: string;
    Destination: string;
    AcademicYearId: string;

    EntityType: string;
    FromEntityId: string;
    ToEntityId: string;

    constructor(TransferVTVCVTPAcademicRolloverItem?: any) {
        TransferVTVCVTPAcademicRolloverItem = TransferVTVCVTPAcademicRolloverItem || {};

        this.Id = TransferVTVCVTPAcademicRolloverItem.Id || 0;
        this.UserId = TransferVTVCVTPAcademicRolloverItem.UserId || '';
        this.DataTypeId = TransferVTVCVTPAcademicRolloverItem.DataTypeId || '';
        this.DataTypeIdNew = TransferVTVCVTPAcademicRolloverItem.DataTypeIdNew || '';
        this.Destination = TransferVTVCVTPAcademicRolloverItem.Destination || '';
        this.AcademicYearId = TransferVTVCVTPAcademicRolloverItem.AcademicYearId || '';

        this.EntityType = TransferVTVCVTPAcademicRolloverItem.EntityType || '';
        this.FromEntityId = TransferVTVCVTPAcademicRolloverItem.FromEntityId || '';
        this.ToEntityId = TransferVTVCVTPAcademicRolloverItem.ToEntityId || '';
    }
}
