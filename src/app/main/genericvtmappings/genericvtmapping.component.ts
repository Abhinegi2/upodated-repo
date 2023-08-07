import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropdownModel } from 'app/models/dropdown.model';
import { GenericVTMappingModel } from './genericvtmapping.model';
import { GenericVTMappingService } from './genericvtmapping.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  UserId: string;
  userList: DropdownModel[];
  userFilterList: any;
  gvtList: [DropdownModel];
  vtpList: [DropdownModel];
  vcList: [DropdownModel];
  vtList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: any;

  genericvtmappingFilterForm: FormGroup;
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private dialogService: DialogService,
    private genericvtmappingService: GenericVTMappingService) {
    super(commonService, router, routeParams, snackBar, zone);
    this.genericvtmappingFilterForm = this.creategenericvtmappingFilterForm();
  }

  ngOnInit(): void {
    this.genericvtmappingService.getGenericVTMapping(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.gvtList = results[0].Results;
      }
      if (results[1].Success) {
        this.vtpList = results[1].Results;
      }

      if (results[2].Success) {
        this.vcList = results[2].Results;
      }

      if (results[3].Success) {
        this.vtList = results[3].Results;

      }
      if (results[4].Success) {
        this.sectorList = results[4].Results;

      }
      this.onLoadGenericVTMappingByCriteria();

    });
  }

  onLoadGenericVTMappingByCriteria(): void {
    this.IsLoading = true;
    let genericvtParams: any = {
      UserTypeId: this.UserModel.UserTypeId,
      // GVTId: this.genericvtmappingFilterForm.controls["GVTId"].value,
      // VTPId: this.genericvtmappingFilterForm.controls["VTPId"].value,
      SectorId :this.genericvtmappingFilterForm.controls["SectorId"].value,
      JoRoleId :this.genericvtmappingFilterForm.controls["JobRoleId"].value,
      // VCId: this.genericvtmappingFilterForm.controls["VCId"].value,
      // VTId: this.genericvtmappingFilterForm.controls["VTId"].value,
      Status: this.genericvtmappingFilterForm.controls["Status"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.genericvtmappingService.GetAllByCriteria(genericvtParams).subscribe(response => {
      this.displayedColumns = [
        // 'UserType', 'UserName',
        'VTPShortName',
        'VCFullName',
        'VTFullName',
        'SchoolName',
        'SectorName',
        'JobRoleName',
        // 'EmailId', 
        'DateOfAllocation',  
        'DateOfAllocationVC',
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
      this.SearchBy.TotalResults = response.TotalResults;

      setTimeout(() => {
        this.ListPaginator.pageIndex = this.SearchBy.PageIndex;
        this.ListPaginator.length = this.SearchBy.TotalResults;
      });

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

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
    });
  }

  onLoadGenericVTMappingByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadGenericVTMappingByCriteria();
  }

  resetFilters(): void {
    this.genericvtmappingFilterForm.reset();
    // this.genericvtmappingFilterForm.get['JobRoleId'].setValue(null);
    // this.filteredVCItems = [];
    this.jobRoleList = [];
    this.onLoadGenericVTMappingByCriteria();
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

  creategenericvtmappingFilterForm(): FormGroup {
    return this.formBuilder.group({
      // GVTId: new FormControl(),
      // VTPId: new FormControl(),
      // VCId: new FormControl(),
      // VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      Status: new FormControl()
    });
  }
}
