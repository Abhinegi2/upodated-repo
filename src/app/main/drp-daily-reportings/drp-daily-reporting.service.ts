import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { DRPDailyReportingModel } from './drp-daily-reporting.model';
import { FormGroup } from '@angular/forms';
import { DRPIndustryExposureVisitModel } from './drp-industry-exposure-visit.model';
import { DRPLeaveModel } from './drp-leave.model';
import { DRPHolidayModel } from './drp-holiday.model';

@Injectable()
export class DRPDailyReportingService {
    constructor(private http: BaseService) { }

    getDRPDailyReportings(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.DRPDailyReporting.GetAll)
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
            .HttpPost(this.http.Services.DRPDailyReporting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getDRPDailyReportingById(dailyReportingId: string) {
        let requestParams = {
            DataId: dailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.DRPDailyReporting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateDRPDailyReporting(formData: any) {
        return this.http
            .HttpPost(this.http.Services.DRPDailyReporting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteDRPDailyReportingById(dailyReportingId: string) {
        var dailyReportingParams = {
            DataId: dailyReportingId
        };

        return this.http
            .HttpPost(this.http.Services.DRPDailyReporting.Delete, dailyReportingParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownForDRPDailyReporting(): Observable<any[]> {
        let reportTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'DRPReportType', SelectTitle: 'Report Type' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([reportTypeRequest]);
    }

    getDRPDailyReportingModelFromFormGroup(formGroup: FormGroup): DRPDailyReportingModel {
        let dailyReportingModel = new DRPDailyReportingModel();

        dailyReportingModel.ReportType = formGroup.get("ReportType").value;
        dailyReportingModel.ReportDate = this.http.getDateTimeFromControl(formGroup.get("ReportDate").value);
        dailyReportingModel.WorkingDayTypeIds = (dailyReportingModel.ReportType == '307') ? formGroup.get("WorkingDayTypeIds").value : [];
        dailyReportingModel.WorkTypeDetails = formGroup.get("WorkTypeDetails").value;
        dailyReportingModel.SchoolId = formGroup.get("SchoolId").value;

        // Industry Exposure Visit
        if (formGroup.controls.industryExposureVisitGroup != null) {
            dailyReportingModel.IndustryExposureVisit = new DRPIndustryExposureVisitModel();
            dailyReportingModel.IndustryExposureVisit.TypeOfIndustryLinkage = formGroup.controls.industryExposureVisitGroup.get('TypeOfIndustryLinkage').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonName = formGroup.controls.industryExposureVisitGroup.get('ContactPersonName').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonMobile = formGroup.controls.industryExposureVisitGroup.get('ContactPersonMobile').value;
            dailyReportingModel.IndustryExposureVisit.ContactPersonEmail = formGroup.controls.industryExposureVisitGroup.get('ContactPersonEmail').value;
        }

        // Holiday Type
        if (formGroup.controls.holidayGroup != null) {
            dailyReportingModel.Holiday = new DRPHolidayModel();
            dailyReportingModel.Holiday.HolidayTypeId = formGroup.controls.holidayGroup.get('HolidayTypeId').value;
            dailyReportingModel.Holiday.HolidayDetails = formGroup.controls.holidayGroup.get('HolidayDetails').value;
        }

        // Leave
        if (formGroup.controls.leaveGroup != null) {
            dailyReportingModel.Leave = new DRPLeaveModel();
            dailyReportingModel.Leave.LeaveTypeId = formGroup.controls.leaveGroup.get('LeaveTypeId').value;
            dailyReportingModel.Leave.LeaveApprovalStatus = formGroup.controls.leaveGroup.get('LeaveApprovalStatus').value;
            dailyReportingModel.Leave.LeaveApprover = formGroup.controls.leaveGroup.get('LeaveApprover').value;
            dailyReportingModel.Leave.LeaveReason = formGroup.controls.leaveGroup.get('LeaveReason').value;
        }

        return dailyReportingModel;
    }
}
