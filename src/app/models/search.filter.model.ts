import { UserModel } from "./user.model";

export class SearchFilterModel {
    RoleId: string;
    UserId: string;
    UserTypeId: string;
    AcademicYearId: string;
    VTPId: string;
    VCId: string;
    VTId: string;
    HMId: string;
    SectorId: string;
    JobRoleId: string;
    SchoolId: string;
    ClassId: string;
    SectionId: string;
    IsRollover: boolean;

    Name: string;
    CharBy: string;

    SortOrder: string;
    PageIndex: number;
    PageSize: number;
    TotalResults: number;
    PageSizeOptions: any;
    ShowFirstLastButtons: boolean;
    
    Filter: any;
    IgnoreCriteria: boolean;

    constructor(userModel?: UserModel) {

        this.UserId = userModel.UserId || '';
        this.UserTypeId = userModel.UserTypeId || '';
        this.Name = null;
        this.IsRollover = false;
        this.CharBy = null;
        this.Filter = {};
        this.AcademicYearId = '';

        this.SortOrder = 'asc';
        this.PageIndex = 0;
        this.PageSize = 20000;
        this.TotalResults = 0;
        this.PageSizeOptions = [10, 25, 100, 250, 500];
        this.ShowFirstLastButtons = true;
    }
}

