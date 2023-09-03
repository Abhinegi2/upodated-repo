import { FuseUtils } from "@fuse/utils";

export class FileUploadModel {
    UserId: string;
    ContentId: string;
    ContentType: string;
    FileName: string;
    FileType: string;
    FileSize: number;
    FilePath: string;
    UserRole:string;
    Base64Data: string;
    UploadFile: any;

    constructor(fileUpload?: any) {
        fileUpload = fileUpload || {};

        this.UserId = fileUpload.UserId || FuseUtils.NewGuid();
        this.UserRole = fileUpload.UserRole || "";
        this.ContentId = fileUpload.ContentId || FuseUtils.NewGuid();
        this.ContentType = fileUpload.ContentType || "";
        this.FileName = fileUpload.FileName || '';
        this.FileType = fileUpload.FileType || "";
        this.FileSize = fileUpload.FileSize || "";
        this.FilePath = fileUpload.FilePath || "";
        this.Base64Data = fileUpload.Base64Data || "";
        this.UploadFile = null;
    }
}
