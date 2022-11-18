import { FuseUtils } from '@fuse/utils';

export class StateModel {
    StateCode: string;
    StateId: string;
    CountryCode: string;
    StateName: string;
    Description: string;
    SequenceNo: any;
    IsActive: boolean;
    RequestType: any;

    constructor(stateItem?: any) {
        stateItem = stateItem || {};

        this.StateCode = stateItem.StateCode || '';
        this.StateId = stateItem.StateId || '';
        this.CountryCode = stateItem.CountryCode || '';
        this.StateName = stateItem.StateName || '';
        this.Description = stateItem.Description || '';
        this.SequenceNo = stateItem.SequenceNo || '';
        this.IsActive = stateItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
