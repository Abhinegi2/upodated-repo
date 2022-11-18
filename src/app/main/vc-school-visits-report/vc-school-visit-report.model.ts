import { FuseUtils } from '@fuse/utils';

export class VCSchoolVisitReportModel {
    VCSchoolVisitReportingId: string;
    VCId: string;
    CompanyName: string;
    Month: string;
    VisitDate: Date;
    SchoolId: string;
    DistrictCode: string;
    SchoolEmailId: string;
    PrincipalName: string;
    PrincipalPhoneNo: number;
    SectorId: string;
    JobRoleId: string;
    VTId: string;
    VTPhoneNo: number;
    Labs: string;
    Books: string;
    NoOfGLConducted: number;
    NoOfIndustrialVisits: number;
    SVPhotoWithPrincipalFile: any;
    SVPhotoWithStudentFile: any;
    Class9Boys:number;
    Class9Girls:number;
    Class10Boys:number;
    Class10Girls:number;
    Class11Boys:number;
    Class11Girls:number;
    Class12Boys:number;
    Class12Girls:number;
    TotalBoys:number;
    TotalGirls:number;

    GeoLocation: string;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    RequestType: any;

    constructor(vcSchoolVisitItem?: any) {
        vcSchoolVisitItem = vcSchoolVisitItem || {};

        this.VCSchoolVisitReportingId = vcSchoolVisitItem.VCSchoolVisitReportingId || FuseUtils.NewGuid();
        this.VCId = vcSchoolVisitItem.VCId;
        this.CompanyName = vcSchoolVisitItem.CompanyName || '';
        this.Month = vcSchoolVisitItem.Month || '';
        this.VisitDate = vcSchoolVisitItem.VisitDate || '';
        this.SchoolId = vcSchoolVisitItem.SchoolId || '';
        this.DistrictCode = vcSchoolVisitItem.DistrictCode || '';
        this.SchoolEmailId = vcSchoolVisitItem.SchoolEmailId || '';
        this.PrincipalName = vcSchoolVisitItem.PrincipalName || '';
        this.PrincipalPhoneNo = vcSchoolVisitItem.PrincipalPhoneNo || '';
        this.SectorId = vcSchoolVisitItem.SectorId || '';
        this.JobRoleId = vcSchoolVisitItem.JobRoleId || '';
        this.VTId = vcSchoolVisitItem.VTId || '';
        this.VTPhoneNo = vcSchoolVisitItem.VTPhoneNo || '';
        this.Labs = vcSchoolVisitItem.Labs || '';
        this.Books = vcSchoolVisitItem.Books || '';
        this.NoOfGLConducted = vcSchoolVisitItem.NoOfGLConducted || '';
        this.NoOfIndustrialVisits = vcSchoolVisitItem.NoOfIndustrialVisits || '';
        this.SVPhotoWithPrincipalFile = vcSchoolVisitItem.SVPhotoWithPrincipalFile || '';
        this.SVPhotoWithStudentFile = vcSchoolVisitItem.SVPhotoWithStudentFile || '';

        this.GeoLocation = '3-3';
        this.Latitude = '3';
        this.Longitude = '3';
        this.IsActive = vcSchoolVisitItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
