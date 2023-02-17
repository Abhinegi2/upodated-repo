import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSelectFilterModule } from 'mat-select-filter';
import '../common/lighthouse.extension';

import { RouteConstants } from 'app/constants/route.constant';
import { AuthGuardService } from 'app/helpers/auth.guard.service';
import { SampleComponent } from './sample/sample.component';
import { LoginComponent } from 'app/auth/login/login.component';
import { LoginService } from 'app/auth/login/login.service';

import { AcademicYearComponent } from './academic-years/academic-year.component';
import { CreateAcademicYearComponent } from './academic-years/create-academic-year/create-academic-year.component';
import { AcademicYearService } from './academic-years/academic-year.service';

import { AccountComponent } from './accounts/account.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import { AccountService } from './accounts/account.service';

import { CountryComponent } from './countries/country.component';
import { CreateCountryComponent } from './countries/create-country/create-country.component';
import { CountryService } from './countries/country.service';

import { CourseMaterialComponent } from './course-materials/course-material.component';
import { CreateCourseMaterialComponent } from './course-materials/create-course-material/create-course-material.component';
import { CourseMaterialService } from './course-materials/course-material.service';

import { DataTypeComponent } from './data-types/data-type.component';
import { CreateDataTypeComponent } from './data-types/create-data-type/create-data-type.component';
import { DataTypeService } from './data-types/data-type.service';

import { DataValueComponent } from './data-values/data-value.component';
import { CreateDataValueComponent } from './data-values/create-data-value/create-data-value.component';
import { DataValueService } from './data-values/data-value.service';

import { DistrictComponent } from './districts/district.component';
import { CreateDistrictComponent } from './districts/create-district/create-district.component';
import { DistrictService } from './districts/district.service';

import { BlockComponent } from './blocks/block.component';
import { CreateBlockComponent } from './blocks/create-block/create-block.component';
import { BlockService } from './blocks/block.service';

import { ClusterComponent } from './clusters/cluster.component';
import { CreateClusterComponent } from './clusters/create-cluster/create-cluster.component';
import { ClusterService } from './clusters/cluster.service';

import { DivisionComponent } from './divisions/division.component';
import { CreateDivisionComponent } from './divisions/create-division/create-division.component';
import { DivisionService } from './divisions/division.service';

import { EmployeeComponent } from './employees/employee.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeeService } from './employees/employee.service';

import { EmployerComponent } from './employers/employer.component';
import { CreateEmployerComponent } from './employers/create-employer/create-employer.component';
import { EmployerService } from './employers/employer.service';

import { SchoolSectorJobComponent } from './schoolsectorjobs/schoolsectorjob.component';
import { CreateSchoolSectorJobComponent } from './schoolsectorjobs/create-schoolsectorjob/create-schoolsectorjob.component';
import { SchoolSectorJobService } from './schoolsectorjobs/schoolsectorjob.service';

import { GenericVTMappingComponent } from './genericvtmappings/genericvtmapping.component';
import { CreateGenericVTMappingComponent } from './genericvtmappings/create-genericvtmapping/create-genericvtmapping.component';
import { GenericVTMappingService } from './genericvtmappings/genericvtmapping.service';

import { VTAcademicClassSectionComponent } from './vtacademicclasssections/vtacademicclasssection.component';
import { CreateVTAcademicClassSectionComponent } from './vtacademicclasssections/create-vtacademicclasssection/create-vtacademicclasssection.component';
import { VTAcademicClassSectionService } from './vtacademicclasssections/vtacademicclasssection.service';

import { ForgotPasswordHistoryComponent } from './forgot-password-histories/forgot-password-history.component';
import { CreateForgotPasswordHistoryComponent } from './forgot-password-histories/create-forgot-password-history/create-forgot-password-history.component';
import { ForgotPasswordHistoryService } from './forgot-password-histories/forgot-password-history.service';

import { HeadMasterComponent } from './head-masters/head-master.component';
import { CreateHeadMasterComponent } from './head-masters/create-head-master/create-head-master.component';
import { HeadMasterService } from './head-masters/head-master.service';

import { HMIssueReportingComponent } from './hm-issue-reportings/hm-issue-reporting.component';
import { CreateHMIssueReportingComponent } from './hm-issue-reportings/create-hm-issue-reporting/create-hm-issue-reporting.component';
import { HMIssueReportingService } from './hm-issue-reportings/hm-issue-reporting.service';

import { JobRoleComponent } from './job-roles/job-role.component';
import { CreateJobRoleComponent } from './job-roles/create-job-role/create-job-role.component';
import { JobRoleService } from './job-roles/job-role.service';

import { PhaseComponent } from './phases/phase.component';
import { CreatePhaseComponent } from './phases/create-phase/create-phase.component';
import { PhaseService } from './phases/phase.service';

import { RoleComponent } from './roles/role.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { RoleService } from './roles/role.service';

import { AccountTransactionComponent } from './account-transactions/account-transaction.component';
import { CreateAccountTransactionComponent } from './account-transactions/create-account-transaction/create-account-transaction.component';
import { AccountTransactionService } from './account-transactions/account-transaction.service';

import { RoleTransactionComponent } from './role-transactions/role-transaction.component';
import { CreateRoleTransactionComponent } from './role-transactions/create-role-transaction/create-role-transaction.component';
import { RoleTransactionService } from './role-transactions/role-transaction.service';

import { SchoolComponent } from './schools/school.component';
import { CreateSchoolComponent } from './schools/create-school/create-school.component';
import { SchoolService } from './schools/school.service';

import { SchoolVEInchargeComponent } from './school-ve-incharge/school-ve-incharge.component';
import { CreateSchoolVEInchargeComponent } from './school-ve-incharge/create-school-ve-incharge/create-school-ve-incharge.component';
import { SchoolVEInchargeService } from './school-ve-incharge/school-ve-incharge.service';

import { SectionComponent } from './sections/section.component';
import { CreateSectionComponent } from './sections/create-section/create-section.component';
import { SectionService } from './sections/section.service';

import { SectorComponent } from './sectors/sector.component';
import { CreateSectorComponent } from './sectors/create-sector/create-sector.component';
import { SectorService } from './sectors/sector.service';

import { SiteHeaderComponent } from './site-headers/site-header.component';
import { CreateSiteHeaderComponent } from './site-headers/create-site-header/create-site-header.component';
import { SiteHeaderService } from './site-headers/site-header.service';

import { SiteSubHeaderComponent } from './site-sub-headers/site-sub-header.component';
import { CreateSiteSubHeaderComponent } from './site-sub-headers/create-site-sub-header/create-site-sub-header.component';
import { SiteSubHeaderService } from './site-sub-headers/site-sub-header.service';

import { StateComponent } from './states/state.component';
import { CreateStateComponent } from './states/create-state/create-state.component';
import { StateService } from './states/state.service';

import { StudentClassDetailComponent } from './student-class-details/student-class-detail.component';
import { CreateStudentClassDetailComponent } from './student-class-details/create-student-class-detail/create-student-class-detail.component';
import { StudentClassDetailService } from './student-class-details/student-class-detail.service';

import { StudentClassComponent } from './student-classes/student-class.component';
import { CreateStudentClassComponent } from './student-classes/create-student-class/create-student-class.component';
import { StudentClassService } from './student-classes/student-class.service';

import { TermsConditionComponent } from './terms-conditions/terms-condition.component';
import { CreateTermsConditionComponent } from './terms-conditions/create-terms-condition/create-terms-condition.component';
import { TermsConditionService } from './terms-conditions/terms-condition.service';

import { ToolEquipmentComponent } from './tool-equipments/tool-equipment.component';
import { CreateToolEquipmentComponent } from './tool-equipments/create-tool-equipment/create-tool-equipment.component';
import { ToolEquipmentService } from './tool-equipments/tool-equipment.service';

import { TransactionComponent } from './transactions/transaction.component';
import { CreateTransactionComponent } from './transactions/create-transaction/create-transaction.component';
import { TransactionService } from './transactions/transaction.service';

