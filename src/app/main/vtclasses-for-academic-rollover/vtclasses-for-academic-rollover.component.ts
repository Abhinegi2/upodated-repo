import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { VTClassForAcademicRolloverModel } from './vtclasses-for-academic-rollover.model';
import { VTClassForAcademicRolloverService } from './vtclasses-for-academic-rollover.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownModel } from 'app/models/dropdown.model';
import { VTClassService } from '../vt-classes/vt-class.service';

@Component({
  selector: 'acadmic-rollover-view',
  templateUrl: './vtclasses-for-academic-rollover.component.html',
  styleUrls: ['./vtclasses-for-academic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class VTClassesForAcademicRolloverComponent extends BaseListComponent<VTClassForAcademicRolloverModel> implements OnInit {
  vtClassSearchForm: FormGroup;
  vtClassFilterForm: FormGroup;
  currentAcademicYearId: string;
  vtClassList: any = [];
  yearName: any;

  academicYearList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVTPItems: any;
  vcList: [DropdownModel];
  filteredVCItems: any;
  vtList: [DropdownModel];
  filteredVTItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  sectorList: [DropdownModel];
  jobRoleList: [DropdownModel];
  classList: [DropdownModel];
  vtpId: string;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vtClassService: VTClassService,
    private vtClassForAcademicRolloverService: VTClassForAcademicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.vtClassSearchForm = this.formBuilder.group({ filterText: new FormControl() });
    this.vtClassFilterForm = this.createVTClassesFilterForm()
  }

  ngOnInit(): void {
    this.SearchBy.IsRollover = true;
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 100000; // delete after script changed

    this.vtClassService.getAcademicYearClassSection(this.UserModel).subscribe(results => {
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
        this.currentAcademicYearId = currentYearItem.Id;
        this.vtClassFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
          this.vtpId = vtpResp[0].Id;

          this.onChangeVTP(this.vtpId).then(vcResp => {
            this.vtClassFilterForm.get('VTPId').setValue(this.vtpId);
            this.vtClassFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
            this.vtClassFilterForm.controls['VTPId'].disable();
            this.vtClassFilterForm.controls['VCId'].disable();

            this.onChangeVC(this.UserModel.UserTypeId);
            this.onLoadVTClassesByCriteria();
          });
        });
      }
      else {
        //Load initial VTSchoolSectors data
        this.onLoadVTClassesByCriteria();
      }

      this.vtClassSearchForm.get('filterText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVTClassesByCriteria();
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
        this.onLoadVTClassesByCriteria();
      });
    });

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onLoadVTClassesByCriteria(): void {
    this.SearchBy.PageIndex = 0;
    this.SearchBy.AcademicYearId = this.vtClassFilterForm.controls['AcademicYearId'].value;
    this.SearchBy.VTPId = this.vtClassFilterForm.controls['VTPId'].value;
    this.SearchBy.VCId = this.vtClassFilterForm.controls['VCId'].value;
    this.SearchBy.VTId = this.vtClassFilterForm.controls['VTId'].value;
    this.SearchBy.SectorId = this.vtClassFilterForm.controls['SectorId'].value;
    this.SearchBy.JobRoleId = this.vtClassFilterForm.controls['JobRoleId'].value;
    this.SearchBy.SchoolId = this.vtClassFilterForm.controls['SchoolId'].value;
    this.SearchBy.ClassId = this.vtClassFilterForm.controls['ClassId'].value;

    this.vtClassService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['SrNo', 'AcademicYear', 'VCName', 'VTName', 'VTEmailId', 'SchoolName', 'ClassName', 'SectionName', 'IsAYRollover'];

      this.vtClassList = response.Results.filter(vs => vs.IsActive == true);

      this.vtClassList.forEach(vs => {
        vs.IsActive = vs.IsAYRollover;
      });

      this.tableDataSource.data = this.vtClassList;
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

  onLoadVTClassesByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVTClassesByCriteria();
  }

  resetFilters(): void {
    this.vtClassFilterForm.reset();
    this.vtClassFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    if (this.UserModel.RoleCode == 'VC') {
      this.vtClassFilterForm.get('VTPId').setValue(this.vtpId);
      this.vtClassFilterForm.get('VCId').setValue(this.UserModel.UserTypeId);
      this.vtClassFilterForm.controls['VTPId'].disable();
      this.vtClassFilterForm.controls['VCId'].disable();
    };

    this.onLoadVTClassesByCriteria();
  }

  onChangeVTP(vtpId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinators', ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false)
        .subscribe((response: any) => {
          if (response.Success) {
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
      this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vcId, SelectTitle: 'Vocational Trainer' }, false).subscribe((response: any) => {
        if (response.Success) {
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

  onVTCForAdemicYear(event, vsItem) {
    if (vsItem == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let vtClassItem = this.vtClassList.find(vs => vs.VTClassId === vsItem.VTClassId);
      vtClassItem.IsActive = event.checked;
    }
  }

  onTransfer() {
    let vtClassIds = this.vtClassList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.VTClassId).toString();

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this record?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {

          this.vtClassForAcademicRolloverService.VTClassesForAcademicRolloverTransfer(this.UserModel, vtClassIds)
            .subscribe((vtpSectorResp: any) => {

              this.zone.run(() => {
                if (vtpSectorResp.Success) {
                  this.showActionMessage('Academic Rollover completed for selected rows.', this.Constants.Html.SuccessSnackbar);
                }
              });

              this.IsLoading = false;
              this.ngOnInit();

            }, error => {
              console.log('Transfer VTPSector errors =>', error);
            });
        }
      });
  }

  //Create VtclassesFilter form and returns {FormGroup}
  createVTClassesFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl(),
      ClassId: new FormControl()
    });
  }
}
