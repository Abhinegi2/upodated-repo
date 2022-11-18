import { Injectable } from "@angular/core";
import { retry, catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ShowDialogComponent } from "app/common/show-dialog/show-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "./authentication.service";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: "root"
})
export class CommonService extends BaseService {
    private secretKey: string = 'gtmtech~02jan!2017';

    constructor(public http: HttpClient,
        public httpHandler: HttpHandler,
        public dialog: MatDialog,
        public authenticationService: AuthenticationService) {
        super(http, httpHandler);
    }

    openShowDialog(msg) {
        return this.dialog.open(ShowDialogComponent, {
            width: "390px",
            disableClose: true,
            panelClass: ["confirm-dialog-container"],
            // position: { top: "10px" },
            data: {
                message: msg
            }
        });
    }

    // getMasterDataByType(formData: any): Observable<any> {
    //     return this.HttpPost(this.Services.MasterData.GetAll, formData)
    //         .pipe(
    //             retry(this.Services.RetryServieNo),
    //             catchError(this.HandleError),
    //             tap((response: any) => {
    //                 return response.Results;
    //             })
    //         );
    // }

    getEncryptText(plainText): string {
        // Option 1
        // var keySize = 256;
        // var salt = CryptoJS.lib.WordArray.random(16);
        // var key = CryptoJS.PBKDF2(this.secretKey, salt, {
        //     keySize: keySize / 32,
        //     iterations: 100
        // });

        // var iv = CryptoJS.lib.WordArray.random(128 / 8);

        // var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        //     iv: iv,
        //     padding: CryptoJS.pad.Pkcs7,
        //     mode: CryptoJS.mode.ECB     // CBC      ECB
        // });

        //var encryptText = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

        // Option 2
        var encryptText = CryptoJS.AES.encrypt(plainText, this.secretKey).toString();

        // Option 3
        // var key = CryptoJS.enc.Utf8.parse(this.secretKey);
        // var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
        // var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
        //     {
        //         keySize: 128 / 8,
        //         iv: iv,
        //         mode: CryptoJS.mode.ECB,
        //         padding: CryptoJS.pad.Pkcs7
        //     });

        // var encryptText = encrypted.toString();

        // Option 4
        // let key: any = 'MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O';
        // //let IV = 'MTIzNDU2Nzg=';
        // var IV = CryptoJS.lib.WordArray.random(128 / 8);

        // const data = JSON.stringify(plainText);
        // const keyHex = CryptoJS.enc.Utf8.parse(key);
        // const iv = CryptoJS.enc.Utf8.parse(IV);

        // const mode = CryptoJS.mode.ECB;
        // const padding = CryptoJS.pad.Pkcs7;
        // const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, {
        //     iv,
        //     mode,
        //     padding
        // });

        // var encryptText = encrypted.toString();

        // Option 5       
        // let encryptionKey = CryptoJS.enc.Utf8.parse(this.secretKey);
        // let salt = CryptoJS.enc.Base64.parse('SXZhbiBNZWR2ZWRldg=='); // this is the byte array in .net fiddle

        // let iterations = 1000; // https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes?view=netcore-3.1
        // let keyAndIv = CryptoJS.PBKDF2(encryptionKey, salt, { keySize: 256 / 32 + 128 / 32, iterations: iterations, hasher: CryptoJS.algo.SHA1 }); // so PBKDF2 in CryptoJS is direct in that it
        // // always begins at the beginning of the password, whereas the .net
        // // implementation offsets by the last length each time .GetBytes() is called
        // // so we had to generate a Iv + Salt password and then split it
        // let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);

        // let key = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
        // let iv = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(64, hexKeyAndIv.length));

        // // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
        // let encryptText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf16LE.parse(plainText), key, { iv: iv }).toString();

        return encryptText;
    }

