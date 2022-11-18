import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";

@Injectable()
export class TransferVTVCVTPAcademicRolloverService {
    constructor(private http: BaseService) { }

    getVTSchoolSectors(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.VTSchoolSector.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVocationalCoordinatorsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVocationalCoordinatorsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;

                })
            );
    }

    GetVocationalTrainersByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVocationalTrainersByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;

                })
            );
    }

    GetVTClassesByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVTClassesByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;

                })
            );
    }

    GetStudentClassesByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetStudentClassesByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;

                })
            );
    }


    GetVTSchoolSectorsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVTSchoolSectorsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVTPSectorsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVTPSectorsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );

    }

    GetSchoolVTPSectorsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetSchoolVTPSectorsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetVCSchoolSectorsByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.TransferVTPVTVC.GetVCSchoolSectorsByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    deleteVTSchoolSectorById(vtSchoolSectorId: string) {
        var vtSchoolSectorParams = {
            DataId: vtSchoolSectorId
        };

        return this.http
            .HttpPost(this.http.Services.VTSchoolSector.Delete, vtSchoolSectorParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforVTSchoolSector(userModel: UserModel): Observable<any[]> {
        let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYearsByVC', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Vocational Trainer' });
        let vcRequest = this.http.GetMasterDataByType({ DataType: 'VocationalCoordinators', SelectTitle: 'Vocational Coordinator' });

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([academicYearRequest, vtRequest, vcRequest]);
    }

    getEligible_VT_VC_VTP_ForTransfer(destinationParams: any): Observable<any> {
        if (destinationParams.EntityType == 'VTP') {
            destinationParams.DataType = 'EligibleVTPsForTransfer';
        }
        else if (destinationParams.EntityType == 'VC') {
            destinationParams.DataType = 'EligibleVCsForTransfer';
        }
        else if (destinationParams.EntityType == 'VT') {
            destinationParams.DataType = 'EligibleVTsForTransfer';
        }

        return this.http.GetMasterDataByType(destinationParams, false);
    }

    Transfer_VTP_VC_VT(formData: any) {
        let serviceUrl = '';

        if (formData.EntityType == 'VTP') {
            serviceUrl = this.http.Services.TransferVTPVTVC.TransferVTP
        }
        else if (formData.EntityType == 'VC') {
            serviceUrl = this.http.Services.TransferVTPVTVC.TransferVC
        }
        else if (formData.EntityType == 'VT') {
            serviceUrl = this.http.Services.TransferVTPVTVC.TransferVT
        }

        return this.http
            .HttpPost(serviceUrl, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getVocationalTrainerById(vtId: string) {
        var requestParams = {
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
}
