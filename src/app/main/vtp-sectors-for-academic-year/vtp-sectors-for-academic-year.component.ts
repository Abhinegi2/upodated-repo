import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTPSectorForAcademicYearModel } from './vtp-sectors-for-academic-year.model';
import { VTPSectorForAcademicYearService } from './vtp-sectors-for-academic-year.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';


@Component({
  selector: 'data-list-view',
  templateUrl: './vtp-sectors-for-academic-year.component.html',
  styleUrls: ['./vtp-sectors-for-academic-year.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTPSectorForAcademicYearComponent extends BaseListComponent<VTPSectorForAcademicYearModel> implements OnInit {
  yearName: any;
  vtpSectorList: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtpSectorForAcademicYearService: VTPSectorForAcademicYearService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0;    
    this.vtpSectorForAcademicYearService.GetAllByCriteria(this.SearchBy).subscribe(response => {

      this.displayedColumns = ['AcademicYear', 'VTPName', 'SectorName', 'IsAYRollover'];

      this.vtpSectorList = response.Results.filter(vs => vs.IsActive == true);

      this.vtpSectorList.forEach(vs => {
        vs.IsActive = vs.IsAYRollover;
      });

      this.tableDataSource.data = this.vtpSectorList;
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

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onVSForAdemicYear(event, vsItem) {
    if (vsItem == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let vtpSectorItem = this.vtpSectorList.find(vs => vs.VTPSectorId === vsItem.VTPSectorId);
      vtpSectorItem.IsActive = event.checked;
    }
  }

  onTransferVTPSectors() {
    let vtpSectorIds = this.vtpSectorList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.VTPSectorId).toString();

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this record?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.IsLoading = true;
          this.vtpSectorForAcademicYearService.transferVTPSectors(this.UserModel, vtpSectorIds)
            .subscribe((vtpSectorResp: any) => {

              this.zone.run(() => {
                if (vtpSectorResp.Success) {
                  this.showActionMessage('Academic Rollover completed for selected rows.', this.Constants.Html.SuccessSnackbar
                  );
                }
              });

              this.IsLoading = false;
              this.ngOnInit();

            }, error => {
              console.log('Transfer VTPSector errors =>', error);
            });
        }
      });
  }
}
