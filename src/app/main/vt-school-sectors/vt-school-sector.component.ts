import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTSchoolSectorModel } from './vt-school-sector.model';
import { VTSchoolSectorService } from './vt-school-sector.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as guarati } from './i18n/gj';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-school-sector.component.html',
  styleUrls: ['./vt-school-sector.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTSchoolSectorComponent extends BaseListComponent<VTSchoolSectorModel> implements OnInit {
  vtSchoolSectorSearchForm: FormGroup;
  vtSchoolSectorFilterForm: FormGroup;

  vtpList: DropdownModel[];
  filteredVtpSectorItems: any;
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  vcList: DropdownModel[];
  filteredVcItems: any;
  academicYearList: DropdownModel[];
  sectorList: DropdownModel[];
  jobRoleList: DropdownModel[];
  vtpId: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoaderService: FuseTranslationLoaderService,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vtSchoolSectorService: VTSchoolSectorService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.translationLoaderService.loadTranslations(english, guarati);

    this.vtSchoolSectorSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vtSchoolSectorFilterForm = this.createVtSchoolSectorFilterForm()
  }

  ngOnInit(): void {
    this.vtSchoolSectorService.getDropdownforVTSchoolSector(this.UserModel).subscribe(results => {
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
        this.vtSchoolSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial VTSchoolSectors data
      this.onLoadVTSchoolSectorsByCriteria();

      this.vtSchoolSectorSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVTSchoolSectorsByCriteria();
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
        this.onLoadVTSchoolSectorsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }


  onChangeAY(AYId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.vtpList = [];
      this.filteredVtpSectorItems = [];
      let vtpRequest = this.commonService.GetVTPByAYId(this.UserModel.RoleCode, this.UserModel.UserTypeId, AYId)

      vtpRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vtpList = response.Results;
          this.filteredVtpSectorItems = this.vtpList.slice();
        }

        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVTSchoolSectorsByCriteria();
  }

  onLoadVTSchoolSectorsByCriteria(): any {
    this.IsLoading = true;

    let vtSchoolSectorParams = {
      AcademicYearId: this.vtSchoolSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtSchoolSectorFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VCId'].value,
      VTId: this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VTId'].value,
      SchoolId: this.vtSchoolSectorFilterForm.controls["SchoolId"].value,
      SectorId: this.vtSchoolSectorFilterForm.controls["SectorId"].value,
      JobRoleId: this.vtSchoolSectorFilterForm.controls['JobRoleId'].value,
      Status: this.vtSchoolSectorFilterForm.controls["Status"].value,
      IsRollover: 0,
      Name: this.vtSchoolSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.vtSchoolSectorService.GetAllByCriteria(vtSchoolSectorParams).subscribe(response => {

      this.displayedColumns = ['SrNo', 'AcademicYear', 'VCName', 'VTName', 'VTEmailId', 'SchoolName', 'SectorName', 'JobRoleName', 'DateOfAllocation', 'IsActive', 'Actions'];
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
      this.IsLoading = false;
    });
  }

  onLoadVTSchoolSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVTSchoolSectorsByCriteria();
  }

  resetFilters(): void {
    this.vtSchoolSectorSearchForm.reset();
    this.vtSchoolSectorFilterForm.reset();
    this.vtSchoolSectorFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.onLoadVTSchoolSectorsByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let vcRequest = this.commonService.GetVCByAYAndVTPId(this.UserModel.RoleCode, this.UserModel.UserTypeId, this.AcademicYearId, vtpId);

      vcRequest.subscribe((response: any) => {
        if (response.Success) {
          if (this.UserModel.RoleCode == 'VC') {
            this.vtSchoolSectorFilterForm.get('VCId').setValue(response.Results[0].Id);
            this.vtSchoolSectorFilterForm.controls['VCId'].disable();
          }
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
      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' }).subscribe((response: any) => {
        if (response.Success) {
          this.schoolList = response.Results;
          this.filteredSchoolItems = this.schoolList.slice();
          this.vtSchoolSectorFilterForm.get('SchoolId').setValue(null);
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

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
      this.vtSchoolSectorFilterForm.get('JobRoleId').setValue(null);
    });
  }

  onDeleteVTSchoolSector(vtSchoolSectorId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtSchoolSectorService.deleteVTSchoolSectorById(vtSchoolSectorId)
            .subscribe((vtSchoolSectorResp: any) => {

              this.zone.run(() => {
                if (vtSchoolSectorResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTSchoolSector deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vtSchoolSectorParams = {
      AcademicYearId: this.vtSchoolSectorFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vtSchoolSectorFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VCId'].value,
      VTId: this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VTId'].value,
      SchoolId: this.vtSchoolSectorFilterForm.controls["SchoolId"].value,
      SectorId: this.vtSchoolSectorFilterForm.controls["SectorId"].value,
      JobRoleId: this.vtSchoolSectorFilterForm.controls['JobRoleId'].value,
      Status: this.vtSchoolSectorFilterForm.controls["Status"].value,
      Name: this.vtSchoolSectorSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 10000
    };

    this.vtSchoolSectorService.GetAllByCriteria(vtSchoolSectorParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VTSchoolSectorId;
          delete obj.IsAYRollover;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VTSchoolSectors");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VtSchoolSectorFilter form and returns {FormGroup}
  createVtSchoolSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl(),
      Status: new FormControl()
    });
  }
}
