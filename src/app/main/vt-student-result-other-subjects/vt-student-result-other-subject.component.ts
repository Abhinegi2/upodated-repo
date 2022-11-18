import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTStudentResultOtherSubjectModel } from './vt-student-result-other-subject.model';
import { VTStudentResultOtherSubjectService } from './vt-student-result-other-subject.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-student-result-other-subject.component.html',
  styleUrls: ['./vt-student-result-other-subject.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTStudentResultOtherSubjectComponent extends BaseListComponent<VTStudentResultOtherSubjectModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtStudentResultOtherSubjectService: VTStudentResultOtherSubjectService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vtStudentResultOtherSubjectService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['ClassName', 'StudentName', 'SubjectName', 'SubjectNumber', 'SubjectMarks', 'Actions'];

      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;

      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onDeleteVTStudentResultOtherSubject(vtStudentResultOtherSubjectId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtStudentResultOtherSubjectService.deleteVTStudentResultOtherSubjectById(vtStudentResultOtherSubjectId)
            .subscribe((vtStudentResultOtherSubjectResp: any) => {

              this.zone.run(() => {
                if (vtStudentResultOtherSubjectResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTStudentResultOtherSubject deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
