import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';

@Injectable()
export class ServiceConstants {
    public BaseUrl: string = environment.ApiBaseUrl;
    public RetryServieNo: number = 0;

    public CommonService = {
        SaveLighthouseSettings: "Lighthouse/SaveLighthouseSettings"
    }

    public MasterData = {
        GetAll: "Lighthouse/GetMasterDataByType",
        GetClassesByVTId: "Lighthouse/GetClassesByVTId",
        GetSectionsByVTClassId: "Lighthouse/GetSectionsByVTClassId",
        GetUnitsByClassAndModuleId: "Lighthouse/GetUnitsByClassAndModuleId",
        GetSessionsByUnitId: "Lighthouse/GetSessionsByUnitId",
        GetStudentsByClassIdForVT: "Lighthouse/GetStudentsByClassIdForVT",
        GetSchoolsByVCId: "Lighthouse/GetSchoolsByVCId",
        GetSchoolsByDRPId: "Lighthouse/GetSchoolsByDRPId",
        GetCourseModuleUnitSessions: "Lighthouse/GetCourseModuleUnitSessions",
        GetClassSectionsByVTId: "Lighthouse/GetClassSectionsByVTId",
        GetStudentsByVTId: "Lighthouse/GetStudentsByVTId",
        UploadExcelData: "DataUpload/UploadExcelData",
        GetDashboardData: "Lighthouse/GetDashboardData",
        GetDashboardCardData: "Lighthouse/GetDashboardCardData",
        GetSchoolVTPSectorsByUserId: "Lighthouse/GetSchoolVTPSectorsByUserId",
        GetNextAcademicYear: "AcademicRollover/GetNextAcademicYear",
        GetVTPandVCIdBySchoolId: "Lighthouse/GetVTPandVCIdBySchoolId",
        GetVTPVCAndSchoolIdByVTId: "Lighthouse/GetVTPVCAndSchoolIdByVTId",
        GetVTPVCAndSchoolIdByHMId: "Lighthouse/GetVTPVCAndSchoolIdByHMId",
        GetVTPByHMId: "Lighthouse/GetVTPByHMId",
        GetVCByHMId: "Lighthouse/GetVCByHMId",
        GetVTByHMId: "Lighthouse/GetVTByHMId",
        GetSchoolByHMId: "Lighthouse/GetSchoolByHMId",
        GetVTBySchoolIdHMId: "Lighthouse/GetVTBySchoolIdHMId",
        GetVTPByAYId: "Lighthouse/GetVTPByAYId",
        GetVCByAYAndVTPId: "Lighthouse/GetVCByAYAndVTPId",
        GetVTByAYAndVCId: "Lighthouse/GetVTByAYAndVCId",
    };

    public DashboardGraphData = {
        GetDashboardSchoolChartData: "Dashboard/GetDashboardSchoolChartData",
        GetDashboardVocationalTrainersCardData: "Dashboard/GetDashboardVocationalTrainersCardData",
        GetDashboardJobRoleUnitsCardData: "Lighthouse/GetDashboardJobRoleUnitsCardData",
        GetDashboardStudentsCardData: "Dashboard/GetDashboardStudentsCardData",
        GetDashboardClassesCardData: "Dashboard/GetDashboardClassesCardData",
        GetDashboardGuestLectureChartData: "Dashboard/GetDashboardGuestLectureChartData",
        GetDashboardCourseMaterialChartData: "Lighthouse/GetDashboardCourseMaterialChartData",
        GetDashboardToolsAndEquipmentChartData: "Lighthouse/GetDashboardToolsAndEquipmentChartData",
        GetDashboardFieldVisitChartData: "Dashboard/GetDashboardFieldVisitChartData",
        GetDashboardVTAttendanceChartData: "Dashboard/GetDashboardVTAttendanceChartData",
        GetDashboardVCAttendanceChartData: "Lighthouse/GetDashboardVCAttendanceChartData",
        GetDashboardStudentAttendanceChartData: "Dashboard/GetDashboardStudentAttendanceChartData",
        GetDashboardSchoolVisitStatusChartData: "Lighthouse/GetDashboardSchoolVisitStatusChartData",
        GetDashboardIssueManagementStatusChartData: "Lighthouse/GetDashboardIssueManagementStatusChartData",
        GetDashboardIssueManagementChartData: "Lighthouse/GetDashboardIssueManagementChartData",
        GetDashboardSchoolVisitsByMonth: "Lighthouse/GetDashboardSchoolVisitsByMonth",
        GetDashboardSchoolVisitsByVTP: "Lighthouse/GetDashboardSchoolVisitsByVTP",
        GetDashboardCourseMaterialsDrilldownData: "Lighthouse/GetDashboardCourseMaterialsDrilldownData"
    }

    public CompareDashboardData = {
        GetCompareSchoolsData: "Dashboard/GetCompareSchoolsData",
        GetCompareCourseMaterialsData: "Dashboard/GetCompareCourseMaterialsData",
        GetCompareToolsAndEquipmentsData: "Dashboard/GetCompareToolsAndEquipmentsData",
        GetCompareStudentsData: "Dashboard/GetCompareStudentsData",
        GetCompareNewEnrolmentAndDropoutStudentsData: "Dashboard/GetCompareNewEnrolmentAndDropoutStudentsData",
        GetCompareGuestLecturesData: "/Dashboard/GetCompareGuestLecturesData",
        GetCompareFieldVisitsData: "/Dashboard/GetCompareFieldVisitsData",
        GetCompareTrainersData: "/Dashboard/GetCompareTrainersData",
        GetCompareCoordinatorsData: "/Dashboard/GetCompareCoordinatorsData",
        GetCompareVTVCReportingData: "/Dashboard/GetCompareVTVCReportingData"
    }

