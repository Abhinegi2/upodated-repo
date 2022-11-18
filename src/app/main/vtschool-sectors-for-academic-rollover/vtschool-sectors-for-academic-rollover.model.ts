import { FuseUtils } from '@fuse/utils';

export class VTSchoolSectorsForAcademicRolloverModel {
    Id: string;
    DataTypeId: string;
    UserId: string;
    // SchoolVTPSectorId: string;
    // AcademicYearId: string;
    // VTPId: string;
    // SectorId: string;
    // SchoolId: string;
    // Remarks: string;
    // IsActive: boolean;
    // RequestType: any;

    constructor(schoolVTPSectorsForAcadmicRolloverItem?: any) {
        schoolVTPSectorsForAcadmicRolloverItem = schoolVTPSectorsForAcadmicRolloverItem || {};

        //this.SchoolVTPSectorId = schoolVTPSectorsForAcadmicRolloverItem.SchoolVTPSectorId || FuseUtils.NewGuid();
        this.Id = schoolVTPSectorsForAcadmicRolloverItem.Id || '';
        this.DataTypeId = schoolVTPSectorsForAcadmicRolloverItem.DataTypeId || '';
        this.UserId = schoolVTPSectorsForAcadmicRolloverItem.UserId || '';
        // this.SectorId = schoolVTPSectorsForAcadmicRolloverItem.SectorId || '';
        // this.SchoolId = schoolVTPSectorsForAcadmicRolloverItem.SchoolId || '';
        // this.Remarks = schoolVTPSectorsForAcadmicRolloverItem.Remarks || '';
        // this.IsActive = schoolVTPSectorsForAcadmicRolloverItem.IsActive || true;
        // this.RequestType = 0; // New
    }
}
