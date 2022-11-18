import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { VCDailyReportingModel } from './vc-daily-reporting.model';
import { FormGroup } from '@angular/forms';
import { VCIndustryExposureVisitModel } from './vc-industry-exposure-visit.model';
import { VCLeaveModel } from './vc-leave.model';
import { VCHolidayModel } from './vc-holiday.model';

@Injectable()
export class VCDailyReportingService {
    constructor(private http: BaseService) { }

    getVCDailyReportings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VCDailyReporting.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetAllByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.VCDailyReporting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVCDailyReportingById(vcDailyReportingId: string) {
        let requestParams = {
            DataId: vcDailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCDailyReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVCDailyReporting(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VCDailyReporting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVCDailyReportingById(vcDailyReportingId: string) {
        var vcDailyReportingParams = {
            DataId: vcDailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.VCDailyReporting.Delete, vcDailyReportingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownForVCDailyReporting(): Observable<any[]> {
        let reportTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VCReportType', SelectTitle: 'Report Type' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([reportTypeRequest]);
    }

    getVCDailyReportingModelFromFormGroup(formGroup: FormGroup): VCDailyReportingModel {
        let dailyReportingModel = new VCDailyReportingModel();

        dailyReportingModel.ReportType = formGroup.get("ReportType").value;
        dailyReportingModel.ReportDate = this.http.getDateTimeFromControl(formGroup.get("ReportDate").value);
        dailyReportingModel.WorkingDayTypeIds = (dailyReportingModel.ReportType == '49') ? formGroup.get("WorkingDayTypeIds").value : [];
        dailyReportingModel.WorkTypeDetails = formGroup.get("WorkTypeDetails").value;
        dailyReportingModel.SchoolId = formGroup.get("SchoolId").value;

        // Industry Exposure Visit
        if (formGroup.controls.industryExposureVisitGroup != null) {
            dailyReportingModel.IndustryExposureVisit = new VCIndustryExposureVisitModel();
            dailyReportingModel.IndustryExposureVisit.TypeOfIndustryLinkage = formGroup.controls.industryExposureVisitGroup.get('TypeOfIndustryLinkage').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonName = formGroup.controls.industryExposureVisitGroup.get('ContactPersonName').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonMobile = formGroup.controls.industryExposureVisitGroup.get('ContactPersonMobile').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonEmail = formGroup.controls.industryExposureVisitGroup.get('ContactPersonEmail').value;
        }

        // Holiday Type
        if (formGroup.controls.holidayGroup != null) {
            dailyReportingModel.Holiday = new VCHolidayModel();
            dailyReportingModel.Holiday.HolidayTypeId = formGroup.controls.holidayGroup.get('HolidayTypeId').value;
            dailyReportingModel.Holiday.HolidayDetails = formGroup.controls.holidayGroup.get('HolidayDetails').value;
        }

        // Leave
        if (formGroup.controls.leaveGroup != null) {
            dailyReportingModel.Leave = new VCLeaveModel();
            dailyReportingModel.Leave.LeaveTypeId = formGroup.controls.leaveGroup.get('LeaveTypeId').value;
            dailyReportingModel.Leave.LeaveModeId = formGroup.controls.leaveGroup.get('LeaveModeId').value;
            dailyReportingModel.Leave.LeaveApprovalStatus = formGroup.controls.leaveGroup.get('LeaveApprovalStatus').value;
            dailyReportingModel.Leave.LeaveApprover = formGroup.controls.leaveGroup.get('LeaveApprover').value;
            dailyReportingModel.Leave.LeaveReason = formGroup.controls.leaveGroup.get('LeaveReason').value;
        }

        return dailyReportingModel;
    }
}
