declare global {
    interface String {
        IsNullOrEmpty(this: any): boolean;
        StringVal(this: any): string;
    }
}

String.prototype.IsNullOrEmpty = function (this: any): boolean {
    let isvalid: boolean = true;

    if (this != undefined && this != null && this != "") {
        isvalid = false;
    }
    return isvalid;
};

String.prototype.StringVal = function (this: any): string {
    let strValue: string = "";

    if (this == undefined || this == null) {
        strValue = "";
    } else {
        strValue = this.toString();
    }

    // 1: Replace multiple spaces with a single space => replace(/\s+/g, ' ')
    // 2: Replace multiple spaces with a single space with  leading/trailing spaces also => replace(/^\s+|\s+$/g, '')
    strValue = strValue.replace(/^\s+|\s+$/g, "");

    return strValue;
};

export {};
