import { FuseUtils } from '@fuse/utils';

export class PersonModel {
    PersonId: string;
    Name: string;
    EmployeeCode: string;
    Gender: string;
    Mobile: string;
    Telephone: string;
    AadhaarNumber: string;
    PAN: string;
    DateOfBirth: string;
    EmailId: string;
    Salary: number;
    ValidFrom: Date;
    ValidTo: Date;
    Pincode: string;
    Description: string;
    Remarks: string;
    IsActive: boolean;
    SchoolName: string;
    SchoolNameLabel: string;

    constructor(personItem?: any) {
        personItem = personItem || {};

        this.PersonId = personItem.PersonId || FuseUtils.NewGuid();
        this.Name = personItem.Name || '';
        this.EmployeeCode = personItem.EmployeeCode || '';
        this.Gender = personItem.Gender || '';
        this.Mobile = personItem.Mobile || '';
        this.Telephone = personItem.Telephone || '';
        this.AadhaarNumber = personItem.AadhaarNumber || '';
        this.PAN = personItem.PAN || '';
        this.DateOfBirth = personItem.DateOfBirth || '';
        this.EmailId = personItem.EmailId || '';
        this.Salary = personItem.Salary || '';
        this.ValidFrom = personItem.ValidFrom || '';
        this.ValidTo = personItem.ValidTo || '';
        this.Pincode = personItem.Pincode || '';
        this.Description = personItem.Description || '';
        this.Remarks = personItem.Remarks || '';
        this.IsActive = personItem.IsActive || true;
        this.SchoolName = personItem.SchoolName || '';
        this.SchoolNameLabel = "";
    }
}
