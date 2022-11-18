import { FuseUtils } from '@fuse/utils';

export class ComplaintRegistrationModel {
    ComplaintRegistrationId: string;
    //CategoryName: string;
    UserType: String;
    UserName: String;
    EmailId : String;
    Subject: String;
    IssueDetails: String;
    //IssueStatus: String;
    ScreenshotFile: any;
    IsActive: boolean;
    RequestType: any;

    constructor(complaintRegistrationItem?: any) {
        complaintRegistrationItem = complaintRegistrationItem || {};

        this.ComplaintRegistrationId = complaintRegistrationItem.ComplaintRegistrationId || FuseUtils.NewGuid();
        //this.CategoryName = complaintRegistrationItem.CategoryName || '';
        this.UserType = complaintRegistrationItem.UserType || '';
        this.UserName = complaintRegistrationItem.UserName || '';
        this.EmailId = complaintRegistrationItem.EmailId || '';
        this.Subject = complaintRegistrationItem.Subject || '';
        this.IssueDetails = complaintRegistrationItem.IssueDetails || '';
        //this.IssueStatus = complaintRegistrationItem.IssueStatus || '';
        this.ScreenshotFile = complaintRegistrationItem.ScreenshotFile || '';
        this.IsActive = complaintRegistrationItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
