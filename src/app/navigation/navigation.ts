import { FuseNavigation } from '@fuse/types';

// Admin	Country
// Admin	State
// Admin	City
// Admin	Account
// Admin	AccountRole
// Admin	AccountTransaction  
// Admin	ChangePassword
// Admin	ForgotPasswordHistories
// Admin	UserOTPDetails
// Admin	AcademicYears
// Admin	Divisions
// Admin	JobRoles
// Admin	Phases
// Admin	SchoolCategories
// Admin	SchoolClasses
// Admin	Sections
// Admin	Sectors
// Admin	Blocks

// Masters	Schools
// Masters	HeadMasters
// Masters	VocationalTrainingProviders
// Masters	VocationalCoordinators
// Masters	VocationalTrainers
// Masters	StudentClasses
// Masters	StudentClassDetails
// Masters	SchoolVEIncharges
// Masters	SchoolVTPSectors
// Masters	VTClasses
// Masters	VTPSectors
// Masters	VTSchoolSectors
// Masters	SectorJobRoles
// Masters	VCSchoolSectors

// Settings	Services
// Settings	Role
// Settings	Transaction
// Settings	Role Transaction
// Settings	Site Headers
// Settings	Site Sub Header
// Settings	Terms & Condition
// Settings	DataTypes
// Settings	DataValues  
// Settings	ErrorLogs
// Settings	Employee

// Transactions	VCDailyReporting
// Transactions	VCIssueReporting
// Transactions	HMIssueReporting
// Transactions	VTDailyReporting
// Transactions	VTIssueReporting
// Transactions	VTPracticalAssessments
// Transactions	VTMonthlyTeachingPlans
// Transactions	VTStudentAssessments
// Transactions	VTStudentPlacementDetails
// Transactions	VTStudentResultOtherSubjects
// Transactions	VTStudentVEResults
// Transactions	VTGuestLectureConducted
// Transactions	VTFieldIndustryVisitConducted
// Transactions	VTStatusOfInductionInserviceTraining
// Transactions	VCSchoolVisits
// Transactions	VCSchoolVisitGeoLocations
// Transactions	VTPMonthlyBillSubmissionStatus
// Transactions	VTPSectorJobRoles
// Transactions	AcademicYearSchoolVTPSectorJobRoles

export const navigation: FuseNavigation[] = [];
//     {
//         id: 'dashboards',
//         title: 'Dashboards',
//         translate: 'NAV.DASHBOARDS',
//         type: 'collapsable',
//         icon: 'dashboard',
//         children: [
//             {
//                 id: 'course-material',
//                 title: 'Course Material',
//                 type: 'item',
//                 url: '/dashboards/course-material'
//             },
//             // {
//             //     id: 'course-material',
//             //     title: 'Tools and Equipment',
//             //     type: 'item',
//             //     url: '/dashboards/tools-equipment'
//             // }
//         ]
//     },

//     {
//         id: 'masters',
//         title: 'Masters',
//         translate: 'NAV.MASTERS',
//         type: 'collapsable',
//         icon: 'assignment',
//         children: [
//             {
//                 id: 'schools',
//                 title: 'Schools',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/schools',
//                 badge: {}
//             },
//             {
//                 id: 'users',
//                 title: 'Users',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/users',
//                 badge: {}
//             },
//             {
//                 id: 'head-masters',
//                 title: 'Head Masters',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/head-masters',
//                 badge: {}
//             },
//             {
//                 id: 'student-classes',
//                 title: 'Student Classes',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/student-classes',
//                 badge: {}
//             },
//             {
//                 id: 'student-class-details',
//                 title: 'Student Class Details',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/student-class-details',
//                 badge: {}
//             },
//             {
//                 id: 'academic-year-school-vtpsector-job-roles',
//                 title: 'Academic Year School VTPSector Job Roles',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/academic-year-school-vtpsector-job-roles',
//                 badge: {}
//             },
//             {
//                 id: 'vcschool-sectors',
//                 title: 'VC School Sectors',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vc-school-sectors',
//                 badge: {}
//             },
//             {
//                 id: 'vocational-coordinators',
//                 title: 'Vocational Coordinators',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vocational-coordinators',
//                 badge: {}
//             },
//             {
//                 id: 'vocational-trainers',
//                 title: 'Vocational Trainers',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vocational-trainers',
//                 badge: {}
//             },
//             {
//                 id: 'vocational-training-providers',
//                 title: 'Vocational Training Providers',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vocational-training-providers',
//                 badge: {}
//             },
//             {
//                 id: 'vtclasses',
//                 title: 'VTClasses',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-classes',
//                 badge: {}
//             },
//             {
//                 id: 'vtpsectors',
//                 title: 'VTPSectors',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vtp-sectors',
//                 badge: {}
//             },
//             {
//                 id: 'vtschool-sectors',
//                 title: 'VT School Sectors',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-school-sectors',
//                 badge: {}
//             },
//             // {
//             //     id: 'vtp-sector-job-roles',
//             //     title: 'VTP Sector Job Roles',
//             //     type: 'item',
//             //     icon: 'layers',
//             //     url: '/vtp-sector-job-roles',
//             //     badge: {}
//             // },
//             // {
//             //     id: 'academicyear-school-vtp-sector-jobroles',
//             //     title: 'AcademicYear School VTP Sector JobRoles',
//             //     type: 'item',
//             //     icon: 'layers',
//             //     url: '/academicyear-school-vtp-sector-jobroles',
//             //     badge: {}
//             // }
//         ]
//     },
    