import { UserOTPDetailComponent } from './user-otpdetails/user-otpdetail.component';
import { CreateUserOTPDetailComponent } from './user-otpdetails/create-user-otpdetail/create-user-otpdetail.component';
import { UserOTPDetailService } from './user-otpdetails/user-otpdetail.service';

import { VCDailyReportingComponent } from './vc-daily-reportings/vc-daily-reporting.component';
import { CreateVCDailyReportingComponent } from './vc-daily-reportings/create-vc-daily-reporting/create-vc-daily-reporting.component';
import { VCDailyReportingService } from './vc-daily-reportings/vc-daily-reporting.service';

import { DRPDailyReportingComponent } from './drp-daily-reportings/drp-daily-reporting.component';
import { CreateDRPDailyReportingComponent } from './drp-daily-reportings/create-drp-daily-reporting/create-drp-daily-reporting.component';
import { DRPDailyReportingService } from './drp-daily-reportings/drp-daily-reporting.service';

import { VCIssueReportingComponent } from './vc-issue-reportings/vc-issue-reporting.component';
import { CreateVCIssueReportingComponent } from './vc-issue-reportings/create-vc-issue-reporting/create-vc-issue-reporting.component';
import { VCIssueReportingService } from './vc-issue-reportings/vc-issue-reporting.service';
import { VCIssueApprovalComponent } from './vc-issue-approval/vc-issue-approval.component';
import { VCIssueApprovalService } from './vc-issue-approval/vc-issue-approval.service';

import { VCSchoolSectorComponent } from './vc-school-sectors/vc-school-sector.component';
import { CreateVCSchoolSectorComponent } from './vc-school-sectors/create-vc-school-sector/create-vc-school-sector.component';
import { VCSchoolSectorService } from './vc-school-sectors/vc-school-sector.service';

import { VCSchoolVisitComponent } from './vc-school-visits/vc-school-visit.component';
import { CreateVCSchoolVisitComponent } from './vc-school-visits/create-vc-school-visit/create-vc-school-visit.component';
import { VCSchoolVisitService } from './vc-school-visits/vc-school-visit.service';

import { VocationalCoordinatorComponent } from './vocational-coordinators/vocational-coordinator.component';
import { CreateVocationalCoordinatorComponent } from './vocational-coordinators/create-vocational-coordinator/create-vocational-coordinator.component';
import { VocationalCoordinatorService } from './vocational-coordinators/vocational-coordinator.service';

import { VocationalTrainerComponent } from './vocational-trainers/vocational-trainer.component';
import { CreateVocationalTrainerComponent } from './vocational-trainers/create-vocational-trainer/create-vocational-trainer.component';
import { VocationalTrainerService } from './vocational-trainers/vocational-trainer.service';

import { VocationalTrainingProviderComponent } from './vocational-training-providers/vocational-training-provider.component';
import { CreateVocationalTrainingProviderComponent } from './vocational-training-providers/create-vocational-training-provider/create-vocational-training-provider.component';
import { VocationalTrainingProviderService } from './vocational-training-providers/vocational-training-provider.service';

import { VTClassComponent } from './vt-classes/vt-class.component';
import { CreateVTClassComponent } from './vt-classes/create-vt-class/create-vt-class.component';
import { VTClassService } from './vt-classes/vt-class.service';

import { VTDailyReportingComponent } from './vt-daily-reportings/vt-daily-reporting.component';
import { CreateVTDailyReportingComponent } from './vt-daily-reportings/create-vt-daily-reporting/create-vt-daily-reporting.component';
import { VTDailyReportingService } from './vt-daily-reportings/vt-daily-reporting.service';
import { VTDailyApprovalComponent } from './vt-daily-approval/vt-daily-approval.component';
import { VTDailyApprovalService } from './vt-daily-approval/vt-daily-approval.service';

import { VTFieldIndustryVisitConductedComponent } from './vt-field-industry-visit-conducteds/vt-field-industry-visit-conducted.component';
import { CreateVTFieldIndustryVisitConductedComponent } from './vt-field-industry-visit-conducteds/create-vt-field-industry-visit-conducted/create-vt-field-industry-visit-conducted.component';
import { VTFieldIndustryVisitConductedService } from './vt-field-industry-visit-conducteds/vt-field-industry-visit-conducted.service';
import { VTFieldIndustryVisitApprovalComponent } from './vt-field-industry-visit-approval/vt-field-industry-visit-approval.component';
import { VTFieldIndustryVisitApprovalService } from './vt-field-industry-visit-approval/vt-field-industry-visit-approval.service';

import { VTGuestLectureConductedComponent } from './vt-guest-lecture-conducteds/vt-guest-lecture-conducted.component';
import { CreateVTGuestLectureConductedComponent } from './vt-guest-lecture-conducteds/create-vt-guest-lecture-conducted/create-vt-guest-lecture-conducted.component';
import { VTGuestLectureConductedService } from './vt-guest-lecture-conducteds/vt-guest-lecture-conducted.service';
import { VTGuestLectureApprovalComponent } from './vt-guest-lecture-approval/vt-guest-lecture-approval.component';
import { VTGuestLectureApprovalService } from './vt-guest-lecture-approval/vt-guest-lecture-approval.service';

import { VTIssueReportingComponent } from './vt-issue-reportings/vt-issue-reporting.component';
import { CreateVTIssueReportingComponent } from './vt-issue-reportings/create-vt-issue-reporting/create-vt-issue-reporting.component';
import { VTIssueReportingService } from './vt-issue-reportings/vt-issue-reporting.service';

import { VTMonthlyTeachingPlanComponent } from './vt-monthly-teaching-plans/vt-monthly-teaching-plan.component';
import { CreateVTMonthlyTeachingPlanComponent } from './vt-monthly-teaching-plans/create-vt-monthly-teaching-plan/create-vt-monthly-teaching-plan.component';
import { VTMonthlyTeachingPlanService } from './vt-monthly-teaching-plans/vt-monthly-teaching-plan.service';

import { VTPMonthlyBillSubmissionStatusComponent } from './vtp-monthly-bill-submission-status/vtp-monthly-bill-submission-status.component';
import { CreateVTPMonthlyBillSubmissionStatusComponent } from './vtp-monthly-bill-submission-status/create-vtp-monthly-bill-submission-status/create-vtp-monthly-bill-submission-status.component';
import { VTPMonthlyBillSubmissionStatusService } from './vtp-monthly-bill-submission-status/vtp-monthly-bill-submission-status.service';

import { VTPracticalAssessmentComponent } from './vt-practical-assessments/vt-practical-assessment.component';
import { CreateVTPracticalAssessmentComponent } from './vt-practical-assessments/create-vt-practical-assessment/create-vt-practical-assessment.component';
import { VTPracticalAssessmentService } from './vt-practical-assessments/vt-practical-assessment.service';

import { VTPSectorComponent } from './vtp-sectors/vtp-sector.component';
import { CreateVTPSectorComponent } from './vtp-sectors/create-vtp-sector/create-vtp-sector.component';
import { VTPSectorService } from './vtp-sectors/vtp-sector.service';

import { VTSchoolSectorComponent } from './vt-school-sectors/vt-school-sector.component';
import { CreateVTSchoolSectorComponent } from './vt-school-sectors/create-vt-school-sector/create-vt-school-sector.component';
import { VTSchoolSectorService } from './vt-school-sectors/vt-school-sector.service';

import { VTStatusOfInductionInserviceTrainingComponent } from './vt-status-of-induction-inservice-trainings/vt-status-of-induction-inservice-training.component';
import { CreateVTStatusOfInductionInserviceTrainingComponent } from './vt-status-of-induction-inservice-trainings/create-vt-status-of-induction-inservice-training/create-vt-status-of-induction-inservice-training.component';
import { VTStatusOfInductionInserviceTrainingService } from './vt-status-of-induction-inservice-trainings/vt-status-of-induction-inservice-training.service';

