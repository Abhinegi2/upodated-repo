import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';
import { CommonService } from 'app/services/common.service';
import { FormGroup } from '@angular/forms';
import { VTGuestLectureConductedModel } from './vt-guest-lecture-conducted.model';

@Injectable()
export class VTGuestLectureConductedService {
    constructor(private http: CommonService) { }

    getVTGuestLectureConducteds(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTGuestLectureConducted.GetAll)
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
            .HttpPost(this.http.Services.VTGuestLectureConducted.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTGuestLectureConductedById(vtGuestLectureId: string) {
        let requestParams = {
            DataId: vtGuestLectureId
        };

        return this.http
            .HttpPost(this.http.Services.VTGuestLectureConducted.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTGuestLectureConducted(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTGuestLectureConducted.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTGuestLectureConductedById(vtGuestLectureId: string) {
        var vtGuestLectureConductedParams = {
            DataId: vtGuestLectureId
        };

        return this.http
            .HttpPost(this.http.Services.VTGuestLectureConducted.Delete, vtGuestLectureConductedParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getStudentList(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.StudentClass.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTClasses(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTClass.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getDropdownForVTGuestLectureConducted(currentUser: UserModel): Observable<any[]> {
        // let reportTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'VTReportType', SelectTitle: 'Report Type' });
        let glMethodlogyRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'GLMethodology', SelectTitle: 'Guest Lecture Methodology' }, false);
        let glConductedByRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'GLConductedBy', SelectTitle: 'Guest Lecture Conducted By' });
        let glWorkStatusRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'GLWorkStatus', SelectTitle: 'Guest Lecture Work Status' });
        let glTypeRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'GLType', SelectTitle: 'Guest Lecture Type' });
        let classRequest = this.http.GetClassesByVTId({ DataId: currentUser.LoginId, DataId1: currentUser.UserTypeId, SelectTitle: 'Class' });
        let moduleRequest = this.http.GetMasterDataByType({ DataType: 'CourseModules', SelectTitle: 'Modules Taught' });
        let SchoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', UserId: currentUser.UserTypeId, roleId: currentUser.RoleCode, SelectTitle: 'School' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([glMethodlogyRequest, glConductedByRequest, glWorkStatusRequest, glTypeRequest, classRequest, moduleRequest, SchoolRequest]);
    }

    getGuestLectureModelFromFormGroup(formGroup: FormGroup): VTGuestLectureConductedModel {
        let guestLectureModel = new VTGuestLectureConductedModel();

        guestLectureModel.SchoolId = formGroup.get('SchoolId').value;
        guestLectureModel.SectorId = formGroup.get('SectorId').value;
        guestLectureModel.JobRoleId = formGroup.get('JobRoleId').value;
        guestLectureModel.AcademicYearId = formGroup.get('AcademicYearId').value;

        guestLectureModel.ClassTaughtId = formGroup.get("ClassTaughtId").value;
        guestLectureModel.SectionIds = formGroup.get("SectionIds").value;
        guestLectureModel.ReportingDate = this.http.getDateTimeFromControl(formGroup.get("ReportingDate").value);
        guestLectureModel.GLType = formGroup.get("GLType").value;
        guestLectureModel.GLTopic = formGroup.get("GLTopic").value;
        guestLectureModel.ClassTime = formGroup.get("ClassTime").value;
        guestLectureModel.MethodologyIds = formGroup.get("MethodologyIds").value;
        guestLectureModel.GLMethodologyDetails = formGroup.get("GLMethodologyDetails").value;
        //guestLectureModel.GLPhotoInClass = formGroup.get("GLPhotoInClass").value;;
        guestLectureModel.GLConductedBy = formGroup.get("GLConductedBy").value;
        guestLectureModel.GLPersonDetails = formGroup.get("GLPersonDetails").value;
        guestLectureModel.GLName = formGroup.get("GLName").value;
        guestLectureModel.GLMobile = formGroup.get("GLMobile").value;
        guestLectureModel.GLEmail = formGroup.get("GLEmail").value;
        guestLectureModel.GLQualification = formGroup.get("GLQualification").value;
        guestLectureModel.GLAddress = formGroup.get("GLAddress").value;
        guestLectureModel.GLWorkStatus = formGroup.get("GLWorkStatus").value;
        guestLectureModel.GLCompany = formGroup.get("GLCompany").value;
        guestLectureModel.GLDesignation = formGroup.get("GLDesignation").value;
        guestLectureModel.GLWorkExperience = formGroup.get("GLWorkExperience").value;
        //guestLectureModel.GLPhoto = formGroup.get("GLPhoto").value;

        //guestLectureModel.ModuleId = formGroup.get("ModuleId").value;
        //guestLectureModel.UnitId = formGroup.get("UnitId").value;
        //guestLectureModel.SessionIds = formGroup.get("SessionIds").value;

        guestLectureModel.StudentAttendances = formGroup.get("StudentAttendances").value;
        //guestLectureModel.UnitSessionsModels = formGroup.get("UnitSessionsModels").value;

        return guestLectureModel;
    }
}