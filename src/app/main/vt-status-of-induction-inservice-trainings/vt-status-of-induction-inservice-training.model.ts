import { FuseUtils } from '@fuse/utils';

export class VTStatusOfInductionInserviceTrainingModel {
    VTId: string;
    VTStatusOfInductionInserviceTrainingId: string;
    VTSchoolSectorId: string;
    IndustryTrainingStatus: string;
    InserviceTrainingStatus: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStatusOfInductionInserviceTrainingItem?: any) {
        vtStatusOfInductionInserviceTrainingItem = vtStatusOfInductionInserviceTrainingItem || {};

        this.VTId = vtStatusOfInductionInserviceTrainingItem.VTId || FuseUtils.NewGuid();
        this.VTStatusOfInductionInserviceTrainingId = vtStatusOfInductionInserviceTrainingItem.VTStatusOfInductionInserviceTrainingId || FuseUtils.NewGuid();
        this.VTSchoolSectorId = vtStatusOfInductionInserviceTrainingItem.VTSchoolSectorId || FuseUtils.NewGuid();
        this.IndustryTrainingStatus = vtStatusOfInductionInserviceTrainingItem.IndustryTrainingStatus || '';
        this.InserviceTrainingStatus = vtStatusOfInductionInserviceTrainingItem.InserviceTrainingStatus || '';
        this.IsActive = vtStatusOfInductionInserviceTrainingItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