    public AcademicYear = {
        GetAll: "AcademicYear/GetAcademicYears",
        GetAllByCriteria: "AcademicYear/GetAcademicYearsByCriteria",
        GetById: "AcademicYear/GetAcademicYearById",
        CreateOrUpdate: "AcademicYear/CreateOrUpdateAcademicYearDetails",
        Delete: "AcademicYear/DeleteAcademicYearById"
    };

    public AcademicYearSchoolVTPSectorJobRole = {
        GetAll: "AcademicYearSchoolVTPSectorJobRole/GetAcademicYearSchoolVTPSectorJobRoles",
        GetAllByCriteria: "AcademicYearSchoolVTPSectorJobRole/GetAcademicYearSchoolVTPSectorJobRolesByCriteria",
        GetById: "AcademicYearSchoolVTPSectorJobRole/GetAcademicYearSchoolVTPSectorJobRoleById",
        CreateOrUpdate: "AcademicYearSchoolVTPSectorJobRole/CreateOrUpdateAcademicYearSchoolVTPSectorJobRoleDetails",
        Delete: "AcademicYearSchoolVTPSectorJobRole/DeleteAcademicYearSchoolVTPSectorJobRoleById"
    };

    public Account = {
        GetAll: "Account/GetAccounts",
        GetAllByCriteria: "Account/GetAccountsByCriteria",
        GetById: "Account/GetAccountById",
        CreateOrUpdate: "Account/CreateOrUpdateAccountDetails",
        Delete: "Account/DeleteAccountById",
        ChangePassword: "Account/ChangePassword",
        ForgotPassword: "Lighthouse/ForgotPassword",
        ResetPassword: "Lighthouse/ResetPassword",
        ChangeLogin: "Account/ChangeUserLoginId"
    };

    public Country = {
        GetAll: "Country/GetCountries",
        GetAllByCriteria: "Country/GetCountriesByCriteria",
        GetById: "Country/GetCountryById",
        CreateOrUpdate: "Country/CreateOrUpdateCountryDetails",
        Delete: "Country/DeleteCountryById"
    };

    public CourseMaterial = {
        GetAll: "CourseMaterial/GetCourseMaterials",
        GetAllByCriteria: "CourseMaterial/GetCourseMaterialsByCriteria",
        GetById: "CourseMaterial/GetCourseMaterialById",
        CreateOrUpdate: "CourseMaterial/CreateOrUpdateCourseMaterialDetails",
        Delete: "CourseMaterial/DeleteCourseMaterialById"
    };

    public DataType = {
        GetAll: "DataType/GetDataTypes",
        GetAllByCriteria: "DataType/GetDataTypesByCriteria",
        GetById: "DataType/GetDataTypeById",
        CreateOrUpdate: "DataType/CreateOrUpdateDataTypeDetails",
        Delete: "DataType/DeleteDataTypeById"
    };

    public DataValue = {
        GetAll: "DataValue/GetDataValues",
        GetAllByCriteria: "DataValue/GetDataValuesByCriteria",
        GetById: "DataValue/GetDataValueById",
        CreateOrUpdate: "DataValue/CreateOrUpdateDataValueDetails",
        Delete: "DataValue/DeleteDataValueById"
    };

    public District = {
        GetAll: "District/GetDistricts",
        GetAllByCriteria: "District/GetDistrictsByCriteria",
        GetById: "District/GetDistrictById",
        CreateOrUpdate: "District/CreateOrUpdateDistrictDetails",
        Delete: "District/DeleteDistrictById",
        GetAllByCriteriaTmp: "District/GetDistrictsByCriteriaTmp",
    };

    public Block = {
        GetAll: "Block/GetBlocks",
        GetAllByCriteria: "Block/GetBlocksByCriteria",
        GetById: "Block/GetBlockById",
        CreateOrUpdate: "Block/CreateOrUpdateBlockDetails",
        Delete: "Block/DeleteBlockById"
    };

    public Cluster = {
        GetAll: "Cluster/GetClusters",
        GetAllByCriteria: "Cluster/GetClustersByCriteria",
        GetById: "Cluster/GetClusterById",
        CreateOrUpdate: "Cluster/CreateOrUpdateClusterDetails",
        Delete: "Cluster/DeleteClusterById"
    };

    public Division = {
        GetAll: "Division/GetDivisions",
        GetAllByCriteria: "Division/GetDivisionsByCriteria",
        GetById: "Division/GetDivisionById",
        CreateOrUpdate: "Division/CreateOrUpdateDivisionDetails",
        Delete: "Division/DeleteDivisionById"
    };

    public Employee = {
        GetAll: "Employee/GetEmployees",
        GetAllByCriteria: "Employee/GetEmployeesByCriteria",
        GetById: "Employee/GetEmployeeById",
        CreateOrUpdate: "Employee/CreateOrUpdateEmployeeDetails",
        Delete: "Employee/DeleteEmployeeById"
    };

    public Employer = {
        GetAll: "Employer/GetEmployers",
        GetAllByCriteria: "Employer/GetEmployersByCriteria",
        GetById: "Employer/GetEmployerById",
        CreateOrUpdate: "Employer/CreateOrUpdateEmployerDetails",
        Delete: "Employer/DeleteEmployerById"
    };

    public SchoolSectorJob = {
        GetAll: "SchoolSectorJob/GetSchoolSectorJobs",
        GetAllByCriteria: "SchoolSectorJob/GetSchoolSectorJobsByCriteria",
        GetById: "SchoolSectorJob/GetSchoolSectorJobById",
        CreateOrUpdate: "SchoolSectorJob/CreateOrUpdateSchoolSectorJobDetails",
        Delete: "SchoolSectorJob/DeleteSchoolSectorJobById"
    };

    public GenericVTMapping = {
        GetAll: "GenericVTMapping/GetGenericVTMappings",
        GetAllByCriteria: "GenericVTMapping/GetGenericVTMappingsByCriteria",
        GetById: "GenericVTMapping/GetGenericVTMappingById",
        CreateOrUpdate: "GenericVTMapping/CreateOrUpdateGenericVTMappingDetails",
        Delete: "GenericVTMapping/DeleteGenericVTMappingById"
    };

