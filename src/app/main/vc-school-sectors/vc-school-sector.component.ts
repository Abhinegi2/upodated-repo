import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VCSchoolSectorModel } from './vc-school-sector.model';
import { VCSchoolSectorService } from './vc-school-sector.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as guarati } from './i18n/gj';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'data-list-view',
  templateUrl: './vc-school-sector.component.html',
  styleUrls: ['./vc-school-sector.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VCSchoolSectorComponent extends BaseListComponent<VCSchoolSectorModel> implements OnInit {
  vcSchoolSectorSearchForm: FormGroup
  vcSchoolSectorFilterForm: FormGroup;

  vtpList: DropdownModel[];
  filteredVtpSectorItems: any;
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: DropdownModel[];
  academicYearList: DropdownModel[];
  sectorList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoaderService: FuseTranslationLoaderService,
    public zone: NgZone,
    private dialogService: DialogService,
    public formBuilder: FormBuilder,
    private vcSchoolSectorService: VCSchoolSectorService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.translationLoaderService.loadTranslations(english, guarati);
    this.vcSchoolSectorSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vcSchoolSectorFilterForm = this.createVcSchoolSectorFilterForm();
  }

  ngOnInit(): void {
    this.vcSchoolSectorService.getAcademicYearVC().subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVtpSectorItems = this.vtpList.slice();
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vcSchoolSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      this.onLoadVCSchoolSectorsByCriteria();

      this.vcSchoolSectorSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVCSchoolSectorsByCriteria();
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
        this.onLoadVCSchoolSectorsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVCSchoolSectorsByCriteria();
  }

  onLoadVCSchoolSectorsByCriteria(): void {
    this.IsLoading = true;

    let vcSchoolSectorParams = {
      AcademicYearId: this.vcSchoolSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcSchoolSectorFilterForm.controls["VTPId"].value,
      VCId: this.vcSchoolSectorFilterForm.controls["VCId"].value,
      SchoolId: this.vcSchoolSectorFilterForm.controls["SchoolId"].value,
      SectorId: this.vcSchoolSectorFilterForm.controls["SectorId"].value,
      Status: this.vcSchoolSectorFilterForm.controls["Status"].value,
      IsRollover: 0,
      Name: this.vcSchoolSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.vcSchoolSectorService.GetAllByCriteria(vcSchoolSectorParams).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'SchoolName', 'SchoolVTPSector', 'DateOfAllocation', 'IsActive', 'Actions'];

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

  onLoadVCSchoolSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVCSchoolSectorsByCriteria();
  }

  resetFilters(): void {
    this.vcSchoolSectorSearchForm.reset();
    this.vcSchoolSectorFilterForm.reset();
    this.vcSchoolSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.onLoadVCSchoolSectorsByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false)
        .subscribe((response: any) => {
          if (response.Success) {
            this.vcList = response.Results;
            this.filteredVcItems = this.vcList.slice();
          }

          this.IsLoading = false;
          resolve(true);
        }, error => {
          console.log(error);
          resolve(false);
        });
    });
    return promise;
  }

  onChangeVC(vcId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;
      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }, false).subscribe((response: any) => {
        if (response.Success) {
          this.schoolList = response.Results;
          this.filteredSchoolItems = this.schoolList.slice();
        }

        this.IsLoading = false;
        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }

  onDeleteVCSchoolSector(vcSchoolSectorId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vcSchoolSectorService.deleteVCSchoolSectorById(vcSchoolSectorId)
            .subscribe((vcSchoolSectorResp: any) => {

              this.zone.run(() => {
                if (vcSchoolSectorResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VCSchoolSector deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vcSchoolSectorParams = {
      AcademicYearId: this.vcSchoolSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcSchoolSectorFilterForm.controls["VTPId"].value,
      VCId: this.vcSchoolSectorFilterForm.controls["VCId"].value,
      SchoolId: this.vcSchoolSectorFilterForm.controls["SchoolId"].value,
      SectorId: this.vcSchoolSectorFilterForm.controls["SectorId"].value,
      Status: this.vcSchoolSectorFilterForm.controls["Status"].value,
      Name: this.vcSchoolSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.vcSchoolSectorService.GetAllByCriteria(vcSchoolSectorParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VCSchoolSectorId;
          delete obj.IsAYRollover;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VCSchoolSector");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VcSchoolSectorFilter form and returns {FormGroup}
  createVcSchoolSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      SectorId: new FormControl(),
      VTPId: new FormControl(),
      SchoolId: new FormControl(),
      VCId: new FormControl(),
      Status: new FormControl()
    });
  }
}
