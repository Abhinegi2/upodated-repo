import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ShowDialogComponent } from './show-dialog.component';

@Injectable({
    providedIn: "root"
})
export class ShowDialogService {
    constructor(public dialog: MatDialog) { }

    openConfirmDialog(msg) {
        return this.dialog.open(ShowDialogComponent, {
            width: "390px",
            disableClose: true,
            panelClass: ["confirm-dialog-container"],
            data: {
                message: msg
            }
        });
    }
}