import { VTStudentAssessmentComponent } from './vt-student-assessments/vt-student-assessment.component';
import { CreateVTStudentAssessmentComponent } from './vt-student-assessments/create-vt-student-assessment/create-vt-student-assessment.component';
import { VTStudentAssessmentService } from './vt-student-assessments/vt-student-assessment.service';

import { VTStudentPlacementDetailComponent } from './vt-student-placement-details/vt-student-placement-detail.component';
import { CreateVTStudentPlacementDetailComponent } from './vt-student-placement-details/create-vt-student-placement-detail/create-vt-student-placement-detail.component';
import { VTStudentPlacementDetailService } from './vt-student-placement-details/vt-student-placement-detail.service';

import { VTStudentResultOtherSubjectComponent } from './vt-student-result-other-subjects/vt-student-result-other-subject.component';
import { CreateVTStudentResultOtherSubjectComponent } from './vt-student-result-other-subjects/create-vt-student-result-other-subject/create-vt-student-result-other-subject.component';
import { VTStudentResultOtherSubjectService } from './vt-student-result-other-subjects/vt-student-result-other-subject.service';

import { VTStudentVEResultComponent } from './vt-student-veresults/vt-student-veresult.component';
import { CreateVTStudentVEResultComponent } from './vt-student-veresults/create-vt-student-veresult/create-vt-student-veresult.component';
import { VTStudentVEResultService } from './vt-student-veresults/vt-student-veresult.service';

import { HMIssueApprovalComponent } from './hm-issue-approval/hm-issue-approval.component';
import { HMIssueApprovalService } from './hm-issue-approval/hm-issue-approval.service';

import { VTIssueApprovalService } from './vt-issue-approval/vt-issue-approval.service';
import { VTIssueApprovalComponent } from './vt-issue-approval/vt-issue-approval.component';

import { ReportService } from 'app/reports/report.service';
import { FieldIndustryVisitComponent } from 'app/reports/field-industry-visit/field-industry-visit.component';
import { GuestLectureConductedComponent } from 'app/reports/guest-lecture-conducted/guest-lecture-conducted.component';
import { VTIssueReportComponent } from 'app/reports/vt-issue-report/vt-issue-report.component';
import { VCIssueReportComponent } from 'app/reports/vc-issue-report/vc-issue-report.component';
import { VCReportingAttendanceReportComponent } from 'app/reports/vc-reporting-attendance/vc-reporting-attendance.component';
import { VCSchoolSectorReportComponent } from 'app/reports/vc-school-sector-report/vc-school-sector-report.component';
import { VTSchoolSectorReportComponent } from 'app/reports/vt-school-sector-report/vt-school-sector-report.component';
import { SchoolVTPSectorReportComponent } from 'app/reports/school-vtp-sector-report/school-vtp-sector-report.component';
import { VTDailyAttendanceTrackingComponent } from 'app/reports/vt-daily-attendance-tracking/vt-daily-attendance-tracking.component';
import { VCDailyAttendanceTrackingComponent } from 'app/reports/vc-daily-attendance-tracking/vc-daily-attendance-tracking.component';
import { VTDailyMonthlyReportComponent } from 'app/reports/vt-daily-monthly-report/vt-daily-monthly-report.component';
import { VCDailyMonthlyReportComponent } from 'app/reports/vc-daily-monthly-report/vc-daily-monthly-report.component';
import { VTPMonthlyReportComponent } from 'app/reports/vtp-monthly-report/vtp-monthly-report.component';

import { SectorJobRoleComponent } from './sector-job-roles/sector-job-role.component';
import { CreateSectorJobRoleComponent } from './sector-job-roles/create-sector-job-role/create-sector-job-role.component';
import { SectorJobRoleService } from './sector-job-roles/sector-job-role.service';

import { SchoolVTPSectorComponent } from './school-vtp-sectors/school-vtp-sector.component';
import { CreateSchoolVTPSectorComponent } from './school-vtp-sectors/create-school-vtp-sector/create-school-vtp-sector.component';
import { SchoolVTPSectorService } from './school-vtp-sectors/school-vtp-sector.service';

import { VTPSectorJobRoleComponent } from './vtp-sector-job-roles/vtp-sector-job-role.component';
import { CreateVTPSectorJobRoleComponent } from './vtp-sector-job-roles/create-vtp-sector-job-role/create-vtp-sector-job-role.component';
import { VTPSectorJobRoleService } from './vtp-sector-job-roles/vtp-sector-job-role.service';

//import { MatTableServerComponent } from './mat-table-server/mat-table-server.component';
//import { MatTableServerService } from './mat-table-server/mat-table-server.service';

import { SchoolCategoryComponent } from './school-categories/school-category.component';
import { CreateSchoolCategoryComponent } from './school-categories/create-school-category/create-school-category.component';
import { SchoolCategoryService } from './school-categories/school-category.service';

import { CourseModuleComponent } from './course-modules/course-module.component';
import { CreateCourseModuleComponent } from './course-modules/create-course-module/create-course-module.component';
import { CourseModuleService } from './course-modules/course-module.service';

import { from } from 'rxjs';
import { SchoolClassComponent } from './school-classes/school-class.component';
import { CreateSchoolClassComponent } from './school-classes/create-school-class/create-school-class.component';
import { SchoolClassService } from './school-classes/school-class.service';
import { SchoolInfoReportComponent } from 'app/reports/school-info-report/school-info-report.component';

import { SummaryDashboardComponent } from 'app/dashboards/summary-dashboard/summary-dashboard.component';
import { SummaryDashboardService } from 'app/dashboards/summary-dashboard/summary-dashboard.service';
import { MaterialElevationDirective } from 'app/dashboards/summary-dashboard/material-elevation.directive';
import { CourseMaterialStatusComponent } from 'app/reports/course-material-status/course-material-status.component';
import { FieldAndIndustryVisitStatusComponent } from 'app/reports/field-industry-visit-status/field-industry-visit-status.component';
import { GuestLectureStatusComponent } from 'app/reports/guest-lecture-status/guest-lecture-status.component';
import { StudentAttendanceReportingComponent } from 'app/reports/student-attendance-reporting/student-attendance-reporting.component';
import { StudentDetailComponent } from 'app/reports/student-details/student-details.component';
import { StudentEnrollmentComponent } from 'app/reports/student-enrollment/student-enrollment.component';
import { ToolsAndEquipmentStatusComponent } from 'app/reports/tools-equipment-status/tools-equipment-status.component';
import { VCSchoolVisitSummaryComponent } from 'app/reports/vc-school-visit-summary/vc-school-visit-summary.component';
import { VocationalTrainerAttendanceComponent } from 'app/reports/vt-attendance/vt-attendance.component';
import { VTPBillSubmissionStatusComponent } from 'app/reports/vtp-bill-submission-status/vtp-bill-submission-status.component';
import { VTReportingAttendanceComponent } from 'app/reports/vt-reporting-attendance/vt-reporting-attendance.component';

import { CompareDashboardComponent } from 'app/dashboards/compare-dashboard/compare-dashboard.component';
import { CompareDashboardService } from 'app/dashboards/compare-dashboard/compare-dashboard.service';
import { IssueManagementDashboardComponent } from 'app/dashboards/issue-management-dashboard/issue-management-dashboard.component';
import { IssueManagementDashboardService } from 'app/dashboards/issue-management-dashboard/issue-management-dashboard.service';
import { VTMonthlyAttendanceComponent } from 'app/reports/vt-monthly-attendance/vt-monthly-attendance.component';
import { VCMonthlyAttendanceComponent } from 'app/reports/vc-monthly-attendance/vc-monthly-attendance.component';
import { DataUploadComponent } from './data-upload/data-upload.component';

