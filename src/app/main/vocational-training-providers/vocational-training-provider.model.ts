import { FuseUtils } from '@fuse/utils';
import { FileUploadModel } from 'app/models/file.upload.model';

export class VocationalTrainingProviderModel {
    AcademicYearId: string;
    VTPId: string;
    VTPShortName: string;
    VTPName: string;
    ApprovalYear: string;
    CertificationNo: string;
    CertificationAgency: string;
    VTPMobileNo: string;
    VTPEmailId: string;
    VTPAddress: string;
    PrimaryContactPerson: string;
    PrimaryMobileNumber: string;
    PrimaryContactEmail: string;
    VTPStateCoordinator: string;
    VTPStateCoordinatorMobile: string;
    VTPStateCoordinatorEmail: string;
    ContractApprovalDate: Date;
    ContractEndDate: Date;
    MOUDocumentFile: any;
    IsActive: boolean;
    RequestType: any;

    constructor(vocationalTrainingProviderItem?: any) {
        vocationalTrainingProviderItem = vocationalTrainingProviderItem || {};

        this.AcademicYearId = '';
        this.VTPId = vocationalTrainingProviderItem.VTPId || FuseUtils.NewGuid();
        this.VTPShortName = vocationalTrainingProviderItem.VTPShortName || '';
        this.VTPName = vocationalTrainingProviderItem.VTPName || '';
        this.ApprovalYear = vocationalTrainingProviderItem.ApprovalYear || '';
        this.CertificationNo = vocationalTrainingProviderItem.CertificationNo || '';
        this.CertificationAgency = vocationalTrainingProviderItem.CertificationAgency || '';
        this.VTPMobileNo = vocationalTrainingProviderItem.VTPMobileNo || '';
        this.VTPEmailId = vocationalTrainingProviderItem.VTPEmailId || '';
        this.VTPAddress = vocationalTrainingProviderItem.VTPAddress || '';
        this.PrimaryContactPerson = vocationalTrainingProviderItem.PrimaryContactPerson || '';
        this.PrimaryMobileNumber = vocationalTrainingProviderItem.PrimaryMobileNumber || '';
        this.PrimaryContactEmail = vocationalTrainingProviderItem.PrimaryContactEmail || '';
        this.VTPStateCoordinator = vocationalTrainingProviderItem.VTPStateCoordinator || '';
        this.VTPStateCoordinatorMobile = vocationalTrainingProviderItem.VTPStateCoordinatorMobile || '';
        this.VTPStateCoordinatorEmail = vocationalTrainingProviderItem.VTPStateCoordinatorEmail || '';
        this.ContractApprovalDate = vocationalTrainingProviderItem.ContractApprovalDate || '';
        this.ContractEndDate = vocationalTrainingProviderItem.ContractEndDate || '';
        this.MOUDocumentFile = vocationalTrainingProviderItem.MOUDocumentFile || '';
        this.IsActive = vocationalTrainingProviderItem.IsActive || true;
        this.RequestType = 0; // New
    }

    getVocationalTrainingProviderTestData(): any {
        this.AcademicYearId = '';
        this.VTPId = FuseUtils.NewGuid();
        this.VTPShortName = 'Blue SmartVision India';
        this.VTPName = 'Blue SmartVision India Limited';
        this.ApprovalYear = '2022-2023';
        this.CertificationNo = 'NSDC/2022-23/1742';
        this.CertificationAgency = 'National Skill Development Corporation (NSDC)';
        this.VTPMobileNo = '8800159456';
        this.VTPEmailId = 'blue.smart@email.co.in';
        this.VTPAddress = 'A-11,Sector-67,Noida,Gautam Budh Nagar-201301,U.P.';
        this.PrimaryContactPerson = 'Ashok Patil';
        this.PrimaryMobileNumber = '8800158234';
        this.PrimaryContactEmail = 'blue.smart@email.co.in';
        this.VTPStateCoordinator = 'Kunal Patil';
        this.VTPStateCoordinatorMobile = '8800158234';
        this.VTPStateCoordinatorEmail = 'blue.smart@email.co.in';
        this.ContractApprovalDate = new Date('2022/09/13');;
        this.ContractEndDate = new Date('2023/06/20');;
        this.IsActive = true;
        this.RequestType = 0; // New

        return this;
    }
}
