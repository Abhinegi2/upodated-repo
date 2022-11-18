import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-bar-model',
  templateUrl: './progress-bar-model.component.html',
  styleUrls: ['./progress-bar-model.component.scss']
})
export class ProgressBarModelComponent implements OnInit {

  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;
  @Input() count: number;
  
  constructor(public dialogRef: MatDialogRef<ProgressBarModelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }

  continue() {    
    this.dialogRef.close(false);
  }
  logout() {    
    this.dialogRef.close('logout');
  }
}
