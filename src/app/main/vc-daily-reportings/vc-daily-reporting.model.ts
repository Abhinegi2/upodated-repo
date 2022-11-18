import { FuseUtils } from '@fuse/utils';
import { VCLeaveModel } from './vc-leave.model';
import { VCHolidayModel } from './vc-holiday.model';
import { VCIndustryExposureVisitModel } from './vc-industry-exposure-visit.model';

export class VCDailyReportingModel {
    VCDailyReportingId: string;
    VCId: string;
    ReportDate: any;
    ReportType: string;
    WorkingDayTypeIds: string;
    WorkTypeDetails: string;
    SchoolId: string;
    
    Leave: VCLeaveModel;
    Holiday: VCHolidayModel;
    IndustryExposureVisit: VCIndustryExposureVisitModel;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vcDailyReportingItem?: any) {
        vcDailyReportingItem = vcDailyReportingItem || {};

        this.VCDailyReportingId = vcDailyReportingItem.VCDailyReportingId || FuseUtils.NewGuid();
        this.VCId = vcDailyReportingItem.VCId || FuseUtils.NewGuid();
        this.ReportDate = vcDailyReportingItem.ReportDate || '';
        this.ReportType = vcDailyReportingItem.ReportType || '';
        this.WorkingDayTypeIds = vcDailyReportingItem.WorkingDayTypeIds || '';
        this.SchoolId = vcDailyReportingItem.SchoolId || '';
        this.WorkTypeDetails = vcDailyReportingItem.WorkTypeDetails || '';

        if (vcDailyReportingItem.IndustryExposureVisit != null) {
            this.IndustryExposureVisit = new VCIndustryExposureVisitModel();
            vcDailyReportingItem.IndustryExposureVisit = vcDailyReportingItem.IndustryExposureVisit || new VCIndustryExposureVisitModel();

            this.IndustryExposureVisit.TypeOfIndustryLinkage = vcDailyReportingItem.IndustryExposureVisit.TypeOfIndustryLinkage || '';
            this.IndustryExposureVisit.ContactPersonName = vcDailyReportingItem.IndustryExposureVisit.ContactPersonName || '';
            this.IndustryExposureVisit.ContactPersonMobile = vcDailyReportingItem.IndustryExposureVisit.ContactPersonMobile || '';
            this.IndustryExposureVisit.ContactPersonEmail = vcDailyReportingItem.IndustryExposureVisit.ContactPersonEmail || '';
        }

        if (vcDailyReportingItem.Holiday != null) {
            this.Holiday = new VCHolidayModel();
            vcDailyReportingItem.Holiday = vcDailyReportingItem.Holiday || new VCHolidayModel();

            this.Holiday.HolidayTypeId = vcDailyReportingItem.Holiday.HolidayTypeId || '';
            this.Holiday.HolidayDetails = vcDailyReportingItem.Holiday.HolidayDetails || '';
        }

        if (vcDailyReportingItem.Leave != null) {
            this.Leave = new VCLeaveModel();
            vcDailyReportingItem.Leave = vcDailyReportingItem.Leave || new VCLeaveModel();

            this.Leave.LeaveTypeId = vcDailyReportingItem.Leave.LeaveTypeId || '';
            this.Leave.LeaveApprovalStatus = vcDailyReportingItem.Leave.LeaveApprovalStatus || '';
            this.Leave.LeaveApprover = vcDailyReportingItem.Leave.LeaveApprover || '';
            this.Leave.LeaveReason = vcDailyReportingItem.Leave.LeaveReason || '';
        }

        this.IsActive = vcDailyReportingItem.IsActive || true;
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.RequestType = 0; // New
    }
}
