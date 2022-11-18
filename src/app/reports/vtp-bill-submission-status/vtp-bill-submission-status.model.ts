import { FuseUtils } from '@fuse/utils';

export class VTPBillSubmissionStatusModel {
    SrNo: number;
    MonthYear: string;
    Month: string;
    DateOfSubmissionOfInvoice: Date;
    PhaseName: string;
    NameOfVTP: string;
    CategoryName: string;
    BillsForTheMonthYear: string;
    InvoiceAmountInRs: number;
    DocumentsSubmittedRelatedToInvoice: string;
    NameOfTheVCwhoSubmittedTheInvoice: string;
    Remarks: string;
    

    constructor() { }
}
