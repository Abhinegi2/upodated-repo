import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolSectorJobModel } from './school-sector-job.model';
import { SchoolSectorJobService } from './school-sector-job.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'data-list-view',
  templateUrl: './school-sector-job.component.html',
  styleUrls: ['./school-sector-job.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class SchoolSectorJobComponent extends BaseListComponent<SchoolSectorJobModel> implements OnInit {
  schoolSectorJobSearchForm: FormGroup;
  schoolSectorJobFilterForm: FormGroup;
  AcademicYearId: string;
  vtpId: string;
  vcId: string;

  academicYearList: [DropdownModel];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  vcList: DropdownModel[];
  filteredVCItems: any;
  vtList: DropdownModel[];
  filteredVTItems: any;
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  classList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private schoolSectorJobService: SchoolSectorJobService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.schoolSectorJobSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.schoolSectorJobFilterForm = this.createSchoolSectorJobFilterForm()
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 10; // delete after script changed

    this.schoolSectorJobService.getAcademicYearClassSection(this.UserModel).subscribe(results => {
      if (results[5].Success) {
        this.academicYearList = results[5].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVTPItems = this.vtpList.slice();
      }

      if (results[2].Success) {
        this.sectorList = results[2].Results;
      }

      if (results[3].Success) {
        this.classList = results[3].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.schoolSectorJobFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      //Load initial VTSchoolSectors data
      this.onLoadSchoolSectorJobByCriteria();

      this.schoolSectorJobSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadSchoolSectorJobByCriteria();
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
        this.onLoadSchoolSectorJobByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadSchoolSectorJobByCriteria();
  }

  onLoadSchoolSectorJobByCriteria(): void {
    this.IsLoading = true;

    let schoolSectorJobParams: any = {
      AcademicYearId: this.schoolSectorJobFilterForm.controls["AcademicYearId"].value,
      VTPId: this.schoolSectorJobFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.schoolSectorJobFilterForm.controls['VCId'].value,
      VTId: this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.schoolSectorJobFilterForm.controls['VTId'].value,
      SchoolId: this.schoolSectorJobFilterForm.controls["SchoolId"].value,
      SectorId: this.schoolSectorJobFilterForm.controls["SectorId"].value,
      JobRoleId: this.schoolSectorJobFilterForm.controls['JobRoleId'].value,
      ClassId: this.schoolSectorJobFilterForm.controls['ClassId'].value,
      Status: this.schoolSectorJobFilterForm.controls["Status"].value,
      HMId: null,
      IsRollover: 0,
      Name: this.schoolSectorJobSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    if (this.UserModel.RoleCode == "HM") {
      schoolSectorJobParams.HMId = this.UserModel.UserTypeId;
    }

    this.schoolSectorJobService.GetAllByCriteria(schoolSectorJobParams).subscribe(response => {
      this.displayedColumns = ['SrNo', 'AcademicYear', 'VCName', 'VTName', 'VTEmailId', 'SchoolName', 'UDISE', 'ClassName', 'SectionName', 'IsActive', 'Actions'];

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

  onLoadSchoolSectorJobByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadSchoolSectorJobByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.schoolSectorJobSearchForm.reset();
    this.schoolSectorJobFilterForm.reset();
    this.schoolSectorJobFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.vcList = [];
    this.filteredVCItems = [];
    this.vtList = [];
    this.filteredVTItems = [];
    this.schoolList = [];
    this.filteredSchoolItems = [];

    this.jobRoleList = [];

    this.onLoadSchoolSectorJobByCriteria();
  }

  onChangeAY(AYId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.vtpList = [];
      this.filteredVTPItems = [];
      let vtpRequest = this.commonService.GetVTPByAYId(this.UserModel.RoleCode, this.UserModel.UserTypeId, AYId)

      vtpRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vtpList = response.Results;
          this.filteredVTPItems = this.vtpList.slice();
        }

        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
    return promise;
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let vcRequest = this.commonService.GetVCByAYAndVTPId(this.UserModel.RoleCode, this.UserModel.UserTypeId, this.AcademicYearId, vtpId);

      vcRequest.subscribe((response: any) => {
        if (response.Success) {
          if (this.UserModel.RoleCode == 'VC') {
            this.schoolSectorJobFilterForm.get('VCId').setValue(response.Results[0].Id);
            this.schoolSectorJobFilterForm.controls['VCId'].disable();
            this.onChangeVC(response.Results[0].Id)
          }
          this.vcList = response.Results;
          this.filteredVCItems = this.vcList.slice();
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
      this.vtList = [];
      this.filteredVTItems = [];
      let vtRequest = this.commonService.GetVTByAYAndVCId(this.UserModel.RoleCode, this.UserModel.UserTypeId, this.AcademicYearId, vcId);

      vtRequest.subscribe((response: any) => {
        if (response.Success) {
          if (this.UserModel.RoleCode == 'VT') {
            this.schoolSectorJobFilterForm.get('VTId').setValue(response.Results[0].Id);
            this.schoolSectorJobFilterForm.controls['VTId'].disable();
            this.onChangeVT(response.Results[0].Id)
          }
          this.vtList = response.Results;
          this.filteredVTItems = this.vtList.slice();
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
    });
  }

  onChangeVT(vtId) {
    let promise = new Promise((resolve, reject) => {
      this.IsLoading = true;
      this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVT', userId: this.UserModel.LoginId, ParentId: vtId, SelectTitle: 'School' }, false).subscribe((response: any) => {
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

  onDeleteSchoolSectorJob(schoolSectorJobId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.schoolSectorJobService.deleteSchoolSectorJobById(schoolSectorJobId)
            .subscribe((schoolSectorJobResp: any) => {

              this.zone.run(() => {
                if (schoolSectorJobResp.Success) {
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

  exportExcel(): void {
    this.IsLoading = true;

    let schoolSectorJobParams = {
      AcademicYearId: this.schoolSectorJobFilterForm.controls["AcademicYearId"].value,
      VTPId: this.schoolSectorJobFilterForm.controls["VTPId"].value,
      VCId: this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.schoolSectorJobFilterForm.controls['VCId'].value,
      VTId: this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.schoolSectorJobFilterForm.controls['VTId'].value,
      SchoolId: this.schoolSectorJobFilterForm.controls["SchoolId"].value,
      SectorId: this.schoolSectorJobFilterForm.controls["SectorId"].value,
      JobRoleId: this.schoolSectorJobFilterForm.controls['JobRoleId'].value,
      ClassId: this.schoolSectorJobFilterForm.controls['ClassId'].value,
      HMId: null,
      Status: this.schoolSectorJobFilterForm.controls["Status"].value,
      Name: this.schoolSectorJobSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 10000
    };

    if (this.UserModel.RoleCode == "HM") {
      schoolSectorJobParams.HMId = this.UserModel.UserTypeId;
    }

    this.schoolSectorJobService.GetAllByCriteria(schoolSectorJobParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.IsAYRollover;
          delete obj.SchoolSectorJobId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "SchoolSectorJob");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VtclassesFilter form and returns {FormGroup}
  createSchoolSectorJobFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl(),
      ClassId: new FormControl(),
      Status: new FormControl()
    });
  }
}
