
export class LoginModel {
    UserId: string;
    Password: string;
    IsMobile: boolean;
    RememberMe: boolean;
    AuthToken: string;

    constructor() {
        this.UserId = '';
        this.Password = '';
        this.IsMobile = false;
        this.RememberMe = false;
        this.AuthToken = '';
    }
}
