import { Component, OnInit, AfterViewInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DistrictModel } from './district.model';
import { DistrictService } from './district.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'data-list-view',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class DistrictComponent extends BaseListComponent<DistrictModel> implements OnInit, AfterViewInit {
  districtForm: FormGroup;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private districtService: DistrictService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 10; // delete after script changed

    this.districtForm = this.formBuilder.group({ filterText: '' });

    //Load initial districts data
    this.onLoadDistrictsByCriteria();

    this.districtForm.get('filterText').valueChanges.pipe(
      // if character length greater then 2
      filter(res => {
        this.SearchBy.PageIndex = 0;

        if (res.length == 0) {
          this.SearchBy.Name = '';
          this.onLoadDistrictsByCriteria();
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
      this.onLoadDistrictsByCriteria();
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageSize = evt.pageSize;
    this.SearchBy.PageIndex = evt.pageIndex;

    this.onLoadDistrictsByCriteria();
  }

  onLoadDistrictsByCriteria(): any {
    this.IsLoading = true;

    this.districtService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['StateName', 'DivisionName', 'DistrictCode', 'DistrictName', 'Description', 'IsActive', 'Actions'];

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

  onDeleteDistrict(districtCode: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.districtService.deleteDistrictById(districtCode)
            .subscribe((districtResp: any) => {

              this.zone.run(() => {
                if (districtResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('District deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 10000;

    this.districtService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "Districts");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }
}
