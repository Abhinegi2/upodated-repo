import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { ShowDialogComponent } from '../show-dialog/show-dialog.component';
import { ProgressBarModelComponent } from '../progress-bar-model/progress-bar-model.component';

@Injectable({
    providedIn: "root"
})
export class DialogService {
    constructor(public dialog: MatDialog) {}

    openConfirmDialog(msg) {
        return this.dialog.open(ConfirmDialogComponent, {
            width: "390px",
            disableClose: true,
            panelClass: ["confirm-dialog-container"],
            // position: { top: "10px" },
            data: {
                message: msg
            }
        });
    }

    openShowDialog(msg) {
        return this.dialog.open(ShowDialogComponent, {
            width: "390px",
            disableClose: true,
            panelClass: ["confirm-dialog-container"],
            // position: { top: "10px" },
            data: {
                message: msg
            }
        });
    }

    openShowSessionDialog(msg) {
        return this.dialog.open(ProgressBarModelComponent, {
            width: "390px",
            disableClose: true,
            panelClass: ["confirm-dialog-container"],
            // position: { top: "10px" },
            data: {
                message: msg
            }
        });
    }
}
