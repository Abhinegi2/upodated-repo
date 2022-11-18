import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StudentsAcademicRolloverModel } from './students-academic-rollover.model';
import { StudentsAcademicRolloverService } from './students-academic-rollover.service';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'students-rollover',
  templateUrl: './students-academic-rollover.component.html',
  styleUrls: ['./students-academic-rollover.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StudentsAcademicRolloverComponent extends BaseListComponent<StudentsAcademicRolloverModel> implements OnInit {
  studentTransferForm: FormGroup;

  academicYearList: DropdownModel[];
  vtpList: DropdownModel[];
  filteredVTPItems: any;
  vcList: DropdownModel[];
  filteredVCItems: any;
  schoolList: DropdownModel[];
  filteredSchoolItems: any;
  vtList: DropdownModel[];
  filteredVTItems: any;
  classList: DropdownModel[];

  vtpId: any;
  vcId: any;
  vtId: any;
  schoolId: string;

  allStuForAcademicRolloverArr: any[];
  allLocationChecked = false;
  classId: any;
  errorMessage: string;
  Erromsg: boolean = false;
  targetVTList: any[];
  vtClassExistsForNextYear: boolean = false;

  currentAcademicYearId: string;
  yearName: any;
  studentList: any = [];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private StudentsAcademicRolloverService: StudentsAcademicRolloverService) {

    super(commonService, router, routeParams, snackBar, zone);
    this.studentTransferForm = this.createStudentFilterForm();
  }

  ngOnInit(): void {
    this.SearchBy.IsRollover = true;
    this.SearchBy.PageIndex = 0; // delete after script changed
    this.SearchBy.PageSize = 100000; // delete after script changed

    this.StudentsAcademicRolloverService.getDropdownForStudents(this.UserModel).subscribe((results) => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.vtpList = results[1].Results;
        this.filteredVTPItems = this.vtpList.slice();
      }

      if (results[2].Success) {
        this.schoolList = results[2].Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }

      if (results[3].Success) {
        this.classList = results[3].Results;
      }

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.studentTransferForm.get('AcademicYearId').setValue(currentYearItem.Id);
      }

      if (this.UserModel.RoleCode == 'VC') {
        this.commonService.getVocationalTrainingProvidersByUserId(this.UserModel).then(vtpResp => {
          this.vtpId = vtpResp[0].Id;

          this.onChangeVTP(this.vtpId).then(vcResp => {
            this.studentTransferForm.get('VTPId').setValue(this.vtpId);
            this.studentTransferForm.get('VCId').setValue(this.UserModel.UserTypeId);
            this.studentTransferForm.controls['VTPId'].disable();
            this.studentTransferForm.controls['VCId'].disable();

            this.onChangeVC(this.UserModel.UserTypeId);
          });
        })
      }

    });

    this.commonService.GetNextAcademicYear().subscribe(response => {
      this.yearName = response.Result;
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.ListPaginator;
  }

  onChangeVTP(vtpId): Promise<any> {
    this.vtpId = vtpId

    let promise = new Promise((resolve, reject) => {
      this.commonService.GetMasterDataByType({ DataType: 'VocationalCoordinatorsByUserId', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vtpId, SelectTitle: 'Vocational Coordinator' }, false).subscribe((response) => {
        if (response.Success) {
          this.vcList = response.Results;
          this.filteredVCItems = this.vcList.slice();

          this.vtList = [];
          this.filteredVTItems = [];
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

  onChangeVC(vcId) {
    this.vcId = vcId;
    this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainersByVC', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.LoginId, ParentId: vcId, SelectTitle: 'Vocational Trainer' }, false).subscribe((response) => {
      if (response.Success) {
        this.vtList = response.Results;
        this.filteredVTItems = this.vtList.slice();
      }
    });
  }

  onChangeVT(vtId) {
    this.vtId = vtId;
    this.Erromsg = false;
    this.commonService.GetMasterDataByType({ DataType: 'SchoolsByVT', userId: this.UserModel.LoginId, ParentId: vtId, SelectTitle: 'School' }, false).subscribe((response) => {
      if (response.Success) {
        this.schoolList = response.Results;
        this.filteredSchoolItems = this.schoolList.slice();
      }
    });

    this.schoolId = null;
  }

  onChangeSchool(schoolId: string) {
    this.schoolId = schoolId
    this.Erromsg = false;
  }

  onChangeClass(classId: any) {
    this.classId = classId
    this.vtClassExistsForNextYear = false;

    this.StudentsAcademicRolloverService.GetClassIdByCriteria(this.vtId, classId).subscribe(CheckIfVTClassExistsResp => {
      this.vtClassExistsForNextYear = CheckIfVTClassExistsResp.Success

      if (this.vtClassExistsForNextYear == true) {
        this.Erromsg = false;
        this.onLoadStudentsByCriteria();
        this.errorMessage = CheckIfVTClassExistsResp.Messages;
      }
      else {
        this.Erromsg = true
        this.tableDataSource.data = [];
        this.errorMessage = CheckIfVTClassExistsResp.Errors;
      }

      let targetVTParam = {
        AcademicYearId: this.studentTransferForm.controls['AcademicYearId'].value,
        SchoolId: this.studentTransferForm.controls['SchoolId'].value,
        VTId: this.studentTransferForm.controls['VTId'].value,
        ClassId: this.studentTransferForm.controls['ClassId'].value
      };

      this.StudentsAcademicRolloverService.GetTargetVocationalTrainers(targetVTParam).subscribe(response => {
        if (response.Success) {
          this.targetVTList = response.Results;
        }
        this.IsLoading = false;
      }, error => {
        console.log(error);
        this.IsLoading = false;
      });

      this.IsLoading = false;
    }, error => {
      console.log(error);
      this.IsLoading = false;
    });
  }

  onLoadStudentsByCriteria(): any {
    this.IsLoading = true;

    this.SearchBy.VTPId = this.studentTransferForm.controls['VTPId'].value;
    this.SearchBy.VCId = this.studentTransferForm.controls['VCId'].value;
    this.SearchBy.VTId = this.studentTransferForm.controls['VTId'].value;
    this.SearchBy.SchoolId = this.studentTransferForm.controls['SchoolId'].value;
    this.SearchBy.ClassId = this.studentTransferForm.controls['ClassId'].value;

    this.StudentsAcademicRolloverService.GetSchoolByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'SchoolName', 'ClassName', 'SectionName', 'VTName', 'StudentName', 'Gender', 'DateOfEnrollment', 'IsAYRollover'];

      this.studentList = response.Results.filter(s => s.IsActive == true);

      this.studentList.forEach(s => {
        s.IsActive = s.IsAYRollover;
      });

      this.tableDataSource.data = this.studentList;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;
      this.SearchBy.TotalResults = response.TotalResults;

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

  onStudentForAdemicYear(event, student) {
    if (student == null) {
      this.getCurrentPageRows().forEach(vs => {
        if (!vs.IsAYRollover) {
          vs.IsActive = event.checked;
        }
      });
    }
    else {
      let studentItem = this.studentList.find(vs => vs.StudentId === student.StudentId);
      studentItem.IsActive = event.checked;
    }
  }

  onTransfer() {
    if (!this.studentTransferForm.valid) {
      this.validateAllFormFields(this.studentTransferForm);
      return;
    }

    let studentIds = this.studentList.filter(vs => vs.IsAYRollover == false && vs.IsActive == true).map((s: any) => s.StudentId).toString();

    let studentParams: any = {
      Id: '0',
      UserId: this.UserModel.LoginId,
      FromEntityId: studentIds,
      ToEntityId: this.studentTransferForm.controls['VTId'].value
    };

    this.dialogService
      .openConfirmDialog('Are you sure to transfer this record?')
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.StudentsAcademicRolloverService.StudentForAcademicRolloverTransfer(studentParams)
            .subscribe((studentResp: any) => {

              if (studentResp.Success) {
                this.zone.run(() => {
                  this.showActionMessage('Academic Rollover completed for selected rows.', this.Constants.Html.SuccessSnackbar);

                  this.studentList = [];
                  this.tableDataSource.data = [];

                  this.studentTransferForm.reset();
                  this.studentTransferForm.get('AcademicYearId').setValue(this.currentAcademicYearId);

                  this.vcList = [];
                  this.filteredVCItems = [];
                  this.vtList = [];
                  this.filteredVTItems = [];
                  this.schoolList = [];
                  this.filteredSchoolItems = [];
                  this.targetVTList = [];
                  this.Erromsg = false;

                  this.IsLoading = false;
                  this.ngOnInit();
                });
              }
              else {
                var errorMessages = this.getHtmlMessage(studentResp.Errors)
                this.dialogService.openShowDialog(errorMessages);
              }
            }, error => {
              console.log('Transfer Students errors =>', error);
            });
        }
      });
  }

  //Create studentFilter form and returns {FormGroup}
  createStudentFilterForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      VTPId: new FormControl(),
      VCId: new FormControl(),
      VTId: new FormControl(),
      TargetVTId: new FormControl(),
      SchoolId: new FormControl(),
      ClassId: new FormControl()
    });
  }
}
