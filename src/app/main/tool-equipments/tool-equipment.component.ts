import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolEquipmentModel } from './tool-equipment.model';
import { ToolEquipmentService } from './tool-equipment.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'data-list-view',
  templateUrl: './tool-equipment.component.html',
  styleUrls: ['./tool-equipment.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class ToolEquipmentComponent extends BaseListComponent<ToolEquipmentModel> implements OnInit {
  toolEquipmentSearchForm: FormGroup;
  toolEquipmentFilterForm: FormGroup;

  academicYearList: DropdownModel[];
  sectorList: DropdownModel[];
  vtpList: DropdownModel[];
  currentAcademicYearId: string;
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: [DropdownModel];
  jobRoleList: [DropdownModel];
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
    private toolEquipmentService: ToolEquipmentService) {
    super(commonService, router, routeParams, snackBar, zone);

    this.toolEquipmentSearchForm = this.formBuilder.group({ filterText: new FormControl() });
    this.toolEquipmentFilterForm = this.createVtSchoolSectorFilterForm()
  }

  ngOnInit(): void {
    this.toolEquipmentService.initToolsAndEquipmentsData(this.UserModel).subscribe(results => {
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
        this.currentAcademicYearId = currentYearItem.Id;
        this.toolEquipmentFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
          this.vtpId = vtpResp[0].Id;

          this.onChangeVTP(this.vtpId).then(vcResp => {
            this.toolEquipmentFilterForm.get('VTPId').setValue(this.vtpId);
            this.toolEquipmentFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
            this.toolEquipmentFilterForm.controls['VTPId'].disable();
            this.toolEquipmentFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.UserModel.UserTypeId);
          });
        });
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial ToolEquipments data
      this.onLoadToolEquipmentsByCriteria();

      this.toolEquipmentSearchForm.get('filterText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadToolEquipmentsByCriteria();
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
        this.onLoadToolEquipmentsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadToolEquipmentsByCriteria();
  }

  onLoadToolEquipmentsByCriteria(): any {
    this.IsLoading = true;
    this.SearchBy.AcademicYearId = this.toolEquipmentFilterForm.controls['AcademicYearId'].value;
    this.SearchBy.VTId = this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.toolEquipmentFilterForm.controls['VTId'].value;
    this.SearchBy.SchoolId = this.toolEquipmentFilterForm.controls['SchoolId'].value;
    this.SearchBy.SectorId = this.toolEquipmentFilterForm.controls['SectorId'].value;
    this.SearchBy.JobRoleId = this.toolEquipmentFilterForm.controls['JobRoleId'].value;

    this.SearchBy.UserTypeId = this.UserModel.UserTypeId;
    this.SearchBy.RoleId = this.UserModel.RoleCode;

    this.toolEquipmentService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'VTName', 'SchoolName', 'SectorName', 'JobRoleName', 'ReceiptDate', 'TEStatus', 'CreatedBy', 'UpdatedBy', 'Actions'];
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

  onLoadToolEquipmentsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadToolEquipmentsByCriteria();
  }

  resetFilters(): void {
    this.toolEquipmentFilterForm.reset();
    this.toolEquipmentFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    if (this.UserModel.RoleCode == 'VC') {
      this.toolEquipmentFilterForm.get('VTPId').setValue(this.vtpId);
      this.toolEquipmentFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
      this.toolEquipmentFilterForm.controls['VTPId'].disable();
      this.toolEquipmentFilterForm.controls['VCId'].disable();
    };

    this.onLoadToolEquipmentsByCriteria();
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

          this.toolEquipmentFilterForm.get('VCId').setValue(null);
          this.toolEquipmentFilterForm.get('VTId').setValue(null);
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
      let schoolRequest = null;
      if (this.UserModel.RoleCode == 'HM') {
        schoolRequest = this.commonService.GetSchoolByHMId(this.currentAcademicYearId, this.UserModel.UserTypeId, vcId);
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

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
      this.toolEquipmentFilterForm.get('JobRoleId').setValue(null);
    });
  }

  exportExcel(): void {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 10000;

    this.toolEquipmentService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VTSchoolSectorId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "ToolEquipments");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  onDeleteToolEquipment(toolEquipmentId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.toolEquipmentService.deleteToolEquipmentById(toolEquipmentId)
            .subscribe((toolEquipmentResp: any) => {

              this.zone.run(() => {
                if (toolEquipmentResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('ToolEquipment deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  //Create VtSchoolSectorFilter form and returns {FormGroup}
  createVtSchoolSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      HMId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl()
    });
  }
}
