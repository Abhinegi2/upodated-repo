import { FuseUtils } from '@fuse/utils';

export class VTPMonthlyBillSubmissionStatusModel {
    VTPMonthlyBillSubmissionStatusId: string;
    VCId: string;
    Month: string;
    DateSubmission: any;
    Incorrect: string;
    IncorrectDetails: string;
    Final: string;
    ApprovedPMU: string;
    Amount: any;
    DiaryentryDone: string;
    DiaryentryNumber: string;
    Details: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vtpMonthlyBillSubmissionStatusItem?: any) {
        vtpMonthlyBillSubmissionStatusItem = vtpMonthlyBillSubmissionStatusItem || {};

        this.VTPMonthlyBillSubmissionStatusId = vtpMonthlyBillSubmissionStatusItem.VTPMonthlyBillSubmissionStatusId || FuseUtils.NewGuid();
        this.VCId = vtpMonthlyBillSubmissionStatusItem.VCId || FuseUtils.NewGuid();
        this.Month = vtpMonthlyBillSubmissionStatusItem.Month || '';
        this.DateSubmission = vtpMonthlyBillSubmissionStatusItem.DateSubmission || '';
        this.Incorrect = vtpMonthlyBillSubmissionStatusItem.Incorrect || '';
        this.IncorrectDetails = vtpMonthlyBillSubmissionStatusItem.IncorrectDetails || '';
        this.Final = vtpMonthlyBillSubmissionStatusItem.Final || '';
        this.ApprovedPMU = vtpMonthlyBillSubmissionStatusItem.ApprovedPMU || '';
        this.Amount = vtpMonthlyBillSubmissionStatusItem.Amount || '';
        this.DiaryentryDone = vtpMonthlyBillSubmissionStatusItem.DiaryentryDone || '';
        this.DiaryentryNumber = vtpMonthlyBillSubmissionStatusItem.DiaryentryNumber || '';
        this.Details = vtpMonthlyBillSubmissionStatusItem.Details || '';
        this.IsActive = vtpMonthlyBillSubmissionStatusItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
