import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentClassModel } from './student-class.model';
import { StudentClassService } from './student-class.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'data-list-view',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class StudentClassComponent extends BaseListComponent<StudentClassModel> implements OnInit {
  studentSearchForm: FormGroup;
  studentFilterForm: FormGroup;
  currentAcademicYearId: string;
  vtpId: string;
  vcId: string;

  academicYearList: [DropdownModel];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  vcList: DropdownModel[];
  filteredVCItems: any;
  vtList: DropdownModel[];
  filteredVTItems: any;
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  classList: [DropdownModel];
  sectionList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private studentClassService: StudentClassService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.studentSearchForm = this.formBuilder.group({ SearchText: new FormControl() });
    this.studentFilterForm = this.createStudentFilterForm()
  }

  ngOnInit(): void {
    this.studentClassService.getDropdownforStudentClass(this.UserModel).subscribe(results => {
      if (results[2].Success) {
        this.academicYearList = results[2].Results;
      }

      if (results[9].Success) {
        this.sectorList = results[9].Results;
      }

      if (results[11].Success) {
        this.classList = results[11].Results;
      }

      if (results[3].Success) {
        this.sectionList = results[3].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.studentFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
      }
      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 10; // delete after script changed


      this.onLoadStudentsByCriteria();

      this.studentSearchForm.get('SearchText').valueChanges.pipe(
        // if character length greater then 2
        filter(res => {
          this.SearchBy.PageIndex = 0;

          if (res.length == 0) {
            this.SearchBy.Name = '';
            this.onLoadStudentsByCriteria();
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
        this.onLoadStudentsByCriteria();
      });
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.onLoadStudentsByCriteria();
  }

  onLoadStudentsByCriteria(): any {
    this.IsLoading = true;

    let studentParams: any = {
      AcademicYearId: this.studentFilterForm.controls["AcademicYearId"].value,
      VTId: this.UserModel.RoleCode == 'VT' ? this.UserModel.UserTypeId : this.studentFilterForm.controls['VTId'].value,
      SchoolId: this.studentFilterForm.controls["SchoolId"].value,
      SectorId: this.studentFilterForm.controls["SectorId"].value,
      JobRoleId: this.studentFilterForm.controls['JobRoleId'].value,
      ClassId: this.studentFilterForm.controls['ClassId'].value,
      SectionId: this.studentFilterForm.controls['SectionId'].value,
      UserRole: this.UserModel.RoleCode,
      UserId: this.UserModel.UserTypeId,
      Status: this.studentFilterForm.controls["Status"].value,
      Name: this.studentSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    if (this.UserModel.RoleCode == "HM") {
      studentParams.HMId = this.UserModel.UserTypeId;
    }

    this.studentClassService.GetAllByCriteria(studentParams).subscribe(response => {

      this.displayedColumns = ['StudentUniqueNumber', 'SchoolName', 'AcademicYear', 'StudentName', 'StudentUniqueId', 'Stream', 'ClassName', 'SectionName', 'ClassSection', 'DateOfBirth', 'FatherName', 'MotherName', 'GuardianName', 'Mobile', 'SecondMobileNo', 'WhatappNo', 'SectorName', 'JobRoleName', 'Gender', 'AssessmentToBeConducted', 'CWSNStatus', 'IsStudentVE9And10', 'IsSameStudentTrade', 'DateOfEnrollment', 'CreatedBy', 'UpdatedBy', 'DateOfDropout', 'IsActive', 'Actions'];
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

  onLoadStudentsByFilters(): any {
    this.SearchBy.PageIndex = 0;
    this.onLoadStudentsByCriteria();
  }

  resetFilters(): void {
    this.studentSearchForm.reset();
    this.studentFilterForm.reset();
    this.studentFilterForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
    this.onLoadStudentsByCriteria();
  }

  onChangeSector(sectorId: string): void {
    this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
      this.jobRoleList = response.Results;
    });
  }

  onDeleteStudentClass(studentId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.studentClassService.deleteStudentClassById(studentId)
            .subscribe((studentClassResp: any) => {

              this.zone.run(() => {
                if (studentClassResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('StudentClass deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }

  exportExcel(): void {
    this.IsLoading = true;
    this.SearchBy.PageIndex = 0;
    this.SearchBy.PageSize = 1000000;

    let studentParams: any = {
      AcademicYearId: this.studentFilterForm.controls["AcademicYearId"].value,
      SectorId: this.studentFilterForm.controls["SectorId"].value,
      JobRoleId: this.studentFilterForm.controls['JobRoleId'].value,
      SchoolId: this.studentFilterForm.controls["SchoolId"].value,
      ClassId: this.studentFilterForm.controls['ClassId'].value,
      UserRole: this.UserModel.RoleCode,
      UserId: this.UserModel.UserTypeId,
      Status: this.studentFilterForm.controls["Status"].value,
      Name: this.studentSearchForm.controls["SearchText"].value,
      CharBy: null,
      PageIndex: this.SearchBy.PageIndex,
      PageSize: this.SearchBy.PageSize
    };

    if (this.UserModel.RoleCode == "HM") {
      studentParams.HMId = this.UserModel.UserTypeId;
    }

    this.studentClassService.GetAllByCriteria(studentParams).subscribe(response => {
      response.Results.forEach(
        function (obj) {
          if (obj.hasOwnProperty('IsActive')) {
            obj.IsActive = obj.IsActive ? 'Yes' : 'No';
          }
          delete obj.StudentId;
          delete obj.IsAYRollover;
          delete obj.DeletedBy;
          delete obj.TotalRows;
        });

      this.exportExcelFromTable(response.Results, "Students");

      this.IsLoading = false;
      this.SearchBy.PageIndex = 0;
      this.SearchBy.PageSize = 10;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  //Create StudentFilter form and returns {FormGroup}
  createStudentFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      SchoolId: new FormControl(),
      ClassId: new FormControl(),
      SectionId: new FormControl(),
      Status: new FormControl()
    });
  }
}