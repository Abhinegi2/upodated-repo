import { FuseUtils } from '@fuse/utils';

export class VTPracticalAssessmentModel {
    VTPracticalAssessmentId: string;
    VTClassId: string;
    AssessmentDate: any;
    BoysPresent: any;
    GirlsPresent: any;
    AssessorName: string;
    AssessorMobile: string;
    AssessorEmail: string;
    AssessorQualification: string;
    AssessorTimeReached: any;
    AssessorIdCheck: string;
    AssessorIdType: string;
    AssessorSSCLetter: string;
    AssessorBehaviour: string;
    AssessorDemands: string;
    AssessorBehaiourFormality: string;
    AssessorGroupPhoto: string;
    VCPMUNameVisit: string;
    RemarksDetails: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtPracticalAssessmentItem?: any) {
        vtPracticalAssessmentItem = vtPracticalAssessmentItem || {};

        this.VTPracticalAssessmentId = vtPracticalAssessmentItem.VTPracticalAssessmentId || FuseUtils.NewGuid();
        this.VTClassId = vtPracticalAssessmentItem.VTClassId || FuseUtils.NewGuid();
        this.AssessmentDate = vtPracticalAssessmentItem.AssessmentDate || '';
        this.BoysPresent = vtPracticalAssessmentItem.BoysPresent || '';
        this.GirlsPresent = vtPracticalAssessmentItem.GirlsPresent || '';
        this.AssessorName = vtPracticalAssessmentItem.AssessorName || '';
        this.AssessorMobile = vtPracticalAssessmentItem.AssessorMobile || '';
        this.AssessorEmail = vtPracticalAssessmentItem.AssessorEmail || '';
        this.AssessorQualification = vtPracticalAssessmentItem.AssessorQualification || '';
        this.AssessorTimeReached = vtPracticalAssessmentItem.AssessorTimeReached || '';
        this.AssessorIdCheck = vtPracticalAssessmentItem.AssessorIdCheck || '';
        this.AssessorIdType = vtPracticalAssessmentItem.AssessorIdType || '';
        this.AssessorSSCLetter = vtPracticalAssessmentItem.AssessorSSCLetter || '';
        this.AssessorBehaviour = vtPracticalAssessmentItem.AssessorBehaviour || '';
        this.AssessorDemands = vtPracticalAssessmentItem.AssessorDemands || '';
        this.AssessorBehaiourFormality = vtPracticalAssessmentItem.AssessorBehaiourFormality || '';
        this.AssessorGroupPhoto = vtPracticalAssessmentItem.AssessorGroupPhoto || '';
        this.VCPMUNameVisit = vtPracticalAssessmentItem.VCPMUNameVisit || '';
        this.RemarksDetails = vtPracticalAssessmentItem.RemarksDetails || '';
        this.IsActive = vtPracticalAssessmentItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
