import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'app/common/base/base.component';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';
import { RouteConstants } from 'app/constants/route.constant'
import { EmployeeService } from '../employee.service';
import { EmployeeModel } from '../employee.model';
import { DropdownModel } from 'app/models/dropdown.model';

@Component({
  selector: 'employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CreateEmployeeComponent extends BaseComponent<EmployeeModel> implements OnInit {
  employeeForm: FormGroup;
  employeeModel: EmployeeModel;
  genderList: [DropdownModel];

  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
    super(commonService, router, routeParams, snackBar);

    // Set the default employee Model
    this.employeeModel = new EmployeeModel();
  }

  ngOnInit(): void {
    
    this.commonService.GetMasterDataByType({ DataType: 'DataValues', ParentId: 'Gender', SelectTitle: 'Gender' }).subscribe((response: any) => {
      this.genderList = response.Results;
    });
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.PageRights.ActionType = params.get('actionType');

        if (this.PageRights.ActionType == this.Constants.Actions.New) {
          this.employeeModel = new EmployeeModel();

        } else {
          var accountId: string = params.get('accountId')

          this.employeeService.getEmployeeById(accountId)
            .subscribe((response: any) => {
              this.employeeModel = response.Result;

              if (this.PageRights.ActionType == this.Constants.Actions.Edit)
                this.employeeModel.RequestType = this.Constants.PageType.Edit;
              else if (this.PageRights.ActionType == this.Constants.Actions.View) {
                this.employeeModel.RequestType = this.Constants.PageType.View;
                this.PageRights.IsReadOnly = true;
              }

              this.employeeForm = this.createEmployeeForm();
            });
        }
      }
    });

    this.employeeForm = this.createEmployeeForm();
  }

  saveOrUpdateEmployeeDetails() {
    this.setValueFromFormGroup(this.employeeForm, this.employeeModel);

    this.employeeService.createOrUpdateEmployee(this.employeeModel)
      .subscribe((employeeResp: any) => {

        if (employeeResp.Success) {
          this.zone.run(() => {
            this.showActionMessage(
              this.Constants.Messages.RecordSavedMessage,
              this.Constants.Html.SuccessSnackbar
            );

            this.router.navigate([RouteConstants.Employee.List]);
          });
        }
        else {
          var errorMessages = this.getHtmlMessage(employeeResp.Errors)
          this.dialogService.openShowDialog(errorMessages);
        }
      }, error => {
        console.log('Employee deletion errors =>', error);
      });
  }

  //Create employee form and returns {FormGroup}
  createEmployeeForm(): FormGroup {
    return this.formBuilder.group({
      AccountId: new FormControl(this.employeeModel.AccountId),
      EmployeeCode: new FormControl({ value: this.employeeModel.EmployeeCode, disabled: this.PageRights.IsReadOnly }),
      FirstName: new FormControl({ value: this.employeeModel.FirstName, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(100), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      MiddleName: new FormControl({ value: this.employeeModel.MiddleName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      LastName: new FormControl({ value: this.employeeModel.LastName, disabled: this.PageRights.IsReadOnly }, [Validators.maxLength(50), Validators.pattern(this.Constants.Regex.CharWithTitleCaseSpaceAndSpecialChars)]),
      Gender: new FormControl({ value: this.employeeModel.Gender, disabled: this.PageRights.IsReadOnly }, Validators.required),
      DateOfBirth: new FormControl({ value: this.employeeModel.DateOfBirth, disabled: this.PageRights.IsReadOnly }),
      Department: new FormControl({ value: this.employeeModel.Department, disabled: this.PageRights.IsReadOnly }),
      Telephone: new FormControl({ value: this.employeeModel.Telephone, disabled: this.PageRights.IsReadOnly }),
      Mobile: new FormControl({ value: this.employeeModel.Mobile, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.pattern(this.Constants.Regex.MobileNumber)]),
      EmailId: new FormControl({ value: this.employeeModel.EmailId, disabled: this.PageRights.IsReadOnly }, Validators.required),
    });
  }
}
