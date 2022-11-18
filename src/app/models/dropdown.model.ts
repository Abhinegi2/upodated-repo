
export class DropdownModel {
    Id: string;
    Name: string;
    Description: string;
    IsSelected: boolean;
    IsDisabled: boolean;
    SequenceNo: number;

    constructor(dropdownModelItem?: any) {
        dropdownModelItem = dropdownModelItem || {};

        this.Id = dropdownModelItem.Id || "";
        this.Name = dropdownModelItem.Name || "";
        this.Description = dropdownModelItem.Description || "";
        this.IsSelected = dropdownModelItem.IsSelected || false;
        this.IsDisabled = dropdownModelItem.IsDisabled || false;
        this.SequenceNo = dropdownModelItem.SequenceNo || 1;
    }
}
