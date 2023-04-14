import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VocationalTrainingProviderModel } from './vocational-training-provider.model';
import { VocationalTrainingProviderService } from './vocational-training-provider.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as guarati } from './i18n/gj';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'data-list-view',
  templateUrl: './vocational-training-provider.component.html',
  styleUrls: ['./vocational-training-provider.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VocationalTrainingProviderComponent extends BaseListComponent<VocationalTrainingProviderModel> implements OnInit {
  vtpSearchForm: FormGroup;
  vtpFilterForm: FormGroup;

  academicYearList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoaderService: FuseTranslationLoaderService,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private dialogService: DialogService,
    private vocationalTrainingProviderService: VocationalTrainingProviderService) {
    super(commonService, router, routeParams, snackBar, zone);

    this.translationLoaderService.loadTranslations(english, guarati);
    this.vtpSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.vtpFilterForm = this.createVocationalTrainingProviderFilterForm();
  }

  ngOnInit(): void {

    this.vocationalTrainingProviderService.getInitVocationalCoordinatorProvidersData().subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.AcademicYearId = currentYearItem.Id;
        this.vtpFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial VocationalTrainingProviders data
      this.onLoadVocationalTrainingProvidersByCriteria();

      this.vtpSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadVocationalTrainingProvidersByCriteria();
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
        this.onLoadVocationalTrainingProvidersByCriteria();
      });

    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadVocationalTrainingProvidersByCriteria();
  }

  onLoadVocationalTrainingProvidersByCriteria(): void {
    this.IsLoading = true;

    let vtpParams = {
      AcademicYearId: this.vtpFilterForm.controls["AcademicYearId"].value,
      Status: this.vtpFilterForm.controls["Status"].value,
      Name: this.vtpSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.vocationalTrainingProviderService.GetAllByCriteria(vtpParams).subscribe(response => {
      this.displayedColumns = ['VTPShortName', 'VTPName', 'ApprovalYear', 'CertificationNo', 'CreatedBy', 'UpdatedBy', 'IsActive', 'Actions'];

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

  onLoadVocationalTrainingProvidersByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadVocationalTrainingProvidersByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.vtpSearchForm.reset();
    this.vtpFilterForm.reset();
    this.vtpFilterForm.get('AcademicYearId').setValue(this.AcademicYearId);

    this.onLoadVocationalTrainingProvidersByCriteria();
  }

  onDeleteVocationalTrainingProvider(vtpId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vocationalTrainingProviderService.deleteVocationalTrainingProviderById(vtpId)
            .subscribe((vocationalTrainingProviderResp: any) => {

              this.zone.run(() => {
                if (vocationalTrainingProviderResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VocationalTrainingProvider deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let vtpParams = {
      AcademicYearId: this.vtpFilterForm.controls["AcademicYearId"].value,
      Status: this.vtpFilterForm.controls["Status"].value,
      Name: this.vtpSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.vocationalTrainingProviderService.GetAllByCriteria(vtpParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }

          delete obj.VTPId;
          delete obj.IsResigned;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "VocationalTrainingProvider");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create VocationalTrainingProviderProvider form and returns {FormGroup}
  createVocationalTrainingProviderFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      Status: new FormControl()
    });
  }
}
