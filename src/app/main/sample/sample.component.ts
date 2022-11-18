import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MatPaginatorModule } from '@angular/material/paginator';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from './sample.model';
import { BaseComponent } from 'app/common/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'app/services/common.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'person',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SampleComponent extends BaseComponent<PersonModel> implements OnInit {
    personForm: FormGroup;
    personModel: PersonModel;

    constructor(public commonService: CommonService,
        public router: Router,
        public routeParams: ActivatedRoute,
        public snackBar: MatSnackBar,
        private zone: NgZone,
        private formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        super(commonService, router, routeParams, snackBar);
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit(): void {
        this.personModel = new PersonModel();
        this.personForm = this.createPersonForm();
    }

    saveOrUpdatePersonDetails() {
        this.setValueFromFormGroup(this.personForm, this.personModel);
    }

    validateInputText(evt) {
        let trimSpacePattern : string="/^[a-zA-Z0-9\_\- ]*$/";
        this.personModel.SchoolName = this.personForm.get("SchoolName").value;
        this.personModel.SchoolNameLabel = this.personForm.get("SchoolName").value.replace(trimSpacePattern,"");        
    }

    //Create person form and returns {FormGroup}
    createPersonForm(): FormGroup {
        return this.formBuilder.group({
            Name: new FormControl({ value: this.personModel.Name, disabled: this.PageRights.IsReadOnly }, [Validators.required]),
            EmployeeCode: new FormControl({ value: this.personModel.EmployeeCode, disabled: this.PageRights.IsReadOnly }, Validators.required),
            Gender: new FormControl({ value: this.personModel.Gender, disabled: this.PageRights.IsReadOnly }),
            Mobile: new FormControl({ value: this.personModel.Mobile, disabled: this.PageRights.IsReadOnly }),
            Telephone: new FormControl({ value: this.personModel.Telephone, disabled: this.PageRights.IsReadOnly }),
            AadhaarNumber: new FormControl({ value: this.personModel.AadhaarNumber, disabled: this.PageRights.IsReadOnly }),
            PAN: new FormControl({ value: this.personModel.PAN, disabled: this.PageRights.IsReadOnly }),
            DateOfBirth: new FormControl({ value: this.personModel.DateOfBirth, disabled: this.PageRights.IsReadOnly }),
            EmailId: new FormControl({ value: this.personModel.EmailId, disabled: this.PageRights.IsReadOnly }),
            Salary: new FormControl({ value: this.personModel.Salary, disabled: this.PageRights.IsReadOnly }),
            ValidFrom: new FormControl({ value: this.personModel.ValidFrom, disabled: this.PageRights.IsReadOnly }),
            ValidTo: new FormControl({ value: this.personModel.ValidTo, disabled: this.PageRights.IsReadOnly }),
            Pincode: new FormControl({ value: this.personModel.Pincode, disabled: this.PageRights.IsReadOnly }, [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern("^[0-9]*$")]),
            Description: new FormControl({ value: this.personModel.Description, disabled: this.PageRights.IsReadOnly }),
            Remarks: new FormControl({ value: this.personModel.Remarks, disabled: this.PageRights.IsReadOnly }),
            IsActive: new FormControl({ value: this.personModel.IsActive, disabled: this.PageRights.IsReadOnly }),
            SchoolName: new FormControl({ value: this.personModel.SchoolName, disabled: this.PageRights.IsReadOnly }),
        });
    }
}