//     // {
//     //     id: 'settings',
//     //     title: 'Settings',
//     //     translate: 'NAV.SETTINGS',
//     //     type: 'collapsable',
//     //     icon: 'dashboard',
//     //     children: [
//     //         {
//     //             id: 'site-headers',
//     //             title: 'Site Headers',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/site-headers',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'site-sub-headers',
//     //             title: 'Site Sub Headers',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/site-sub-headers',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'data-types',
//     //             title: 'Data Types',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/data-types',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'data-values',
//     //             title: 'Data Values',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/data-values',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'transactions',
//     //             title: 'Transactions',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/transactions',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'roles',
//     //             title: 'Roles',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/roles',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'role-transactions',
//     //             title: 'Role Transactions',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/role-transactions',
//     //             badge: {}
//     //         }
//     //     ]
//     // },

//     // {
//     //     id: 'admin',
//     //     title: 'Admin',
//     //     translate: 'NAV.ADMIN',
//     //     type: 'collapsable',
//     //     icon: 'assignment',
//     //     children: [
//     //         {
//     //             id: 'academic-years',
//     //             title: 'Academic Years',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/academic-years',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'sections',
//     //             title: 'Sections',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/sections',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'sectors',
//     //             title: 'Sectors',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/sectors',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'divisions',
//     //             title: 'Divisions',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/divisions',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'phases',
//     //             title: 'Phases',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/phases',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'job-roles',
//     //             title: 'Job Roles',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/job-roles',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'countries',
//     //             title: 'Countries',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/countries',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'states',
//     //             title: 'States',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/states',
//     //             badge: {}
//     //         },
//     //         {
//     //             id: 'districts',
//     //             title: 'Districts',
//     //             type: 'item',
//     //             icon: 'layers',
//     //             url: '/districts',
//     //             badge: {}
//     //         }
//     //     ]
//     // },

//     {
//         id: 'transactions',
//         title: 'Transactions',
//         translate: 'NAV.TRANSACTIONS',
//         type: 'collapsable',
//         icon: 'receipt',
//         children: [
//             {
//                 id: 'vc-daily-reportings',
//                 title: 'VC Daily Reportings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vc-daily-reportings',
//                 badge: {}
//             },
//             {
//                 id: 'vc-issue-reportings',
//                 title: 'VC Issue Reportings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vc-issue-reportings',
//                 badge: {}
//             },
//             {
//                 id: 'vt-daily-reportings',
//                 title: 'VT Daily Reportings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-daily-reportings',
//                 badge: {}
//             },
//             {
//                 id: 'vt-issue-reportings',
//                 title: 'VT Issue Reportings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-issue-reportings',
//                 badge: {}
//             },
//             {
//                 id: 'vt-guest-lecture-conducted',
//                 title: 'VT Guest Lecture Conducted',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-guest-lecture-conducted',
//                 badge: {}
//             },
//             {
//                 id: 'hm-issue-reportings',
//                 title: 'HM Issue Reportings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/hm-issue-reportings',
//                 badge: {}
//             },
//             {
//                 id: 'vt-practical-assessments',
//                 title: 'VT Practical Assessments',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-practical-assessments',
//                 badge: {}
//             },
//             {
//                 id: 'vt-monthly-teaching-plans',
//                 title: 'VT Monthly Teaching Plans',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-monthly-teaching-plans',
//                 badge: {}
//             },
//             {
//                 id: 'vt-student-assessments',
//                 title: 'VTStudent Assessments',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-student-assessments',
//                 badge: {}
//             },
//             {
//                 id: 'vt-student-placement-details',
//                 title: 'VT Student Placement Details',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-student-placement-details',
//                 badge: {}
//             },
//             {
//                 id: 'vt-student-result-other-subjects',
//                 title: 'VT Student Result Other Subjects',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-student-result-other-subjects',
//                 badge: {}
//             },
//             {
//                 id: 'vt student-ve-results',
//                 title: 'VT Student VE Results',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-student-ve-results',
//                 badge: {}
//             },
//             {
//                 id: 'vt-field-industry-visit-conducteds',
//                 title: 'VT Field Industry Visit Conducteds',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-field-industry-visit-conducteds',
//                 badge: {}
//             },
//             {
//                 id: 'vt-status-of-induction-inservice-trainings',
//                 title: 'VT Status Of Induction Inservice Trainings',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vt-status-of-induction-inservice-trainings',
//                 badge: {}
//             },
//             {
//                 id: 'vc-school-visits',
//                 title: 'VC School Visits',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vc-school-visits',
//                 badge: {}
//             },
//             {
//                 id: 'vc-school-visit-geo-locations',
//                 title: 'VC School Visit Geo Locations',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vc-school-visit-geo-locations',
//                 badge: {}
//             },
//             {
//                 id: 'vtp-monthly-bill-submission-status',
//                 title: 'VTP Monthly Bill Submission Status',
//                 type: 'item',
//                 icon: 'layers',
//                 url: '/vtp-monthly-bill-submission-status',
//                 badge: {}
//             }
//         ]
//     },
//     {
//         id: 'reports',
//         title: 'Reports',
//         translate: 'NAV.REPORTS',
//         type: 'collapsable',
//         icon: 'insert_chart_outlined',
//         children: []
//     },
// ];
