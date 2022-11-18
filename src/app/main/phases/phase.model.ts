import { FuseUtils } from '@fuse/utils';

export class PhaseModel {
    PhaseId: string;
    PhaseName: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(phaseItem?: any) {
        phaseItem = phaseItem || {};

        this.PhaseId = phaseItem.PhaseId || FuseUtils.NewGuid();
        this.PhaseName = phaseItem.PhaseName || '';
        this.Description = phaseItem.Description || '';
        this.IsActive = phaseItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
