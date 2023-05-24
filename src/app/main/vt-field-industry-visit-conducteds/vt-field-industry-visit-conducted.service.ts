import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { UserModel } from 'app/models/user.model';
import { CommonService } from 'app/services/common.service';
import { FormGroup } from '@angular/forms';
import { VTFieldIndustryVisitConductedModel } from './vt-field-industry-visit-conducted.model';

@Injectable()
export class VTFieldIndustryVisitConductedService {
    constructor(private http: CommonService) { }

    getVTFieldIndustryVisitConducteds(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTFieldIndustryVisitConducted.GetAll)
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
            .HttpPost(this.http.Services.VTFieldIndustryVisitConducted.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVTFieldIndustryVisitConductedById(vtFieldIndustryVisitConductedId: string) {
        let requestParams = {
            DataId: vtFieldIndustryVisitConductedId
        };

        return this.http
            .HttpPost(this.http.Services.VTFieldIndustryVisitConducted.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVTFieldIndustryVisitConducted(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VTFieldIndustryVisitConducted.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVTFieldIndustryVisitConductedById(vtFieldIndustryVisitConductedId: string) {
        var vtFieldIndustryVisitConductedParams = {
            DataId: vtFieldIndustryVisitConductedId
        };

        return this.http
            .HttpPost(this.http.Services.VTFieldIndustryVisitConducted.Delete, vtFieldIndustryVisitConductedParams)
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

    getDropdownForVTFieldIndustry(currentUser: UserModel): Observable<any[]> {
        let SchoolRequest = this.http.GetMasterDataByType({ DataType: 'Schools', UserId: currentUser.UserTypeId, roleId: currentUser.RoleCode, SelectTitle: 'School' });
        let classRequest = this.http.GetClassesByVTId({ DataId: currentUser.LoginId, DataId1: currentUser.UserTypeId, SelectTitle: 'Class' });
        let moduleRequest = this.http.GetMasterDataByType({ DataType: 'CourseModules', SelectTitle: 'Modules Taught' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6        
        return forkJoin([SchoolRequest, classRequest, moduleRequest]);
    }

    getFieldIndustryVisitModelFromFormGroup(formGroup: FormGroup): VTFieldIndustryVisitConductedModel {
        let fieldIndustryVisitModel = new VTFieldIndustryVisitConductedModel();


        fieldIndustryVisitModel.SchoolId = formGroup.get('SchoolId').value;
        fieldIndustryVisitModel.SectorId = formGroup.get('SectorId').value;
        fieldIndustryVisitModel.JobRoleId = formGroup.get('JobRoleId').value;
        fieldIndustryVisitModel.AcademicYearId = formGroup.get('AcademicYearId').value;

        fieldIndustryVisitModel.ClassTaughtId = formGroup.get("ClassTaughtId").value;
        fieldIndustryVisitModel.ReportingDate = this.http.getDateTimeFromControl(formGroup.get("ReportingDate").value);
        fieldIndustryVisitModel.SectionIds = formGroup.get("SectionIds").value;
        fieldIndustryVisitModel.FieldVisitTheme = formGroup.get("FieldVisitTheme").value;
        fieldIndustryVisitModel.FieldVisitActivities = formGroup.get("FieldVisitActivities").value;
        fieldIndustryVisitModel.FVOrganisation = formGroup.get("FVOrganisation").value;
        fieldIndustryVisitModel.FVOrganisationAddress = formGroup.get("FVOrganisationAddress").value;
        fieldIndustryVisitModel.FVDistance = formGroup.get("FVDistance").value;
        //fieldIndustryVisitModel.FVPicture = formGroup.get("FVPhoto").value;
        fieldIndustryVisitModel.FVContactPersonName = formGroup.get("FVContactPersonName").value;
        fieldIndustryVisitModel.FVContactPersonMobile = formGroup.get("FVContactPersonMobile").value;
        fieldIndustryVisitModel.FVContactPersonEmail = formGroup.get("FVContactPersonEmail").value;
        fieldIndustryVisitModel.FVContactPersonDesignation = formGroup.get("FVContactPersonDesignation").value;
        fieldIndustryVisitModel.FVOrganisationInterestStatus = formGroup.get("FVOrganisationInterestStatus").value;
        fieldIndustryVisitModel.FVOrignisationOJTStatus = formGroup.get("FVOrignisationOJTStatus").value;
        fieldIndustryVisitModel.FeedbackFromOrgnisation = formGroup.get("FeedbackFromOrgnisation").value;
        fieldIndustryVisitModel.Remarks = formGroup.get("Remarks").value;
        fieldIndustryVisitModel.FVStudentSafety = formGroup.get("FVStudentSafety").value;

        //fieldIndustryVisitModel.ModuleId = formGroup.get("ModuleId").value;
        //fieldIndustryVisitModel.UnitId = formGroup.get("UnitId").value;
        //fieldIndustryVisitModel.SessionIds = formGroup.get("SessionIds").value;
        fieldIndustryVisitModel.StudentAttendances = formGroup.get("StudentAttendances").value;
        //fieldIndustryVisitModel.UnitSessionsModels = formGroup.get("UnitSessionsModels").value;

        return fieldIndustryVisitModel;
    }
}
