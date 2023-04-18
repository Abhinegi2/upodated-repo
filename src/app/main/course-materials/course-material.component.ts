import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseMaterialModel } from './course-material.model';
import { CourseMaterialService } from './course-material.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'data-list-view',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class CourseMaterialComponent extends BaseListComponent<CourseMaterialModel> implements OnInit {
  courseMaterialSearchForm: FormGroup;
  courseMaterialFilterForm: FormGroup;

  academicYearList: DropdownModel[];
  vtpList: DropdownModel[];
  currentAcademicYearId: string;
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: [DropdownModel];
  vtpId: string;
  vcId: string;
  schoolId: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private courseMaterialService: CourseMaterialService) {
    super(commonService, router, routeParams, snackBar, zone);

    this.courseMaterialSearchForm = this.formBuilder.group({ filterText: new FormControl() });
    this.courseMaterialFilterForm = this.createCourseMaterialFilterForm()
  }

  ngOnInit(): void {
    this.courseMaterialService.initCourseMaterialsData(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      // if (results[1].Success) {
      //   this.vtpList = results[1].Results;
      //   this.filteredVtpSectorItems = this.vtpList.slice();
      // }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.courseMaterialFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
          this.vtpId = vtpResp[0].Id;

          this.onChangeVTP(this.vtpId).then(vcResp => {
            this.courseMaterialFilterForm.get('VTPId').setValue(this.vtpId);
            this.courseMaterialFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
            this.courseMaterialFilterForm.controls['VTPId'].disable();
            this.courseMaterialFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.UserModel.UserTypeId);
          });
        });
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial ToolEquipments data
      this.onLoadCourseMaterialsByCriteria();

      this.courseMaterialSearchForm.get('filterText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadCourseMaterialsByCriteria();
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
        this.onLoadCourseMaterialsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadCourseMaterialsByCriteria();
  }

  onLoadCourseMaterialsByCriteria(): any {
    this.IsLoading = true;
    // this.SearchBy.AcademicYearId = this.courseMaterialFilterForm.controls['AcademicYearId'].value;
    // this.SearchBy.VTPId = this.courseMaterialFilterForm.controls['VTPId'].value;
    // this.SearchBy.VCId = this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.courseMaterialFilterForm.controls['VCId'].value;
    // this.SearchBy.VTId = this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.courseMaterialFilterForm.controls['VTId'].value;
    // this.SearchBy.HMId = this.UserModel.RoleCode == 'HM' ? this.UserModel.UserTypeId : this.courseMaterialFilterForm.controls['HMId'].value;
    // this.SearchBy.SchoolId = this.courseMaterialFilterForm.controls['SchoolId'].value;

    this.courseMaterialService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'VTName', 'SchoolName', 'ClassName', 'ReceiptDate', 'CMStatus', 'Details', 'Actions'];
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

  onLoadCourseMaterialsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadCourseMaterialsByCriteria();
  }

  resetFilters(): void {
    this.courseMaterialFilterForm.reset();
    // this.courseMaterialFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    // if (this.UserModel.RoleCode == 'VC') {
    //   this.courseMaterialFilterForm.get('VTPId').setValue(this.vtpId);
    //   this.courseMaterialFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
    //   this.courseMaterialFilterForm.controls['VTPId'].disable();
    //   this.courseMaterialFilterForm.controls['VCId'].disable();
    // };
    // if (this.UserModel.RoleCode == 'HM') {
    //   this.courseMaterialFilterForm.get('VTPId').setValue(this.vtpId);
    //   this.courseMaterialFilterForm.get('VCId').setValue(this.vcId);
    //   this.courseMaterialFilterForm.get('SchoolId').setValue(this.schoolId);
    //   this.courseMaterialFilterForm.controls['VTPId'].disable();
    //   this.courseMaterialFilterForm.controls['VCId'].disable();
    //   this.courseMaterialFilterForm.controls['SchoolId'].disable();
    // };

    this.onLoadCourseMaterialsByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let vcRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        vcRequest = this.commonService.GetVCByHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, vtpId);
      }
      else {
        vcRequest = this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false);
      }

      vcRequest.subscribe((response: any) => {
        if (response.Success) {
          this.vcList = response.Results;
          this.filteredVcItems = this.vcList.slice();

          this.courseMaterialFilterForm.get('VCId').setValue(null);
          this.courseMaterialFilterForm.get('VTId').setValue(null);
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
      let schoolRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        // schoolRequest = this.commonService.GetSchoolByHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, vcId);
      }
      else {
        schoolRequest = this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVC', ParentId: vcId, SelectTitle: 'School' });
      }

      schoolRequest.subscribe((response: any) => {
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

  exportExcel(): void {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 10000;

    this.courseMaterialService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VTSchoolSectorId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "CourseMaterials");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  onDeleteCourseMaterial(courseMaterialId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.courseMaterialService.deleteCourseMaterialById(courseMaterialId)
            .subscribe((courseMaterialResp: any) => {

              this.zone.run(() => {
                if (courseMaterialResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('CourseMaterial deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  //Create CourseMaterialFilter form and returns {FormGroup}
  createCourseMaterialFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      HMId: new FormControl(),
      SchoolId: new FormControl()
    });
  }
}