    public VTAcademicClassSection = {
        GetAll: "VTAcademicClassSection/GetVTAcademicClassSections",
        GetAllByCriteria: "VTAcademicClassSection/GetVTAcademicClassSectionsByCriteria",
        GetById: "VTAcademicClassSection/GetVTAcademicClassSectionById",
        CreateOrUpdate: "VTAcademicClassSection/CreateOrUpdateVTAcademicClassSectionDetails",
        Delete: "VTAcademicClassSection/DeleteVTAcademicClassSectionById"
    };

    public ForgotPasswordHistory = {
        GetAll: "ForgotPasswordHistory/GetForgotPasswordHistories",
        GetAllByCriteria: "ForgotPasswordHistory/GetForgotPasswordHistoriesByCriteria",
        GetById: "ForgotPasswordHistory/GetForgotPasswordHistoryById",
        CreateOrUpdate: "ForgotPasswordHistory/CreateOrUpdateForgotPasswordHistoryDetails",
        Delete: "ForgotPasswordHistory/DeleteForgotPasswordHistoryById"
    };

    public HeadMaster = {
        GetAll: "HeadMaster/GetHeadMasters",
        GetAllByCriteria: "HeadMaster/GetHeadMastersByCriteria",
        GetById: "HeadMaster/GetHeadMasterById",
        CreateOrUpdate: "HeadMaster/CreateOrUpdateHeadMasterDetails",
        Delete: "HeadMaster/DeleteHeadMasterById"
    };

    public HMIssueReporting = {
        GetAll: "HMIssueReporting/GetHMIssueReportings",
        GetAllByCriteria: "HMIssueReporting/GetHMIssueReportingsByCriteria",
        GetById: "HMIssueReporting/GetHMIssueReportingById",
        CreateOrUpdate: "HMIssueReporting/CreateOrUpdateHMIssueReportingDetails",
        Delete: "HMIssueReporting/DeleteHMIssueReportingById",
        Approved: "HMIssueReporting/ApprovedHMIssueReporting"
    };

    public JobRole = {
        GetAll: "JobRole/GetJobRoles",
        GetAllByCriteria: "JobRole/GetJobRolesByCriteria",
        GetById: "JobRole/GetJobRoleById",
        CreateOrUpdate: "JobRole/CreateOrUpdateJobRoleDetails",
        Delete: "JobRole/DeleteJobRoleById"
    };

    public Phase = {
        GetAll: "Phase/GetPhases",
        GetAllByCriteria: "Phase/GetPhasesByCriteria",
        GetById: "Phase/GetPhaseById",
        CreateOrUpdate: "Phase/CreateOrUpdatePhaseDetails",
        Delete: "Phase/DeletePhaseById"
    };

    public Role = {
        GetAll: "Role/GetRoles",
        GetAllByCriteria: "Role/GetRolesByCriteria",
        GetById: "Role/GetRoleById",
        CreateOrUpdate: "Role/CreateOrUpdateRoleDetails",
        Delete: "Role/DeleteRoleById"
    };

    public AccountTransaction = {
        GetAll: "AccountTransaction/GetAccountTransactions",
        GetAllAccounts: "Lighthouse/GetAllAccounts",
        GetAllByCriteria: "AccountTransaction/GetAccountTransactionsByCriteria",
        GetById: "AccountTransaction/GetAccountTransactionById",
        CreateOrUpdate: "AccountTransaction/CreateOrUpdateAccountTransactionDetails",
        Delete: "AccountTransaction/DeleteAccountTransactionById"
    };

    public RoleTransaction = {
        GetAll: "RoleTransaction/GetRoleTransactions",
        GetAllRoles: "Lighthouse/GetAllRoles",
        GetAllByCriteria: "RoleTransaction/GetRoleTransactionsByCriteria",
        GetById: "RoleTransaction/GetRoleTransactionById",
        CreateOrUpdate: "RoleTransaction/CreateOrUpdateRoleTransactionDetails",
        Delete: "RoleTransaction/DeleteRoleTransactionById"
    };

    public School = {
        GetAll: "School/GetSchools",
        GetAllByCriteria: "School/GetSchoolsByCriteria",
        GetById: "School/GetSchoolById",
        CreateOrUpdate: "School/CreateOrUpdateSchoolDetails",
        Delete: "School/DeleteSchoolById"
    };

    public SchoolVEIncharge = {
        GetAll: "SchoolVEIncharge/GetSchoolVEIncharges",
        GetAllByCriteria: "SchoolVEIncharge/GetSchoolVEInchargesByCriteria",
        GetById: "SchoolVEIncharge/GetSchoolVEInchargeById",
        CreateOrUpdate: "SchoolVEIncharge/CreateOrUpdateSchoolVEInchargeDetails",
        Delete: "SchoolVEIncharge/DeleteSchoolVEInchargeById"
    };

    public Section = {
        GetAll: "Section/GetSections",
        GetAllByCriteria: "Section/GetSectionsByCriteria",
        GetById: "Section/GetSectionById",
        CreateOrUpdate: "Section/CreateOrUpdateSectionDetails",
        Delete: "Section/DeleteSectionById"
    };

    public Sector = {
        GetAll: "Sector/GetSectors",
        GetAllByCriteria: "Sector/GetSectorsByCriteria",
        GetById: "Sector/GetSectorById",
        CreateOrUpdate: "Sector/CreateOrUpdateSectorDetails",
        Delete: "Sector/DeleteSectorById"
    };

    public SiteHeader = {
        GetAll: "SiteHeader/GetSiteHeaders",
        GetAllByCriteria: "SiteHeader/GetSiteHeadersByCriteria",
        GetById: "SiteHeader/GetSiteHeaderById",
        CreateOrUpdate: "SiteHeader/CreateOrUpdateSiteHeaderDetails",
        Delete: "SiteHeader/DeleteSiteHeaderById"
    };

