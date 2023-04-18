import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployerModel } from './employer.model';
import { EmployerService } from './employer.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class EmployerComponent extends BaseListComponent<EmployerModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private employerService: EmployerService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.employerService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['StateName', 'DivisionName', 'DistrictName', 'BlockName', 'BusinessType', 'EmployeeCount', 'Outlets', 'CreatedBy', 'UpdatedBy',  'IsActive', 'Actions'];

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

  onDeleteEmployer(employerId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.employerService.deleteEmployerById(employerId)
            .subscribe((employerResp: any) => {

              this.zone.run(() => {
                if (employerResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('Employer deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
