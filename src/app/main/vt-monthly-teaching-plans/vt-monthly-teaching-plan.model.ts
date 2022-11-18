import { FuseUtils } from '@fuse/utils';

export class VTMonthlyTeachingPlanModel {
    VTMonthlyTeachingPlanId: string;
    VTId: string;
    VTClassId: string;
    Month: string;
    WeekStartDate: Date;
    WeekendDate: Date;
    ModulesPlanned: string;
    IVPlannedDate: Date;
    IVVCAttend: string;
    FVPlannedDate: Date;
    FVPurpose: string;
    FVLocation: string;
    GLPlannedDate: Date;
    OtherDetails: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtMonthlyTeachingPlanItem?: any) {
        vtMonthlyTeachingPlanItem = vtMonthlyTeachingPlanItem || {};

        this.VTMonthlyTeachingPlanId = vtMonthlyTeachingPlanItem.VTMonthlyTeachingPlanId || FuseUtils.NewGuid();
        this.VTId = FuseUtils.NewGuid();
        this.VTClassId = vtMonthlyTeachingPlanItem.VTClassId || FuseUtils.NewGuid();
        this.Month = vtMonthlyTeachingPlanItem.Month || '';
        this.WeekStartDate = vtMonthlyTeachingPlanItem.WeekStartDate || '';
        this.WeekendDate = vtMonthlyTeachingPlanItem.WeekendDate || '';
        this.ModulesPlanned = vtMonthlyTeachingPlanItem.ModulesPlanned || '';
        this.IVPlannedDate = vtMonthlyTeachingPlanItem.IVPlannedDate || '';
        this.IVVCAttend = vtMonthlyTeachingPlanItem.IVVCAttend || '';
        this.FVPlannedDate = vtMonthlyTeachingPlanItem.FVPlannedDate || '';
        this.FVPurpose = vtMonthlyTeachingPlanItem.FVPurpose || '';
        this.FVLocation = vtMonthlyTeachingPlanItem.FVLocation || '';
        this.GLPlannedDate = vtMonthlyTeachingPlanItem.GLPlannedDate || '';
        this.OtherDetails = vtMonthlyTeachingPlanItem.OtherDetails || '';
        this.IsActive = vtMonthlyTeachingPlanItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
