import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolVTPSectorsForAcadmicRolloverModel } from './school-vtpsectors-for-acadmic-rollover.model';
import { SchoolVTPSectorsForAcadmicRolloverService } from './school-vtpsectors-for-acadmic-rollover-service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DropdownModel } from 'app/models/dropdown.model';
import { SchoolVTPSectorService } from '../school-vtp-sectors/school-vtp-sector.service';

@Component({
  selector: 'acadmic-rollover-view',
  templateUrl: './school-vtpsectors-for-acadmic-rollover.component.html',
  styleUrls: ['./school-vtpsectors-for-acadmic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SchoolVTPSectorsForAcadmicRolloverComponent extends BaseListComponent<SchoolVTPSectorsForAcadmicRolloverModel> implements OnInit {
  yearName: any;
  schoolVTPSectorList: any = [];
  schoolVTPSectorSearchForm: FormGroup
  schoolVTPSectorFilterForm: FormGroup;
  currentAcademicYearId: string;

  academicYearList: [DropdownModel];
  sectorList: [DropdownModel];
  vtpList: [DropdownModel];
  filteredVtpSectorItems: any;
  schoolList: [DropdownModel];
  filteredSchoolItems: any;
  filteredVcItems: any;
  vcList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private schoolVTPSectorService: SchoolVTPSectorService,
    private transferSchoolVTPSectorService: SchoolVTPSectorsForAcadmicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.schoolVTPSectorFilterForm = this.createSchoolVTPSectorFilterForm()
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0;
    this.SearchBy.IsRollover = true;

    this.schoolVTPSectorSearchForm = this.formBuilder.group({ filterText: '' });

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

      //Load initial VTSchoolSectors data
      this.onLoadSchoolVTPSectorsByCriteria();

      this.schoolVTPSectorSearchForm.get('filterText').valueChanges.pipe(
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

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onLoadSchoolVTPSectorsByCriteria(): any {
    this.IsLoading = true;
    this.SearchBy.AcademicYearId = this.schoolVTPSectorFilterForm.controls['AcademicYearId'].value;
    this.SearchBy.VTPId = this.schoolVTPSectorFilterForm.controls['VTPId'].value;
    this.SearchBy.SchoolId = this.schoolVTPSectorFilterForm.controls['SchoolId'].value;
    this.SearchBy.SectorId = this.schoolVTPSectorFilterForm.controls['SectorId'].value;

    this.schoolVTPSectorService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VTPName', 'SectorName', 'SchoolName', 'UDISE', 'IsAYRollover'];

      this.schoolVTPSectorList = response.Results.filter(vs => vs.IsActive == true);

      this.schoolVTPSectorList.forEach(vs => {
        vs.IsActive = vs.IsAYRollover;
      });

      this.tableDataSource.data = this.schoolVTPSectorList;
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

  onLoadSchoolVTPSectorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadSchoolVTPSectorsByCriteria();
  }

  resetFilters(): void {
    this.schoolVTPSectorFilterForm.reset();
    this.schoolVTPSectorFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

    this.onLoadSchoolVTPSectorsByCriteria();
  }

  onSVSForAdemicYear(event, svsItem) {
    if (svsItem == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let schoolVTPSectorItem = this.schoolVTPSectorList.find(vs => vs.SchoolVTPSectorId === svsItem.SchoolVTPSectorId);
      schoolVTPSectorItem.IsActive = event.checked;
    }
  }

  onTransfer() {
    let schoolVTPSectorIds = this.schoolVTPSectorList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.SchoolVTPSectorId).toString();

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this record?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.transferSchoolVTPSectorService.SchoolVTPSectorForAcademicRolloverTransfer(this.UserModel, schoolVTPSectorIds)
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
              console.log('Transfer SchoolVTPSector errors =>', error);
            });
        }
      });
  }

  //Create SchoolVTPSectorFilter form and returns {FormGroup}
  createSchoolVTPSectorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      SectorId: new FormControl(),
      SchoolId: new FormControl()
    });
  }
}

