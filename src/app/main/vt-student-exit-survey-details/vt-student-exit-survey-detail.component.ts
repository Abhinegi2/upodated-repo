import { Component, OnInit, NgZone, ViewEncapsulation, ElementRef } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTStudentExitSurveyDetailModel } from './vt-student-exit-survey-detail.model';
import { VTStudentExitSurveyDetailService } from './vt-student-exit-survey-detail.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadModel } from 'app/models/file.upload.model';
import { ReportService } from 'app/reports/report.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vt-student-exit-survey-detail.component.html',
  styleUrls: ['./vt-student-exit-survey-detail.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTStudentExitSurveyDetailComponent extends BaseListComponent<VTStudentExitSurveyDetailModel> implements OnInit {
  vtExitSurveyDetailsForm: FormGroup;
  fileUploadModel: FileUploadModel;
  academicyearList: any;
  uploadedFileUrl: string;
  uploadExcel: any;
  fileToUpload: File | null = null;
  currentAcademicYearId: any;
  classList: any = [];
  isAvailableUploadedExcel: boolean = false;
  isUploadStudentAllowed: boolean = false;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private dialogService: DialogService,
    private elRef: ElementRef,
    private vtStudentExitSurveyDetailService: VTStudentExitSurveyDetailService,
    private reportService: ReportService) {
    super(commonService, router, routeParams, snackBar, zone);

    this.fileUploadModel = new FileUploadModel();
    this.vtExitSurveyDetailsForm = this.createVTExitSurveyForm();
  }

  ngOnInit(): void {
    this.vtStudentExitSurveyDetailService.getAcademicYearsAndClasses().subscribe(response => {
      this.academicyearList = response[0].Results;

      response[1].Results.forEach(classItem => {
        if (classItem.Name == 'Class 10' || classItem.Name == 'Class 12') {
          this.classList.push(classItem);
        }
      });

      // Set default pre-select Class 10 for Loading page;
      this.vtExitSurveyDetailsForm.get('ClassId').setValue('3d99b3d3-f955-4e8f-9f2e-ec697a774bbc');

      let currentYearItem = this.academicyearList.find(ay => ay.IsSelected == true);
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;
        this.vtExitSurveyDetailsForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
        this.onChangeAcademicYear(this.currentAcademicYearId);
      }
    });
  }

  uploadExcelData(): void {
    if (this.fileUploadModel.FileName === "") {
      this.dialogService.openShowDialog("Please upload excel template data first !!!");
      return;
    }

    let excelFormData = this.setUploadedFile(this.fileUploadModel);
    excelFormData.UserId = this.UserModel.UserTypeId;
    excelFormData.ContentType = "ExitSurvey";
    excelFormData.ContentId = "d1b5b96d-5107-11ec-8703-02bd7c28b214";

    this.reportService.UploadExcelData(excelFormData).subscribe(response => {
      if (response.Success) {
        this.uploadedFileUrl = response.Messages.pop();
        this.isAvailableUploadedExcel = true;
        this.dialogService.openShowDialog("Template data executed successfully for Student Upload. Please download uploaded excel file and check status");
        this.vtExitSurveyDetailsForm.get('UploadFile').setValue("");
      }
      else {
        this.dialogService.openShowDialog("Data uploading failed for Student Upload ");
      }
    });
  }

  uploadedFile(event) {
    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();
      this.uploadExcel = event.target.files[0];
      if (this.AllowedExcelExtensions.indexOf(fileExtn) == -1) {
        this.vtExitSurveyDetailsForm.get('UploadFile').setValue(null);
        this.dialogService.openShowDialog("Please upload excel file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.ExitSurveyStudentsData).then((response: FileUploadModel) => {
        this.fileUploadModel = response;

      });

      this.isAvailableUploadedExcel = false;
    }
  }

  downloadUploadedExcelResults() {
    let pdfReportUrl = this.Constants.Services.BaseUrl + 'Lighthouse/DownloadFile?fileUrl=' + this.uploadedFileUrl;
    window.open(pdfReportUrl, '_blank', '');
  }

  onChangeClass() {
    let ay = this.vtExitSurveyDetailsForm.get('AcademicYearId').value;
    this.onChangeAcademicYear(ay);
    this.tableDataSource.data = [];
  }

  onChangeAcademicYear(academicYearId) {
    let classId = this.vtExitSurveyDetailsForm.get('ClassId').value;

    let ReqObj = {
      "UserId": this.UserModel.UserTypeId,
      "UserType": this.UserModel.RoleCode,
      "AcademicYearId": academicYearId,
      "ClassId": classId,
    };

    this.vtStudentExitSurveyDetailService.GetStudentsForExitForm(ReqObj).subscribe(response => {
      this.displayedColumns = ['AcademicYear', 'StudentFullName', 'FatherName', 'NameOfSchool', 'UdiseCode', 'Class', 'Sector', 'JobRole', 'AssessmentConducted', 'Actions'];

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

  createVTExitSurveyForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      ClassId: new FormControl(),
      UploadFile: new FormControl({ value: this.fileUploadModel.UploadFile }, Validators.required)
    });
  }

  onDeleteVTStudentExitSurveyDetail(vtStudentExitSurveyDetailId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtStudentExitSurveyDetailService.deleteVTStudentExitSurveyDetailById(vtStudentExitSurveyDetailId)
            .subscribe((vtStudentExitSurveyDetailResp: any) => {

              this.zone.run(() => {
                if (vtStudentExitSurveyDetailResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTStudentExitSurveyDetail deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