    public SiteSubHeader = {
        GetAll: "SiteSubHeader/GetSiteSubHeaders",
        GetAllByCriteria: "SiteSubHeader/GetSiteSubHeadersByCriteria",
        GetById: "SiteSubHeader/GetSiteSubHeaderById",
        CreateOrUpdate: "SiteSubHeader/CreateOrUpdateSiteSubHeaderDetails",
        Delete: "SiteSubHeader/DeleteSiteSubHeaderById"
    };

    public State = {
        GetAll: "State/GetStates",
        GetAllByCriteria: "State/GetStatesByCriteria",
        GetById: "State/GetStateById",
        CreateOrUpdate: "State/CreateOrUpdateStateDetails",
        Delete: "State/DeleteStateById"
    };

    public StudentClassDetail = {
        GetAll: "StudentClassDetail/GetStudentClassDetails",
        GetAllByCriteria: "StudentClassDetail/GetStudentClassDetailsByCriteria",
        GetById: "StudentClassDetail/GetStudentClassDetailById",
        CreateOrUpdate: "StudentClassDetail/CreateOrUpdateStudentClassDetailDetails",
        Delete: "StudentClassDetail/DeleteStudentClassDetailById"
    };

    public StudentClass = {
        GetAll: "StudentClass/GetStudentClasses",
        GetAllByCriteria: "StudentClass/GetStudentClassesByCriteria",
        GetById: "StudentClass/GetStudentClassById",
        CreateOrUpdate: "StudentClass/CreateOrUpdateStudentClassDetails",
        Delete: "StudentClass/DeleteStudentClassById"
    };

    public TermsCondition = {
        GetAll: "TermsCondition/GetTermsConditions",
        GetAllByCriteria: "TermsCondition/GetTermsConditionsByCriteria",
        GetById: "TermsCondition/GetTermsConditionById",
        CreateOrUpdate: "TermsCondition/CreateOrUpdateTermsConditionDetails",
        Delete: "TermsCondition/DeleteTermsConditionById"
    };

    public ToolEquipment = {
        GetAll: "ToolEquipment/GetToolEquipments",
        GetAllByCriteria: "ToolEquipment/GetToolEquipmentsByCriteria",
        GetById: "ToolEquipment/GetToolEquipmentById",
        CreateOrUpdate: "ToolEquipment/CreateOrUpdateToolEquipmentDetails",
        Delete: "ToolEquipment/DeleteToolEquipmentById"
    };

    public Transaction = {
        GetAll: "Transaction/GetTransactions",
        GetAllByCriteria: "Transaction/GetTransactionsByCriteria",
        GetById: "Transaction/GetTransactionById",
        CreateOrUpdate: "Transaction/CreateOrUpdateTransactionDetails",
        Delete: "Transaction/DeleteTransactionById"
    };

    public UserOTPDetail = {
        GetAll: "UserOTPDetail/GetUserOTPDetails",
        GetAllByCriteria: "UserOTPDetail/GetUserOTPDetailsByCriteria",
        GetById: "UserOTPDetail/GetUserOTPDetailById",
        CreateOrUpdate: "UserOTPDetail/CreateOrUpdateUserOTPDetailDetails",
        Delete: "UserOTPDetail/DeleteUserOTPDetailById"
    };

    public VCDailyReporting = {
        GetAll: "VCDailyReporting/GetVCDailyReportings",
        GetAllByCriteria: "VCDailyReporting/GetVCDailyReportingsByCriteria",
        GetById: "VCDailyReporting/GetVCDailyReportingById",
        CreateOrUpdate: "VCDailyReporting/CreateOrUpdateVCDailyReportingDetails",
        Delete: "VCDailyReporting/DeleteVCDailyReportingById"
    };

    public DRPDailyReporting = {
        GetAll: "DRPDailyReporting/GetDRPDailyReportings",
        GetAllByCriteria: "DRPDailyReporting/GetDRPDailyReportingsByCriteria",
        GetById: "DRPDailyReporting/GetDRPDailyReportingById",
        CreateOrUpdate: "DRPDailyReporting/CreateOrUpdateDRPDailyReportingDetails",
        Delete: "DRPDailyReporting/DeleteDRPDailyReportingById"
    };

    public VCIssueReporting = {
        GetAll: "VCIssueReporting/GetVCIssueReportings",
        GetAllByCriteria: "VCIssueReporting/GetVCIssueReportingsByCriteria",
        GetById: "VCIssueReporting/GetVCIssueReportingById",
        CreateOrUpdate: "VCIssueReporting/CreateOrUpdateVCIssueReportingDetails",
        Delete: "VCIssueReporting/DeleteVCIssueReportingById",
        Approved: "VCIssueReporting/ApprovedVCIssueReporting"
    };

    public VCSchoolSector = {
        GetAll: "VCSchoolSector/GetVCSchoolSectors",
        GetAllByCriteria: "VCSchoolSector/GetVCSchoolSectorsByCriteria",
        GetById: "VCSchoolSector/GetVCSchoolSectorById",
        CreateOrUpdate: "VCSchoolSector/CreateOrUpdateVCSchoolSectorDetails",
        Delete: "VCSchoolSector/DeleteVCSchoolSectorById",
    };

    public VCSchoolVisitGeoLocation = {
        GetAll: "VCSchoolVisitGeoLocation/GetVCSchoolVisitGeoLocations",
        GetAllByCriteria: "VCSchoolVisitGeoLocation/GetVCSchoolVisitGeoLocationsByCriteria",
        GetById: "VCSchoolVisitGeoLocation/GetVCSchoolVisitGeoLocationById",
        CreateOrUpdate: "VCSchoolVisitGeoLocation/CreateOrUpdateVCSchoolVisitGeoLocationDetails",
        Delete: "VCSchoolVisitGeoLocation/DeleteVCSchoolVisitGeoLocationById"
    };

