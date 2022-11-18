import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { VCSchoolSectorsForAcademicRolloverModel } from './vcschool-sectors-for-academic-rollover.model';
import { VCSchoolSectorsForAcademicRolloverService } from './vcschool-sectors-for-academic-rollover-service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VCSchoolSectorService } from '../vc-school-sectors/vc-school-sector.service';

@Component({
  selector: 'acadmic-rollover-view',
  templateUrl: './vcschool-sectors-for-academic-rollover.component.html',
  styleUrls: ['./vcschool-sectors-for-academic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class VCSchoolSectorsForAcademicRolloverComponent extends BaseListComponent<VCSchoolSectorsForAcademicRolloverModel> implements OnInit {
  yearName: any;
  vcSchoolSectorList: any = [];
  vcSchoolSectorSearchForm: FormGroup;
  vcSchoolSectorFilterForm: FormGroup;

  academicYearList: [DropdownModel];
  sectorList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: [DropdownModel];
  vtpId: string
  currentAcademicYearId: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vcSchoolSectorService: VCSchoolSectorService,
    private VCSchoolSectorsForAcademicRolloverService: VCSchoolSectorsForAcademicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.vcSchoolSectorFilterForm = this.createVCSchoolSectorFilterForm()
    this.vcSchoolSectorSearchForm = this.formBuilder.group({ filterText: '' });
  }

  ngOnInit(): void {
    this.SearchBy.IsRollover = true;
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 10000; // delete after script changed

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
        this.currentAcademicYearId = currentYearItem.Id;
        this.vcSchoolSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      this.onLoadVCSchoolSectorsByCriteria();

      this.vcSchoolSectorSearchForm.get('filterText').valueChanges.pipe(
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

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onLoadVCSchoolSectorsByCriteria(): any {
    this.IsLoading = true;
    this.SearchBy.AcademicYearId = this.vcSchoolSectorFilterForm.controls['AcademicYearId'].value;
    this.SearchBy.VTPId = this.vcSchoolSectorFilterForm.controls['VTPId'].value;
    this.SearchBy.VCId = this.UserModel.RoleCode == 'VC' ? this.UserModel.UserTypeId : this.vcSchoolSectorFilterForm.controls['VCId'].value;
    this.SearchBy.SchoolId = this.vcSchoolSectorFilterForm.controls['SchoolId'].value;
    this.SearchBy.SectorId = this.vcSchoolSectorFilterForm.controls['SectorId'].value;

    this.VCSchoolSectorsForAcademicRolloverService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'SchoolName', 'SchoolVTPSector', 'DateOfAllocation', 'IsAYRollover'];

      this.vcSchoolSectorList = response.Results.filter(vs => vs.IsActive == true);

      this.vcSchoolSectorList.forEach(vs => {
        vs.IsActive = vs.IsAYRollover;
      });

      this.tableDataSource.data = this.vcSchoolSectorList;
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
  }

  onLoadVCSchoolSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVCSchoolSectorsByCriteria();
  }

  resetFilters(): void {
    this.vcSchoolSectorFilterForm.reset();
    this.vcSchoolSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    if (this.UserModel.RoleCode == 'VC') {
      this.vcSchoolSectorFilterForm.get('VTPId').setValue(this.vtpId);
      this.vcSchoolSectorFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
      this.vcSchoolSectorFilterForm.controls['VTPId'].disable();
      this.vcSchoolSectorFilterForm.controls['VCId'].disable();
    };

    this.onLoadVCSchoolSectorsByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false)
        .subscribe((response: any) => {
          if (response.Success) {
            this.vcList = response.Results;
            this.filteredVcItems = this.vcList.slice();

            this.vcSchoolSectorFilterForm.get('VCId').setValue(null);
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

          this.vcSchoolSectorFilterForm.get('SchoolId').setValue(null);
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

  onVCSSForAdemicYear(event, svsItem) {
    if (svsItem == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let vcSchoolSectorItem = this.vcSchoolSectorList.find(vs => vs.VCSchoolSectorId === svsItem.VCSchoolSectorId);
      vcSchoolSectorItem.IsActive = event.checked;
    }
  }

  onTransfer() {
    let vcSchoolSectorIds = this.vcSchoolSectorList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.VCSchoolSectorId).toString();

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this records?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.VCSchoolSectorsForAcademicRolloverService.VCSchoolSectorForAcademicRolloverTransfer(this.UserModel, vcSchoolSectorIds)
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
              console.log('Transfer VCSchoolSector errors =>', error);
            });
        }
      });
  }

  //Create VtSchoolSectorFilter form and returns {FormGroup}
  createVCSchoolSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      SectorId: new FormControl(),
      SchoolId: new FormControl()
    });
  }
}
