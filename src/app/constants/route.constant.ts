export const RouteConstants = {
    Login: 'login',
    Home: 'home',
    Sample: 'sample',
    Settings: 'settings',
    PageNotFound: 'page-not-found',

    CreateUserCheckInDetails: 'user-check-in-details/create',

    AcademicYear: {
        List: 'academic-years',
        New: 'academic-years/:actionType',
        Edit: 'academic-years/:actionType/:academicYearId'
    },
    Account: {
        List: 'users',
        New: 'users/:actionType',
        Edit: 'users/:actionType/:accountId',
        ChangePassword: 'change-password',
        ForgotPassword: 'forgot-password',
        ResetPassword: 'reset-password',
        ResetPasswordByToken: 'reset-password/:accessToken',
        ChangeLogin: 'change-login',
    },
    Country: {
        List: 'countries',
        New: 'countries/:actionType',
        Edit: 'countries/:actionType/:countryCode'
    },
    DataType: {
        List: 'data-types',
        New: 'data-types/:actionType',
        Edit: 'data-types/:actionType/:dataTypeId'
    },
    CourseMaterial: {
        List: 'course-materials',
        New: 'course-materials/:actionType',
        Edit: 'course-materials/:actionType/:courseMaterialId'
    },
    DataValue: {
        List: 'data-values',
        New: 'data-values/:actionType',
        Edit: 'data-values/:actionType/:dataValueId'
    },
    District: {
        List: 'districts',
        New: 'districts/:actionType',
        Edit: 'districts/:actionType/:districtCode'
    },
    Division: {
        List: 'divisions',
        New: 'divisions/:actionType',
        Edit: 'divisions/:actionType/:divisionId'
    },
    Employee: {
        List: 'employees',
        New: 'employees/:actionType',
        Edit: 'employees/:actionType/:accountId'
    },
    Employer: {
        List: 'employers',
        New: 'employers/:actionType',
        Edit: 'employers/:actionType/:employerId'
    },
    Vocationalcoordinatordetail: {
        List: 'vocationalcoordinatordetails',
        New: 'vocationalcoordinatordetails/:actionType',
        Edit: 'vocationalcoordinatordetails/:actionType/:vocationalcoordinatordetailId'
    },
    Vocationaltrainerdetail: {
    List: 'vocationaltrainerdetails',
    New: 'vocationaltrainerdetails/:actionType',
    Edit: 'vocationaltrainerdetails/:actionType/:vocationaltrainerdetailId'
},
    SchoolSectorJob: {
        List: 'schoolsectorjobs',
        New: 'schoolsectorjobs/:actionType',
        Edit: 'schoolsectorjobs/:actionType/:schoolsectorjobId'
    },
    GenericVTMapping: {
        List: 'genericvtmappings',
        New: 'genericvtmappings/:actionType',
        Edit: 'genericvtmappings/:actionType/:genericvtmappingId'
    },
    VTAcademicClassSection: {
        List: 'vtacademicclasssections',
        New: 'vtacademicclasssections/:actionType',
        Edit: 'vtacademicclasssections/:actionType/:vtacademicclasssectionId'
    },
    ForgotPasswordHistory: {
        List: 'forgot-password-histories',
        New: 'forgot-password-histories/:actionType',
        Edit: 'forgot-password-histories/:actionType/:forgotPasswordId'
    },
    HeadMaster: {
        List: 'head-masters',
        New: 'head-masters/:actionType',
        Edit: 'head-masters/:actionType/:hmId'
    },
    HMIssueReporting: {
        List: 'hm-issue-reporting',
        New: 'hm-issue-reporting/:actionType',
        Edit: 'hm-issue-reporting/:actionType/:hmIssueReportingId',
        Approval: 'hm-issue-approval'
    },
    JobRole: {
        List: 'job-roles',
        New: 'job-roles/:actionType',
        Edit: 'job-roles/:actionType/:jobRoleId'
    },
    Phase: {
        List: 'phases',
        New: 'phases/:actionType',
        Edit: 'phases/:actionType/:phaseId'
    },
    Role: {
        List: 'roles',
        New: 'roles/:actionType',
        Edit: 'roles/:actionType/:roleId'
    },
    AccountTransaction: {
        List: 'account-transactions',
        New: 'account-transactions/:actionType',
        Edit: 'account-transactions/:actionType/:accountTransactionId'
    },
    RoleTransaction: {
        List: 'role-transactions',
        New: 'role-transactions/:actionType',
        Edit: 'role-transactions/:actionType/:roleTransactionId'
    },
    School: {
        List: 'schools',
        New: 'schools/:actionType',
        Edit: 'schools/:actionType/:schoolId'
    },
    SchoolCategory: {
        List: 'school-categories',
        New: 'school-categories/:actionType',
        Edit: 'school-categories/:actionType/:schoolCategoryId'
    },
    CourseModule: {
        List: 'course-modules',
        New: 'course-modules/:actionType',
        Edit: 'course-modules/:actionType/:courseModuleId'
    },
    SchoolClass: {
        List: 'school-classes',
        New: 'school-classes/:actionType',
        Edit: 'school-classes/:actionType/:classId'
    },
    SchoolVEIncharge: {
        List: 'school-ve-incharge',
        New: 'school-ve-incharge/:actionType',
        Edit: 'school-ve-incharge/:actionType/:schoolVEInchargeId'
    },
    Section: {
        List: 'sections',
        New: 'sections/:actionType',
        Edit: 'sections/:actionType/:sectionId'
    },
    Sector: {
        List: 'sectors',
        New: 'sectors/:actionType',
        Edit: 'sectors/:actionType/:sectorId'
    },
    SiteHeader: {
        List: 'site-headers',
        New: 'site-headers/:actionType',
        Edit: 'site-headers/:actionType/:siteHeaderId'
    },
    SiteSubHeader: {
        List: 'site-sub-headers',
        New: 'site-sub-headers/:actionType',
        Edit: 'site-sub-headers/:actionType/:siteSubHeaderId'
    },
    State: {
        List: 'states',
        New: 'states/:actionType',
        Edit: 'states/:actionType/:stateCode'
    },
    StudentClassDetail: {
        List: 'student-class-details',
        New: 'student-class-details/:actionType',
        Edit: 'student-class-details/:actionType/:studentId'
    },
    StudentClass: {
        List: 'student-registrations',
        New: 'student-registrations/:actionType',
        Edit: 'student-registrations/:actionType/:studentId'
    },
    TermsCondition: {
        List: 'terms-conditions',
        New: 'terms-conditions/:actionType',
        Edit: 'terms-conditions/:actionType/:termsConditionId'
    },
    ToolEquipment: {
        List: 'tool-equipments',
        New: 'tool-equipments/:actionType',
        Edit: 'tool-equipments/:actionType/:toolEquipmentId'
    },
    Transaction: {
        List: 'transactions',
        New: 'transactions/:actionType',
        Edit: 'transactions/:actionType/:transactionId'
    },
    UserOTPDetail: {
        List: 'user-otpdetails',
        New: 'user-otpdetails/:actionType',
        Edit: 'user-otpdetails/:actionType/:otpId'
    },
    VCDailyReporting: {
        List: 'vc-daily-reporting',
        New: 'vc-daily-reporting/:actionType',
        Edit: 'vc-daily-reporting/:actionType/:vcDailyReportingId',
        Approval: 'vc-daily-approval'
    },
    DRPDailyReporting: {
        List: 'drp-daily-reporting',
        New: 'drp-daily-reporting/:actionType',
        Edit: 'drp-daily-reporting/:actionType/:drpDailyReportingId',
        Approval: 'drp-daily-approval'
    },
    VCIssueReporting: {
        List: 'vc-issue-reporting',
        New: 'vc-issue-reporting/:actionType',
        Edit: 'vc-issue-reporting/:actionType/:vcIssueReportingId',
        Approval: 'vc-issue-approval'
    },
    VCSchoolSector: {
        List: 'vc-school-sectors',
        New: 'vc-school-sectors/:actionType',
        Edit: 'vc-school-sectors/:actionType/:vcSchoolSectorId'
    },
    VCSchoolVisit: {
        List: 'vc-school-visits',
        New: 'vc-school-visits/:actionType',
        Edit: 'vc-school-visits/:actionType/:vcSchoolVisitId'
    },
    VocationalCoordinator: {
        List: 'vocational-coordinators',
        New: 'vocational-coordinators/:actionType',
        Edit: 'vocational-coordinators/:actionType/:vcId'
    },
    VocationalTrainer: {
        List: 'vocational-trainers',
        VTTransfer: 'vt-transfers',
        New: 'vocational-trainers/:actionType',
        Edit: 'vocational-trainers/:actionType/:vtId'
    },
    VocationalTrainingProvider: {
        List: 'vocational-training-providers',
        New: 'vocational-training-providers/:actionType',
        Edit: 'vocational-training-providers/:actionType/:vtpId'
    },
    VTClass: {
        List: 'vt-classes',
        New: 'vt-classes/:actionType',
        Edit: 'vt-classes/:actionType/:vtClassId'
    },
    VTDailyReporting: {
        List: 'vt-daily-reporting',
        New: 'vt-daily-reporting/:actionType',
        Edit: 'vt-daily-reporting/:actionType/:vtDailyReportingId',
        Approval: 'vt-daily-approval'
    },
    VTFieldIndustryVisitConducted: {
        List: 'vt-field-industry-visit-conducted',
        New: 'vt-field-industry-visit-conducted/:actionType',
        Edit: 'vt-field-industry-visit-conducted/:actionType/:vtFieldIndustryVisitConductedId',
        Approval: 'vt-field-industry-approval'
    },
    VTGuestLectureConducted: {
        List: 'vt-guest-lecture-conducted',
        New: 'vt-guest-lecture-conducted/:actionType',
        Edit: 'vt-guest-lecture-conducted/:actionType/:vtGuestLectureId',
        Approval: 'vt-guest-lecture-approval'
    },
    VTIssueReporting: {
        List: 'vt-issue-reporting',
        New: 'vt-issue-reporting/:actionType',
        Edit: 'vt-issue-reporting/:actionType/:vtIssueReportingId',
        Approval: 'vt-issue-approval'
    },
    VTMonthlyTeachingPlan: {
        List: 'vt-monthly-teaching-plans',
        New: 'vt-monthly-teaching-plans/:actionType',
        Edit: 'vt-monthly-teaching-plans/:actionType/:vtMonthlyTeachingPlanId'
    },
    VTPMonthlyBillSubmissionStatus: {
        List: 'vtp-monthly-bill-submission-status',
        New: 'vtp-monthly-bill-submission-status/:actionType',
        Edit: 'vtp-monthly-bill-submission-status/:actionType/:vtpMonthlyBillSubmissionStatusId'
    },
    VTPracticalAssessment: {
        List: 'vt-practical-assessments',
        New: 'vt-practical-assessments/:actionType',
        Edit: 'vt-practical-assessments/:actionType/:vtPracticalAssessmentId'
    },
    VTPSector: {
        List: 'vtp-sectors',
        New: 'vtp-sectors/:actionType',
        Edit: 'vtp-sectors/:actionType/:vtpSectorId'
    },
    VTPSectorJobRole: {
        List: 'vtp-sector-job-roles',
        New: 'vtp-sector-job-roles/:actionType',
        Edit: 'vtp-sector-job-roles/:actionType/:vtpSectorJobRoleId'
    },
    VTSchoolSector: {
        List: 'vt-school-sectors',
        New: 'vt-school-sectors/:actionType',
        Edit: 'vt-school-sectors/:actionType/:vtSchoolSectorId'
    },
    VTStatusOfInductionInserviceTraining: {
        List: 'vt-status-of-induction-inservice-training',
        New: 'vt-status-of-induction-inservice-training/:actionType',
        Edit: 'vt-status-of-induction-inservice-training/:actionType/:vtStatusOfInductionInserviceTrainingId'
    },
    VTStudentAssessment: {
        List: 'vt-student-assessments',
        New: 'vt-student-assessments/:actionType',
        Edit: 'vt-student-assessments/:actionType/:vtStudentAssessmentId'
    },
    VTStudentPlacementDetail: {
        List: 'vt-student-placement-details',
        New: 'vt-student-placement-details/:actionType',
        Edit: 'vt-student-placement-details/:actionType/:vtStudentPlacementDetailId'
    },
    VTStudentResultOtherSubject: {
        List: 'vt-student-result-other-subjects',
        New: 'vt-student-result-other-subjects/:actionType',
        Edit: 'vt-student-result-other-subjects/:actionType/:vtStudentResultOtherSubjectId'
    },
    VTStudentVEResult: {
        List: 'vt-student-ve-results',
        New: 'vt-student-ve-results/:actionType',
        Edit: 'vt-student-ve-results/:actionType/:vtStudentVEResultId'
    },

    Report: {
        GuestLectureConducted: 'guest-lecture-conducted-reports',
        FieldIndustryVisitConducted: 'field-industry-visit-conducted-reports',
        VTIssueReports: 'vt-issue-reports',
        VCIssueReports: 'vc-issue-reports',
        VCReportingAttendanceReports: 'vc-reporting-attendance-reports',
        VCSchoolSectorReports: 'vc-school-sector-reports',
        VTSchoolSectorReports: 'vt-school-sector-reports',
        SchoolVTPSectorReports: 'school-vtp-sector-reports',
        SchoolInfoReports: 'school-information',

        CourseMaterialStatusReports: 'course-material-status',
        FieldAndIndustryVisitStatusReports: 'field-industry-visit-status',
        GuestLectureStatusReports: 'guest-lecture-status',
        StudentAttendanceReportingReports: 'student-attendance-reporting',
        StudentDetailsReports: 'student-details',
        StudentEnrollmentReports: 'student-enrollment',
        ToolsAndEquipmentStatusReports: 'tools-equipment-status',
        VCSchoolVisitSummaryReports: 'vc-school-visit-summary',
        VocationalTrainerAttendanceReports: 'vt-attendance',
        VTPBillSubmissionStatusReports: 'vtp-bill-submission-status',
        VTReportingAttendanceReports: 'vt-reporting-attendance',
        VTMonthlyAttendanceReports: 'vt-monthly-attendance',
        VCMonthlyAttendanceReports: 'vc-monthly-attendance',
        VTDailyAttendanceTracking: 'vt-daily-attendance-tracking',
        VCDailyAttendanceTracking: 'vc-daily-attendance-tracking',
        VTStudentTracking: 'vt-student-tracking',
        VTReportNotSubmitted: 'vt-report-not-submitted',
        VTStudentExitSurveyDetailReports: 'vt-student-exit-survey-detail-report',
        VTCourseModuleTrackingReport: 'vt-course-module-tracking-report',
        VTDailyMonthlyReports: 'vt-daily-monthly-report',
        VCDailyMonthlyReports: 'vc-daily-monthly-report',
        VTPMonthlyReports: 'vtp-monthly-report',
    },

    SectorJobRole: {
        List: 'sector-job-roles',
        New: 'sector-job-roles/:actionType',
        Edit: 'sector-job-roles/:actionType/:sectorJobRoleId',
    },

    SchoolVTPSector: {
        List: 'school-vtp-sectors',
        New: 'school-vtp-sectors/:actionType',
        Edit: 'school-vtp-sectors/:actionType/:schoolVTPSectorId',
    },

    WhatsappBroadcasting: {
        List: 'whatsapp-broadcasting',
        New: 'whatsapp-broadcasting/:actionType',
        Edit: 'whatsapp-broadcasting/:actionType/:CampainID',
    },

    MatTableServer: {
        List: 'mat-table-server',
    },

    SummaryDashboard: {
        Dashboard: 'summary-dashboard',
        CourseMaterial: 'dashboards/course-material'
    },

    CompareDashboard: {
        CompareDashboard: 'compare-dashboard',
    },

    IssueManagementDashboard: {
        IssueManagementDashboard: 'issue-management-dashboard',
    },

    FolderAccess: {
        VTMonthlyAttendancePDF: 'Reports/VTMonthlyAttendancePDF',
        DataUpload: 'data-upload'
    },

    BroadcastMessages: {
        List: 'broadcast-messages',
        New: 'broadcast-messages/:actionType',
        Edit: 'broadcast-messages/:actionType/:broadcastMessagesId'
    },
    IssueApproval: {
        Edit: 'issue-approval/:actionType/:type/:issueReportingId'
    },

    Block: {
        List: 'blocks',
        New: 'blocks/:actionType',
        Edit: 'blocks/:actionType/:blockId'
    },

    Cluster: {
        List: 'clusters',
        New: 'clusters/:actionType',
        Edit: 'clusters/:actionType/:clusterId'
    },

    VTStudentExitSurveyDetail: {
        List: 'vt-student-exit-survey-details',
        New: 'vt-student-exit-survey-details/:actionType',
        Edit: 'vt-student-exit-survey-details/:actionType/:exitStudentId/:academicYear/:classId',
        NewStudent: 'vt-student-details/:actionType',
    },


    VCSchoolVisitReport: {
        List: 'vc-school-visit-reporting',
        New: 'vc-school-visit-reporting/:actionType',
        Edit: 'vc-school-visit-reporting/:actionType/:vcSchoolVisitReportingId'
    },

    ComplaintRegistration: {
        List: 'complaint-registrations',
        New: 'complaint-registration',
        Edit: 'complaint-registration/:actionType/:complaintRegistrationId'
    },
    PrivacyPolicy:{
        List: 'privacy-policy',
    },
    //Academic Rollover
    VTPSectorForAcademicYear: {
        List: 'vtp-sectors-for-academic-rollover',
    },

    SchoolVTPSectorsForAcademicRollover: {
        List: 'school-vtpsectors-for-acadmic-rollover',

    },

    VCSchoolSectorsForAcademicRollover: {
        List: 'vcschool-sectors-for-academic-rollover',

    },

    VTSchoolSectorsForAcademicRollover: {
        List: 'vtschool-sectors-for-academic-rollover',

    },

    VTClassesForAcademicRollover: {
        List: 'vtclasses-for-academic-rollover',

    },

    TransferVCVTVTPForAcademicRollover: {
        List: 'transfer-vtvcvtpacademic-rollover',

    },

    StudentsAcademicRollover: {
        List: 'students-academic-rollover',

    },

    MessageTemplates: {
        List: 'message-templates',
        New: 'message-templates/:actionType',
        Edit: 'message-templates/:actionType/:messageTemplateId'
    },

    EmailBroadcasting: {
        List: 'email-broadcasting',
        New: 'email-broadcasting/:actionType',
        Edit: 'email-broadcasting/:actionType/:Id',
    },
}