    public VCSchoolVisit = {
        GetAll: "VCSchoolVisit/GetVCSchoolVisits",
        GetAllByCriteria: "VCSchoolVisit/GetVCSchoolVisitsByCriteria",
        GetById: "VCSchoolVisit/GetVCSchoolVisitById",
        CreateOrUpdate: "VCSchoolVisit/CreateOrUpdateVCSchoolVisitDetails",
        Delete: "VCSchoolVisit/DeleteVCSchoolVisitById"
    };

    public VocationalCoordinator = {
        GetAll: "VocationalCoordinator/GetVocationalCoordinators",
        GetAllByCriteria: "VocationalCoordinator/GetVocationalCoordinatorsByCriteria",
        GetById: "VocationalCoordinator/GetVocationalCoordinatorById",
        CreateOrUpdate: "VocationalCoordinator/CreateOrUpdateVocationalCoordinatorDetails",
        Delete: "VocationalCoordinator/DeleteVocationalCoordinatorById"
    };

    public VocationalTrainer = {
        GetAll: "VocationalTrainer/GetVocationalTrainers",
        GetAllByCriteria: "VocationalTrainer/GetVocationalTrainersByCriteria",
        GetById: "VocationalTrainer/GetVocationalTrainerById",
        CreateOrUpdate: "VocationalTrainer/CreateOrUpdateVocationalTrainerDetails",
        VTTransfer: "VocationalTrainer/VTTransfer",
        GetSchoolStudentsByVTId: "VocationalTrainer/GetSchoolStudentsByVTId",
        Delete: "VocationalTrainer/DeleteVocationalTrainerById"
    };

    public VocationalTrainingProvider = {
        GetAll: "VocationalTrainingProvider/GetVocationalTrainingProviders",
        GetAllByCriteria: "VocationalTrainingProvider/GetVocationalTrainingProvidersByCriteria",
        GetById: "VocationalTrainingProvider/GetVocationalTrainingProviderById",
        CreateOrUpdate: "VocationalTrainingProvider/CreateOrUpdateVocationalTrainingProviderDetails",
        Delete: "VocationalTrainingProvider/DeleteVocationalTrainingProviderById"
    };

    public VTClass = {
        GetAll: "VTClass/GetVTClasses",
        GetAllByCriteria: "VTClass/GetVTClassesByCriteria",
        GetById: "VTClass/GetVTClassById",
        CreateOrUpdate: "VTClass/CreateOrUpdateVTClassDetails",
        Delete: "VTClass/DeleteVTClassById"
    };

    public VTDailyReporting = {
        GetAll: "VTDailyReporting/GetVTDailyReportings",
        GetAllByCriteria: "VTDailyReporting/GetVTDailyReportingsByCriteria",
        GetById: "VTDailyReporting/GetVTDailyReportingById",
        CreateOrUpdate: "VTDailyReporting/CreateOrUpdateVTDailyReportingDetails",
        Delete: "VTDailyReporting/DeleteVTDailyReportingById",
        Approved: "VTDailyReporting/ApprovedVTDailyReporting"
    };

    public VTFieldIndustryVisitConducted = {
        GetAll: "VTFieldIndustryVisitConducted/GetVTFieldIndustryVisitConducteds",
        GetAllByCriteria: "VTFieldIndustryVisitConducted/GetVTFieldIndustryVisitConductedsByCriteria",
        GetById: "VTFieldIndustryVisitConducted/GetVTFieldIndustryVisitConductedById",
        CreateOrUpdate: "VTFieldIndustryVisitConducted/CreateOrUpdateVTFieldIndustryVisitConductedDetails",
        Delete: "VTFieldIndustryVisitConducted/DeleteVTFieldIndustryVisitConductedById",
        Approved: "VTFieldIndustryVisitConducted/ApprovedVTFieldIndustry"
    };

    public VTGuestLectureConducted = {
        GetAll: "VTGuestLectureConducted/GetVTGuestLectureConducteds",
        GetAllByCriteria: "VTGuestLectureConducted/GetVTGuestLectureConductedsByCriteria",
        GetById: "VTGuestLectureConducted/GetVTGuestLectureConductedById",
        CreateOrUpdate: "VTGuestLectureConducted/CreateOrUpdateVTGuestLectureConductedDetails",
        Delete: "VTGuestLectureConducted/DeleteVTGuestLectureConductedById",
        Approved: "VTGuestLectureConducted/ApprovedVTGuestLectureConducted"
    };

    public VTIssueReporting = {
        GetAll: "VTIssueReporting/GetVTIssueReportings",
        GetAllByCriteria: "VTIssueReporting/GetVTIssueReportingsByCriteria",
        GetById: "VTIssueReporting/GetVTIssueReportingById",
        CreateOrUpdate: "VTIssueReporting/CreateOrUpdateVTIssueReportingDetails",
        Delete: "VTIssueReporting/DeleteVTIssueReportingById",
        Approved: "VTIssueReporting/ApprovedVTIssueReporting"
    };

    public VTMonthlyTeachingPlan = {
        GetAll: "VTMonthlyTeachingPlan/GetVTMonthlyTeachingPlans",
        GetAllByCriteria: "VTMonthlyTeachingPlan/GetVTMonthlyTeachingPlansByCriteria",
        GetById: "VTMonthlyTeachingPlan/GetVTMonthlyTeachingPlanById",
        CreateOrUpdate: "VTMonthlyTeachingPlan/CreateOrUpdateVTMonthlyTeachingPlanDetails",
        Delete: "VTMonthlyTeachingPlan/DeleteVTMonthlyTeachingPlanById"
    };

