import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class CompareDashboardService {
    constructor(private http: BaseService) { }

    GetCompareSchoolsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareSchoolsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareCourseMaterialsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareCourseMaterialsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareToolsAndEquipmentsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareToolsAndEquipmentsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareStudentsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareStudentsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareNewEnrolmentAndDropoutStudentsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareNewEnrolmentAndDropoutStudentsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareGuestLecturesData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareGuestLecturesData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareFieldVisitsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareFieldVisitsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareTrainersData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareTrainersData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareCoordinatorsData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareCoordinatorsData, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCompareVTVCReportingData(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.CompareDashboardData.GetCompareVTVCReportingData, filters)
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
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let vocationalCoordinatorRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProviders', SelectTitle: 'Vocational Training Providers' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Class' });
        let monthRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Months', SelectTitle: 'Month' });
        let blockRequest = this.http.GetMasterDataByType({ DataType: 'Block', SelectTitle: 'Block' });
        let schoolManagementRequest = this.http.GetMasterDataByType({ DataType: 'BasicList', ParentId: 'SchoolManagement', SelectTitle: 'School Management' });
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, divisionRequest, sectorRequest, vocationalCoordinatorRequest, classRequest, monthRequest, blockRequest, schoolManagementRequest]);
    }
}
