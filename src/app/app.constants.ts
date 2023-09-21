import { Injectable } from '@angular/core';
import { MessageConstants } from './constants/message.constant';
import { HtmlConstants } from './constants/html.constant';
import { ServiceConstants } from './constants/service.constant';
import { RequestType } from './constants/request.type';
import { RegexPatternConstants } from './constants/regex.pattern.constant';

@Injectable()
export class AppConstants {
    constructor() {
        this.Messages = new MessageConstants();
        this.Html = new HtmlConstants();
        this.Services = new ServiceConstants();
        this.Regex = new RegexPatternConstants();
    }

    public Messages: MessageConstants;
    public Html: HtmlConstants;
    public Services: ServiceConstants;
    public Regex: RegexPatternConstants;

    public PageType: typeof RequestType = RequestType;;

    private static _userId: string;
    public static get UserId(): string {
        return this._userId;
    }
    public static set UserId(value: string) {
        this._userId = value;
    }

    private static _isAdmin: boolean;
    public static get IsAdmin(): boolean {
        return this._isAdmin;
    }
    public static set IsAdmin(value: boolean) {
        this._isAdmin = value;
    }

    private static _authToken: string;
    public static get AuthToken(): string {
        return this._authToken;
    }
    public static set AuthToken(value: string) {
        this._authToken = value;
    }

    public static AccessTokenLocalStorage: string = "accessToken";
    public static AccessTokenServer: string = "X-Auth-Token";
    public static UserLocalStorage: string = "ems-user";
    public static ResourceAccessLocalStorage: string = "resourceAccessRaw";
    public static DefaultContentTypeHeader: string = "application/json; charset=utf-8";
    public static FormDataContentTypeHeader: string = "multipart/form-data";
    public static Accept: string = "application/json";
    public static LoginPageUrl: string = "/login";
    public static RegistrationPageUrl: string = "/new-account";
    public static ErrorInputClass: string = "has-error";
    public static SuccessInputClass: string = "has-success";
    public ServerDateFormat: string = "yyyy/MM/dd hh:mm:ss a";
    public ShortDateFormat: string = "dd/MM/yyyy";
    public FullDateFormat: string = "dd/MM/yyyy hh:mm:ss a";
    public DefaultStateId: string = "DL";
    public BackDatedReportingDays: number = 45;

    public UserRoleIds: string = "Roles : DisRP,DisEO,BRP";
    public SuperUser: string = "a9a77b00-1db2-45f5-9387-fd3232771608";
    public DistrictEducationOfficer: string = "a731e5db-6e24-4204-b2f5-3b06a0701379";
    public DistrictResourcePerson: string = "25ed872e-9482-11eb-9da5-0a761174c048";
    public DivisionEducationOfficer: string = "73498ff4-3894-478e-a31b-60123d734bf5";
    public BlockEducationOfficer: string = "47c3bbb7-aea3-48cb-956d-cd7a0c4fcb70";
    public BlockResoursePerson: string = "f1fe3a0f-4ee8-4f1d-ab3b-6d9d224c4396";
    public DefaultImageUrl: string = "/src/assets/images/no-image.png";
    public DefaultImageState: any = JSON.parse('{"detail":{"checked":false,"value":"false"}}');


    /*Generate StudentUniqueID*/

    //Organisation Code
    public OrganisationCode = {
        GovtOrg: '1',
        PrivateOrg: '2',
    }
    //Program Code
    public ProgramCode = {
        Vocational: '1',
        NonVocational: '0',
    }
    //State Code
    public StateCode = {
        Uttarakhand: '01',
        Delhi: '07', //Example
        Maharastra: '06', //Example
        Oddisa: '05', //Example
    }
    //Application Code
    public ApplicationCode = {
        BasicPathways: '01',
        LHDelhi: '02',
        MHDelhi: '03',
        GJDelhi: '04',
        LHUttarakhand: '05',
    }
    //Gender Code
    public GenderCode = {
        Girl: '1',
        Boy: '2'
    };

    //Class Code
    public ClassCode = {
        'Class 9': '09',
        'Class 10': '10',
        'Class 11': '11',
        'Class 12': '12',
    };

    public Actions = {
        Add: "add",
        New: "new",
        Save: "save",
        Edit: "edit",
        View: "view",
        Update: "update",
        Delete: "delete",
        Cancel: "cancel",
        Clear: "clear"
    };

    public DocumentType = {
        VTP: "VTPCertificate",
        VTReporting: "VTDailyReporting",
        EmailAttachments: "EmailAttachments",
        GuestLecture: "GuestLecture",
        FieldVisit: "FieldIndustryVisits",
        BulkUploadData: 'BulkUpload',
        VCSchoolVisit: "VCSchoolVisits",
        ComplaintScreenshot: "ComplaintScreenshots",
        ExitSurveyStudentsData: "ExitSurvey"
    };
}