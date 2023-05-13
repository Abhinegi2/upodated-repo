import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericVTMappingModel } from './genericvtmapping.model';
import { GenericVTMappingService } from './genericvtmapping.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './genericvtmapping.component.html',
  styleUrls: ['./genericvtmapping.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class GenericVTMappingComponent extends BaseListComponent<GenericVTMappingModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private genericvtmappingService: GenericVTMappingService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.genericvtmappingService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = [
        // 'UserType', 'UserName',
        'VTPShortName',
        'VCFullName',
        'VTFullName',
        'GenericVTName',
        // 'EmailId', 
        'DateOfAllocation',  
        'CreatedBy', 
        'UpdatedBy', 
        'DateOfRemoval',
        'IsActive', 
        'Actions'
      ];

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

  onDeleteGenericVTMapping(genericvtmappingId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.genericvtmappingService.deleteGenericVTMappingById(genericvtmappingId)
            .subscribe((genericvtmappingResp: any) => {

              this.zone.run(() => {
                if (genericvtmappingResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('GenericVTMapping deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
