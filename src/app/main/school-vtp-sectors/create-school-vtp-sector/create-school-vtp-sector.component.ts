import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant';
import { SchoolVTPSectorService } from '../school-vtp-sector.service';
import { SchoolVTPSectorModel } from '../school-vtp-sector.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'school-vtp-sector',
  templateUrl: './create-school-vtp-sector.component.html',
  styleUrls: ['./create-school-vtp-sector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateSchoolVTPSectorComponent extends BaseComponent<SchoolVTPSectorModel> implements OnInit {
  schoolVTPSectorForm: FormGroup;
  schoolVTPSectorModel: SchoolVTPSectorModel;
  academicYearList: [DropdownModel];
  sectorList: [DropdownModel];
  vtpList: [DropdownModel];
  schoolList: [DropdownModel];
  remarkText: string;
  udise: string;
  filteredSchoolItems: any;
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private schoolVTPSectorService: SchoolVTPSectorService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default schoolVTPSector Model
    this.schoolVTPSectorModel = new SchoolVTPSectorModel();
  }

  ngOnInit(): void {
    this.schoolVTPSectorService.getDropdownForSchoolVTPSector().subscribe((results) => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
      }

      if (results[1].Success) {
        this.schoolList = results[1].Results;

        this.filteredSchoolItems = this.schoolList.slice();
      }

      this.route.paramMap.subscribe(params => {
        if (params.keys.length > 0) {
          this.PageRights.ActionType = params.get('actionType');

          if (this.PageRights.ActionType == this.Constants.Actions.New) {
            this.schoolVTPSectorModel = new SchoolVTPSectorModel();

          } else {
            var schoolVTPSectorId: string = params.get('schoolVTPSectorId')

            this.schoolVTPSectorService.getSchoolVTPSectorById(schoolVTPSectorId)
              .subscribe((response: any) => {
                this.schoolVTPSectorModel = response.Result;

                if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                  this.schoolVTPSectorModel.RequestType = this.Constants.PageType.Edit;
                else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                  this.schoolVTPSectorModel.RequestType = this.Constants.PageType.View;
                  this.PageRights.IsReadOnly = true;
                }

                this.onChangeAcademicYear(this.schoolVTPSectorModel.AcademicYearId);
                this.onChangeVTP(this.schoolVTPSectorModel.VTPId);
                this.onChangeSchool(this.schoolVTPSectorModel.SchoolId);

                this.schoolVTPSectorForm = this.createSchoolVTPSectorForm();
              });
          }
        }
      });
    });
    this.schoolVTPSectorForm = this.createSchoolVTPSectorForm();
  }

  onChangeAcademicYear(academicYearId) {
    if (academicYearId == '') return;

    this.commonService.GetMasterDataByType({ DataType: 'VocationalTrainingProvidersByVTP', ParentId: academicYearId, SelectTitle: 'VTP' }).subscribe((response: any) => {
      if (response.Success) {
        this.vtpList = response.Results;
      }
    });
  }

  onChangeVTP(vtpId) {
    if (vtpId == '') return;

    this.commonService.GetMasterDataByType({ DataType: 'SectorsByVTP', ParentId: vtpId, SelectTitle: 'Sector' }).subscribe((response: any) => {
      if (response.Success) {
        this.sectorList = response.Results;

        var vtpItem = this.vtpList.find(x => x.Id == vtpId);
        var sectorItem = this.sectorList.find(x => x.Id == this.schoolVTPSectorForm.get('SectorId').value);
        this.remarkText = (this.udise == null ? '' : this.udise + '-') + vtpItem.Name + (sectorItem == null ? '' : '-' + sectorItem.Name);
        this.schoolVTPSectorForm.get('Remarks').setValue(this.remarkText);
      }
    });
  }

  onChangeSector(sectorId) {
    var vtpItem = this.vtpList.find(x => x.Id == this.schoolVTPSectorForm.get('VTPId').value);
    var sectorItem = this.sectorList.find(x => x.Id == sectorId);
    this.remarkText = (this.udise == null ? '' : this.udise + '-') + vtpItem.Name + (sectorItem == null ? '' : '-' + sectorItem.Name);
    this.schoolVTPSectorForm.get('Remarks').setValue(this.remarkText);
  }

  onChangeSchool(schoolId) {
    if (schoolId == '') return;

    this.commonService.GetMasterDataByType({ DataType: 'Schools', ParentId: schoolId, SelectTitle: 'School' }).subscribe((response: any) => {
      if (response.Success) {
        this.udise = response.Results[1].Description;

        var vtpItem = this.vtpList.find(x => x.Id == this.schoolVTPSectorForm.get('VTPId').value);
        var sectorItem = this.sectorList.find(x => x.Id == this.schoolVTPSectorForm.get('SectorId').value);
        this.remarkText = (this.udise == null ? '' : this.udise + '-') + vtpItem.Name + (sectorItem == null ? '' : '-' + sectorItem.Name);
        this.schoolVTPSectorForm.get('Remarks').setValue(this.remarkText);
      }
    });
  }

  saveOrUpdateSchoolVTPSectorDetails() {
    if (!this.schoolVTPSectorForm.valid) {
      this.validateAllFormFields(this.schoolVTPSectorForm);
      return;
    }

    this.setValueFromFormGroup(this.schoolVTPSectorForm, this.schoolVTPSectorModel);
    this.schoolVTPSectorModel.Remarks = this.remarkText;

    this.schoolVTPSectorService.createOrUpdateSchoolVTPSector(this.schoolVTPSectorModel)
      .subscribe((schoolVTPSectorResp: any) => {

        if (schoolVTPSectorResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.SchoolVTPSector.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(schoolVTPSectorResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('SchoolVTPSector deletion errors =>', error);
      });
  }

  //Create schoolVTPSector form and returns {FormGroup}
  createSchoolVTPSectorForm(): FormGroup {
    return this.formBuilder.group({
      SchoolVTPSectorId: new FormControl(this.schoolVTPSectorModel.SchoolVTPSectorId),
      AcademicYearId: new FormControl({ value: this.schoolVTPSectorModel.AcademicYearId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      VTPId: new FormControl({ value: this.schoolVTPSectorModel.VTPId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SectorId: new FormControl({ value: this.schoolVTPSectorModel.SectorId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      SchoolId: new FormControl({ value: this.schoolVTPSectorModel.SchoolId, disabled: this.PageRights.IsReadOnly }, Validators.required),
      Remarks: new FormControl({ value: this.schoolVTPSectorModel.Remarks, disabled: true }),
      IsActive: new FormControl({ value: this.schoolVTPSectorModel.IsActive, disabled: this.PageRights.IsReadOnly }),
    });
  }
}
