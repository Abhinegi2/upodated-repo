export class UserModel {
    LoginUniqueId: string;
    AcademicYearId: string;
    UserTypeId: string;
    LoginId: string;
    Password: string;
    UserId: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    EmailId: string;
    Mobile: string;
    IsAdmin: boolean;
    Designation: string;
    DateOfJoining: Date;
    DateOfAllocation: Date;
    RoleCode: string;
    DefaultStateId: string;
    StateId: string;
    DivisionId: string;
    DistrictId: string;
    BlockId: string;
    AccountType: string;
    LandingPageUrl: string;
    InvalidAttempt: 0
    IsLocked: false
    IsPasswordReset: false
    LastLoginDate: string;
    PasswordExpiredOn: string;
    PasswordResetToken: string;
    PasswordUpdateDate: string;
    TokenExpiredOn: string;
    AuthToken: string;
    RoleTransactions: []

    constructor() {
        this.LoginUniqueId = '';
        this.AcademicYearId = '';
        this.UserTypeId = '';
        this.LoginId = '';
        this.Password = '';
        this.UserId = '';
        this.UserName = '';
        this.FirstName = '';
        this.LastName = '';
        this.EmailId = '';
        this.Mobile = '';
        this.IsAdmin = false;
        this.Designation = '';
        this.DateOfJoining = null;
        this.DateOfAllocation = null;
        this.DefaultStateId = '';
        this.StateId = '';
        this.DivisionId = '';
        this.DistrictId = '';
        this.BlockId = '';
        this.AccountType = '';
        this.LandingPageUrl = '';
        this.InvalidAttempt = 0
        this.IsLocked = false;
        this.IsPasswordReset = false;
        this.LastLoginDate = '';
        this.PasswordExpiredOn = '';
        this.PasswordResetToken = '';
        this.PasswordUpdateDate = '';
        this.TokenExpiredOn = '';
        this.AuthToken = '';
        this.RoleTransactions = [];
    }
}