    getDecryptText(encryptText): string {
        // Option 1
        // var keySize = 256;
        // var key = CryptoJS.enc.Utf8.parse(this.secretKey);
        // var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

        // var decryptedText = CryptoJS.AES.decrypt(encryptText, key, {
        //     keySize: keySize / 32,
        //     iv: iv,
        //     padding: CryptoJS.pad.Pkcs7,
        //     mode: CryptoJS.mode.ECB
        // });

        // return decryptedText.toString(CryptoJS.enc.Utf8);

        // Option 2
        var decryptedText = CryptoJS.AES.decrypt(encryptText, this.secretKey);
        return decryptedText.toString(CryptoJS.enc.Utf8);

        // Option 3
        // var key = CryptoJS.enc.Utf8.parse(this.secretKey);
        // var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
        // var decrypted = CryptoJS.AES.decrypt(encryptText, key, {
        //     keySize: 128 / 8,
        //     iv: iv,
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        // });

        //return decrypted.toString(CryptoJS.enc.Utf8);

        // // Option 4
        // let key: any = 'MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O';

        // //let IV = 'MTIzNDU2Nzg=';
        // var IV = CryptoJS.lib.WordArray.random(128 / 8);

        // const keyHex = CryptoJS.enc.Utf8.parse(key);
        // const iv = CryptoJS.enc.Utf8.parse(IV);
        // const mode = CryptoJS.mode.ECB;
        // const padding = CryptoJS.pad.Pkcs7;
        // const decrypted = CryptoJS.TripleDES.decrypt(encryptText, keyHex, {
        //     iv,
        //     mode,
        //     padding
        // });

        // let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        // return JSON.parse(decryptedText);
    }

    // var plainText = 'Rakesh Gautam';    
    // var encryptText = this.commonService.getEncryptText(plainText);
    // var decryptText = this.commonService.getDecryptText(encryptText);
    // console.log(encryptText, decryptText);

    // var encodeText = btoa(plainText); 
    // var decodeText = atob(encodeText); 
    // console.log(encodeText, decodeText)

