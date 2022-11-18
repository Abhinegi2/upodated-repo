import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class VTStudentExitSurveyDetailService {
    constructor(private http: BaseService) { }

    // getVTStudentExitSurveyDetails(): Observable<any> {
    //     return this.http
    //         .HttpGet(this.http.Services.VTStudentPlacementDetail.GetAll)
    //         .pipe(
    //             retry(this.http.Services.RetryServieNo),
    //             catchError(this.http.HandleError),
    //             tap(response => {
    //                 return response.Results;
    //             })
    //         );
    // }

    GetStudentsForExitForm(formData: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.GetStudentsForExitForm, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTStudentDetailById(exitStudentId: string) {
        var requestParams = {
            ExitStudentId: exitStudentId
        };

        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    getVTStudentExitSurveyReportById(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.GetExitSurveyDetailsById, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }



    createOrUpdateVTStudentExitSurveyDetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    createOrUpdateExitStudentDetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.UpdateExitStudentDetails, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    createOrUpdateVTStudentDetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.CreateOrUpdateStudentDetail, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    UploadExcelData(formData: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.VTExitSurveyDetails.UploadFile, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    deleteVTStudentExitSurveyDetailById(vtStudentExitSurveyDetailId: string) {
        var vtStudentExitSurveyDetailParams = {
            DataId: vtStudentExitSurveyDetailId
        };

        return this.http
            .HttpPost(this.http.Services.VTStudentPlacementDetail.Delete, vtStudentExitSurveyDetailParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getAcademicYearsAndClasses(): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'School Classes' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, classRequest]);
    }

    getClassesAndStudents(): Observable<any[]> {
        let studentRequest = this.http.GetMasterDataByType({ DataType: 'Students', SelectTitle: 'Student' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([studentRequest]);
    }

    getStudentExitSurveyDropdown(userModel: UserModel): Observable<any[]> {
        let districtRequest = this.http.GetMasterDataByType({ DataType: 'DistrictsBySateCode', ParentId: userModel.DefaultStateId, SelectTitle: 'District' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let natureOfWorkRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'NatureOfWork', SelectTitle: 'Nature Of Work' });
        let sectorsOfEmploymentRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SectorsOfEmployment', SelectTitle: 'Sector Of Employment' });
        let veNotContinuingReasonsRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VENotContinuingReasons', SelectTitle: 'The Reason' });
        let topicsOfJobInterestRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'TopicsOfJobInterest', SelectTitle: 'Your Interest' });
        let preferredLocationRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'PreferredLocationForEmployment', SelectTitle: 'Preferred Location For Employment' });
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let religionRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Religion', SelectTitle: 'Religion' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([districtRequest, sectorRequest, natureOfWorkRequest, sectorsOfEmploymentRequest, veNotContinuingReasonsRequest, topicsOfJobInterestRequest, preferredLocationRequest, academicYearRequest, religionRequest]);
    }
}
