import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VocationalCoordinatorModel } from './vocational-coordinator.model';
import { VocationalCoordinatorService } from './vocational-coordinator.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { locale as english } from './i18n/en';
import { locale as guarati } from './i18n/gj';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'data-list-view',
  templateUrl: './vocational-coordinator.component.html',
  styleUrls: ['./vocational-coordinator.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VocationalCoordinatorComponent extends BaseListComponent<VocationalCoordinatorModel> implements OnInit {
  vcSearchForm: FormGroup;
  vcFilterForm: FormGroup;

  academicYearList: DropdownModel[];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  natureOfAppointmentList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoaderService: FuseTranslationLoaderService,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vocationalCoordinatorService: VocationalCoordinatorService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.vcSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vcFilterForm = this.createVocationalCoordinatorFilterForm();

    this.translationLoaderService.loadTranslations(english, guarati);
  }

  ngOnInit(): void {
    this.vocationalCoordinatorService.getInitVocationalCoordinatorsData().subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVTPItems = this.vtpList.slice();
      }

      if (results[2].Success) {
        this.natureOfAppointmentList = results[2].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vcFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial VocationalCoordinators data
      this.onLoadVocationalCoordinatorsByCriteria();

      this.vcSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVocationalCoordinatorsByCriteria();
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
        this.onLoadVocationalCoordinatorsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVocationalCoordinatorsByCriteria();
  }

  onLoadVocationalCoordinatorsByCriteria(): void {
    this.IsLoading = true;

    let vcParams = {
      AcademicYearId: this.vcFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcFilterForm.controls["VTPId"].value,
      NatureOfAppointmentId: this.vcFilterForm.controls["NatureOfAppointmentId"].value,
      Status: this.vcFilterForm.controls["Status"].value,
      Name: this.vcSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.vocationalCoordinatorService.GetAllByCriteria(vcParams).subscribe(response => {
      this.displayedColumns = [
        // 'NatureOfAppointment', 
        // 'VTPName',
        'FullName',
        'Mobile',
        'EmailId',
        'StateName',
        'DivisionName',
        'DistrictName',
        'DateOfJoining',
        'IsResigned',
        'IsActive',
        'Actions'];

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

  onLoadVocationalCoordinatorsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVocationalCoordinatorsByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vcSearchForm.reset();
    this.vcFilterForm.reset();
    this.vcFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.onLoadVocationalCoordinatorsByCriteria();
  }

  onDeleteVocationalCoordinator(vcId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vocationalCoordinatorService.deleteVocationalCoordinatorById(vcId)
            .subscribe((vocationalCoordinatorResp: any) => {

              this.zone.run(() => {
                if (vocationalCoordinatorResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VocationalCoordinator deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vcParams = {
      AcademicYearId: this.vcFilterForm.controls["AcademicYearId"].value,
      VTPId: this.vcFilterForm.controls["VTPId"].value,
      NatureOfAppointmentId: this.vcFilterForm.controls["NatureOfAppointmentId"].value,
      Status: this.vcFilterForm.controls["Status"].value,
      Name: this.vcSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.vocationalCoordinatorService.GetAllByCriteria(vcParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsResigned')) {
            obj.IsResigned = obj.IsResigned ? 'Yes' : 'No';
          }
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VCId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VocationalCoordinator");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VocationalCoordinator form and returns {FormGroup}
  createVocationalCoordinatorFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      NatureOfAppointmentId: new FormControl(),
      Status: new FormControl()
    });
  }
}
