import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTPSectorModel } from './vtp-sector.model';
import { VTPSectorService } from './vtp-sector.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'data-list-view',
  templateUrl: './vtp-sector.component.html',
  styleUrls: ['./vtp-sector.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTPSectorComponent extends BaseListComponent<VTPSectorModel> implements OnInit {
  vtpSectorFilterForm: FormGroup;
  vtpSectorSearchForm: FormGroup;

  academicYearList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVtpSectorItems: any;
  sectorList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    public formBuilder: FormBuilder,
    private vtpSectorService: VTPSectorService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.vtpSectorSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vtpSectorFilterForm = this.createVTPSectorFilterForm();
  }

  ngOnInit(): void {
    this.vtpSectorService.getDropdownforVTPSector().subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVtpSectorItems = this.vtpList.slice();
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vtpSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial VTPSector data
      this.onLoadVTPSectorsByCriteria();

      this.vtpSectorSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVTPSectorsByCriteria();
            return false;
          }

          return res.length > 2
        }),

        // Time in milliseconds between key events
        debounceTime(650),

        // If previous query is diffent from current   
        distinctUntilChanged()

        // subscription for response
      ).subscribe((searchText: string) => {
        this.SearchBy.Name = searchText;
        this.onLoadVTPSectorsByCriteria();
      });

    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVTPSectorsByCriteria();
  }

  onLoadVTPSectorsByCriteria(): void {
    this.IsLoading = true;

    let vtpSectorParams = {
      AcademicYearId: this.vtpSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtpSectorFilterForm.controls["VTPId"].value,
      SectorId: this.vtpSectorFilterForm.controls["SectorId"].value,
      Status: this.vtpSectorFilterForm.controls["Status"].value,
      IsRollover: 0,
      Name: this.vtpSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.vtpSectorService.GetAllByCriteria(vtpSectorParams).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VTPName', 'SectorName', 'IsActive', 'Actions'];

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

  onLoadVTPSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVTPSectorsByCriteria();
  }

  resetFilters(): void {
    this.vtpSectorFilterForm.reset();
    this.vtpSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.onLoadVTPSectorsByCriteria();
  }

  onDeleteVTPSector(vtpSectorId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtpSectorService.deleteVTPSectorById(vtpSectorId)
            .subscribe((vtpSectorResp: any) => {

              this.zone.run(() => {
                if (vtpSectorResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTPSector deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vtpSectorParams = {
      AcademicYearId: this.vtpSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtpSectorFilterForm.controls["VTPId"].value,
      SectorId: this.vtpSectorFilterForm.controls["SectorId"].value,
      Status: this.vtpSectorFilterForm.controls["Status"].value,
      Name: this.vtpSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.vtpSectorService.GetAllByCriteria(vtpSectorParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VTPSectorId;
          delete obj.SectorId;
          delete obj.IsAYRollover;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VTPSector");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VTPSectorFilter form and returns {FormGroup}
  createVTPSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      SectorId: new FormControl(),
      VTPId: new FormControl(),
      Status: new FormControl()
    });
  }
}