    public VTPMonthlyBillSubmissionStatus = {
        GetAll: "VTPMonthlyBillSubmissionStatus/GetVTPMonthlyBillSubmissionStatus",
        GetAllByCriteria: "VTPMonthlyBillSubmissionStatus/GetVTPMonthlyBillSubmissionStatusByCriteria",
        GetById: "VTPMonthlyBillSubmissionStatus/GetVTPMonthlyBillSubmissionStatusById",
        CreateOrUpdate: "VTPMonthlyBillSubmissionStatus/CreateOrUpdateVTPMonthlyBillSubmissionStatusDetails",
        Delete: "VTPMonthlyBillSubmissionStatus/DeleteVTPMonthlyBillSubmissionStatusById"
    };

    public VTPracticalAssessment = {
        GetAll: "VTPracticalAssessment/GetVTPracticalAssessments",
        GetAllByCriteria: "VTPracticalAssessment/GetVTPracticalAssessmentsByCriteria",
        GetById: "VTPracticalAssessment/GetVTPracticalAssessmentById",
        CreateOrUpdate: "VTPracticalAssessment/CreateOrUpdateVTPracticalAssessmentDetails",
        Delete: "VTPracticalAssessment/DeleteVTPracticalAssessmentById"
    };

    public VTPSector = {
        GetAll: "VTPSector/GetVTPSectors",
        GetAllByCriteria: "VTPSector/GetVTPSectorsByCriteria",
        GetById: "VTPSector/GetVTPSectorById",
        CreateOrUpdate: "VTPSector/CreateOrUpdateVTPSectorDetails",
        Delete: "VTPSector/DeleteVTPSectorById"
    };

    public VTSchoolSector = {
        GetAll: "VTSchoolSector/GetVTSchoolSectors",
        GetAllByCriteria: "VTSchoolSector/GetVTSchoolSectorsByCriteria",
        GetById: "VTSchoolSector/GetVTSchoolSectorById",
        CreateOrUpdate: "VTSchoolSector/CreateOrUpdateVTSchoolSectorDetails",
        Delete: "VTSchoolSector/DeleteVTSchoolSectorById"
    };

    public VTStatusOfInductionInserviceTraining = {
        GetAll: "VTStatusOfInductionInserviceTraining/GetVTStatusOfInductionInserviceTrainings",
        GetAllByCriteria: "VTStatusOfInductionInserviceTraining/GetVTStatusOfInductionInserviceTrainingsByCriteria",
        GetById: "VTStatusOfInductionInserviceTraining/GetVTStatusOfInductionInserviceTrainingById",
        CreateOrUpdate: "VTStatusOfInductionInserviceTraining/CreateOrUpdateVTStatusOfInductionInserviceTrainingDetails",
        Delete: "VTStatusOfInductionInserviceTraining/DeleteVTStatusOfInductionInserviceTrainingById"
    };

    public VTStudentAssessment = {
        GetAll: "VTStudentAssessment/GetVTStudentAssessments",
        GetAllByCriteria: "VTStudentAssessment/GetVTStudentAssessmentsByCriteria",
        GetById: "VTStudentAssessment/GetVTStudentAssessmentById",
        CreateOrUpdate: "VTStudentAssessment/CreateOrUpdateVTStudentAssessmentDetails",
        Delete: "VTStudentAssessment/DeleteVTStudentAssessmentById"
    };

    public VTStudentPlacementDetail = {
        GetAll: "VTStudentPlacementDetail/GetVTStudentPlacementDetails",
        GetAllByCriteria: "VTStudentPlacementDetail/GetVTStudentPlacementDetailsByCriteria",
        GetById: "VTStudentPlacementDetail/GetVTStudentPlacementDetailById",
        CreateOrUpdate: "VTStudentPlacementDetail/CreateOrUpdateVTStudentPlacementDetailDetails",
        Delete: "VTStudentPlacementDetail/DeleteVTStudentPlacementDetailById"
    };

    public VTStudentResultOtherSubject = {
        GetAll: "VTStudentResultOtherSubject/GetVTStudentResultOtherSubjects",
        GetAllByCriteria: "VTStudentResultOtherSubject/GetVTStudentResultOtherSubjectsByCriteria",
        GetById: "VTStudentResultOtherSubject/GetVTStudentResultOtherSubjectById",
        CreateOrUpdate: "VTStudentResultOtherSubject/CreateOrUpdateVTStudentResultOtherSubjectDetails",
        Delete: "VTStudentResultOtherSubject/DeleteVTStudentResultOtherSubjectById"
    };

    public VTStudentVEResult = {
        GetAll: "VTStudentVEResult/GetVTStudentVEResults",
        GetAllByCriteria: "VTStudentVEResult/GetVTStudentVEResultsByCriteria",
        GetById: "VTStudentVEResult/GetVTStudentVEResultById",
        CreateOrUpdate: "VTStudentVEResult/CreateOrUpdateVTStudentVEResultDetails",
        Delete: "VTStudentVEResult/DeleteVTStudentVEResultById"
    };

