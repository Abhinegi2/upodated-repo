import { FuseUtils } from '@fuse/utils';

export class EmployeeModel {
    AccountId: string;
    EmployeeCode: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Gender: string;
    DateOfBirth: Date;
    Department: string;
    Telephone: string;
    Mobile: string;
    EmailId: string;
    IsActive: boolean;
    RequestType: any;

    constructor(employeeItem?: any) {
        employeeItem = employeeItem || {};

        this.AccountId = employeeItem.AccountId || FuseUtils.NewGuid();
        this.EmployeeCode = employeeItem.EmployeeCode || '';
        this.FirstName = employeeItem.FirstName || '';
        this.MiddleName = employeeItem.MiddleName || '';
        this.LastName = employeeItem.LastName || '';
        this.Gender = employeeItem.Gender || '';
        this.DateOfBirth = employeeItem.DateOfBirth || '';
        this.Department = employeeItem.Department || '';
        this.Telephone = employeeItem.Telephone || '';
        this.Mobile = employeeItem.Mobile || '';
        this.EmailId = employeeItem.EmailId || '';
        this.IsActive = employeeItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
