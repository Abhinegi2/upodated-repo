import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { UserModel } from "app/models/user.model";
import { AppConstants } from "app/app.constants";

function getWindow(): any {
    return window;
}

@Injectable()
export class HelperService {
    addContentTypeHeader: boolean | string = true;
    tickerInstance: any = null;
    env: string;
    menuAccesses: string;

    constructor() {}

    // return the global window object
    get nativeWindow(): any {
        return getWindow();
    }

    isProdEnv(): boolean {
        return this.env.toLocaleLowerCase() === "prod" ||
            this.env.toLocaleLowerCase() === "production"
            ? true
            : false;
    }
    isStageEnv(): boolean {
        return this.env.toLocaleLowerCase() === "prod" ||
            this.env.toLocaleLowerCase() === "production"
            ? true
            : false;
    }
    isDevEnv(): boolean {
        return this.env.toLocaleLowerCase() === "dev" ||
            this.env.toLocaleLowerCase() === "development"
            ? true
            : false;
    }

    /**
     * Use this method to create logs to the server
     * Pass info like error stack (if error), user info, user brower and other details
     */
    serverLogger(log: any) {
        // tslint:disable-next-line:no-console
    }

    secondsTicksCounter(): object {
        let seconds: number = 0;
        // tslint:disable-next-line:prefer-const
        let interval;
        return {
            start: () => {
                return setInterval(function() {
                    seconds++;
                }, 1000);
            },
            stop: (intervalInstance: any) => {
                clearInterval(intervalInstance);
                return seconds;
            },
            intervalInstance: null
        };
    }

    deleteAllCookies(): void {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
    }

    getUserFromLocalStorage(): UserModel {
        const user = sessionStorage.getItem(AppConstants.UserLocalStorage);
        return <UserModel>JSON.parse(user);
    }

    getUserRole(): string {
        const user: UserModel = this.getUserFromLocalStorage();
        return user ? user.AccountType : null;
    }

    isUserLoggedIn(): boolean {
        const user = sessionStorage.getItem(AppConstants.UserLocalStorage);
        return user && user.length > 0 ? true : false;
    }

    isRegistrationPage(url: string) {
        return url === AppConstants.RegistrationPageUrl ? true : false;
    }

    redirectToLogin() {}

    getUserDefaultPageUrl(): string {
        const role: string = this.getUserRole();
        const defaultPage = "/roles";
        return defaultPage;
    }

    initFormControls(
        self: object,
        formGroup: FormGroup,
        controlNames: string[]
    ): void {
        for (const controlName of controlNames) {
            self[controlName] = formGroup.controls[controlName];
        }
    }

    getInputValidationClass(
        formGroup: FormGroup,
        formControlName: string
    ): string {
        if (formGroup) {
            const formControl: AbstractControl =
                formGroup.controls[formControlName];
            if (formControl && formControl.touched) {
                return formControl.valid
                    ? AppConstants.SuccessInputClass
                    : AppConstants.ErrorInputClass;
            }
        }

        return "";
    }

    getConfirmInputValidationClass(
        compareFromGroup: FormGroup,
        formControl: AbstractControl,
        confirmFormControl: AbstractControl,
        test: FormGroup
    ): string {
        if (
            (formControl && formControl.touched) ||
            (confirmFormControl && confirmFormControl.touched)
        ) {
            return compareFromGroup.valid
                ? AppConstants.SuccessInputClass
                : AppConstants.ErrorInputClass;
        }
        if (formControl && formControl.touched) {
            return formControl.valid
                ? AppConstants.SuccessInputClass
                : AppConstants.ErrorInputClass;
        } else {
            return "";
        }
    }

    showCompareCtrlsValidationMsg(
        frmGroup: FormGroup,
        ctrl1: AbstractControl,
        ctrl2: AbstractControl
    ): boolean {
        return frmGroup && !frmGroup.valid && (ctrl1.touched || ctrl1.touched)
            ? true
            : false;
    }

    showCtrlValidationMsg(formControl: AbstractControl): boolean {
        return formControl &&
            !formControl.valid &&
            formControl.touched &&
            formControl.errors
            ? true
            : false;
    }

    isAccessToResourceAllowed(resourceName: string): boolean {
        const accessesRaw: any = <any>(
            JSON.parse(
                sessionStorage.getItem(AppConstants.ResourceAccessLocalStorage)
            )
        );
        if (!accessesRaw) {
            return false;
        }
        let actions: string[];
        if (!accessesRaw[resourceName]) {
            return false;
        }
        actions = accessesRaw[resourceName].split(",");
        if (actions.length === 1 && actions[0] === "") {
            actions = [];
        }
        return !actions || actions.length < 1 ? false : true;
    }

    isAccessToActionAllowed(resourceName: string, actionName: string): boolean {
        const accessesRaw: any = <any>(
            JSON.parse(
                sessionStorage.getItem(AppConstants.ResourceAccessLocalStorage)
            )
        );
        const actions: string = accessesRaw[resourceName];

        return actions && actions.indexOf(actionName) !== -1 ? true : false;
    }

    getObjectKeys(object: {}): string[] {
        if (!object || typeof object !== "object") {
            throw new Error(
                "Only objects can be passed to retrieve its own enumerable properties(keys)."
            );
        }
        return Object.keys(object);
    }

    signOutUser() {
        sessionStorage.clear();
        window.location.href = AppConstants.LoginPageUrl;
    }

    searchInArray(inputArray, lookUpArray, caseSensitiveSearch): any[] {
        const result: any[] = [];
        outer: for (let index = 0; index < inputArray.length; index++) {
            const item = inputArray[index];
            for (let i = 0; i < lookUpArray.length; i++) {
                const lookUpItem = lookUpArray[i];
                if (item[lookUpItem.key] !== lookUpItem.value) {
                    continue outer;
                }
            }
            result.push(item);
        }
        return result;
    }

    searchInArrayTest(
        inputArray: any[],
        lookUpArray: any[],
        caseSensitiveSearch?: boolean,
        exactMatch?: boolean
    ): any[] {
        const result: any[] = [];
        outer: for (const item of inputArray) {
            for (const lookUpItem of lookUpArray) {
                const sourceString: string = caseSensitiveSearch
                    ? item[lookUpItem.key].toString()
                    : item[lookUpItem.key].toString().toLocaleLowerCase();
                const searchForString: string = caseSensitiveSearch
                    ? lookUpItem.value.toString()
                    : lookUpItem.value.toString().toLocaleLowerCase();
                if (exactMatch) {
                    if (sourceString === searchForString) {
                        continue outer;
                    }
                } else {
                    if (sourceString.indexOf(searchForString) === -1) {
                        continue outer;
                    }
                }
            }
            result.push(item);
        }
        return result;
    }
}
