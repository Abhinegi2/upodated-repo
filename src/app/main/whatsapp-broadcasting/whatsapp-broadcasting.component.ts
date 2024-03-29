import { Component, OnInit, NgZone, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DropdownModel } from 'app/models/dropdown.model';
import { whatsappBroadcastingModel } from './whatsapp-broadcasting.model';
import { whatsappBroadcastingService } from './whatsapp-broadcasting.service';

@Component({
  selector: 'app-whatsapp-broadcasting',
  templateUrl: './whatsapp-broadcasting.component.html',
  styleUrls: ['./whatsapp-broadcasting.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class WhatsappBroadcastingComponent extends BaseListComponent<whatsappBroadcastingModel> implements OnInit {
  messageTemplateSearchForm: FormGroup;
  messageTemplateFilterForm: FormGroup;
  messageTypeList: DropdownModel[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private messageTemplateService: whatsappBroadcastingService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.messageTemplateSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.messageTemplateFilterForm = this.createMessageTemplateFilterForm();
  }

  ngOnInit(): void {
    this.messageTemplateService.getDropdownforMessageTemplate(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.messageTypeList = results[0].Results;
      }

      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed

      //Load initial messageTemplates data
      this.onLoadMessageTemplatesByCriteria();

      this.messageTemplateSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadMessageTemplatesByCriteria();
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
        this.onLoadMessageTemplatesByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadMessageTemplatesByCriteria();
  }

  onLoadMessageTemplatesByCriteria(): any {
    this.IsLoading = true;

    let messageTemplateParams = {
      CampainID: this.messageTemplateFilterForm.controls["CampainID"].value,
      TemplateMessage: this.messageTemplateFilterForm.controls["TemplateMessage"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    this.messageTemplateService.GetAllByCriteria(messageTemplateParams).subscribe(response => {
      console.log(response,"resp")
      this.displayedColumns = ['TemplateID', 'TemplateMessage', 'UserType', 'CreatedBy', 'CreatedOn', 'Actions'];

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

  onLoadMessageTemplatesByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadMessageTemplatesByCriteria();
  }

  resetFilters(): void {
    this.SearchBy.PageIndex = 0;
    this.messageTemplateSearchForm.reset();
    this.messageTemplateFilterForm.reset();

    this.onLoadMessageTemplatesByCriteria();
  }

  onDeleteMessageTemplate(messageTemplateId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.messageTemplateService.deleteMessageTemplateById(messageTemplateId)
            .subscribe((messageTemplateResp: any) => {

              this.zone.run(() => {
                if (messageTemplateResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('MessageTemplate deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;

    let messageTemplateParams = {
      MessageTypeId: this.messageTemplateFilterForm.controls["MessageTypeId"].value,
      Status: this.messageTemplateFilterForm.controls["Status"].value,
      Name: this.messageTemplateSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: 0,
      PageSize: 100000
    };

    this.messageTemplateService.GetAllByCriteria(messageTemplateParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }
          delete obj.MessageTemplateId;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "MessageTemplates");

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create MessageTemplateFilter form and returns {FormGroup}
  createMessageTemplateFilterForm(): FormGroup {
    return this.formBuilder.group({
      CampainID: new FormControl(),
      TemplateMessage: new FormControl(),
    });
  }
}