import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { ForgotPasswordComponent } from 'app/auth/forgot-password/forgot-password.component';
import { ChangePasswordService } from '../auth/change-password/change-password.service';
import { ResetPasswordComponent } from 'app/auth/reset-password/reset-password.component';
import { ChangeLoginComponent } from '../auth/change-login/change-login.component';
import { ChangeLoginService } from '../auth/change-login/change-login.service';

import { BroadcastMessagesComponent } from './broadcast-messages/broadcast-messages.component';
import { CreateBroadcastMessagesComponent } from './broadcast-messages/create-broadcast-messages/create-broadcast-messages.component';
import { BroadcastMessagesService } from './broadcast-messages/broadcast-messages.service';

import { IssueApprovalComponent } from './issue-approval/issue-approval.component';
import { IssueApprovalService } from './issue-approval/issue-approval.service';
import { CreateIssueApprovalComponent } from './issue-approval/create-issue-approval/create-issue-approval.component';
import { UrlService } from 'app/common/shared/url.service';

import { VTStudentExitSurveyDetailComponent } from './vt-student-exit-survey-details/vt-student-exit-survey-detail.component';
import { CreateVTStudentExitSurveyDetailComponent } from './vt-student-exit-survey-details/create-vt-student-exit-survey-detail/create-vt-student-exit-survey-detail.component';
import { VTStudentExitSurveyDetailService } from './vt-student-exit-survey-details/vt-student-exit-survey-detail.service';
import { VTStudentExitSurveyReportComponent } from 'app/reports/vt-student-exit-survey-detail-report/vt-student-exit-survey-detail-report.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { VCSchoolVisitReportComponent } from './vc-school-visits-report/vc-school-visit-report.component';
import { CreateVCSchoolVisitReportComponent } from './vc-school-visits-report/create-vc-school-visit-report/create-vc-school-visit-report.component';
import { VCSchoolVisitReportService } from './vc-school-visits-report/vc-school-visit-report.service';

import { ComplaintRegistrationComponent } from './complaint-registration/complaint-registration.component';
import { CreateComplaintRegistrationComponent } from './complaint-registration/create-complaint-registration/create-complaint-registration.component';
import { ComplaintRegistrationService } from './complaint-registration/complaint-registration.service';

import { VTStudentTrackingReportComponent } from 'app/reports/vt-student-tracking-report/vt-student-tracking-report.component';
import { VTReportNotSubmittedReportComponent } from 'app/reports/vt-report-not-submitted-report/vt-report-not-submitted-report.component';
import { SettingComponent } from './setting/setting.component';
import { SettingService } from './setting/setting.service';
import { CreateVTStudentDetailComponent } from './vt-student-exit-survey-details/create-vt-student-detail/create-vt-student-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VTCourseModuleTrackingComponent } from 'app/reports/vt-course-module-tracking/vt-course-module-tracking.component';
import { VTTransferComponent } from './vt-transfer/vt-transfer.component';
import { VTTransferService } from './vt-transfer/vt-transfer.service';
import { SchoolVTPSectorsForAcadmicRolloverComponent } from './school-vtpsectors-for-acadmic-rollover/school-vtpsectors-for-acadmic-rollover.component';
import { SchoolVTPSectorsForAcadmicRolloverService } from './school-vtpsectors-for-acadmic-rollover/school-vtpsectors-for-acadmic-rollover-service';
import { VTPSectorForAcademicYearComponent } from './vtp-sectors-for-academic-year/vtp-sectors-for-academic-year.component';
import { VTPSectorForAcademicYearService } from './vtp-sectors-for-academic-year/vtp-sectors-for-academic-year.service';
import { VCSchoolSectorsForAcademicRolloverComponent } from './vcschool-sectors-for-academic-rollover/vcschool-sectors-for-academic-rollover.component';
import { VCSchoolSectorsForAcademicRolloverService } from './vcschool-sectors-for-academic-rollover/vcschool-sectors-for-academic-rollover-service';
import { VTClassesForAcademicRolloverComponent } from './vtclasses-for-academic-rollover/vtclasses-for-academic-rollover.component';
import { TransferVTVCVTPAcademicRolloverComponent } from './transfer-vtvcvtpacademic-rollover/transfer-vtvcvtpacademic-rollover.component';
import { TransferVTVCVTPAcademicRolloverService } from './transfer-vtvcvtpacademic-rollover/transfer-VTVCVTP-academic-rollover.service';
import { StudentsAcademicRolloverComponent } from './students-academic-rollover/students-academic-rollover.component';
import { StudentsAcademicRolloverService } from './students-academic-rollover/students-academic-rollover.service';
import { VTClassForAcademicRolloverService } from './vtclasses-for-academic-rollover/vtclasses-for-academic-rollover.service';
import { VTSchoolSectorsForAcademicRolloverComponent } from './vtschool-sectors-for-academic-rollover/vtschool-sectors-for-academic-rollover.component';
import { VTSchoolSectorsForAcademicRolloverService } from './vtschool-sectors-for-academic-rollover/vtschool-sectors-for-academic-rollover-service';

import { MessageTemplateComponent } from './message-templates/message-template.component';
import { CreateMessageTemplateComponent } from './message-templates/create-message-template/create-message-template.component';
import { MessageTemplateService } from './message-templates/message-template.service';

