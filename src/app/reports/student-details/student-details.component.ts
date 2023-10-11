import {
  Component,
  OnInit,
  NgZone,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { CommonService } from "app/services/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseListComponent } from "app/common/base-list/base.list.component";
import { fuseAnimations } from "@fuse/animations";
import { StudentDetailModel } from "./student-details.model";
import { ReportService } from "app/reports/report.service";
import { DropdownModel } from "app/models/dropdown.model";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";

@Component({
  selector: "data-list-view",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.scss"],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class StudentDetailComponent
  extends BaseListComponent<StudentDetailModel>
  implements OnInit
{
  studentSearchForm: FormGroup;
  studentFilterForm: FormGroup;

  academicyearList: [DropdownModel];
  divisionList: [DropdownModel];
  districtList: DropdownModel[];
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  vtpList: [DropdownModel];
  classList: [DropdownModel];
  monthList: [DropdownModel];
  schoolManagementList: [DropdownModel];

  currentAcademicYearId: string;
  isShowFilterContainer = false;
  @ViewChild("districtMatSelect") districtSelections: MatSelect;

  constructor(
      public commonService: CommonService,
      public router: Router,
      public routeParams: ActivatedRoute,
      public snackBar: MatSnackBar,
      public zone: NgZone,
      public formBuilder: FormBuilder,
      private reportService: ReportService
  ) {
      super(commonService, router, routeParams, snackBar, zone);

      this.IsShowFilter = true;
      this.SearchBy.PageIndex = 0; // delete after script changed
      this.SearchBy.PageSize = 250; // delete after script changed

      this.displayedColumns = [
          "SrNo",
          "AcademicYear",
        "StudentUniqueId",
          "StudentName",
          "StudentGender",
          "Mobile",
          "ClassName",
          "SectionName",
          "RoleNo",
          "FatherName",
          "MotherName",
          "GuardianName",
          "DateOfBirth",
          "SocialCategory",
        //   "Religion",
        //   "ReadyForAssesment",
          "UDISE",
          "SchoolName",
          "DivisionName",
          "DistrictName",
          "BlockName",
          "SchoolManagement",
          "SchoolAllottedYear",
          "PhaseName",
          "HMName",
          "HMMobile",
          "HMEmail",
          "SectorName",
          "JobRoleName",
          "VTPName",
          "VCName",
          "VCMobile",
          "VCEmail",
          "VTName",
          "VTMobile",
          "VTEmail",
          "VTDateOfJoining",
        //   "CreatedBy",
        //   "UpdatedBy",
      ];
      this.studentSearchForm = this.formBuilder.group({
          SearchText: new FormControl(),
      });
      this.studentFilterForm = this.createStudentDetailForm();
  }

  ngOnInit(): void {
      this.reportService
          .GetDropdownForReports(this.UserModel)
          .subscribe((results) => {
              if (results[0].Success) {
                  this.academicyearList = results[0].Results;
              }

              if (results[1].Success) {
                  this.divisionList = results[1].Results;
              }

              if (results[2].Success) {
                  this.sectorList = results[2].Results;
              }

              if (results[3].Success) {
                  this.vtpList = results[3].Results;
              }

              if (results[4].Success) {
                  this.classList = results[4].Results;
              }

              if (results[5].Success) {
                  this.monthList = results[5].Results;
              }

              if (results[6].Success) {
                  this.schoolManagementList = results[6].Results;
              }

              this.currentAcademicYearId = this.UserModel.AcademicYearId;
              this.studentFilterForm
                  .get("AcademicYearId")
                  .setValue(this.currentAcademicYearId);
              this.getStudentClassDetailsReportsData();
              if (this.UserModel.RoleCode === "DivEO") {
                  this.studentFilterForm.controls["DivisionId"].setValue(
                      this.UserModel.DivisionId
                  );

                  this.onChangeDivision(this.UserModel.DivisionId).then(
                      (response) => {}
                  );
              } else if (
                  this.UserModel.RoleCode === "DisEO" ||
                  this.UserModel.RoleCode === "DisRP" ||
                  this.UserModel.RoleCode === "BEO" ||
                  this.UserModel.RoleCode === "BRP"
              ) {
                  this.studentFilterForm.controls["DivisionId"].setValue(
                      this.UserModel.DivisionId
                  );

                  this.onChangeDivision(this.UserModel.DivisionId).then(
                      (response) => {
                          let districtIds = [];
                          response.forEach((districtItem) => {
                              districtIds.push(districtItem.Id);
                          });

                          this.studentFilterForm.controls[
                              "DistrictId"
                          ].setValue(districtIds);
                      }
                  );
              }

              this.studentSearchForm
                  .get("SearchText")
                  .valueChanges.pipe(
                      // if character length greater then 2
                      filter((res) => {
                          this.SearchBy.PageIndex = 0;

                          if (res.length == 0) {
                              this.SearchBy.Name = "";
                              this.onLoadStudentClassDetailsReportsByFilters();
                              return false;
                          }

                          return res.length > 2;
                      }),

                      // Time in milliseconds between key events
                      debounceTime(650),

                      // If previous query is diffent from current
                      distinctUntilChanged()

                      // subscription for response
                  )
                  .subscribe((searchText: string) => {
                      this.SearchBy.Name = searchText;
                      this.onLoadStudentClassDetailsReportsByFilters();
                  });
          });
  }

  onChangeDivision(divisionId: string): Promise<any> {
      let promise = new Promise((resolve, reject) => {
          this.commonService
              .GetMasterDataByType(
                  {
                      DataType: "Districts",
                      RoleId: this.UserModel.RoleCode,
                      UserId: this.UserModel.UserTypeId,
                      ParentId: divisionId,
                      SelectTitle: "District",
                  },
                  false
              )
              .subscribe(
                  (response: any) => {
                      this.districtList = response.Results;
                      this.studentFilterForm.controls["DistrictId"].setValue(
                          null
                      );
                      resolve(response.Results);
                  },
                  (err) => {
                      reject(err);
                  }
              );
      });

      return promise;
  }

  onChangeSector(sectorId: string): void {
      this.commonService
          .GetMasterDataByType({
              DataType: "JobRoles",
              ParentId: sectorId,
              SelectTitle: "Job Role",
          })
          .subscribe((response: any) => {
              this.jobRoleList = response.Results;
          });
  }

  toggleDistrictSelections(evt) {
      //To control select-unselect all
      let isAllSelected =
          evt.currentTarget.classList.toString().indexOf("mat-active") > 0;

      if (isAllSelected) {
          this.districtSelections.options.forEach((item: MatOption) =>
              item.select()
          );
          this.districtSelections.options.first.deselect();
      } else {
          this.districtSelections.options.forEach((item: MatOption) => {
              item.deselect();
          });
      }
      setTimeout(() => {
          this.districtSelections.close();
      }, 200);
  }

  onLoadStudentClassDetailsReportsByFilters(): any {
      this.SearchBy.PageIndex = 0;
      console
      this.getStudentClassDetailsReports();
  }

  getStudentClassDetailsReports(): void {
      this.getStudentClassDetailsReportsData().then(
          (response) => {
            console.log(response);
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
          },
          (error) => {
              console.log(error);
              this.IsLoading = false;
          }
      );
  }

  getStudentClassDetailsReportsData(): Promise<any> {
      if (!this.studentFilterForm.valid) {
          this.validateAllFormFields(this.studentFilterForm);
          return;
      }

      var reportParams: any = {
          UserId: this.UserModel.LoginId,
          AcademicYearId: this.studentFilterForm.get("AcademicYearId").value,
          DivisionId: this.studentFilterForm.get("DivisionId").value,
          DistrictId: this.studentFilterForm.get("DistrictId").value,
          SectorId: this.studentFilterForm.get("SectorId").value,
          JobRoleId: this.studentFilterForm.get("JobRoleId").value,
          VTPId: this.studentFilterForm.get("VTPId").value,
          ClassId: this.studentFilterForm.get("ClassId").value,
          MonthId: this.studentFilterForm.get("MonthId").value,
          SchoolManagementId:
              this.studentFilterForm.get("SchoolManagementId").value,
          Name: this.studentSearchForm.get("SearchText").value,
          PageIndex: this.SearchBy.PageIndex,
          PageSize: this.SearchBy.PageSize,
      };

      if (this.UserModel.RoleCode == "HM") {
          reportParams.HMId = this.UserModel.UserTypeId;
      }

      reportParams.DistrictId =
          reportParams.DistrictId != null &&
          reportParams.DistrictId.length > 0
              ? reportParams.DistrictId.toString()
              : null;

      let promise = new Promise((resolve, reject) => {
          this.reportService
              .GetStudentDetailsReportsByCriteria(reportParams)
              .subscribe(
                  (response) => {
                      resolve(response);
                  },
                  (error) => {
                      console.log(error);
                      resolve(error);
                  }
              );
      });

      return promise;
  }

  resetReportFilters(): void {
      this.studentFilterForm.reset();
      this.studentSearchForm.reset();
      this.studentFilterForm
          .get("AcademicYearId")
          .setValue(this.UserModel.AcademicYearId);
      this.districtList = <DropdownModel[]>[];
      this.jobRoleList = <DropdownModel[]>[];
      this.SearchBy.PageIndex = 0;

      if (
          this.UserModel.RoleCode === "DisEO" ||
          this.UserModel.RoleCode === "DisRP" ||
          this.UserModel.RoleCode === "BEO" ||
          this.UserModel.RoleCode === "BRP"
      ) {
          this.studentFilterForm.controls["DivisionId"].setValue(
              this.UserModel.DivisionId
          );

          this.onChangeDivision(this.UserModel.DivisionId).then(
              (response) => {
                  let districtIds = [];
                  response.forEach((districtItem) => {
                      districtIds.push(districtItem.Id);
                  });

                  this.studentFilterForm.controls["DistrictId"].setValue(
                      districtIds
                  );
              }
          );
      }

      this.tableDataSource.data = [];
      this.tableDataSource.filteredData = [];
  }

//   onPageIndexChanged(evt) {
//       this.SearchBy.PageIndex = evt.pageIndex;
//       this.SearchBy.PageSize = evt.pageSize;

//       this.getStudentClassDetailsReports();
//   }

  onPageIndexChanged(evt) {
    this.SearchBy.PageIndex = evt.pageIndex;
    this.SearchBy.PageSize = evt.pageSize;

    this.getStudentClassDetailsReports();
  }

  exportExcel(): void {
      if (!this.studentFilterForm.valid) {
          this.validateAllFormFields(this.studentFilterForm);
          return;
      }

      this.IsLoading = true;

      var reportParams: any = {
          UserId: this.UserModel.LoginId,
          AcademicYearId: this.studentFilterForm.get("AcademicYearId").value,
          PageIndex: 0,
          PageSize: 250000,
      };

      if (this.UserModel.RoleCode == "HM") {
          reportParams.HMId = this.UserModel.UserTypeId;
      }

      if (
          this.UserModel.RoleCode === "DisEO" ||
          this.UserModel.RoleCode === "DisRP" ||
          this.UserModel.RoleCode === "BEO" ||
          this.UserModel.RoleCode === "BRP"
      ) {
          reportParams.DivisionId = this.UserModel.DivisionId;
          reportParams.DistrictId = this.districtList
              .map((d) => d.Id)
              .toString();
      }

      this.reportService
          .GetStudentDetailsReportsByCriteria(reportParams)
          .subscribe((response) => {
                  response.Results.forEach(function (obj) {
                      delete obj.TotalRows;
                  });

                  this.exportExcelFromTable(
                      response.Results,
                      "StudentDetailsReport"
                  );
                  this.SearchBy.PageSize = 250;
                  this.IsLoading = false;
              },
              (error) => {
                  console.log(error);
                  this.IsLoading = false;
              }
          );
  }

  //Create StudentDetail form and returns {FormGroup}
  createStudentDetailForm(): FormGroup {
      return this.formBuilder.group({
          AcademicYearId: new FormControl(),
          MonthId: new FormControl(),
          DivisionId: new FormControl(),
          DistrictId: new FormControl(),
          SectorId: new FormControl(),
          JobRoleId: new FormControl(),
          ClassId: new FormControl(),
          VTPId: new FormControl(),
          SchoolManagementId: new FormControl(),
      });
  }
}
