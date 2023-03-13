import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolSectorJobModel } from './schoolsectorjob.model';
import { SchoolSectorJobService } from './schoolsectorjob.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './schoolsectorjob.component.html',
  styleUrls: ['./schoolsectorjob.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class SchoolSectorJobComponent extends BaseListComponent<SchoolSectorJobModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private schoolsectorjobService: SchoolSectorJobService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.schoolsectorjobService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['SchoolName', 'SectorName', 'JobRoleName', 'DateOfAllocation', 'DateOfRemoval', 'IsActive', 'Actions'];

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

  onDeleteSchoolSectorJob(schoolsectorjobId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.schoolsectorjobService.deleteSchoolSectorJobById(schoolsectorjobId)
            .subscribe((schoolsectorjobResp: any) => {

              this.zone.run(() => {
                if (schoolsectorjobResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('SchoolSectorJob deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