    public Report = {
        GetGuestLectureConductedReportsByCriteria: "Report/GetGuestLectureConductedReportsByCriteria",
        GetFieldIndustryVisitConductedReportsByCriteria: "Report/GetFieldIndustryVisitConductedReportsByCriteria",
        GetVTIssueReportsByCriteria: "Report/GetVTIssueReportsByCriteria",
        GetVCIssueReportsByCriteria: "Report/GetVCIssueReportsByCriteria",
        GetVCReportingAttendanceReportsByCriteria: "Report/GetVCReportingAttendanceReportsByCriteria",
        GetVCSchoolSectorReportsByCriteria: "Report/GetVCSchoolSectorReportsByCriteria",
        GetVTSchoolSectorReportsByCriteria: "Report/GetVTSchoolSectorReportsByCriteria",
        GetSchoolVTPSectorReportsByCriteria: "Report/GetSchoolVTPSectorReportsByCriteria",
        GetSchoolInformationReport: "Report/GetSchoolInformationReport",
        GetCourseMaterialStatusReport: "Report/GetCourseMaterialStatusReport",
        GetFieldAndIndustryVisitStatusReport: "Report/GetFieldAndIndustryVisitStatusReport",
        GetGuestLectureStatusReport: "Report/GetGuestLectureStatusReport",
        GetStudentAttendanceReportingReport: "Report/GetStudentAttendanceReportingReport",
        GetStudentDetailsReport: "Report/GetStudentDetailsReport",
        GetStudentEnrollmentReport: "Report/GetStudentEnrollmentReport",
        GetToolsAndEquipmentStatusReport: "Report/GetToolsAndEquipmentStatusReport",
        GetVCSchoolVisitSummaryReport: "Report/GetVCSchoolVisitSummaryReport",
        GetVocationalTrainerAttendanceReport: "Report/GetVocationalTrainerAttendanceReport",
        GetVTPBillSubmissionStatusReport: "Report/GetVTPBillSubmissionStatusReport",
        GetVTReportingAttendanceReport: "Report/GetVTReportingAttendanceReport",
        GetVTMonthlyAttendanceReport: "Report/GetVTMonthlyAttendanceReport",
        GetVCMonthlyAttendanceReport: "Report/GetVCMonthlyAttendanceReport",
        GetVTDailyAttendanceTrackingByCriteria: "Report/GetVTDailyAttendanceTrackingByCriteria",
        GetVCDailyAttendanceTrackingByCriteria: "Report/GetVCDailyAttendanceTrackingByCriteria",
        DownloadReportFile: "Lighthouse/DownloadReportFile?fileId=",
        GetVTDailyReportNotSubmittedTrackingByCriteria: "Report/GetVTDailyReportNotSubmittedTrackingByCriteria",
        GetVTStudentTrackingByCriteria: "Report/GetVTStudentTrackingByCriteria",
        GetVTCourseModuleDailyTrackingByCriteria: "Report/GetVTCourseModuleDailyTrackingByCriteria",
        GetVTStudentExitSurveyReportsByCriteria: "StudentsForExitForm/GetExitSurveyReport",
        GetVTDailyMonthlyTrackingByCriteria: "Report/GetVTDailyMonthlyTrackingByCriteria",
        GetVCDailyMonthlyTrackingByCriteria: "Report/GetVCDailyMonthlyTrackingByCriteria",
        GetVTPMonthlyTrackingByCriteria: "Report/GetVTPMonthlyTrackingByCriteria",
    };

    public SectorJobRole = {
        GetAll: "SectorJobRole/GetSectorJobRoles",
        GetAllByCriteria: "SectorJobRole/GetSectorJobRolesByCriteria",
        GetById: "SectorJobRole/GetSectorJobRoleById",
        CreateOrUpdate: "SectorJobRole/CreateOrUpdateSectorJobRoleDetails",
        Delete: "SectorJobRole/DeleteSectorJobRoleById",
    };

    public SchoolVTPSector = {
        GetAll: "SchoolVTPSector/GetSchoolVTPSectors",
        GetAllByCriteria: "SchoolVTPSector/GetSchoolVTPSectorsByCriteria",
        GetById: "SchoolVTPSector/GetSchoolVTPSectorById",
        CreateOrUpdate: "SchoolVTPSector/CreateOrUpdateSchoolVTPSectorDetails",
        Delete: "SchoolVTPSector/DeleteSchoolVTPSectorById",
    };

    public VTPSectorJobRole = {
        GetAll: "VTPSectorJobRole/GetVTPSectorJobRoles",
        GetAllByCriteria: "VTPSectorJobRole/GetVTPSectorJobRolesByCriteria",
        GetById: "VTPSectorJobRole/GetVTPSectorJobRoleById",
        CreateOrUpdate: "VTPSectorJobRole/CreateOrUpdateVTPSectorJobRoleDetails",
        Delete: "VTPSectorJobRole/DeleteVTPSectorJobRoleById",
    }

    public SchoolCategory = {
        GetAll: "SchoolCategory/GetSchoolCategories",
        GetAllByCriteria: "SchoolCategory/GetSchoolCategoriesByCriteria",
        GetById: "SchoolCategory/GetSchoolCategoryById",
        CreateOrUpdate: "SchoolCategory/CreateOrUpdateSchoolCategoryDetails",
        Delete: "SchoolCategory/DeleteSchoolCategoryById",
    }

    public SchoolClass = {
        GetAll: "SchoolClass/GetSchoolClasses",
        GetAllByCriteria: "SchoolClass/GetSchoolClassesByCriteria",
        GetById: "SchoolClass/GetSchoolClassById",
        CreateOrUpdate: "SchoolClass/CreateOrUpdateSchoolClassDetails",
        Delete: "SchoolClass/DeleteSchoolClassById",
    }

    public CourseModule = {
        GetAll: "CourseModule/GetCourseModules",
        GetAllByCriteria: "CourseModule/GetCourseModulesByCriteria",
        GetById: "CourseModule/GetCourseModuleById",
        CreateOrUpdate: "CourseModule/CreateOrUpdateCourseModuleDetails",
        Delete: "CourseModule/DeleteCourseModuleById",
    }

    public BroadcastMessages = {
        GetAll: "BroadcastMessage/GetBroadcastMessages",
        GetAllByCriteria: "BroadcastMessage/GetBroadcastMessagesByCriteria",
        GetById: "BroadcastMessage/GetBroadcastMessageById",
        CreateOrUpdate: "BroadcastMessage/CreateOrUpdateBroadcastMessageDetails",
        Delete: "BroadcastMessage/DeleteBroadcastMessageById",
    }

    public IssueApproval = {
        GetAllByCriteria: "IssueMapping/GetIssueByCriteria",
    }

