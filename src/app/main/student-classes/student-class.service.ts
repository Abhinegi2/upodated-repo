import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from "app/models/user.model";
import { CommonService } from "app/services/common.service";

@Injectable()
export class StudentClassService {
    constructor(private http: BaseService, private commonService: CommonService) { }

    getStudentClasses(): Observable<any> {
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

    GetAllByCriteria(filters: any): Observable<any> {
        return this.http
            .HttpPost(this.http.Services.StudentClass.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getStudentClassById(studentId: string) {
        let requestParams = {
            DataId: studentId
        };

        return this.http
            .HttpPost(this.http.Services.StudentClass.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateStudentClass(formData: any) {
        return this.http
            .HttpPost(this.http.Services.StudentClass.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteStudentClassById(studentId: string) {
        var studentClassParams = {
            DataId: studentId
        };

        return this.http
            .HttpPost(this.http.Services.StudentClass.Delete, studentClassParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforStudentClass(userModel: UserModel): Observable<any[]> {
        let SchoolRequest = this.commonService.GetMasterDataByType({ DataType: 'Schools', UserId: userModel.UserTypeId, roleId: userModel.RoleCode, SelectTitle: 'School' }, false);
        let genderRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'StudentGender', SelectTitle: 'Gender' });
        let sectorRequest = this.http.GetMasterDataByType({ DataType: 'Sectors', SelectTitle: 'Sector' });
        let AcademicYears = this.http.GetMasterDataByType({ DataType: 'AcademicYears', ParentId: userModel.EmailId, SelectTitle: 'Academic Years' });
        let classRequest = this.http.GetMasterDataByType({ DataType: 'SchoolClasses', SelectTitle: 'Classes' });
        let cswnRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'CSWNStatus',parentId:'CSWNStatus', SelectTitle: 'CSWNStatus' });
        let streamRequest = this.http.GetMasterDataByType({ DataType: 'DataValues',parentId:'Stream', SelectTitle: 'Stream' });
        let assessmentToBeConductedRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'AssessmentToBeConducted', SelectTitle: 'Assessment To Be Conducted' });
        let socialCategoryRequest = this.http.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'SocialCategory', SelectTitle: 'Social Category' });

        //let jobroleRequest = this.http.GetMasterDataByType({ DataType: 'JobRoles', SelectTitle: 'JobRole' });
        // let schoolsForVTRequest = this.commonService.GetMasterDataByType({ DataType: 'SchoolsForVT', UserId: userModel.UserTypeId, SelectTitle: 'School' }, false);
        // let academicYearRequest = this.http.GetMasterDataByType({ DataType: 'AcademicYearsByVT', RoleId: userModel.RoleCode, ParentId: userModel.UserTypeId, SelectTitle: 'Academic Year' });
        // let vtpRequest = this.commonService.GetVTPByAYId(userModel.RoleCode, userModel.UserTypeId, userModel.AcademicYearId)

        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([
            SchoolRequest,
            genderRequest,
            sectorRequest,
            AcademicYears,
            classRequest,
            socialCategoryRequest,
            cswnRequest,
            streamRequest,
            assessmentToBeConductedRequest
            // sectorRequest,
            // academicYearByGVT,
            // allAcademicYears,
            // classRequest,
            // schoolsForVTRequest,
            //academicYearRequest,
            // vtpRequest
        ]);
    }
}
