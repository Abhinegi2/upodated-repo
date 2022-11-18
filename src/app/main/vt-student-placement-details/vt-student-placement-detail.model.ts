import { FuseUtils } from '@fuse/utils';

export class VTStudentPlacementDetailModel {
    VTStudentPlacementDetailId: string;
    VTId: string;
    VTClassId: string;
    StudentId: string;
    PlacementApplyStatus: string;
    PlacementStatus: string;
    ApprenticeshipApplyStatus: string;
    ApprenticeshipStatus: string;
    HigherEducationVE: string;
    HigherEductaionOther: string;
    StudentPlacementStatus: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtStudentPlacementDetailItem?: any) {
        vtStudentPlacementDetailItem = vtStudentPlacementDetailItem || {};

        this.VTStudentPlacementDetailId = vtStudentPlacementDetailItem.VTStudentPlacementDetailId || FuseUtils.NewGuid();
        this.VTId = vtStudentPlacementDetailItem.VTId || FuseUtils.NewGuid();
        this.VTClassId = vtStudentPlacementDetailItem.VTClassId || FuseUtils.NewGuid();
        this.StudentId = vtStudentPlacementDetailItem.StudentId || '';
        this.PlacementApplyStatus = vtStudentPlacementDetailItem.PlacementApplyStatus || '';
        this.PlacementStatus = vtStudentPlacementDetailItem.PlacementStatus || '';
        this.ApprenticeshipApplyStatus = vtStudentPlacementDetailItem.ApprenticeshipApplyStatus || '';
        this.ApprenticeshipStatus = vtStudentPlacementDetailItem.ApprenticeshipStatus || '';
        this.HigherEducationVE = vtStudentPlacementDetailItem.HigherEducationVE || '';
        this.HigherEductaionOther = vtStudentPlacementDetailItem.HigherEductaionOther || '';
        this.StudentPlacementStatus = vtStudentPlacementDetailItem.StudentPlacementStatus || '';
        this.IsActive = vtStudentPlacementDetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