const routes: Routes = [
    { path: RouteConstants.Login, component: LoginComponent },
    //{ path: '', redirectTo: RouteConstants.Login, pathMatch: 'full' },
    //{ path: '**', component: PageNotFoundComponent },
    //{ path: RouteConstants.PageNotFound, component: PageNotFoundComponent },
    { path: RouteConstants.Sample, component: SampleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Settings, component: SettingComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.AcademicYear.List, component: AcademicYearComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.AcademicYear.New, component: CreateAcademicYearComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.AcademicYear.Edit, component: CreateAcademicYearComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Account.List, component: AccountComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Account.New, component: CreateAccountComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Account.Edit, component: CreateAccountComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Country.List, component: CountryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Country.New, component: CreateCountryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Country.Edit, component: CreateCountryComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.CourseMaterial.List, component: CourseMaterialComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.CourseMaterial.New, component: CreateCourseMaterialComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.CourseMaterial.Edit, component: CreateCourseMaterialComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.DataType.List, component: DataTypeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DataType.New, component: CreateDataTypeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DataType.Edit, component: CreateDataTypeComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.DataValue.List, component: DataValueComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DataValue.New, component: CreateDataValueComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DataValue.Edit, component: CreateDataValueComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.District.List, component: DistrictComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.District.New, component: CreateDistrictComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.District.Edit, component: CreateDistrictComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Block.List, component: BlockComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Block.New, component: CreateBlockComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Block.Edit, component: CreateBlockComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Cluster.List, component: ClusterComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Cluster.New, component: CreateClusterComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Cluster.Edit, component: CreateClusterComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Division.List, component: DivisionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Division.New, component: CreateDivisionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Division.Edit, component: CreateDivisionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Employee.List, component: EmployeeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Employee.New, component: CreateEmployeeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Employee.Edit, component: CreateEmployeeComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Employer.List, component: EmployerComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Employer.New, component: CreateEmployerComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Employer.Edit, component: CreateEmployerComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.ForgotPasswordHistory.List, component: ForgotPasswordHistoryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.ForgotPasswordHistory.New, component: CreateForgotPasswordHistoryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.ForgotPasswordHistory.Edit, component: CreateForgotPasswordHistoryComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.HeadMaster.List, component: HeadMasterComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.HeadMaster.New, component: CreateHeadMasterComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.HeadMaster.Edit, component: CreateHeadMasterComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.HMIssueReporting.List, component: HMIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.HMIssueReporting.New, component: CreateHMIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.HMIssueReporting.Edit, component: CreateHMIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.HMIssueReporting.Approval, component: IssueApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.JobRole.List, component: JobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.JobRole.New, component: CreateJobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.JobRole.Edit, component: CreateJobRoleComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Phase.List, component: PhaseComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Phase.New, component: CreatePhaseComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Phase.Edit, component: CreatePhaseComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Role.List, component: RoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Role.New, component: CreateRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Role.Edit, component: CreateRoleComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.AccountTransaction.List, component: AccountTransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.AccountTransaction.New, component: CreateAccountTransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.AccountTransaction.Edit, component: CreateAccountTransactionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.RoleTransaction.List, component: RoleTransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.RoleTransaction.New, component: CreateRoleTransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.RoleTransaction.Edit, component: CreateRoleTransactionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.School.List, component: SchoolComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.School.New, component: CreateSchoolComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.School.Edit, component: CreateSchoolComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SchoolVEIncharge.List, component: SchoolVEInchargeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolVEIncharge.New, component: CreateSchoolVEInchargeComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolVEIncharge.Edit, component: CreateSchoolVEInchargeComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Section.List, component: SectionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Section.New, component: CreateSectionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Section.Edit, component: CreateSectionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Sector.List, component: SectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Sector.New, component: CreateSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Sector.Edit, component: CreateSectorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SiteHeader.List, component: SiteHeaderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SiteHeader.New, component: CreateSiteHeaderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SiteHeader.Edit, component: CreateSiteHeaderComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SiteSubHeader.List, component: SiteSubHeaderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SiteSubHeader.New, component: CreateSiteSubHeaderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SiteSubHeader.Edit, component: CreateSiteSubHeaderComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.State.List, component: StateComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.State.New, component: CreateStateComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.State.Edit, component: CreateStateComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.StudentClassDetail.List, component: StudentClassDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.StudentClassDetail.New, component: CreateStudentClassDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.StudentClassDetail.Edit, component: CreateStudentClassDetailComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.StudentClass.List, component: StudentClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.StudentClass.New, component: CreateStudentClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.StudentClass.Edit, component: CreateStudentClassComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.TermsCondition.List, component: TermsConditionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.TermsCondition.New, component: CreateTermsConditionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.TermsCondition.Edit, component: CreateTermsConditionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.ToolEquipment.List, component: ToolEquipmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.ToolEquipment.New, component: CreateToolEquipmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.ToolEquipment.Edit, component: CreateToolEquipmentComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Transaction.List, component: TransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Transaction.New, component: CreateTransactionComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Transaction.Edit, component: CreateTransactionComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.UserOTPDetail.List, component: UserOTPDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.UserOTPDetail.New, component: CreateUserOTPDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.UserOTPDetail.Edit, component: CreateUserOTPDetailComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VCDailyReporting.List, component: VCDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCDailyReporting.New, component: CreateVCDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCDailyReporting.Edit, component: CreateVCDailyReportingComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.DRPDailyReporting.List, component: DRPDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DRPDailyReporting.New, component: CreateDRPDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.DRPDailyReporting.Edit, component: CreateDRPDailyReportingComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VCIssueReporting.List, component: VCIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCIssueReporting.New, component: CreateVCIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCIssueReporting.Edit, component: CreateVCIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCIssueReporting.Approval, component: IssueApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VCSchoolSector.List, component: VCSchoolSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolSector.New, component: CreateVCSchoolSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolSector.Edit, component: CreateVCSchoolSectorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VCSchoolVisit.List, component: VCSchoolVisitComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolVisit.New, component: CreateVCSchoolVisitComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolVisit.Edit, component: CreateVCSchoolVisitComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VocationalCoordinator.List, component: VocationalCoordinatorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalCoordinator.New, component: CreateVocationalCoordinatorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalCoordinator.Edit, component: CreateVocationalCoordinatorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VocationalTrainer.List, component: VocationalTrainerComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalTrainer.New, component: CreateVocationalTrainerComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalTrainer.Edit, component: CreateVocationalTrainerComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VocationalTrainingProvider.List, component: VocationalTrainingProviderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalTrainingProvider.New, component: CreateVocationalTrainingProviderComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VocationalTrainingProvider.Edit, component: CreateVocationalTrainingProviderComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTClass.List, component: VTClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTClass.New, component: CreateVTClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTClass.Edit, component: CreateVTClassComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTDailyReporting.List, component: VTDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTDailyReporting.New, component: CreateVTDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTDailyReporting.Edit, component: CreateVTDailyReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTDailyReporting.Approval, component: VTDailyApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTFieldIndustryVisitConducted.List, component: VTFieldIndustryVisitConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTFieldIndustryVisitConducted.New, component: CreateVTFieldIndustryVisitConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTFieldIndustryVisitConducted.Edit, component: CreateVTFieldIndustryVisitConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTFieldIndustryVisitConducted.Approval, component: VTFieldIndustryVisitApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTGuestLectureConducted.List, component: VTGuestLectureConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTGuestLectureConducted.New, component: CreateVTGuestLectureConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTGuestLectureConducted.Edit, component: CreateVTGuestLectureConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTGuestLectureConducted.Approval, component: VTGuestLectureApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTIssueReporting.List, component: VTIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTIssueReporting.New, component: CreateVTIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTIssueReporting.Edit, component: CreateVTIssueReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTIssueReporting.Approval, component: IssueApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTMonthlyTeachingPlan.List, component: VTMonthlyTeachingPlanComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTMonthlyTeachingPlan.New, component: CreateVTMonthlyTeachingPlanComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTMonthlyTeachingPlan.Edit, component: CreateVTMonthlyTeachingPlanComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTPMonthlyBillSubmissionStatus.List, component: VTPMonthlyBillSubmissionStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPMonthlyBillSubmissionStatus.New, component: CreateVTPMonthlyBillSubmissionStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPMonthlyBillSubmissionStatus.Edit, component: CreateVTPMonthlyBillSubmissionStatusComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTPracticalAssessment.List, component: VTPracticalAssessmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPracticalAssessment.New, component: CreateVTPracticalAssessmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPracticalAssessment.Edit, component: CreateVTPracticalAssessmentComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTPSector.List, component: VTPSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPSector.New, component: CreateVTPSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPSector.Edit, component: CreateVTPSectorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTSchoolSector.List, component: VTSchoolSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTSchoolSector.New, component: CreateVTSchoolSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTSchoolSector.Edit, component: CreateVTSchoolSectorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStatusOfInductionInserviceTraining.List, component: VTStatusOfInductionInserviceTrainingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStatusOfInductionInserviceTraining.New, component: CreateVTStatusOfInductionInserviceTrainingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStatusOfInductionInserviceTraining.Edit, component: CreateVTStatusOfInductionInserviceTrainingComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStudentAssessment.List, component: VTStudentAssessmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentAssessment.New, component: CreateVTStudentAssessmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentAssessment.Edit, component: CreateVTStudentAssessmentComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStudentPlacementDetail.List, component: VTStudentPlacementDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentPlacementDetail.New, component: CreateVTStudentPlacementDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentPlacementDetail.Edit, component: CreateVTStudentPlacementDetailComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStudentResultOtherSubject.List, component: VTStudentResultOtherSubjectComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentResultOtherSubject.New, component: CreateVTStudentResultOtherSubjectComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentResultOtherSubject.Edit, component: CreateVTStudentResultOtherSubjectComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStudentVEResult.List, component: VTStudentVEResultComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentVEResult.New, component: CreateVTStudentVEResultComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentVEResult.Edit, component: CreateVTStudentVEResultComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Report.GuestLectureConducted, component: GuestLectureConductedComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.FieldIndustryVisitConducted, component: FieldIndustryVisitComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTIssueReports, component: VTIssueReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCIssueReports, component: VCIssueReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCReportingAttendanceReports, component: VCReportingAttendanceReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCSchoolSectorReports, component: VCSchoolSectorReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTSchoolSectorReports, component: VTSchoolSectorReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.SchoolVTPSectorReports, component: SchoolVTPSectorReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.SchoolInfoReports, component: SchoolInfoReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.CourseMaterialStatusReports, component: CourseMaterialStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.FieldAndIndustryVisitStatusReports, component: FieldAndIndustryVisitStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.GuestLectureStatusReports, component: GuestLectureStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.StudentAttendanceReportingReports, component: StudentAttendanceReportingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.StudentDetailsReports, component: StudentDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.StudentEnrollmentReports, component: StudentEnrollmentComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.ToolsAndEquipmentStatusReports, component: ToolsAndEquipmentStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCSchoolVisitSummaryReports, component: VCSchoolVisitSummaryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VocationalTrainerAttendanceReports, component: VocationalTrainerAttendanceComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTPBillSubmissionStatusReports, component: VTPBillSubmissionStatusComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTReportingAttendanceReports, component: VTReportingAttendanceComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTDailyAttendanceTracking, component: VTDailyAttendanceTrackingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCDailyAttendanceTracking, component: VCDailyAttendanceTrackingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTStudentTracking, component: VTStudentTrackingReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTReportNotSubmitted, component: VTReportNotSubmittedReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTCourseModuleTrackingReport, component: VTCourseModuleTrackingComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTDailyMonthlyReports, component: VTDailyMonthlyReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VCDailyMonthlyReports, component: VCDailyMonthlyReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTPMonthlyReports, component: VTPMonthlyReportComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SectorJobRole.List, component: SectorJobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SectorJobRole.New, component: CreateSectorJobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SectorJobRole.Edit, component: CreateSectorJobRoleComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SchoolVTPSector.List, component: SchoolVTPSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolVTPSector.New, component: CreateSchoolVTPSectorComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolVTPSector.Edit, component: CreateSchoolVTPSectorComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTPSectorJobRole.List, component: VTPSectorJobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPSectorJobRole.New, component: CreateVTPSectorJobRoleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPSectorJobRole.Edit, component: CreateVTPSectorJobRoleComponent, canActivate: [AuthGuardService] },

    //{ path: RouteConstants.MatTableServer.List, component: MatTableServerComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SchoolCategory.List, component: SchoolCategoryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolCategory.New, component: CreateSchoolCategoryComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolCategory.Edit, component: CreateSchoolCategoryComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.CourseModule.List, component: CourseModuleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.CourseModule.New, component: CreateCourseModuleComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.CourseModule.Edit, component: CreateCourseModuleComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SchoolClass.List, component: SchoolClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolClass.New, component: CreateSchoolClassComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolClass.Edit, component: CreateSchoolClassComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.SummaryDashboard.Dashboard, component: SummaryDashboardComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.CompareDashboard.CompareDashboard, component: CompareDashboardComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.IssueManagementDashboard.IssueManagementDashboard, component: IssueManagementDashboardComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.Report.VTMonthlyAttendanceReports, component: VTMonthlyAttendanceComponent },
    { path: RouteConstants.Report.VCMonthlyAttendanceReports, component: VCMonthlyAttendanceComponent },
    { path: RouteConstants.FolderAccess.DataUpload, component: DataUploadComponent },

    { path: RouteConstants.Account.ChangePassword, component: ChangePasswordComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Account.ForgotPassword, component: ForgotPasswordComponent },
    { path: RouteConstants.Account.ResetPassword, component: ResetPasswordComponent },
    { path: RouteConstants.Account.ResetPasswordByToken, component: ResetPasswordComponent },
    { path: RouteConstants.Account.ChangeLogin, component: ChangeLoginComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.BroadcastMessages.List, component: BroadcastMessagesComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.BroadcastMessages.New, component: CreateBroadcastMessagesComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.BroadcastMessages.Edit, component: CreateBroadcastMessagesComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.IssueApproval.Edit, component: CreateIssueApprovalComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VTStudentExitSurveyDetail.List, component: VTStudentExitSurveyDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentExitSurveyDetail.New, component: CreateVTStudentExitSurveyDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentExitSurveyDetail.Edit, component: CreateVTStudentExitSurveyDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTStudentExitSurveyDetail.NewStudent, component: CreateVTStudentDetailComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.Report.VTStudentExitSurveyDetailReports, component: VTStudentExitSurveyReportComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.VCSchoolVisitReport.List, component: VCSchoolVisitReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolVisitReport.New, component: CreateVCSchoolVisitReportComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolVisitReport.Edit, component: CreateVCSchoolVisitReportComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.ComplaintRegistration.List, component: ComplaintRegistrationComponent },
    { path: RouteConstants.ComplaintRegistration.New, component: CreateComplaintRegistrationComponent },
    { path: RouteConstants.ComplaintRegistration.Edit, component: CreateComplaintRegistrationComponent },

    //Academic Rollover
    { path: RouteConstants.VocationalTrainer.VTTransfer, component: VTTransferComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.SchoolVTPSectorsForAcademicRollover.List, component: SchoolVTPSectorsForAcadmicRolloverComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTPSectorForAcademicYear.List, component: VTPSectorForAcademicYearComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VCSchoolSectorsForAcademicRollover.List, component: VCSchoolSectorsForAcademicRolloverComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTSchoolSectorsForAcademicRollover.List, component: VTSchoolSectorsForAcademicRolloverComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.VTClassesForAcademicRollover.List, component: VTClassesForAcademicRolloverComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.TransferVCVTVTPForAcademicRollover.List, component: TransferVTVCVTPAcademicRolloverComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.StudentsAcademicRollover.List, component: StudentsAcademicRolloverComponent, canActivate: [AuthGuardService] },

    { path: RouteConstants.MessageTemplates.List, component: MessageTemplateComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.MessageTemplates.New, component: CreateMessageTemplateComponent, canActivate: [AuthGuardService] },
    { path: RouteConstants.MessageTemplates.Edit, component: CreateMessageTemplateComponent, canActivate: [AuthGuardService] },

];

