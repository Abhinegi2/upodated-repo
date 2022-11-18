import { FuseUtils } from '@fuse/utils';

export class CountryModel {
    CountryCode: string;
    CountryName: string;
    ISDCode: string;
    ISOCode: string;
    CurrencyName: string;
    CurrencyCode: string;
    CountryIcon: string;
    Description: string;
    IsActive: boolean;
    RequestType: any;

    constructor(countryItem?: any) {
        countryItem = countryItem || {};

        this.CountryCode = countryItem.CountryCode || '';
        this.CountryName = countryItem.CountryName || '';
        this.ISDCode = countryItem.ISDCode || '';
        this.ISOCode = countryItem.ISOCode || '';
        this.CurrencyName = countryItem.CurrencyName || '';
        this.CurrencyCode = countryItem.CurrencyCode || '';
        this.CountryIcon = countryItem.CountryIcon || '';
        this.Description = countryItem.Description || '';
        this.IsActive = countryItem.IsActive || true;
        this.RequestType = 0; // New
    }
}
