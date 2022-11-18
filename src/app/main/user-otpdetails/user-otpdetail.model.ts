import { FuseUtils } from '@fuse/utils';

export class UserOTPDetailModel {
    OTPId: string;
    Mobile: string;
    OTPToken: string;
    ExpireOn: any;
    IsRedeemed: boolean;
    IsActive: boolean;
    RequestType: any;

    constructor(userOTPDetailItem?: any) {
        userOTPDetailItem = userOTPDetailItem || {};

        this.OTPId = userOTPDetailItem.OTPId || FuseUtils.NewGuid();
        this.Mobile = userOTPDetailItem.Mobile || '';
        this.OTPToken = userOTPDetailItem.OTPToken || '';
        this.ExpireOn = userOTPDetailItem.ExpireOn || '';
        this.IsRedeemed = userOTPDetailItem.IsRedeemed || true;
        this.IsActive = userOTPDetailItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
