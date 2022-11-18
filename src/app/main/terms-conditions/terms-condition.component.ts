import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TermsConditionModel } from './terms-condition.model';
import { TermsConditionService } from './terms-condition.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class TermsConditionComponent extends BaseListComponent<TermsConditionModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private termsConditionService: TermsConditionService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.termsConditionService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['Name', 'Description', 'ApplicableFrom', 'IsActive', 'Actions'];

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

  onDeleteTermsCondition(termsConditionId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.termsConditionService.deleteTermsConditionById(termsConditionId)
            .subscribe((termsConditionResp: any) => {

              this.zone.run(() => {
                if (termsConditionResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('TermsCondition deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
