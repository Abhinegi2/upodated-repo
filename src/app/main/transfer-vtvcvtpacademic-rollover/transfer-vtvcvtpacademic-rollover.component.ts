import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { cloneDeep } from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferVTVCVTPAcademicRolloverModel } from './transfer-VTVCVTP-academic-rollover.model';
import { TransferVTVCVTPAcademicRolloverService } from './transfer-VTVCVTP-academic-rollover.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SearchFilterModel } from 'app/models/search.filter.model';
import { debug } from 'console';

@Component({
  selector: 'app-transfer-vtvcvtpacademic-rollover',
  templateUrl: './transfer-vtvcvtpacademic-rollover.component.html',
  styleUrls: ['./transfer-vtvcvtpacademic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class TransferVTVCVTPAcademicRolloverComponent extends BaseListComponent<TransferVTVCVTPAcademicRolloverModel> implements OnInit {
  AcademicRolloverTransferSelectedId: any = [];
  transferForm: FormGroup;

  academicYearList: DropdownModel[];
  fromEntityList: DropdownModel[];
  filteredFromEntityItems: any;
  toEntityList: DropdownModel[];
  filteredToEntityItems: any;

  displayedColumnsVTPSector: string[];
  displayedColumnsVTPSchoolSector: string[];
  displayedColumnsVCSchoolSector: string[];
  displayedColumnsVocationalTrainers: string[];
  displayedColumnsVTClasses: string[];
  displayedColumnsStudentClassMapping: string[];
  displayedColumnsVTClassSections: string[];
  tableDataSourceVTP_VTSchoolSector: MatTableDataSource<Element>;
  tableDataSourceVCSchoolSector: MatTableDataSource<Element>;
  tableDataSourceVTPSector: MatTableDataSource<Element>;
  tableDataSourceSchoolVTPSector: MatTableDataSource<Element>;
  tableDataSourceVocationalTrainers: MatTableDataSource<Element>;
  tableDataSourceVTClasses: MatTableDataSource<Element>;
  tableDataSourceVTClassSections: MatTableDataSource<Element>;
  tableDataSourceStudentClassMapping: MatTableDataSource<Element>;

  entityTypeId: string;
  fromEntityId: any;
  toEntityId: any;

  SearchBySVS: SearchFilterModel;
  SearchByVS: SearchFilterModel;
  SearchByVC: SearchFilterModel;
  SearchByVCls: SearchFilterModel;
  SearchByVCS: SearchFilterModel;
  SearchByVTStu: SearchFilterModel;
  SearchByVTr: SearchFilterModel;
  SearchByVCSe: SearchFilterModel;

  @ViewChild(MatPaginator, { static: true })
  ListPaginator: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorVTPSector: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorSchoolVTPSector: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorVocationalTrainers: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorVCSchoolSector: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorVTClassSections: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorStudentClassMapping: MatPaginator;

  @ViewChild(MatPaginator, { static: true })
  ListPaginatorVTClasses: MatPaginator;

  fromNameVT: any;
  fromNameVc: any;
  fromName: string;

  vtpSectorList: any[];
  schoolVTPSectorList: any[];
  vcSchoolSectorList: any[];
  vtSchoolSectorList: any[];
  vtStudentList: any[];
  vtList: any[];
  vtClassList: any[];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private transferVTVCVTPService: TransferVTVCVTPAcademicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.transferForm = this.CreateTransferForm();

    this.vtpSectorList = [];
    this.schoolVTPSectorList = [];
    this.vcSchoolSectorList = [];
    this.vtSchoolSectorList = [];
    this.vtStudentList = [];
    this.vtList = [];
    this.vtClassList = [];
    this.academicYearList = <DropdownModel[]>[];

    this.tableDataSourceVTP_VTSchoolSector = new MatTableDataSource<Element>();
    this.tableDataSourceVCSchoolSector = new MatTableDataSource<Element>();
    this.tableDataSourceVTPSector = new MatTableDataSource<Element>();
    this.tableDataSourceSchoolVTPSector = new MatTableDataSource<Element>();
    this.tableDataSourceVocationalTrainers = new MatTableDataSource<Element>();
    this.tableDataSourceVTClasses = new MatTableDataSource<Element>();
    this.tableDataSourceVTClassSections = new MatTableDataSource<Element>();
    this.tableDataSourceStudentClassMapping = new MatTableDataSource<Element>();
  }

  ngOnInit(): void {
    this.SearchBySVS = new SearchFilterModel(this.UserModel);
    this.SearchByVS = new SearchFilterModel(this.UserModel);
    this.SearchByVCS = new SearchFilterModel(this.UserModel);
    this.SearchByVTr = new SearchFilterModel(this.UserModel);
    this.SearchByVCls = new SearchFilterModel(this.UserModel);
    this.SearchByVCSe = new SearchFilterModel(this.UserModel);
    this.SearchByVTStu = new SearchFilterModel(this.UserModel);

    this.commonService.GetMasterDataByType({ DataType: 'AcademicYearsForTransfer', SelectTitle: 'Academic Year' }, false).subscribe((response) => {
      if (response.Success) {
        this.academicYearList = response.Results;

        let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
        if (currentYearItem != null) {
          this.transferForm.get('AcademicYearId').setValue(currentYearItem.Id);
        }
      }
    });
  }

  onChangeEntityType(evt) {
    this.entityTypeId = this.transferForm.controls["EntityType"].value;
    this.SearchBySVS.SectorId = null;
    this.SearchByVCS.SectorId = null;

    this.onChangeDestination(null);
    this.resetDataTable();
  }

  onChangeDestination(evt) {
    this.transferForm.controls["ToEntityId"].setValue(null);

    let destinationParams = {
      UserId: this.UserModel.LoginId,
      ParentId: this.transferForm.controls["AcademicYearId"].value,
      EntityType: this.transferForm.controls["EntityType"].value
    };

    let destinationTypeId = this.transferForm.controls["Destination"].value;

    this.transferVTVCVTPService.getEligible_VT_VC_VTP_ForTransfer(destinationParams).subscribe((response) => {
      if (response.Success) {
        this.fromEntityList = response.Results;
        this.filteredFromEntityItems = this.fromEntityList.slice();

        if (destinationTypeId == 'ActualReplacement') {
          this.toEntityList = cloneDeep(this.fromEntityList);
          this.filteredToEntityItems = this.toEntityList.slice();

        } else if (destinationTypeId == 'DummyAssign') {
          this.transferForm.controls["ToEntityId"].setValue(null);
          this.toEntityList = [];
          this.filteredToEntityItems = [];
        }
      }
    });
  }

  onChangeFromEntity(fromEntityIdValue) {
    this.entityTypeId = this.transferForm.controls["EntityType"].value;
    this.fromEntityId = fromEntityIdValue;

    this.resetDataTable();

    if (this.entityTypeId == 'VTP') {
      for (const i of this.fromEntityList) {
        if (i.Id == fromEntityIdValue) {
          this.fromName = i.Name;
          this.vtClassList = [];
          this.vtClassList = [];
          this.vtStudentList = [];
          this.vtSchoolSectorList = [];
          this.vtList = [];
          this.vcSchoolSectorList = [];
        }
      }

      this.SearchBySVS.SectorId = null;
      this.onLoadVTPSectorByCriteria();
      this.onLoadSchoolVTPSectorByCriteria();
      this.onLoadVCSchoolSectorByCriteria();
    }
    else if (this.entityTypeId == 'VT') {
      for (const j of this.fromEntityList) {
        if (j.Id == fromEntityIdValue) {
          this.fromNameVT = j.Name;
          this.vtClassList = [];
          this.vtClassList = [];
          this.vtStudentList = [];
          this.vtSchoolSectorList = [];
          this.vtList = [];
          this.vcSchoolSectorList = [];
        }
      }

      this.onLoadVTSchoolSectorsByCriteria();
      this.onLoadVTClassesByCriteria();
      this.onLoadStudentClassMappingByCriteria();
    }
    else if (this.entityTypeId == 'VC') {
      for (const k of this.fromEntityList) {
        if (k.Id == fromEntityIdValue) {
          this.fromNameVc = k.Name;
          this.vtClassList = [];
          this.vtClassList = [];
          this.vtStudentList = [];
          this.vtSchoolSectorList = [];
          this.vtList = [];
          this.vcSchoolSectorList = [];
        }
      }

      this.onLoadVCSchoolSectorByCriteria();
      this.onLoadVocationTrainersByCriteria();
    }
  }

  onChangeToEntity(toEntityIdValue) {
    if (this.fromEntityId == toEntityIdValue) {
      this.dialogService.openShowDialog("From Entity and To Entity cann't be same");
      this.transferForm.controls["ToEntityId"].setValue(null);
    }
    this.toEntityId = toEntityIdValue;
  }

  onLoadSchoolVTPSectorAndVCSchoolSectorBySectorId(sectorId: any) {
    this.schoolVTPSectorList = [];
    this.tableDataSourceSchoolVTPSector.data = [];
    this.vcSchoolSectorList = [];
    this.tableDataSourceVCSchoolSector.data = [];

    this.schoolVTPSectorList.forEach((vs: any) => {
      vs.IsTransfer = false;
    });

    let vtpSectorItem = this.vtpSectorList.find(vs => vs.SectorId === sectorId);
    vtpSectorItem.IsTransfer = true;

    this.SearchBySVS.SectorId = sectorId;
    this.onLoadSchoolVTPSectorByCriteria();

    this.SearchByVCS.SectorId = sectorId;
    this.onLoadVCSchoolSectorByCriteria();
  }

  //VTSchoolSectors table List
  onLoadVTSchoolSectorsByCriteria(): any {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 25000;
    this.SearchBy.UserId = this.fromEntityId;
    this.SearchBy.VTId = this.fromEntityId;
    this.SearchBy.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;

    this.transferVTVCVTPService.GetVTSchoolSectorsByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'VCName', 'VTName', 'VTEmailId', 'SchoolName', 'UDISE', 'SectorName', 'DateOfAllocation', 'IsActive'];

      this.vtSchoolSectorList = response.Results.filter(vs => vs.IsActive == true);

      this.tableDataSource.data = this.vtSchoolSectorList;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.SearchBy.TotalResults = response.TotalResults;

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //VTPSector table List
  onLoadVTPSectorByCriteria(): any {
    this.IsLoading = true;
    this.SearchByVS.PageIndex = 0;
    this.SearchByVS.PageSize = 250;

    this.SearchByVS.UserId = this.UserModel.UserId;
    this.SearchByVS.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;
    this.SearchByVS.VTPId = this.transferForm.controls["FromEntityId"].value;

    this.transferVTVCVTPService.GetVTPSectorsByCriteria(this.SearchByVS).subscribe(response => {
      this.displayedColumnsVTPSector = ['AcademicYear', 'VTPName', 'SectorName', 'IsTransfer'];;

      this.vtpSectorList = response.Results.filter(vs => vs.IsActive == true);
      this.vtpSectorList.map(function (vs) {
        return vs.IsTransfer = false;
      });

      this.tableDataSourceVTPSector.data = this.vtpSectorList;
      this.tableDataSourceVTPSector.sort = this.ListSort;
      this.tableDataSourceVTPSector.paginator = this.ListPaginatorVTPSector;
      this.tableDataSourceVTPSector.filteredData = this.tableDataSourceVTPSector.data;
      this.SearchByVS.TotalResults = response.TotalResults;

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //SchoolVTPSector table List
  onLoadSchoolVTPSectorByCriteria(): any {
    this.IsLoading = true;
    this.SearchBySVS.PageIndex = 0;
    this.SearchBySVS.PageSize = 2500;

    this.SearchByVS.UserId = this.UserModel.UserId;
    this.SearchBySVS.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;
    this.SearchBySVS.VTPId = this.transferForm.controls["FromEntityId"].value;

    this.transferVTVCVTPService.GetSchoolVTPSectorsByCriteria(this.SearchBySVS).subscribe(response => {
      this.displayedColumnsVTPSchoolSector = ['AcademicYear', 'VTPName', 'SectorName', 'SchoolName', 'UDISE', 'IsTransfer'];

      this.schoolVTPSectorList = response.Results.filter(vs => vs.IsActive == true);
      this.schoolVTPSectorList.map(function (svs) {
        return svs.IsTransfer = true;
      });

      this.tableDataSourceSchoolVTPSector.data = this.schoolVTPSectorList;
      this.tableDataSourceSchoolVTPSector.sort = this.ListSort;
      this.tableDataSourceSchoolVTPSector.paginator = this.ListPaginatorSchoolVTPSector;
      this.tableDataSourceSchoolVTPSector.filteredData = this.tableDataSourceSchoolVTPSector.data;
      this.SearchBySVS.TotalResults = response.TotalResults;

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //VocationTrainers table List
  onLoadVocationTrainersByCriteria(): any {
    this.IsLoading = true;

    this.SearchByVTr.PageIndex = 0;
    this.SearchByVTr.PageSize = 2500;
    this.SearchByVTr.UserId = this.UserModel.UserId;
    this.SearchByVTr.VCId = this.fromEntityId;
    this.SearchByVTr.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;

    this.transferVTVCVTPService.GetVocationalTrainersByCriteria(this.SearchByVTr).subscribe(response => {
      this.displayedColumnsVocationalTrainers = ['VTPName', 'VCName', 'VTName', 'Mobile', 'Email', 'Gender', 'SocialCategory', 'NatureOfAppointment', 'IsTransfer'];

      this.vtList = response.Results.filter(vs => vs.IsActive == true);
      this.vtList.map(function (vt) {
        return vt.IsTransfer = true;
      });

      this.tableDataSourceVocationalTrainers.data = this.vtList;
      this.tableDataSourceVocationalTrainers.sort = this.ListSort;
      this.tableDataSourceVocationalTrainers.paginator = this.ListPaginatorVocationalTrainers;
      this.tableDataSourceVocationalTrainers.filteredData = this.tableDataSourceVocationalTrainers.data;
      this.SearchByVTr.TotalResults = response.TotalResults;

      this.zone.run(() => {
        if (this.tableDataSourceVocationalTrainers.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  //vcSchoolSectorList table List
  onLoadVCSchoolSectorByCriteria(): any {
    this.IsLoading = true;
    this.SearchByVCS.PageIndex = 0;
    this.SearchByVCS.PageSize = 25000;

    this.SearchByVCS.UserId = this.UserModel.UserId;
    this.SearchByVCS.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;

    if (this.entityTypeId == "VTP") {
      this.SearchByVCS.VTPId = this.transferForm.controls["FromEntityId"].value;
      this.SearchByVCS.VCId = null;
    }
    else if (this.entityTypeId == "VC") {
      this.SearchByVCS.VTPId = null;
      this.SearchByVCS.VCId = this.transferForm.controls["FromEntityId"].value;
    }

    this.transferVTVCVTPService.GetVCSchoolSectorsByCriteria(this.SearchByVCS).subscribe(response => {
      this.displayedColumnsVCSchoolSector = ['AcademicYear', 'VCName', 'SchoolName', 'SchoolVTPSector', 'DateOfAllocation', 'IsTransfer'];

      this.vcSchoolSectorList = response.Results.filter(vs => vs.IsActive == true);
      this.vcSchoolSectorList.map(function (vcs) {
        return vcs.IsTransfer = true;
      });

      this.tableDataSourceVCSchoolSector.data = this.vcSchoolSectorList;
      this.tableDataSourceVCSchoolSector.sort = this.ListSort;
      this.tableDataSourceVCSchoolSector.paginator = this.ListPaginatorVCSchoolSector;
      this.tableDataSourceVCSchoolSector.filteredData = this.tableDataSourceVCSchoolSector.data;
      this.SearchByVCS.TotalResults = response.TotalResults;

      this.zone.run(() => {
        if (this.tableDataSourceVCSchoolSector.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //VTClasses table List
  onLoadVTClassesByCriteria(): any {
    this.SearchByVCls.PageIndex = 0;
    this.SearchByVCls.PageSize = 25000;
    this.SearchByVCls.UserId = this.UserModel.UserId;
    this.SearchByVCls.VTId = this.fromEntityId;
    this.SearchByVCls.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;

    this.transferVTVCVTPService.GetVTClassesByCriteria(this.SearchByVCls).subscribe(response => {
      this.displayedColumnsVTClasses = ['AcademicYear', 'SchoolName', 'UDISE', 'VTName', 'VTEmailId', 'ClassName', 'SectionName', 'IsActive'];

      this.vtClassList = response.Results.filter(vc => vc.IsActive == true);

      this.tableDataSourceVTClasses.data = this.vtClassList;
      this.tableDataSourceVTClasses.sort = this.ListSort;
      this.tableDataSourceVTClasses.paginator = this.ListPaginatorVTClasses;
      this.tableDataSourceVTClasses.filteredData = this.tableDataSourceVTClasses.data;

      this.zone.run(() => {
        if (this.tableDataSourceVTClasses.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  //StudentClassMapping table List
  onLoadStudentClassMappingByCriteria(): any {
    this.SearchByVTStu.PageIndex = 0;
    this.SearchByVTStu.PageSize = 25000;
    this.SearchByVTStu.UserId = this.UserModel.UserId;
    this.SearchByVTStu.VTId = this.fromEntityId;
    this.SearchByVTStu.AcademicYearId = this.transferForm.controls["AcademicYearId"].value;

    this.transferVTVCVTPService.GetStudentClassesByCriteria(this.SearchByVTStu).subscribe(response => {
      this.displayedColumnsStudentClassMapping = ['AcademicYear', 'SchoolName', 'ClassName', 'SectionName', 'VTName', 'StudentName', 'Gender', 'DateOfEnrollment', 'IsActive'];

      this.vtStudentList = response.Results.filter(vs => vs.IsActive == true);

      this.tableDataSourceStudentClassMapping.data = this.vtStudentList;
      this.tableDataSourceStudentClassMapping.sort = this.ListSort;
      this.tableDataSourceStudentClassMapping.paginator = this.ListPaginatorStudentClassMapping;
      this.tableDataSourceStudentClassMapping.filteredData = this.tableDataSourceStudentClassMapping.data;

      this.zone.run(() => {
        if (this.tableDataSourceStudentClassMapping.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onForAcademicRolloverTransfer(SelectedId, UserId, index, event) {
    if (event.checked) {
      this.AcademicRolloverTransferSelectedId.push(
        {
          fromEntityId: SelectedId
        })
    }
    else if (event.checked == false) {
      for (const i of this.AcademicRolloverTransferSelectedId) {
        if (SelectedId == i.DataTypeId) {
          this.AcademicRolloverTransferSelectedId.splice(index, 1);
        }
      }

    }
  }

  onSVSForAdemicYear(event, svsItem) {
    if (svsItem == null) {
      this.schoolVTPSectorList.forEach((vs: any) => {
        vs.IsTransfer = event.checked;
      });
    }
    else {
      let schoolVTPSectorItem = this.schoolVTPSectorList.find(vs => vs.SchoolVTPSectorId === svsItem.SchoolVTPSectorId);
      schoolVTPSectorItem.IsTransfer = event.checked;
    }
  }

  onVCSForAdemicYear(event, vcsItem) {
    if (vcsItem == null) {
      this.vcSchoolSectorList.forEach((vcs: any) => {
        vcs.IsTransfer = event.checked;
      });
    }
    else {
      let vcSchoolSectorItem = this.vcSchoolSectorList.find(vcs => vcs.VCSchoolSectorId === vcsItem.VCSchoolSectorId);
      vcSchoolSectorItem.IsTransfer = event.checked;
    }
  }

  onVTForAdemicYear(event, vtItem) {
    if (vtItem == null) {
      this.vtList.forEach((vt: any) => {
        vt.IsTransfer = event.checked;
      });
    }
    else {
      let vItem = this.vtList.find(vt => vt.VTId === vtItem.VTId);
      vItem.IsTransfer = event.checked;
    }
  }

  onTransfer() {
    if (!this.transferForm.valid) {
      this.validateAllFormFields(this.transferForm);
      return;
    }

    let destinationTypeId = this.transferForm.controls["Destination"].value;
    let vtpSectorIds = this.vtpSectorList.filter(vs => vs.IsTransfer == true).map((s: any) => s.VTPSectorId).toString();
    if (vtpSectorIds == '') {
      vtpSectorIds = this.vtpSectorList.filter(vs => vs.IsTransfer == false).map((s: any) => s.VTPSectorId).toString();
    }

    let schoolVTPSectorIds = this.schoolVTPSectorList.filter(vs => vs.IsTransfer == true).map((s: any) => s.SchoolVTPSectorId).toString();
    let vcSchoolSectorIds = this.vcSchoolSectorList.filter(vs => vs.IsTransfer == true).map((s: any) => s.VCSchoolSectorId).toString();
    let vtSchoolSectorIds = this.vtSchoolSectorList.filter(vs => vs.IsTransfer == true).map((s: any) => s.VTSchoolSectorId).toString();
    let vtIds = this.vtList.filter(vs => vs.IsTransfer == true).map((s: any) => s.VTId).toString();
    let vtClassIds = this.vtClassList.filter(vs => vs.IsTransfer == true).map((s: any) => s.VTClassId).toString();
    let studentIds = this.vtStudentList.filter(vs => vs.IsTransfer == true).map((s: any) => s.StudentId).toString();

    let transferParams = {
      UserId: this.UserModel.UserId,
      AcademicYearId: this.transferForm.controls["AcademicYearId"].value,
      EntityType: this.entityTypeId,
      FromEntityId: this.fromEntityId,
      ToEntityId: ((destinationTypeId == 'ActualReplacement') ? this.toEntityId : null),
      VTPSectorIds: vtpSectorIds,
      SchoolVTPSectorIds: schoolVTPSectorIds,
      VCSchoolSectorIds: vcSchoolSectorIds,
      VTSchoolSectorIds: vtSchoolSectorIds,
      VTIds: vtIds,
      VTClassIds: vtClassIds,
      StudentIds: studentIds
    };

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this record?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.transferVTVCVTPService.Transfer_VTP_VC_VT(transferParams)
            .subscribe((acadmicRolloverResp: any) => {

              if (acadmicRolloverResp.Success) {
                this.onChangeEntityType(null);
                this.zone.run(() => {
                  this.showActionMessage(
                    this.Constants.Messages.RecordSavedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                  this.AcademicRolloverTransferSelectedId = [];
                  this.ngOnInit();
                });
              }
              else {
                var errorMessages = this.getHtmlMessage(acadmicRolloverResp.Errors)
                this.dialogService.openShowDialog(errorMessages);
              }
            }, error => {
              console.log('schoolVTPSectorForAcadmicRollover deletion errors =>', error);
            });
        }
      });
  }

  resetDataTable(): void {
    this.tableDataSourceVTPSector.data = [];
    this.tableDataSourceSchoolVTPSector.data = [];
    this.tableDataSourceVocationalTrainers.data = [];
    this.tableDataSourceVCSchoolSector.data = [];
    this.tableDataSourceVTP_VTSchoolSector.data = [];
    this.tableDataSource.data = [];
    this.tableDataSourceVTClasses.data = [];
    this.tableDataSourceStudentClassMapping.data = [];
  }

  //Create Transfer form and returns {FormGroup}
  CreateTransferForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(Validators.required),
      Destination: new FormControl(Validators.required),
      EntityType: new FormControl(Validators.required),
      FromEntityId: new FormControl(Validators.required),
      ToEntityId: new FormControl(Validators.required),
    });
  }
}
