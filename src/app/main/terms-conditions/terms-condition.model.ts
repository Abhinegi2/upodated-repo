import { FuseUtils } from '@fuse/utils';

export class TermsConditionModel {
    TermsConditionId: string;
    Name: string;
    Description: string;
    ApplicableFrom: any;
    IsActive: boolean;
    RequestType: any;

    constructor(termsConditionItem?: any) {
        termsConditionItem = termsConditionItem || {};

        this.TermsConditionId = termsConditionItem.TermsConditionId || FuseUtils.NewGuid();
        this.Name = termsConditionItem.Name || '';
        this.Description = termsConditionItem.Description || '';
        this.ApplicableFrom = termsConditionItem.ApplicableFrom || '';
        this.IsActive = termsConditionItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