@NgModule({
    declarations: [
        SampleComponent,
        LoginComponent,
        PageNotFoundComponent,
        SettingComponent,
        VTTransferComponent,
        AcademicYearComponent,
        CreateAcademicYearComponent,
        AccountComponent,
        CreateAccountComponent,
        CountryComponent,
        CreateCountryComponent,
        CourseMaterialComponent,
        CreateCourseMaterialComponent,
        DataTypeComponent,
        CreateDataTypeComponent,
        DataValueComponent,
        CreateDataValueComponent,
        DistrictComponent,
        CreateDistrictComponent,
        BlockComponent,
        CreateBlockComponent,
        ClusterComponent,
        CreateClusterComponent,
        DivisionComponent,
        CreateDivisionComponent,
        EmployeeComponent,
        CreateEmployeeComponent,
        EmployerComponent,
        CreateEmployerComponent,
        ForgotPasswordHistoryComponent,
        CreateForgotPasswordHistoryComponent,
        HeadMasterComponent,
        CreateHeadMasterComponent,
        HMIssueReportingComponent,
        CreateHMIssueReportingComponent,
        HMIssueApprovalComponent,
        JobRoleComponent,
        CreateJobRoleComponent,
        PhaseComponent,
        CreatePhaseComponent,
        RoleComponent,
        CreateRoleComponent,
        AccountTransactionComponent,
        CreateAccountTransactionComponent,
        RoleTransactionComponent,
        CreateRoleTransactionComponent,
        SchoolComponent,
        CreateSchoolComponent,
        SchoolVEInchargeComponent,
        CreateSchoolVEInchargeComponent,
        SectionComponent,
        CreateSectionComponent,
        SectorComponent,
        CreateSectorComponent,
        SiteHeaderComponent,
        CreateSiteHeaderComponent,
        SiteSubHeaderComponent,
        CreateSiteSubHeaderComponent,
        StateComponent,
        CreateStateComponent,
        StudentClassDetailComponent,
        CreateStudentClassDetailComponent,
        StudentClassComponent,
        CreateStudentClassComponent,
        TermsConditionComponent,
        CreateTermsConditionComponent,
        ToolEquipmentComponent,
        CreateToolEquipmentComponent,
        TransactionComponent,
        CreateTransactionComponent,
        UserOTPDetailComponent,
        CreateUserOTPDetailComponent,
        VCDailyReportingComponent,
        CreateVCDailyReportingComponent,
        DRPDailyReportingComponent,
        CreateDRPDailyReportingComponent,
        VCIssueReportingComponent,
        CreateVCIssueReportingComponent,
        VCIssueApprovalComponent,
        VCSchoolSectorComponent,
        CreateVCSchoolSectorComponent,
        VCSchoolVisitComponent,
        CreateVCSchoolVisitComponent,
        VocationalCoordinatorComponent,
        CreateVocationalCoordinatorComponent,
        VocationalTrainerComponent,
        CreateVocationalTrainerComponent,
        VocationalTrainingProviderComponent,
        CreateVocationalTrainingProviderComponent,
        VTClassComponent,
        CreateVTClassComponent,
        VTDailyReportingComponent,
        VTDailyApprovalComponent,
        CreateVTDailyReportingComponent,
        VTFieldIndustryVisitConductedComponent,
        VTFieldIndustryVisitApprovalComponent,
        CreateVTFieldIndustryVisitConductedComponent,
        VTGuestLectureConductedComponent,
        CreateVTGuestLectureConductedComponent,
        VTGuestLectureApprovalComponent,
        VTIssueReportingComponent,
        CreateVTIssueReportingComponent,
        VTIssueApprovalComponent,
        VTMonthlyTeachingPlanComponent,
        CreateVTMonthlyTeachingPlanComponent,
        VTPMonthlyBillSubmissionStatusComponent,
        CreateVTPMonthlyBillSubmissionStatusComponent,
        VTPracticalAssessmentComponent,
        CreateVTPracticalAssessmentComponent,
        VTPSectorComponent,
        CreateVTPSectorComponent,
        VTSchoolSectorComponent,
        CreateVTSchoolSectorComponent,
        VTStatusOfInductionInserviceTrainingComponent,
        CreateVTStatusOfInductionInserviceTrainingComponent,
        VTStudentAssessmentComponent,
        CreateVTStudentAssessmentComponent,
        VTStudentPlacementDetailComponent,
        CreateVTStudentPlacementDetailComponent,
        VTStudentResultOtherSubjectComponent,
        CreateVTStudentResultOtherSubjectComponent,
        VTStudentVEResultComponent,
        CreateVTStudentVEResultComponent,
        SectorJobRoleComponent,
        CreateSectorJobRoleComponent,
        SchoolVTPSectorComponent,
        CreateSchoolVTPSectorComponent,
        VTPSectorJobRoleComponent,
        CreateVTPSectorJobRoleComponent,

        FieldIndustryVisitComponent,
        GuestLectureConductedComponent,
        VTIssueReportComponent,
        VCIssueReportComponent,
        VCReportingAttendanceReportComponent,
        VCSchoolSectorReportComponent,
        VTSchoolSectorReportComponent,
        SchoolVTPSectorReportComponent,
        SchoolInfoReportComponent,
        CourseMaterialStatusComponent,
        FieldAndIndustryVisitStatusComponent,
        GuestLectureStatusComponent,
        StudentAttendanceReportingComponent,
        StudentDetailComponent,
        StudentEnrollmentComponent,
        ToolsAndEquipmentStatusComponent,
        VCSchoolVisitSummaryComponent,
        VocationalTrainerAttendanceComponent,
        VTPBillSubmissionStatusComponent,
        VTReportingAttendanceComponent,
        VTDailyAttendanceTrackingComponent,
        VCDailyAttendanceTrackingComponent,
        VTStudentTrackingReportComponent,
        VTReportNotSubmittedReportComponent,
        VTCourseModuleTrackingComponent,
        VTDailyMonthlyReportComponent,
        VCDailyMonthlyReportComponent,
        VTPMonthlyReportComponent,

        //MatTableServerComponent,
        SchoolCategoryComponent,
        CreateSchoolCategoryComponent,
        CourseModuleComponent,
        CreateCourseModuleComponent,
        SchoolClassComponent,
        CreateSchoolClassComponent,
        SummaryDashboardComponent,
        CompareDashboardComponent,
        IssueManagementDashboardComponent,
        VTMonthlyAttendanceComponent,
        VCMonthlyAttendanceComponent,
        DataUploadComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ChangeLoginComponent,
        BroadcastMessagesComponent,
        CreateBroadcastMessagesComponent,
        IssueApprovalComponent,
        CreateIssueApprovalComponent,
        VTStudentExitSurveyDetailComponent,
        CreateVTStudentExitSurveyDetailComponent,
        CreateVTStudentDetailComponent,
        VTStudentExitSurveyReportComponent,
        MaterialElevationDirective,
        VCSchoolVisitReportComponent,
        CreateVCSchoolVisitReportComponent,
        ComplaintRegistrationComponent,
        CreateComplaintRegistrationComponent,

        SchoolVTPSectorsForAcadmicRolloverComponent,
        VTPSectorForAcademicYearComponent,
        VCSchoolSectorsForAcademicRolloverComponent,
        VTSchoolSectorsForAcademicRolloverComponent,
        VTClassesForAcademicRolloverComponent,
        TransferVTVCVTPAcademicRolloverComponent,
        StudentsAcademicRolloverComponent,

        MessageTemplateComponent,
        CreateMessageTemplateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        MatAutocompleteModule,

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatListModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        MaterialFileInputModule,
        MatRadioModule,
        MatCardModule,
        MatTooltipModule,
        MatDividerModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatPasswordStrengthModule.forRoot(),
        MatNativeDateModule,
        MatTableExporterModule,
        MatToolbarModule,
        MatCarouselModule.forRoot(),
        MatSelectFilterModule
    ],
    exports: [
        SampleComponent,
        LoginComponent,
        PageNotFoundComponent,
        SettingComponent,
        VTTransferComponent,
        AcademicYearComponent,
        CreateAcademicYearComponent,
        AccountComponent,
        CreateAccountComponent,
        CountryComponent,
        CreateCountryComponent,
        CreateCountryComponent,
        CourseMaterialComponent,
        DataTypeComponent,
        CreateDataTypeComponent,
        DataValueComponent,
        CreateDataValueComponent,
        DistrictComponent,
        CreateDistrictComponent,
        BlockComponent,
        CreateBlockComponent,
        ClusterComponent,
        CreateClusterComponent,
        DivisionComponent,
        CreateDivisionComponent,
        EmployeeComponent,
        CreateEmployeeComponent,
        EmployerComponent,
        CreateEmployerComponent,
        ForgotPasswordHistoryComponent,
        CreateForgotPasswordHistoryComponent,
        HeadMasterComponent,
        CreateHeadMasterComponent,
        HMIssueReportingComponent,
        CreateHMIssueReportingComponent,
        JobRoleComponent,
        CreateJobRoleComponent,
        PhaseComponent,
        CreatePhaseComponent,
        RoleComponent,
        CreateRoleComponent,
        AccountComponent,
        CreateAccountComponent,
        AccountTransactionComponent,
        CreateAccountTransactionComponent,
        RoleTransactionComponent,
        CreateRoleTransactionComponent,
        SchoolComponent,
        CreateSchoolComponent,
        SectionComponent,
        CreateSectionComponent,
        SectorComponent,
        CreateSectorComponent,
        SiteHeaderComponent,
        CreateSiteHeaderComponent,
        SiteSubHeaderComponent,
        CreateSiteSubHeaderComponent,
        StateComponent,
        CreateStateComponent,
        StudentClassDetailComponent,
        CreateStudentClassDetailComponent,
        StudentClassComponent,
        CreateStudentClassComponent,
        TermsConditionComponent,
        CreateTermsConditionComponent,
        ToolEquipmentComponent,
        CreateToolEquipmentComponent,
        TransactionComponent,
        CreateTransactionComponent,
        UserOTPDetailComponent,
        CreateUserOTPDetailComponent,
        VCDailyReportingComponent,
        CreateVCDailyReportingComponent,
        DRPDailyReportingComponent,
        CreateDRPDailyReportingComponent,
        VCIssueReportingComponent,
        CreateVCIssueReportingComponent,
        VCSchoolSectorComponent,
        CreateVCSchoolSectorComponent,
        VCSchoolVisitComponent,
        CreateVCSchoolVisitComponent,
        VocationalCoordinatorComponent,
        CreateVocationalCoordinatorComponent,
        VocationalTrainerComponent,
        CreateVocationalTrainerComponent,
        VocationalTrainingProviderComponent,
        CreateVocationalTrainingProviderComponent,
        VTClassComponent,
        CreateVTClassComponent,
        VTDailyReportingComponent,
        CreateVTDailyReportingComponent,
        VTFieldIndustryVisitConductedComponent,
        CreateVTFieldIndustryVisitConductedComponent,
        VTGuestLectureConductedComponent,
        CreateVTGuestLectureConductedComponent,
        VTIssueReportingComponent,
        CreateVTIssueReportingComponent,
        VTMonthlyTeachingPlanComponent,
        CreateVTMonthlyTeachingPlanComponent,
        VTPMonthlyBillSubmissionStatusComponent,
        CreateVTPMonthlyBillSubmissionStatusComponent,
        VTPracticalAssessmentComponent,
        CreateVTPracticalAssessmentComponent,
        VTPSectorComponent,
        CreateVTPSectorComponent,
        VTSchoolSectorComponent,
        CreateVTSchoolSectorComponent,
        VTStatusOfInductionInserviceTrainingComponent,
        CreateVTStatusOfInductionInserviceTrainingComponent,
        VTStudentAssessmentComponent,
        CreateVTStudentAssessmentComponent,
        VTStudentPlacementDetailComponent,
        CreateVTStudentPlacementDetailComponent,
        VTStudentResultOtherSubjectComponent,
        CreateVTStudentResultOtherSubjectComponent,
        VTStudentVEResultComponent,
        CreateVTStudentVEResultComponent,
        SectorJobRoleComponent,
        CreateSectorJobRoleComponent,
        SchoolVTPSectorComponent,
        CreateSchoolVTPSectorComponent,
        VTPSectorJobRoleComponent,
        CreateVTPSectorJobRoleComponent,
        SchoolClassComponent,
        CreateSchoolClassComponent,
        SchoolCategoryComponent,
        CreateSchoolCategoryComponent,
        CourseModuleComponent,
        CreateCourseModuleComponent,
        VTCourseModuleTrackingComponent,
        VTDailyMonthlyReportComponent,
        VCDailyMonthlyReportComponent,
        VTPMonthlyReportComponent,

        FieldIndustryVisitComponent,
        GuestLectureConductedComponent,
        VTIssueReportComponent,
        VCIssueReportComponent,
        VCReportingAttendanceReportComponent,
        VCSchoolSectorReportComponent,
        VTSchoolSectorReportComponent,
        SchoolVTPSectorReportComponent,
        SchoolInfoReportComponent,
        CourseMaterialStatusComponent,
        FieldAndIndustryVisitStatusComponent,
        GuestLectureStatusComponent,
        StudentAttendanceReportingComponent,
        StudentDetailComponent,
        StudentEnrollmentComponent,
        ToolsAndEquipmentStatusComponent,
        VCSchoolVisitSummaryComponent,
        VocationalTrainerAttendanceComponent,
        VTPBillSubmissionStatusComponent,
        VTReportingAttendanceComponent,
        VTDailyAttendanceTrackingComponent,
        VCDailyAttendanceTrackingComponent,
        SummaryDashboardComponent,
        CompareDashboardComponent,
        IssueManagementDashboardComponent,
        //MatTableServerComponent,       
        VTMonthlyAttendanceComponent,
        VCMonthlyAttendanceComponent,

        DataUploadComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ChangeLoginComponent,
        BroadcastMessagesComponent,
        IssueApprovalComponent,
        CreateIssueApprovalComponent,
        VTStudentExitSurveyDetailComponent,
        CreateVTStudentExitSurveyDetailComponent,
        CreateVTStudentDetailComponent,
        VTStudentExitSurveyReportComponent,
        VCSchoolVisitReportComponent,
        CreateVCSchoolVisitReportComponent,
        ComplaintRegistrationComponent,

        SchoolVTPSectorsForAcadmicRolloverComponent,
        VTPSectorForAcademicYearComponent,
        VCSchoolSectorsForAcademicRolloverComponent,
        VTSchoolSectorsForAcademicRolloverComponent,
        VTClassesForAcademicRolloverComponent,
        TransferVTVCVTPAcademicRolloverComponent,
        StudentsAcademicRolloverComponent,

        MessageTemplateComponent,
        CreateMessageTemplateComponent
    ],
    providers: [
        LoginService,
        SettingService,
        VTTransferService,
        AcademicYearService,
        AccountService,
        CountryService,
        CourseMaterialService,
        DataTypeService,
        DataValueService,
        DistrictService,
        BlockService,
        ClusterService,
        DivisionService,
        EmployeeService,
        EmployerService,
        ForgotPasswordHistoryService,
        HeadMasterService,
        HMIssueReportingService,
        HMIssueApprovalService,
        JobRoleService,
        PhaseService,
        RoleService,
        AccountTransactionService,
        RoleTransactionService,
        SchoolService,
        SchoolVEInchargeService,
        SectionService,
        SectorService,
        SiteHeaderService,
        SiteSubHeaderService,
        StateService,
        StudentClassDetailService,
        StudentClassService,
        TermsConditionService,
        ToolEquipmentService,
        TransactionService,
        UserOTPDetailService,
        VCDailyReportingService,
        DRPDailyReportingService,
        VCIssueReportingService,
        VCIssueApprovalService,
        VCSchoolSectorService,
        VCSchoolVisitService,
        VocationalCoordinatorService,
        VocationalTrainerService,
        VocationalTrainingProviderService,
        VTClassService,
        VTDailyReportingService,
        VTDailyApprovalService,
        VTFieldIndustryVisitConductedService,
        VTFieldIndustryVisitApprovalService,
        VTGuestLectureConductedService,
        VTGuestLectureApprovalService,
        VTIssueReportingService,
        VTIssueApprovalService,
        VTMonthlyTeachingPlanService,
        VTPMonthlyBillSubmissionStatusService,
        VTPracticalAssessmentService,
        VTPSectorService,
        VTSchoolSectorService,
        VTStatusOfInductionInserviceTrainingService,
        VTStudentAssessmentService,
        VTStudentPlacementDetailService,
        VTStudentResultOtherSubjectService,
        VTStudentVEResultService,
        ReportService,

        SectorJobRoleService,
        SchoolVTPSectorService,
        VTPSectorJobRoleService,
        //MatTableServerService,
        SchoolCategoryService,
        CourseModuleService,
        SchoolClassService,
        SummaryDashboardService,
        CompareDashboardService,
        IssueManagementDashboardService,
        ChangePasswordService,
        ChangeLoginService,
        BroadcastMessagesService,
        UrlService,
        IssueApprovalService,
        VTStudentExitSurveyDetailService,
        VCSchoolVisitReportService,
        ComplaintRegistrationService,

        SchoolVTPSectorsForAcadmicRolloverService,
        VTPSectorForAcademicYearService,
        VCSchoolSectorsForAcademicRolloverService,
        TransferVTVCVTPAcademicRolloverService,
        StudentsAcademicRolloverService,
        VTClassForAcademicRolloverService,
        VTSchoolSectorsForAcademicRolloverService,
        MessageTemplateService
    ]
})

export class IgmiteModule { }
