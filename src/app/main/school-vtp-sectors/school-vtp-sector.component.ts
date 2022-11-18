import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolVTPSectorModel } from './school-vtp-sector.model';
import { SchoolVTPSectorService } from './school-vtp-sector.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'data-list-view',
  templateUrl: './school-vtp-sector.component.html',
  styleUrls: ['./school-vtp-sector.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class SchoolVTPSectorComponent extends BaseListComponent<SchoolVTPSectorModel> implements OnInit {
  currentAcademicYearId: string;
  academicYearList: [DropdownModel];
  sectorList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;

  schoolVTPSectorSearchForm: FormGroup
  schoolVTPSectorFilterForm: FormGroup;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    public formBuilder: FormBuilder,
    private schoolVTPSectorService: SchoolVTPSectorService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.schoolVTPSectorSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.schoolVTPSectorFilterForm = this.createSchoolVtpSectorFilterForm();
  }

  ngOnInit(): void {
    this.schoolVTPSectorService.getDropdownForSchoolVTPSector().subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.schoolList = results[1].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      if (results[2].Success) {
        this.vtpList = results[2].Results;
        this.filteredVtpSectorItems = this.vtpList.slice();
      }

      if (results[3].Success) {
        this.sectorList = results[3].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.schoolVTPSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      this.onLoadSchoolVTPSectorsByCriteria();

      this.schoolVTPSectorSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadSchoolVTPSectorsByCriteria();
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
        this.onLoadSchoolVTPSectorsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadSchoolVTPSectorsByCriteria();
  }

  onLoadSchoolVTPSectorsByCriteria(): void {
    this.IsLoading = true;

    let vtpSchoolSectorParams = {
      AcademicYearId: this.schoolVTPSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.schoolVTPSectorFilterForm.controls["VTPId"].value,
      SectorId: this.schoolVTPSectorFilterForm.controls["SectorId"].value,
      SchoolId: this.schoolVTPSectorFilterForm.controls["SchoolId"].value,
      Status: this.schoolVTPSectorFilterForm.controls["Status"].value,
      IsRollover: 0,
      Name: this.schoolVTPSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.schoolVTPSectorService.GetAllByCriteria(vtpSchoolSectorParams).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VTPName', 'SectorName', 'SchoolName', 'UDISE', 'IsActive', 'Actions'];

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

  onLoadSchoolVTPSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadSchoolVTPSectorsByCriteria();
  }

  resetFilters(): void {
    this.schoolVTPSectorFilterForm.reset();
    this.schoolVTPSectorSearchForm.reset();
    this.schoolVTPSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    this.onLoadSchoolVTPSectorsByCriteria();
  }

  onDeleteSchoolVTPSector(schoolVTPSectorId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.schoolVTPSectorService.deleteSchoolVTPSectorById(schoolVTPSectorId)
            .subscribe((schoolVTPSectorResp: any) => {

              this.zone.run(() => {
                if (schoolVTPSectorResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('SchoolVTPSector deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vtpSchoolSectorParams = {
      AcademicYearId: this.schoolVTPSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.schoolVTPSectorFilterForm.controls["VTPId"].value,
      SectorId: this.schoolVTPSectorFilterForm.controls["SectorId"].value,
      SchoolId: this.schoolVTPSectorFilterForm.controls["SchoolId"].value,
      Status: this.schoolVTPSectorFilterForm.controls["Status"].value,
      Name: this.schoolVTPSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.schoolVTPSectorService.GetAllByCriteria(vtpSchoolSectorParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.SchoolVTPSectorId;
          delete obj.IsAYRollover;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "SchoolVTPSector");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create SchoolVtpSectorFilter form and returns {FormGroup}
  createSchoolVtpSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      SectorId: new FormControl(),
      VTPId: new FormControl(),
      SchoolId: new FormControl(),
      Status: new FormControl()
    });
  }
}
