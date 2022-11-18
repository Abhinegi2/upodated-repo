import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as guarati } from './i18n/gj';

@Component({
  selector: 'data-list-view',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class RoleComponent extends BaseListComponent<RoleModel> implements OnInit {

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private translationLoaderService: FuseTranslationLoaderService,
    public zone: NgZone,
    private dialogService: DialogService,
    private roleService: RoleService) {
    super(commonService, router, routeParams, snackBar, zone);
    this.translationLoaderService.loadTranslations(english, guarati);
  }

  ngOnInit(): void {
    this.roleService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['Code', 'Name', 'Description', 'IsActive', 'Actions'];

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
  }

  onDeleteRole(roleId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.roleService.deleteRoleById(roleId)
            .subscribe((roleResp: any) => {

              this.zone.run(() => {
                if (roleResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('Role deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
