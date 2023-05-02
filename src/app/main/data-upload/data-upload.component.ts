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
      { Id: 'Division', Name: 'Division', Template: 'Divisions_Template.xlsx' },
      { Id: 'District', Name: 'District', Template: 'Districts_Template.xlsx' },
      { Id: 'Block', Name: 'Block', Template: 'Blocks_Template.xlsx' },
      { Id: 'Schools', Name: 'Schools', Template: 'Schools_Template.xlsx' },
      { Id: 'HeadMasters', Name: 'Head Masters', Template: 'HeadMasters_Template.xlsx' },
      { Id: 'VocationalTrainingProviders', Name: 'Vocational Training Providers', Template: 'VocationalTrainingProviders_Template.xlsx' },
      { Id: 'VocationalCoordinators', Name: 'Vocational Coordinators', Template: 'VocationalCoordinators_Template.xlsx' },
      { Id: 'VocationalTrainers', Name: 'Vocational Trainers', Template: 'VocationalTrainers_Template.xlsx' },
      { Id: 'SchoolSectorJobRole', Name: 'School Sector JobRole', Template: 'SchoolsSectorJobRole_Template.xlsx' },
      { Id: 'SectorJobRoles', Name: 'Sector Job Roles',class:"data-active", Template: 'SectorJobRoles_Template.xlsx' },
      { Id: 'VC_Mapping_(GVT)', Name: 'VC Mapping (GVT)', Template: 'VC_Mapping_(GVT).xlsx' },
      { Id: 'VTAcademicClassSection', Name: 'VT Academic Class Section', Template: 'VTAcademicClassSection_Template.xlsx' },
      { Id: 'Students', Name: 'Students', Template: 'Students_Template.xlsx' },
      { Id: 'Employer', Name: 'Employer', Template: 'Employers_Template.xlsx'  },
      { Id: 'CourseModules', Name: 'Course Modules', Template: 'CourseModules_Template.xlsx' }
      /* { Id: 'VCSchoolSectors', Name: 'VC School Sectors Obsolete', Template: 'VCSchoolSectors_Template_Obsolete.xlsx'},
      { Id: 'VTSchoolSectors', Name: 'VT School Sectors Obsolete', Template: 'VTSchoolSectors_Template_Obsolete.xlsx' },
      { Id: 'VTPSectors', Name: 'VTP Sectors Obsolete', Template: 'VTPSectors_Template_Obsolete.xlsx' },
      { Id: 'VTClasses', Name: 'VT Classes Obsolete', Template: 'VTClasses_Template_Obsolete.xlsx' },
      { Id: 'SchoolVTPSectors', Name: 'School VTP Sectors Obsolete', Template: 'SchoolVTPSectors_Template_Obsolete.xlsx' },
      
      { Id: 'SchoolVEIncharges', Name: 'School VE Incharges(Not available)', Template: 'SchoolVEIncharges_Template.xlsx' },*/
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
