
export class PageRightModel {
    SrNo: number;
    Name: string;
    PageDescription: string;
    PageTitle: string;
    HeaderName: string;
    HeaderOrder: number;
    Rights: boolean;
    BasicView: boolean;
    DetailView: boolean;
    ListView: boolean;
    IsAdd: boolean;
    IsDelete: boolean;
    IsEdit: boolean;
    IsExport: boolean;
    IsHeaderMenu: boolean;
    IsPublic: boolean;
    IsView: boolean;
    RouteUrl: string;
    TransactionIcon: string;

    UrlAction: string;
    UrlController: string;
    UrlPara: string;
    PageType: string;
    ActionType: string;
    IsReadOnly: boolean;

    constructor(roleItem?: any) {
        roleItem = roleItem || {};

        this.SrNo = roleItem.SrNo || 0;
        this.Name = roleItem.Name || ''
        this.PageDescription = roleItem.PageDescription || ''
        this.PageTitle = roleItem.PageTitle || ''
        this.HeaderName = roleItem.HeaderName || ''
        this.HeaderOrder = roleItem.HeaderOrder || 0;
        this.Rights = roleItem.Rights || false;
        this.BasicView = roleItem.BasicView || false;
        this.DetailView = roleItem.DetailView || false;
        this.ListView = roleItem.ListView || false;
        this.IsAdd = roleItem.IsAdd || false;
        this.IsDelete = roleItem.IsDelete || false;
        this.IsEdit = roleItem.IsEdit || false;
        this.IsExport = roleItem.IsExport || false;
        this.IsHeaderMenu = roleItem.IsHeaderMenu || false;
        this.IsPublic = roleItem.IsPublic || false;
        this.IsView = roleItem.IsView || false;
        this.RouteUrl = roleItem.RouteUrl || ''
        this.TransactionIcon = roleItem.TransactionIcon || ''

        this.UrlAction = roleItem.UrlAction || ''
        this.UrlController = roleItem.UrlController || ''
        this.UrlPara = roleItem.UrlPara || ''
        this.PageType = roleItem.PageType || '';
        this.ActionType = roleItem.ActionType || 'New';
        this.IsReadOnly = roleItem.IsReadOnly || false;
    }
}