    GetClassesByVTId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetClassesByVTId;

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                response.Results.unshift({ Id: null, Name: "Select Class", Description: "", SequenceNo: 1 });
                return response;
            })
        );
    }

    GetSectionsByVTClassId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSectionsByVTClassId;

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                response.Results.unshift({ Id: null, Name: "Select Section", Description: "", SequenceNo: 1 });
                return response;
            })
        );
    }

    GetUnitsByClassAndModuleId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetUnitsByClassAndModuleId;
        let selectTitle = (formData.SelectTitle == undefined ? "Select" : "Select " + formData.SelectTitle);

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                response.Results.unshift({ Id: null, Name: selectTitle, Description: "", SequenceNo: 1 });
                return response;
            })
        );
    }

    GetSessionsByUnitId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSessionsByUnitId;

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                return response;
            })
        );
    }

    GetSchoolsByVCId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSchoolsByVCId;
        let selectTitle = (formData.SelectTitle == undefined ? "Select" : "Select " + formData.SelectTitle);

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                response.Results.unshift({ Id: null, Name: selectTitle, Description: "", SequenceNo: 1 });
                return response;
            })
        );
    }

    GetSchoolsByDRPId(formData: any) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSchoolsByDRPId;
        let selectTitle = (formData.SelectTitle == undefined ? "Select" : "Select " + formData.SelectTitle);

        return this.http.post(this.httpUrl, formData).pipe(
            retry(0),
            catchError(this.HandleError),
            tap(function (response: any) {
                response.Results.unshift({ Id: null, Name: selectTitle, Description: "", SequenceNo: 1 });
                return response;
            })
        );
    }

    getStudentsByClassId(formData: any): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetStudentsByClassIdForVT;

        return this.http
            .post(this.httpUrl, formData)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetCourseModuleUnitSessions(formData: any): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetCourseModuleUnitSessions;

        return this.http
            .post(this.httpUrl, formData)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetClassSectionsByVTId(formData: any): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetClassSectionsByVTId;

        return this.http
            .post(this.httpUrl, formData)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetStudentsByVTId(formData: any): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetStudentsByVTId;

        return this.http
            .post(this.httpUrl, formData)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetSchoolVTPSectorsByUserId(formData: any): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSchoolVTPSectorsByUserId;

        return this.http
            .post(this.httpUrl, formData)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    GetNextAcademicYear(): Observable<any> {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetNextAcademicYear;

        return this.http.get(this.httpUrl)
            .pipe(
                retry(0),
                catchError(this.HandleError),
                tap(response => {
                    return response.Results;
                })
            );
    }

    getVocationalTrainingProvidersByUserId(userModel: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByUserId', RoleId: userModel.RoleCode, UserId: userModel.UserTypeId, SelectTitle: 'VTP' }, false).subscribe((response: any) => {
                if (response.Success) {
                    resolve(response.Results);
                }
            });
        });
        return promise;
    }

    getVTPByVC(userModel: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.GetMasterDataByType({ DataType: 'VTPByVC', UserId: userModel.LoginId, ParentId: userModel.UserTypeId, SelectTitle: 'VC' }, false).subscribe((response: any) => {
                if (response.Success) {
                    resolve(response.Results);
                }
            });
        });
        return promise;
    }

    getVCVTPByVT(userModel: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.GetMasterDataByType({ DataType: 'VCVTPByVT', UserId: userModel.LoginId, ParentId: userModel.UserTypeId, SelectTitle: 'VT' }, false).subscribe((response: any) => {
                if (response.Success) {
                    resolve(response.Results);
                }
            });
        });
        return promise;
    }

    GetVTPandVCIdBySchoolId(schoolId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTPandVCIdBySchoolId;
        let requestParams = {
            DataId: schoolId
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTPVCAndSchoolIdByVTId(vtId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTPVCAndSchoolIdByVTId;
        let requestParams = {
            DataId: vtId
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    getVTPVCAndSchoolIdByHMId(hmId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTPVCAndSchoolIdByHMId;
        let requestParams = {
            DataId: hmId
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTPByHMId(academicYearId: string, hmId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTPByHMId;
        let requestParams = {
            DataId: academicYearId,
            DataId1: hmId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVCByHMId(academicYearId: string, hmId: string, vtpId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVCByHMId;
        let requestParams = {
            DataId: academicYearId,
            DataId1: hmId,
            DataId2: vtpId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTByHMId(academicYearId: string, hmId: string, vcId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTByHMId;
        let requestParams = {
            DataId: academicYearId,
            DataId1: hmId,
            DataId2: vcId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetSchoolByHMId(academicYearId: string, hmId: string, vcId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetSchoolByHMId;
        let requestParams = {
            DataId: academicYearId,
            DataId1: hmId,
            DataId2: vcId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTBySchoolIdHMId(academicYearId: string, hmId: string, vcId: string, schoolId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTBySchoolIdHMId;
        let requestParams = {
            DataId: academicYearId,
            DataId1: hmId,
            DataId2: vcId,
            DataId3: schoolId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTPByAYId(roleId: string, userId: string, academicYearId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTPByAYId;
        let requestParams = {
            DataId: roleId,
            DataId1: userId,
            DataId2: academicYearId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVCByAYAndVTPId(roleId: string, userId: string, academicYearId: string, vtpId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVCByAYAndVTPId;
        let requestParams = {
            DataId: roleId,
            DataId1: userId,
            DataId2: academicYearId,
            DataId3: vtpId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }

    GetVTByAYAndVCId(roleId: string, userId: string, academicYearId: string, vcId: string) {
        this.httpUrl = this.Services.BaseUrl + this.Services.MasterData.GetVTByAYAndVCId;
        let requestParams = {
            DataId: roleId,
            DataId1: userId,
            DataId2: academicYearId,
            DataId3: vcId,
        };

        return this.http
            .post(this.httpUrl, requestParams)
            .pipe(
                retry(this.Services.RetryServieNo),
                catchError(this.HandleError),
                tap(function (response: any) {
                    return response.Results;
                })
            );
    }
}
