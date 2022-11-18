import { FuseUtils } from '@fuse/utils';

export class SchoolVTPSectorsForAcadmicRolloverModel {
    Id: string;
    DataTypeId: string;
    UserId: string;


    constructor(schoolVTPSectorsForAcadmicRolloverItem?: any) {
        schoolVTPSectorsForAcadmicRolloverItem = schoolVTPSectorsForAcadmicRolloverItem || {};
        this.Id = schoolVTPSectorsForAcadmicRolloverItem.Id || '';
        this.DataTypeId = schoolVTPSectorsForAcadmicRolloverItem.DataTypeId || '';
        this.UserId = schoolVTPSectorsForAcadmicRolloverItem.UserId || '';

    }
}
