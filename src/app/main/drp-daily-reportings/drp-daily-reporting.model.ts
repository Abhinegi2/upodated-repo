import { FuseUtils } from '@fuse/utils';
import { DRPLeaveModel } from './drp-leave.model';
import { DRPHolidayModel } from './drp-holiday.model';
import { DRPIndustryExposureVisitModel } from './drp-industry-exposure-visit.model';

export class DRPDailyReportingModel {
    DRPDailyReportingId: string;
    DRPId: string;
    ReportDate: any;
    ReportType: string;
    WorkingDayTypeIds: string;
    WorkTypeDetails: string;
    SchoolId: string;
    
    Leave: DRPLeaveModel;
    Holiday: DRPHolidayModel;
    IndustryExposureVisit: DRPIndustryExposureVisitModel;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(dailyReportingItem?: any) {
        dailyReportingItem = dailyReportingItem || {};

        this.DRPDailyReportingId = dailyReportingItem.DRPDailyReportingId || FuseUtils.NewGuid();
        this.DRPId = dailyReportingItem.DRPId || FuseUtils.NewGuid();
        this.ReportDate = dailyReportingItem.ReportDate || '';
        this.ReportType = dailyReportingItem.ReportType || '';
        this.WorkingDayTypeIds = dailyReportingItem.WorkingDayTypeIds || '';
        this.SchoolId = dailyReportingItem.SchoolId || '';
        this.WorkTypeDetails = dailyReportingItem.WorkTypeDetails || '';

        if (dailyReportingItem.IndustryExposureVisit != null) {
            this.IndustryExposureVisit = new DRPIndustryExposureVisitModel();
            dailyReportingItem.IndustryExposureVisit = dailyReportingItem.IndustryExposureVisit || new DRPIndustryExposureVisitModel();

            this.IndustryExposureVisit.TypeOfIndustryLinkage = dailyReportingItem.IndustryExposureVisit.TypeOfIndustryLinkage || '';
            this.IndustryExposureVisit.ContactPersonName = dailyReportingItem.IndustryExposureVisit.ContactPersonName || '';
            this.IndustryExposureVisit.ContactPersonMobile = dailyReportingItem.IndustryExposureVisit.ContactPersonMobile || '';
            this.IndustryExposureVisit.ContactPersonEmail = dailyReportingItem.IndustryExposureVisit.ContactPersonEmail || '';
        }

        if (dailyReportingItem.Holiday != null) {
            this.Holiday = new DRPHolidayModel();
            dailyReportingItem.Holiday = dailyReportingItem.Holiday || new DRPHolidayModel();

            this.Holiday.HolidayTypeId = dailyReportingItem.Holiday.HolidayTypeId || '';
            this.Holiday.HolidayDetails = dailyReportingItem.Holiday.HolidayDetails || '';
        }

        if (dailyReportingItem.Leave != null) {
            this.Leave = new DRPLeaveModel();
            dailyReportingItem.Leave = dailyReportingItem.Leave || new DRPLeaveModel();

            this.Leave.LeaveTypeId = dailyReportingItem.Leave.LeaveTypeId || '';
            this.Leave.LeaveApprovalStatus = dailyReportingItem.Leave.LeaveApprovalStatus || '';
            this.Leave.LeaveApprover = dailyReportingItem.Leave.LeaveApprover || '';
            this.Leave.LeaveReason = dailyReportingItem.Leave.LeaveReason || '';
        }

        this.IsActive = dailyReportingItem.IsActive || true;
        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.RequestType = 0; // New
    }
}
