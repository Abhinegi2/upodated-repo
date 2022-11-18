import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class SummaryDashboardService {
    constructor(private http: BaseService) { }

    GetDashboardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.MasterData.GetDashboardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardCardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.MasterData.GetDashboardCardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardSchoolChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardSchoolChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardVocationalTrainersCardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardVocationalTrainersCardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardJobRoleUnitsCardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardJobRoleUnitsCardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardStudentsCardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardStudentsCardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardClassesCardData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardClassesCardData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardGuestLectureChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardGuestLectureChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }
    GetDashboardFieldVisitChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardFieldVisitChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }
    GetDashboardVTAttendanceChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardVTAttendanceChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }
    GetDashboardVCAttendanceChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardVCAttendanceChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardStudentAttendanceChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardStudentAttendanceChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardSchoolVisitStatusChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardSchoolVisitStatusChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardIssueManagementStatusChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardIssueManagementStatusChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardCourseMaterialChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardCourseMaterialChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardToolsAndEquipmentChartData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardToolsAndEquipmentChartData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardCourseMaterialsDrilldownData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardCourseMaterialsDrilldownData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardSchoolVisitsByMonth(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardSchoolVisitsByMonth, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetDashboardSchoolVisitsByVTP(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.DashboardGraphData.GetDashboardSchoolVisitsByVTP, filters)
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

    GetDropdownForReports(userModel: any): Observable<any> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let divisionRequest = this.http.GetMasterDataByType({ DataType: 'Divisions', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, ParentId: userModel.DefaultStateId, SelectTitle: 'Division' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', UserId: userModel.LoginId, SelectTitle: 'Sector' });
        let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', UserId: userModel.LoginId, SelectTitle: 'Vocational Training Provider' });
        //let vocationalCoordinatorRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'Vocational Training Providers' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Class' });
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' });
        let schoolManagementRequest = this.http.GetMasterDataByType({ DataType: 'BasicList', ParentId: 'SchoolManagement', SelectTitle: 'School Management' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, divisionRequest, sectorRequest, vtpRequest, classRequest, monthRequest, schoolManagementRequest]);
    }

    GetVCAndVTAttendanceReports(dashboardParams: any): Observable<any> {
        let vtParams = JSON.parse(JSON.stringify(dashboardParams));
        vtParams.DataType = 'ByMonth';

        let vtRequest = this.GetDashboardVTAttendanceChartData(vtParams);

        let vcParams = JSON.parse(JSON.stringify(dashboardParams));
        vcParams.DataType = 'ByMonth';
        let vcRequest = this.GetDashboardVCAttendanceChartData(vcParams);

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([vtRequest, vcRequest]);
    }
}
