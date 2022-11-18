import { Injectable } from "@angular/core";

@Injectable()
export class HtmlConstants {
    public InfoSnackbar: string = "info-snackbar";
    public WarningSnackbar: string = "warning-snackbar";
    public ErrorSnackbar: string = "error-snackbar";
    public SuccessSnackbar: string = "success-snackbar";

    public Dismiss: string = "Dismiss";
    public Duration: number = 2000;
}
