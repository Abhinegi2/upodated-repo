import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTAcademicClassSectionModel } from './vtacademicclasssection.model';
import { VTAcademicClassSectionService } from './vtacademicclasssection.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'data-list-view',
  templateUrl: './vtacademicclasssection.component.html',
  styleUrls: ['./vtacademicclasssection.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTAcademicClassSectionComponent extends BaseListComponent<VTAcademicClassSectionModel> implements OnInit {
  vtAcedemicClassSectionFilterForm: FormGroup;
  academicYearList: [DropdownModel];
  classList: [DropdownModel];
  sectionList: [DropdownModel];
  vtList: [DropdownModel];
  schoolList: [DropdownModel];
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private vtacademicclasssectionService: VTAcademicClassSectionService) {
    super(commonService, router, routeParams, snackBar, zone);
    this.vtAcedemicClassSectionFilterForm = this.createvtAcedemicClassSectionFilterForm();
  }

  ngOnInit(): void {
    this.vtacademicclasssectionService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['VTPShortName', 'VCFullName','SchoolName', 'AcademicYear', 'ClassName', 'SectionName', 'VTName', 'VTEmailId', 'SectorName', 'JobRoleName', 'DateOfAllocation', 'CreatedBy', 'UpdatedBy', 'DateOfRemoval',  'IsActive', 'Actions'];

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

    this.vtacademicclasssectionService.getVTAcademicClassSection(this.UserModel).subscribe(results => {
      this.commonService.GetMasterDataByType({ DataType: 'AcademicYears', SelectTitle: 'Academic Year' }).subscribe((response: any) => {
        this.academicYearList = response.Results;
        let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
        if (currentYearItem != null) {
          this.AcademicYearId = currentYearItem.Id;
          this.vtAcedemicClassSectionFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
        }
      }); 
       
      

      if (results[1].Success) {
        this.classList = results[1].Results;
      }

      if (results[2].Success) {
        this.sectionList = results[2].Results;
      }
      if (results[3].Success) {
        this.sectorList = results[3].Results;
      }

    });
  }
  
  onLoadAcedemicClassSectionsByFilters(): any {
    this.IsLoading = true;

    let schoolSectorJobParams: any = {
      vtId: this.vtAcedemicClassSectionFilterForm.controls["VTId"].value,
      userTypeId: this.UserModel.UserTypeId,
      schoolId: this.vtAcedemicClassSectionFilterForm.controls["SchoolId"].value,
      sectorId: this.vtAcedemicClassSectionFilterForm.controls["SectorId"].value,
      jobRoleId: this.vtAcedemicClassSectionFilterForm.controls['JobRoleId'].value,
      academicYearId: this.vtAcedemicClassSectionFilterForm.controls["AcademicYearId"].value,
      classId: this.vtAcedemicClassSectionFilterForm.controls["ClassId"].value,
      sectionId: this.vtAcedemicClassSectionFilterForm.controls["SectionId"].value,
      status: this.vtAcedemicClassSectionFilterForm.controls["Status"].value,
      charBy: null,
      pageIndex: this.SearchBy.PageIndex,
      pageSize: this.SearchBy.PageSize
    };


    this.vtacademicclasssectionService.GetAllByCriteria(schoolSectorJobParams).subscribe(response => {
      this.displayedColumns = ['SchoolName', 'AcademicYear', 'ClassName', 'SectionName', 'VTName', 'VTEmailId', 'SectorName', 'JobRoleName', 'DateOfAllocation', 'CreatedBy', 'UpdatedBy', 'DateOfRemoval',  'IsActive', 'Actions'];

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

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
    });
  }
  onLoadVtAcedemicClassSectionsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadAcedemicClassSectionsByFilters();
  }

  resetFilters(): void {
    this.vtAcedemicClassSectionFilterForm.reset();

    this.onLoadAcedemicClassSectionsByFilters();
  }
  onDeleteVTAcademicClassSection(vtacademicclasssectionId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtacademicclasssectionService.deleteVTAcademicClassSectionById(vtacademicclasssectionId)
            .subscribe((vtacademicclasssectionResp: any) => {

              this.zone.run(() => {
                if (vtacademicclasssectionResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTAcademicClassSection deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  createvtAcedemicClassSectionFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl(),
      ClassId: new FormControl(),
      SectionId: new FormControl(),
      Status: new FormControl()
    });
  }
}
