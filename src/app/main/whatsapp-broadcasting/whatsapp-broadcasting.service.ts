import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { BaseService } from 'app/services/base.service';
import { UserModel } from 'app/models/user.model';

@Injectable()
export class whatsappBroadcastingService {
    constructor(private http: BaseService) { }

    getMessageTemplates(): Observable<any> {
        return this.http
            .HttpGet(this.http.Services.WhatsappBroadcasting.GetAll)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getGlificTemplate(): Observable<any> {
        const body = {
            // payload
        };
    
        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.GetGlificTemplate, body)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }
    // GetAccessToken
    GetAccessToken(): Observable<any> {
        const body = {
            // payload
        };
    
        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.GetAccessToken, body)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    console.log(response,"respp")

                    return response.Results;
                })
            );
    }
    GetTemplateDataById(TemplateId: any): Observable<any> {
        let requestParams = {
            DataId: TemplateId
        };
    
        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.GetTemplateDataById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    CreateContactGroup(data, templateId, userType, inputData): Observable<any> {
        let requestParams = {
            DataId: data,
            TemplateId: templateId,
            UserType: userType,
            InputData: inputData
        };
    
        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.CreateContactGroup, requestParams) 
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
            .HttpPost(this.http.Services.WhatsappBroadcasting.GetAllByCriteria, filters)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getMessageTemplateById(CampainID: string) {
        let requestParams = {
            DataId: CampainID
        };

        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.GetById, requestParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    createOrUpdateMessageTemplate(formData: any) {
        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.CreateOrUpdate, formData)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    deleteMessageTemplateById(CampainID: string) {
        var messageTemplateParams = {
            DataId: CampainID
        };

        return this.http
            .HttpPost(this.http.Services.WhatsappBroadcasting.Delete, messageTemplateParams)
            .pipe(
                retry(this.http.Services.RetryServieNo),
                catchError(this.http.HandleError),
                tap(response => {
                    return response;
                })
            );
    }

    getDropdownforMessageTemplate(userModel: UserModel): Observable<any[]> {
        let messageTypeRequest = this.http.GetMasterDataByType({ DataType: 'MessageTypes', UserId: userModel.UserTypeId, ParentId: null, SelectTitle: 'School' }, false);
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([messageTypeRequest]);
    }

    getVtData(){
        let vtRequest = this.http.GetMasterDataByType({ DataType: 'AllVTMobile', SelectTitle: '' });
        return vtRequest;
    }
}
