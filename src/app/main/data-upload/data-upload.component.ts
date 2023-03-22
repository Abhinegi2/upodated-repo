import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { ReportService } from 'app/reports/report.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUploadModel } from './data-upload.model';
import { DropdownModel } from 'app/models/dropdown.model';
import { FileUploadModel } from 'app/models/file.upload.model';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class DataUploadComponent extends BaseListComponent<DataUploadModel> implements OnInit {
  dataUploadForm: FormGroup;
  fileUploadModel: FileUploadModel;
  dataTypetList: DropdownModel[];
  uploadedFileUrl: string;
  isAvailableUploadedExcel: boolean = false;

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    public formBuilder: FormBuilder,
    private reportService: ReportService) {
    super(commonService, router, routeParams, snackBar, zone);

    // Set the default school Model
    this.fileUploadModel = new FileUploadModel();
    this.dataTypetList = <DropdownModel[]>[
      { Id: '', Name: 'Select Excel Template' },
      { Id: 'SectorJobRoles', Name: '01-Sector Job Roles', Template: '01_SectorJobRoles_Template.xlsx' },
      { Id: 'CourseModules', Name: '02-Course Modules', Template: '02_CourseModules_Template.xlsx' },
      { Id: 'Schools', Name: '03-Schools', Template: '03_Schools_Template.xlsx' },
      { Id: 'HeadMasters', Name: '04-Head Masters', Template: '04_HeadMasters_Template.xlsx' },
      { Id: 'VocationalTrainingProviders', Name: '05-Vocational Training Providers', Template: '05_VocationalTrainingProviders_Template.xlsx' },
      { Id: 'VocationalCoordinators', Name: '06-Vocational Coordinators', Template: '06_VocationalCoordinators_Template.xlsx' },
      { Id: 'VocationalTrainers', Name: '07-Vocational Trainers', Template: '07_VocationalTrainers_Template.xlsx' },
      { Id: 'SchoolSectorJobRole', Name: '08-School Sector JobRole', Template: '08_SchoolsSectorJobRole_Template.xlsx' },
      { Id: 'VTAcademicClassSection', Name: '09-VT Academic Class Section', Template: '09_VTAcademicClassSection_Template.xlsx' },
      { Id: 'GenericVTMapping', Name: '10-Generic VT Mapping', Template: '10_GenericVTMapping_Template.xlsx' },
      { Id: 'Students', Name: '11-Students', Template: '11_Students_Template.xlsx' },
      { Id: 'Employer', Name: '12-Employer', Template: '12_Employers_Template.xlsx' },

      { Id: 'VCSchoolSectors', Name: '13-VC School Sectors Obsolete', Template: '13_VCSchoolSectors_Template_Obsolete.xlsx' },
      { Id: 'VTSchoolSectors', Name: '14-VT School Sectors Obsolete', Template: '14_VTSchoolSectors_Template_Obsolete.xlsx' },
      { Id: 'VTPSectors', Name: '15-VTP Sectors Obsolete', Template: '15_VTPSectors_Template_Obsolete.xlsx' },
      { Id: 'VTClasses', Name: '16-VT Classes Obsolete', Template: '16_VTClasses_Template_Obsolete.xlsx' },
      { Id: 'SchoolVTPSectors', Name: '17-School VTP Sectors Obsolete', Template: '17_SchoolVTPSectors_Template_Obsolete.xlsx' },
      
      { Id: 'SchoolVEIncharges', Name: '11-School VE Incharges(Not available)', Template: '18_SchoolVEIncharges_Template.xlsx' },
      
      
      
      
    ]
  }

  ngOnInit(): void {
    this.dataUploadForm = this.createDataUploadForm();
  }

  uploadedFile(event) {

    if (event.target.files.length > 0) {
      var fileExtn = event.target.files[0].name.split('.').pop().toLowerCase();

      if (this.AllowedExcelExtensions.indexOf(fileExtn) == -1) {
        this.dataUploadForm.get('UploadFile').setValue(null);
        this.dialogService.openShowDialog("Please upload excel file only.");
        return;
      }

      this.getUploadedFileData(event, this.Constants.DocumentType.BulkUploadData).then((response: FileUploadModel) => {
        this.fileUploadModel = response;
      });

      this.isAvailableUploadedExcel = false;
    }
  }

  //Create VTMonthlyAttendance form and returns {FormGroup}
  createDataUploadForm(): FormGroup {
    return this.formBuilder.group({
      ContentType: new FormControl({ value: this.fileUploadModel.ContentType }, Validators.required),
      UploadFile: new FormControl({ value: this.fileUploadModel.UploadFile }, Validators.required)
    });
  }

  uploadExcelData(): void {
    let dataTypeCtrl = this.dataUploadForm.get('ContentType').value;

    if (dataTypeCtrl.Id === undefined) {
      this.dialogService.openShowDialog("Please select data type first !!!");
      return;
    }

    if (this.fileUploadModel.FileName === "") {
      this.dialogService.openShowDialog("Please upload excel template data first !!!");
      return;
    }

    let excelFormData = this.setUploadedFile(this.fileUploadModel);
    excelFormData.UserId = this.UserModel.UserTypeId;
    excelFormData.ContentType = dataTypeCtrl.Id;

    this.reportService.UploadExcelData(excelFormData).subscribe(response => {
      if (response.Success) {
        this.uploadedFileUrl = response.Messages.pop();
        this.isAvailableUploadedExcel = true;
        this.dialogService.openShowDialog("Template data executed successfully for " + dataTypeCtrl.Name + '. Please download uploaded excel file and check status');
      }
      else {
        this.dialogService.openShowDialog("Data uploading failed for " + dataTypeCtrl.Name + " " + response.Errors.pop());
      }
    });
  }

  downloadUploadedExcelResults() {
    let pdfReportUrl = this.Constants.Services.BaseUrl + 'Lighthouse/DownloadFile?fileUrl=' + this.uploadedFileUrl;
    window.open(pdfReportUrl, '_blank', '');
  }

  downloadTemplateExcel() {
    let dataTypeCtrl = this.dataUploadForm.get('ContentType').value;

    if (dataTypeCtrl.Template === undefined) {
      this.dialogService.openShowDialog("Please select data type first for downloading templates !!!");
      return;
    }

    let pdfReportUrl = '/assets/templates/bulk_upload/' + dataTypeCtrl.Template;
    window.open(pdfReportUrl, '_blank', '');
  }
}
