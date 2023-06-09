import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { CommonService } from "app/services/common.service";

@Injectable()
export class ReportService {
    constructor(private http: BaseService, private commonService: CommonService) { }

    GetGuestLectureConductedReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetGuestLectureConductedReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetFieldIndustryVisitConductedReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetFieldIndustryVisitConductedReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTIssueReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTIssueReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCIssueReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCIssueReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCReportingAttendanceReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCReportingAttendanceReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCSchoolSectorReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCSchoolSectorReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTSchoolSectorReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTSchoolSectorReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetSchoolVTPSectorReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetSchoolVTPSectorReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetSchoolInfoReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetSchoolInformationReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCourseMaterialStatusReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetCourseMaterialStatusReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetfieldAndIndustryVisitStatusReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetFieldAndIndustryVisitStatusReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetGuestLectureStatusReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetGuestLectureStatusReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetStudentAttendanceReportingReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetStudentAttendanceReportingReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetStudentDetailsReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetStudentDetailsReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetStudentEnrollmentReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetStudentEnrollmentReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetToolsAndEquipmentStatusReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetToolsAndEquipmentStatusReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCSchoolVisitSummaryReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCSchoolVisitSummaryReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVocationalTrainerAttendanceReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVocationalTrainerAttendanceReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTPBillSubmissionStatusReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTPBillSubmissionStatusReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTReportingAttendanceReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTReportingAttendanceReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTDailyAttendanceTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTDailyAttendanceTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCDailyAttendanceTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCDailyAttendanceTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTMonthlyAttendanceReport(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTMonthlyAttendanceReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCMonthlyAttendanceReport(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCMonthlyAttendanceReport, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTDailyReportNotSubmittedTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTDailyReportNotSubmittedTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTStudentTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTStudentTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTCourseModuleDailyTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTCourseModuleDailyTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTStudentExitSurveyReportsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTStudentExitSurveyReportsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTDailyMonthlyTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTDailyMonthlyTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCDailyMonthlyTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVCDailyMonthlyTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTPMonthlyTrackingByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.Report.GetVTPMonthlyTrackingByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    DownloadReportFile(paramValue: any): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.Report.DownloadReportFile + paramValue)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    UploadExcelData(formData: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.MasterData.UploadExcelData, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getAcademicYears(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.AcademicYear.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetExitSurveyReportDropdown(userModel: any): Observable<any> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Classes' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, classRequest]);
    }

    GetDropdownForReports(userModel: any): Observable<any> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, ParentId: userModel.DefaultStateId, SelectTitle: 'Division' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', UserId: userModel.LoginId, SelectTitle: 'Sector' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Class' });
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' });
        let schoolManagementRequest = this.http.GetMasterDataByType({ DataType: 'BasicList', ParentId: 'SchoolManagement', SelectTitle: 'School Management' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', SelectTitle: 'School' });

        // let vtpRequest = null;
        // if (userModel.RoleCode == 'VC') {
        //     vtpRequest = this.commonService.GetVTPByAYId(userModel.RoleCode, userModel.UserTypeId, userModel.AcademicYearId);
        // }
        // else if (userModel.RoleCode == 'HM') {
        //     vtpRequest = this.commonService.GetVTPByHMId(userModel.AcademicYearId, userModel.UserTypeId);
        // }
        // else {
        //     vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', UserId: userModel.LoginId, SelectTitle: 'Vocational Training Provider' });
        // }

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, divisionRequest, sectorRequest, /*vtpRequest,*/ classRequest, monthRequest, schoolManagementRequest, schoolRequest]);
    }

    getDropdownforVocationalTrainer(userModel: any): Observable<any[]> {
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'AllVTs', ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([vtRequest]);
    }

    getDropdownforVTCourseModuleTrackingReport(userModel: any): Observable<any[]> {
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainers', ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Class' });
        let sectionRequest = this.http.GetMasterDataByType({ DataType: 'Sections', SelectTitle: 'Section' });
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' });
        let schoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', SelectTitle: 'School' });
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([vtRequest, classRequest, sectionRequest, monthRequest, schoolRequest]);
    }

}
