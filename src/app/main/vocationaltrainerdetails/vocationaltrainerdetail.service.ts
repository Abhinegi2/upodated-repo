import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';

@Injectable()
export class VocationaltrainerdetailService {
    constructor(private http: BaseService) { }

    getVocationaltrainerdetails(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.Vocationaltrainerdetail.GetAll)
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
            .HttpPost(this.http.Services.Vocationaltrainerdetail.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationaltrainerdetailById(vocationaltrainerdetailId: string) {
        let requestParams = {
            DataId: vocationaltrainerdetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateVocationaltrainerdetail(formData: any) {
        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteVocationaltrainerdetailById(vocationaltrainerdetailId: string) {
        var vocationaltrainerdetailParams = {
            DataId: vocationaltrainerdetailId
        };

        return this.http
            .HttpPost(this.http.Services.Vocationaltrainerdetail.Delete, vocationaltrainerdetailParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVocationalTrainerDetail(userModel): Observable<any[]> {
        // let vtpRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByUserId', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, SelectTitle: 'Vocational Training Provider' });
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'AccountsByVocationalTrainers', SelectTitle: 'Vocational Trainer' }, false);
        let socialCategoryRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SocialCategory', SelectTitle: 'Social Category' });
        // let natureOfAppointmentRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'NatureOfAppointment', SelectTitle: 'Nature Of Appointment' });
        let academicQualificationRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'AcademicQualification', SelectTitle: 'Academic Qualification' });
        let professionalQualificationRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'ProfessionalQualification', SelectTitle: 'Professional Qualification' });
        let industryTrainingExperienceRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'IndustryTrainingExperience', SelectTitle: 'Industry Training Experience' });
        let genderRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Gender', SelectTitle: 'Gender' });
        // let vcRequest = this.http.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Vocational Coordinator' }, false);
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([ socialCategoryRequest, academicQualificationRequest, professionalQualificationRequest, industryTrainingExperienceRequest, genderRequest,vtRequest]);
    }
}
