import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";
import { CommonService } from "app/services/common.service";

@Injectable()
export class VocationalTrainerService {
    constructor(private http: BaseService, private commonService: CommonService) { }

    getVocationalTrainers(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VocationalTrainer.GetAll)
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
            .HttpPost(this.http.Services.VocationalTrainer.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationalTrainerById(vtId: string) {
        let requestParams = {
            DataId: vtId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVocationalTrainer(formData: any) {
        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVocationalTrainerById(vtId: string) {
        var vocationalTrainerParams = {
            DataId: vtId
        };

        return this.http
            .HttpPost(this.http.Services.VocationalTrainer.Delete, vocationalTrainerParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVocationalTrainer(userModel: UserModel): Observable<any[]> {
        // let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByUserId', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, SelectTitle: 'Vocational Training Provider' });
        //let vtRequest = this.http.GetMasterDataByType({ DataType: 'UsersByRole', RoleId: 'VT', SelectTitle: 'Vocational Trainer' }, false);
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'NewVT', RoleId: userModel.RoleCode, ParentId: 'Vocational Trainer', SelectTitle: 'Vocational Trainer' }, false);
        let socialCategoryRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SocialCategory', SelectTitle: 'Social Category' });
        // let natureOfAppointmentRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'NatureOfAppointment', SelectTitle: 'Nature Of Appointment' });
        let academicQualificationRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'AcademicQualification', SelectTitle: 'Academic Qualification' });
        let professionalQualificationRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'ProfessionalQualification', SelectTitle: 'Professional Qualification' });
        let industryTrainingExperienceRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'IndustryTrainingExperience', SelectTitle: 'Industry Training Experience' });
        let genderRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Gender', SelectTitle: 'Gender' });
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([vtRequest, socialCategoryRequest, academicQualificationRequest, professionalQualificationRequest, industryTrainingExperienceRequest, genderRequest, academicYearRequest]);
    }

    getInitVocationalTrainersData(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' });
        let socialCategoryRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SocialCategory', SelectTitle: 'Social Category' });
        // let vtpRequest = this.commonService.GetVTPByAYId(userModel.RoleCode, userModel.UserTypeId, userModel.AcademicYearId)

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([
            academicYearRequest,
            // vtpRequest, 
            socialCategoryRequest]);
    }
}
