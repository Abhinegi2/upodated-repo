import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-vtdialogbox',
  templateUrl: './check-vtdialogbox.component.html',
  styleUrls: ['./check-vtdialogbox.component.scss']
})
export class CheckVTdialogboxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckVTdialogboxComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
