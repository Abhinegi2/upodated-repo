import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { VTSchoolSectorsForAcademicRolloverModel } from './vtschool-sectors-for-academic-rollover.model';
import { VTSchoolSectorsForAcademicRolloverService } from './vtschool-sectors-for-academic-rollover-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { VTSchoolSectorService } from '../vt-school-sectors/vt-school-sector.service';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'acadmic-rollover-view',
  templateUrl: './vtschool-sectors-for-academic-rollover.component.html',
  styleUrls: ['./vtschool-sectors-for-academic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class VTSchoolSectorsForAcademicRolloverComponent extends BaseListComponent<VTSchoolSectorsForAcademicRolloverModel> implements OnInit {
  yearName: any;
  vtSchoolSectorList: any = [];
  vtSchoolSectorSearchForm: FormGroup
  vtSchoolSectorFilterForm: FormGroup;

  academicYearList: [DropdownModel];
  sectorList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: [DropdownModel];
  jobRoleList: [DropdownModel];
  vtpId: string;
  currentAcademicYearId: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vtSchoolSectorService: VTSchoolSectorService,
    private VTSchoolSectorsForAcademicRolloverService: VTSchoolSectorsForAcademicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.vtSchoolSectorFilterForm = this.createVtSchoolSectorFilterForm()
  }

  ngOnInit(): void {
    this.SearchBy.IsRollover = true;
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 10000; // delete after script changed

    this.vtSchoolSectorSearchForm = this.formBuilder.group({ filterText: '' });

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
        this.currentAcademicYearId = currentYearItem.Id;
        this.vtSchoolSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
          this.vtpId = vtpResp[0].Id;

          this.onChangeVTP(this.vtpId).then(vcResp => {
            this.vtSchoolSectorFilterForm.get('VTPId').setValue(this.vtpId);
            this.vtSchoolSectorFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
            this.vtSchoolSectorFilterForm.controls['VTPId'].disable();
            this.vtSchoolSectorFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.UserModel.UserTypeId);
          });
        });
      }

      //Load initial VTSchoolSectors data
      this.onLoadVTSchoolSectorsByCriteria();

      this.vtSchoolSectorSearchForm.get('filterText').valueChanges.pipe(
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

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVTSchoolSectorsByCriteria();
  }

  onLoadVTSchoolSectorsByCriteria(): any {
    this.IsLoading = true;
    this.SearchBy.AcademicYearId = this.vtSchoolSectorFilterForm.controls['AcademicYearId'].value;
    this.SearchBy.VTPId = this.vtSchoolSectorFilterForm.controls['VTPId'].value;
    this.SearchBy.VCId = this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VCId'].value;
    this.SearchBy.VTId = this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.vtSchoolSectorFilterForm.controls['VTId'].value;
    this.SearchBy.SchoolId = this.vtSchoolSectorFilterForm.controls['SchoolId'].value;
    this.SearchBy.SectorId = this.vtSchoolSectorFilterForm.controls['SectorId'].value;
    this.SearchBy.JobRoleId = this.vtSchoolSectorFilterForm.controls['JobRoleId'].value;

    this.VTSchoolSectorsForAcademicRolloverService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'VTName', 'VTEmailId', 'SchoolName', 'UDISE', 'SectorName', 'DateOfAllocation', 'IsAYRollover'];

      this.vtSchoolSectorList = response.Results.filter(vs => vs.IsActive == true);

      this.vtSchoolSectorList.forEach(vs => {
        vs.IsActive = vs.IsAYRollover;
      });

      this.tableDataSource.data = this.vtSchoolSectorList;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.SearchBy.TotalResults = response.TotalResults;

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
    this.vtSchoolSectorFilterForm.reset();
    this.vtSchoolSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    if (this.UserModel.RoleCode == 'VC') {
      this.vtSchoolSectorFilterForm.get('VTPId').setValue(this.vtpId);
      this.vtSchoolSectorFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
      this.vtSchoolSectorFilterForm.controls['VTPId'].disable();
      this.vtSchoolSectorFilterForm.controls['VCId'].disable();
    };

    this.onLoadVTSchoolSectorsByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false)
        .subscribe((response: any) => {
          if (response.Success) {
            this.vcList = response.Results;
            this.filteredVcItems = this.vcList.slice();

            this.vtSchoolSectorFilterForm.get('VCId').setValue(null);
            this.vtSchoolSectorFilterForm.get('VTId').setValue(null);
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

  onVTSSForAdemicYear(event, svsItem) {
    if (svsItem == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let vtSchoolSectorItem = this.vtSchoolSectorList.find(vs => vs.VTSchoolSectorId === svsItem.VTSchoolSectorId);
      vtSchoolSectorItem.IsActive = event.checked;
    }
  }

  onTransfer() {
    let vtSchoolSectorIds = this.vtSchoolSectorList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.VTSchoolSectorId).toString();

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this records?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.VTSchoolSectorsForAcademicRolloverService.VTSchoolSectorForAcademicRolloverTransfer(this.UserModel, vtSchoolSectorIds)
            .subscribe((resp: any) => {

              this.zone.run(() => {
                if (resp.Success) {
                  this.showActionMessage('Academic Rollover completed for selected rows.', this.Constants.Html.SuccessSnackbar
                  );
                }
              });

              this.IsLoading = false;
              this.ngOnInit();

            }, error => {
              console.log('Transfer VTSchoolSector errors =>', error);
            });
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
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl()
    });
  }
}