    public VCSchoolVisitReport = {
        GetAll: "VCSchoolVisitReporting/GetVCSchoolVisitReporting",
        GetAllByCriteria: "VCSchoolVisitReporting/GetVCSchoolVisitReportingByCriteria",
        GetById: "VCSchoolVisitReporting/GetVCSchoolVisitReportingById",
        CreateOrUpdate: "VCSchoolVisitReporting/CreateOrUpdateVCSchoolVisitReportingDetails",
        Delete: "VCSchoolVisitReporting/DeleteVCSchoolVisitReportingById"
    }

    public ComplaintRegistration = {
        GetAll: "ComplaintRegistration/GetComplaintRegistrations",
        GetAllByCriteria: "ComplaintRegistration​/GetComplaintRegistrationsByCriteria",
        GetById: "ComplaintRegistration/GetComplaintRegistrationById",
        CreateOrUpdate: "ComplaintRegistration/CreateOrUpdateComplaintRegistrationDetails",
        Delete: "ComplaintRegistration/DeleteComplaintRegistrationById",
    }

    public VTExitSurveyDetails = {
        GetStudentsForExitForm: "StudentsForExitForm/GetStudentsForExitForm",
        GetById: "StudentsForExitForm/GetStudentsForExitFormById",
        CreateOrUpdate: "ExitSurveyDetails/CreateExitSurveyDetails",
        UploadFile: "DataUpload/UploadStudentsForExitSurvey",
        CreateOrUpdateStudentDetail: "StudentsForExitForm/CreateStudentsForExitForm",
        GetExitSurveyDetailsById: "ExitSurveyDetails/GetExitSurveyDetailsById",
        GetExitSurveyReport: "StudentsForExitForm/GetExitSurveyReport",
        UpdateExitStudentDetails: "StudentsForExitForm/UpdateStudentsForExitForm"
    }

    //Academic RollOver
    public SchoolVTPSectorForAcademicRolloverTransfer = {
        GetAll: "SchoolVTPSector/GetSchoolVTPSectors",
        GetAllByCriteria: "SchoolVTPSector/GetSchoolVTPSectorsByCriteria",
        GetById: "SchoolVTPSector/GetSchoolVTPSectorById",
        Transfer: "AcademicRollover/TransferSchoolVTPSectors",
    };

    public VCSchoolSectorForAcademicRolloverTransfer = {
        GetAll: "SchoolVTPSector/GetSchoolVTPSectors",
        GetAllByCriteria: "VCSchoolSector/GetVCSchoolSectorsByCriteria",
        GetById: "SchoolVTPSector/GetSchoolVTPSectorById",
        Transfer: "AcademicRollover/TransferVCSchoolSectors",
    };

    public VTSchoolSectorForAcademicRolloverTransfer = {
        GetAll: "SchoolVTPSector/GetSchoolVTPSectors",
        GetAllByCriteria: "VTSchoolSector/GetVTSchoolSectorsByCriteria",
        GetById: "SchoolVTPSector/GetSchoolVTPSectorById",
        Transfer: "AcademicRollover/TransferVTSchoolSectors",
    }

    public StudentForAcademicRolloverTransfer = {
        GetAll: "SchoolVTPSector/GetSchoolVTPSectors",
        GetAllByCriteria: "VTSchoolSector/GetVTSchoolSectorsByCriteria",
        GetSchoolByCriteria: "StudentClass/GetStudentClassesByCriteria",
        GetById: "SchoolVTPSector/GetSchoolVTPSectorById",
        Transfer: "AcademicRollover/TransferStudents",
        GetClassIdByCriteria: "AcademicRollover/CheckIfVTClassExists",
        GetTargetVocationalTrainers: "Lighthouse/GetTargetVocationalTrainers"
    }

    public VTClassForAcademicRolloverTransfer = {
        GetAll: "VTClass/GetVTClasses",
        GetAllByCriteria: "VTClass/GetVTClassesByCriteria",
        GetById: "VTClass/GetVTClassById",
        CreateOrUpdate: "VTClass/CreateOrUpdateVTClassDetails",
        Transfer: "AcademicRollover/TransferVTClasses",
        Delete: "VTClass/DeleteVTClassById",
    };

    public TransferVTPVTVC = {
        GetVTPSectorsByCriteria: "VTPSector/GetVTPSectorsByCriteria",
        GetSchoolVTPSectorsByCriteria: "SchoolVTPSector/GetSchoolVTPSectorsByCriteria",
        GetVCSchoolSectorsByCriteria: "VCSchoolSector/GetVCSchoolSectorsByCriteria",
        GetVocationalCoordinatorsByCriteria: "VocationalCoordinator/GetVocationalCoordinatorsByCriteria",
        GetVTSchoolSectorsByCriteria: "VTSchoolSector/GetVTSchoolSectorsByCriteria",
        GetVocationalTrainersByCriteria: "VocationalTrainer/GetVocationalTrainersByCriteria",
        GetVTClassesByCriteria: "VTClass/GetVTClassesByCriteria",
        GetStudentClassesByCriteria: "StudentClass/GetStudentClassesByCriteria",

        TransferVTP: "AcademicRollover/TransferVTP",
        TransferVT: "AcademicRollover/TransferVT",
        TransferVC: "AcademicRollover/TransferVC",
    };

    public VTPSectorForAcademicYear = {
        GetAllByCriteria: "VTPSector/GetVTPSectorsByCriteria",
        Transfer: "AcademicRollover/TransferVTPSectors"
    };

    public MessageTemplate = {
        GetAll: "MessageTemplate/GetMessageTemplates",
        GetAllByCriteria: "MessageTemplate/GetMessageTemplatesByCriteria",
        GetById: "MessageTemplate/GetMessageTemplateById",
        CreateOrUpdate: "MessageTemplate/CreateOrUpdateMessageTemplateDetails",
        Delete: "MessageTemplate/DeleteMessageTemplateById"
    };
};
