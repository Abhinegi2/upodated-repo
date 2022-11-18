import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DashboardCard, DashboardClassCard, DashboardSchoolCard, DashboardStudentCard, DashboardVTCard, SummaryDashboardModel } from './summary-dashboard.model';
import { SummaryDashboardService } from './summary-dashboard.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouteConstants } from 'app/constants/route.constant';
import { forEach } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { IssueManagementDashboardService } from '../issue-management-dashboard/issue-management-dashboard.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import html2canvas from 'html2canvas';

@Component({
    selector: 'data-list-view',
    templateUrl: './summary-dashboard.component.html',
    styleUrls: ['./summary-dashboard.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class SummaryDashboardComponent extends BaseListComponent<SummaryDashboardModel> implements OnInit {
    summaryDashboardForm: FormGroup;
    defaultElevation = 2;
    raisedElevation = 8;
    academicyearList: [DropdownModel];
    divisionList: [DropdownModel];
    districtList: DropdownModel[];
    sectorList: [DropdownModel];
    jobRoleList: DropdownModel[];
    vtpList: [DropdownModel];
    classList: [DropdownModel];
    monthList: [DropdownModel];
    blockList: [DropdownModel];
    schoolCount: any;
    sectorCount: any;
    vtCount: any;
    vtpCount: any;
    schoolManagementList: any;
    jobRoleCount: any;
    classCount: any;
    studentCount: any;
    schoolChart: any;
    schoolAttendanceChart: any;
    schoolChartCount: any;
    schoolAttendanceChartCount: any;
    fieldVisitChartCount: any;
    guestLectureChartCount: any;
    vtAttendanceChartCount: any;
    vcAttendanceChartCount: any;
    guestLectureChart: any;
    courseMaterialsCount: any;
    courseMaterialsChart: any;
    toolsAndEquipmentCount: any;
    toolsAndEquipmentChart: any;
    fieldStatusCount: any;
    fieldStatusChart: any;
    vtVcAttendanceChart: any;
    vtAttendanceCount: any;
    vcAttendanceCount: any;
    vtAttendanceChart: any;
    vcAttendanceChart: any;
    currentAcademicYearId: any;

    //Export Drilldown data
    schoolChartData: any;
    classChartData: any;
    vocationalTrainerChartData: any;
    studentChartData: any;
    courseMaterialStatusChartData: any;
    toolsAndEquipmentsChartData: any;
    guestLectureChartData: any;
    schoolAttendanceChartData: any;
    fieldVisitChartData: any;
    vtAttendanceChartData: any;

    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    timeline: boolean = true;
    isShowGallery: boolean = false;

    isDrillDownOpen: boolean = false;
    activeDrillDownGraph: string;

    schoolCard: DashboardSchoolCard;
    sectorCard: DashboardCard;
    jobRoleCard: DashboardCard;
    vtpCard: DashboardCard;
    vtCard: DashboardVTCard;
    classCard: DashboardClassCard;
    studentCard: DashboardStudentCard;

    @ViewChild('districtMatSelect') districtSelections: MatSelect;

    schoolVisits: any = {
        Id: 0,
        ReportMonth: "",
        TotalVC: 0,
        PlacedVC: 0,
        TotalSchools: 0,
        SchoolVisits: 0,
        NoOfVisitedSchools: 0,
        AvgVisitsPerCordinatorPerMonth: 0.0
    };

    dataSourceIssueManagement: MatTableDataSource<Element>;
    displayedIssueManagementColumns: string[];
    name = 'Angular';


    pieView: any[] = [180, 120];
    view: any[] = [220, 200];
    colorScheme = {
        domain: ['#24b449d4', '#e82e25d4', '#32cfc0d4']
    };

    studentAttendanceChkList = [{ name: 'BOYS', value: 'Boys', checked: true }, { name: 'GIRLS', value: 'Girls', checked: true }];
    studentAttendanceColorScheme = {
        domain: ['#e82e25d4', '#32cfc0d4']
    };

    schoolColor = { domain: ['#1f76b4'] };
    schoolVisitStatusColorScheme = { domain: ['#1f77b4'] };
    schoolvisitChkList = ['Schools Visited', 'Schools Not Visited'];
    schoolVisitStatusByMonthColorScheme = { domain: ['#29ded8', '#ff0043'] };

    chartColor = {
        domain: ['#0e88f0de', '#f46a19e8']
    };

    vtvcChartColor = {
        domain: ['#f46a19e8']
    };

    // vtChkList = ['REPORTING VT', 'NON REPORTING VT'];
    vtChkList = [{ name: 'REPORTING VT', value: 'ReportedVT', checked: true }];
    // vtChkList = [{ name: 'REPORTING VT', value: 'ReportedVT', checked:true },{ name: 'NON REPORTING VT', value: 'NonReportedVT', checked:true }];
    VTColorScheme = {
        domain: ['#29ded8']
        //domain: ['#29ded8', '#ff0043']
    }

    jobRoleChkList = ['Total'];
    JobRoleColorScheme = {
        domain: ['#00ca64']
    }

    classChkList = [{ name: 'CLASS9', value: 'Class9', checked: true }, { name: 'CLASS10', value: 'Class10', checked: true }, { name: 'CLASS11', value: 'Class11', checked: true }, { name: 'CLASS12', value: 'Class12', checked: true }];
    classColorScheme = {
        domain: ['#5c93c4', '#fd9c58', '#5cb562', '#df5554']
    }

    studentChkList = [{ name: 'Boys', checked: true }, { name: 'Girls', checked: true }];
    studentColorScheme = {
        domain: ['#1f77b4', '#ff7f0e']
    }


    courseMaterialStatusChkList = [{ name: 'Received', checked: true }, { name: 'Not Received', checked: true }, { name: 'Not Reported', checked: true }]
    courseMaterialStatusColorScheme = {
        domain: ['#00ca64', '#ff0043', '#29ded8']
    }
    studentAttendance: any = [];

    //for detailed graph
    xAxisDrillDownFilter: string = 'ByVTP';

    viewGraph: any[] = [500, 400];
    viewGraphStudent: any[] = [500, 400];
    graphArray: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByClass', FilterName: 'Classes' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    studentAttendenceXAxis: any[] = [{ FilterBy: 'ByTimeline', FilterName: 'Timeline' }, { FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByClass', FilterName: 'Classes' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    fieldVisitXAxis: any[] = [];
    fieldVisitStatusXAxis: any[] = [{ FilterBy: 'ByTimeline', FilterName: 'Timeline' }, { FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];
    noOfFieldVisitXAxis: any[] = [{ FilterBy: 'ByTimelineForFV', FilterName: 'Timeline' }];

    fieldVisitType = 'FVStatus';
    fieldVisitColorScheme = { domain: ['#1f77b4'] };
    noOfFieldVisitChkList = [{ name: 'FVClass1', value: 'CLASSES WITH 1 FV', checked: true }, { name: 'FVClass2', value: 'CLASSES WITH 2 FV', checked: true }, { name: 'FVClass3', value: 'CLASSES WITH 3 FV', checked: true }];
    noOfFieldVisitColorScheme = { domain: ['#4ecfff', '#7400ae', '#00ca64'] };

    guestLectureXAxis: any[] = [];
    guestLectureStatusXAxis: any[] = [{ FilterBy: 'ByTimeline', FilterName: 'Timeline' }, { FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];
    noOfGuestLectureXAxis: any[] = [{ FilterBy: 'ByTimelineForGL', FilterName: 'Timeline' }];

    guestLectureType = 'GLStatus';
    guestLectureColorScheme = { domain: ['#59d9d8'] };

    noOfGuestLectureChkList = [{ name: 'GLClass1', value: 'CLASSES WITH 1 GL', checked: true }, { name: 'GLClass2', value: 'CLASSES WITH 2 GL', checked: true }, { name: 'GLClass3', value: 'CLASSES WITH 3 GL', checked: true }];
    noOfGuestLectureColorScheme = { domain: ['#57bc68', '#6549ac', '#5ed3fc'] };

    vocationalTrainersXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    jobRoleUnitsXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    studentXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByClass', FilterName: 'Classes' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    classesXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    courseMaterialStatusXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByClass', FilterName: 'Classes' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    toolsAndEquipmentsXAxis: any[] = [{ FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }, { FilterBy: 'BySchoolManagement', FilterName: 'School Management' }];

    vtAttendanceXAxis: any[] = [{ FilterBy: 'ByMonth', FilterName: 'Timeline' }, { FilterBy: 'ByDivision', FilterName: 'Geography' }, { FilterBy: 'BySector', FilterName: 'Sector' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }];

    vtAttendance: boolean;
    vcAttendance: boolean;
    vcAttendanceXAxis: any[] = [{ FilterBy: 'ByMonth', FilterName: 'Timeline' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }];

    schoolVisitStatusXAxis: any[] = [{ FilterBy: 'ByMonth', FilterName: 'Timeline' }, { FilterBy: 'ByVTP', FilterName: 'VTP' }];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabelGraph = false;
    xAxisLabel = 'Country';
    showYAxisLabelGraph = false;
    yAxisLabel = 'Sales';
    timelineGraph = true;

    colorSchemeGraph = {
        domain: ['#87CEFA', '#f21313', '#00CA64', '#FF7F50', '#90EE90', '#9370DB']
    };

    showLabelsGraph = true;

    multi = [];
    BUMulti = [];
    chkList = [];
    vocationalTrainerChartCount: any;
    vocationalTrainerChart: any;
    jobRoleChartCount: any;
    jobRoleChart: any;
    studentChartCount: any;
    studentChart: any[];
    classChart: any;
    classChartCount: any;
    classBUMulti: any;
    studentBUMulti: any;
    vtBUMulti: any;
    schoolVisitStatusChart: any;
    schoolVisitStatusChartCount: any;
    schoolVisitBUMulti: any;
    courseMaterialStatusChartCount: any;
    courseMaterialStatusChart: any[];
    courseMaterialStatusBUMulti: any;
    toolsAndEquipmentsChart: any;
    toolsAndEquipmentsChartCount: any;
    toolsAndEquipmentsBUMulti: any;
    schoolAttendanceBUMulti: any;

    constructor(public commonService: CommonService,
        public router: Router,
        public routeParams: ActivatedRoute,
        public snackBar: MatSnackBar,
        public zone: NgZone,
        public formBuilder: FormBuilder,
        private summaryDashboardService: SummaryDashboardService,
        private issueManagementService: IssueManagementDashboardService) {
        super(commonService, router, routeParams, snackBar, zone);

        // this.viewGraph = [innerWidth / 1.3, 400];
        this.dataSourceIssueManagement = new MatTableDataSource<Element>();

        this.schoolCard = new DashboardSchoolCard();
        this.sectorCard = new DashboardCard();
        this.jobRoleCard = new DashboardCard();
        this.vtpCard = new DashboardCard();
        this.vtCard = new DashboardVTCard();
        this.classCard = new DashboardClassCard();
        this.studentCard = new DashboardStudentCard();
    }

    ngOnInit(): void {
        this.setDefaultCardStates();

        this.summaryDashboardService.GetDropdownForReports(this.UserModel).subscribe(results => {
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

            let currentYearItem = this.academicyearList.find(ay => ay.IsSelected == true)
            if (currentYearItem != null) {
                this.currentAcademicYearId = currentYearItem.Id;

                this.resetDashboardFilters();
            }
        });

        this.summaryDashboardForm = this.createSummaryDashboardForm();
    }

    resetDashboardFilters(): void {
        this.summaryDashboardForm.reset();
        this.summaryDashboardForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
        this.districtList = <DropdownModel[]>[];
        this.jobRoleList = <DropdownModel[]>[];

        if (this.UserModel.RoleCode === 'DivEO') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

            this.onChangeDivision(this.UserModel.DivisionId).then(response => {
                this.getSummaryDashboards();
            });
        }
        else if (this.Constants.UserRoleIds.indexOf(this.UserModel.RoleCode) > 0) {
            this.summaryDashboardForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

            this.onChangeDivision(this.UserModel.DivisionId).then(response => {
                let districtIds = [];
                response.forEach(districtItem => {
                    districtIds.push(districtItem.Id);
                });

                this.summaryDashboardForm.controls["DistrictId"].setValue(districtIds);

                this.getSummaryDashboards();
            });
        }
        else {
            this.getSummaryDashboards();
        }
    }

    onChangeDivision(divisionId: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {

            this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.UserModel.UserTypeId, ParentId: divisionId, SelectTitle: 'District' }, false)
                .subscribe((response: any) => {
                    this.districtList = response.Results;
                    this.summaryDashboardForm.controls['DistrictId'].setValue(null);

                    resolve(response.Results);
                }, err => {
                    reject(err);
                });
        });

        return promise;
    }

    onChangeSector(sectorId: string): void {
        this.commonService.GetMasterDataByType({ DataType: 'JobRoles', ParentId: sectorId, SelectTitle: 'Job Role' }).subscribe((response: any) => {
            this.jobRoleList = response.Results;
            this.summaryDashboardForm.controls["JobRoleId"].setValue(null);
        });
    }

    toggleDistrictSelections(evt) {
        //To control select-unselect all
        let isAllSelected = (evt.currentTarget.classList.toString().indexOf('mat-active') > 0)

        if (isAllSelected) {
            this.districtSelections.options.forEach((item: MatOption) => item.select());
            this.districtSelections.options.first.deselect();
        } else {
            this.districtSelections.options.forEach((item: MatOption) => { item.deselect() });
        }
        setTimeout(() => { this.districtSelections.close(); }, 200);
    }

    //Create SummaryDashboard form and returns {FormGroup}
    createSummaryDashboardForm(): FormGroup {
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

    refreshSummaryDashboard() {
        this.router.navigate([RouteConstants.SummaryDashboard.Dashboard]);
    }

    getDashboardParams(): any {
        var dashboardParams = {
            DataType: 'ByCount',
            UserId: this.UserModel.LoginId,
            ParentId: this.UserModel.UserTypeId,
            AcademicYearId: this.summaryDashboardForm.get('AcademicYearId').value,
            MonthId: this.summaryDashboardForm.get('MonthId').value,
            DivisionId: this.summaryDashboardForm.get('DivisionId').value,
            DistrictCode: this.summaryDashboardForm.get('DistrictId').value,
            SectorId: this.summaryDashboardForm.get('SectorId').value,
            JobRoleId: this.summaryDashboardForm.get('JobRoleId').value,
            ClassId: this.summaryDashboardForm.get('ClassId').value,
            VTPId: this.summaryDashboardForm.get('VTPId').value,
            SchoolManagementId: this.summaryDashboardForm.get('SchoolManagementId').value
        };

        dashboardParams.DistrictCode = (dashboardParams.DistrictCode != null && dashboardParams.DistrictCode.length > 0) ? dashboardParams.DistrictCode.toString() : null;

        return dashboardParams;
    }

    getSummaryDashboards(): void {
        if (!this.summaryDashboardForm.valid) {
            return;
        }

        if (this.isDrillDownOpen == false) {
            this.activeDrillDownGraph = '';
        }

        var dashboardParams = this.getDashboardParams();

        dashboardParams.DataType = 'ByCount';
        this.summaryDashboardService.GetDashboardSchoolChartData(dashboardParams).subscribe(response => {
            if (response.Results.length == 1) {
                this.schoolCard = response.Results[0];
            }
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'SectorsByUserId';
        this.summaryDashboardService.GetDashboardCardData(dashboardParams).subscribe(response => {
            this.sectorCard = response.Result;
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'JobRolesByUserId';
        this.summaryDashboardService.GetDashboardCardData(dashboardParams).subscribe(response => {
            this.jobRoleCard = response.Result;
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'VocationalTrainingProvidersByUserId';
        this.summaryDashboardService.GetDashboardCardData(dashboardParams).subscribe(response => {
            this.vtpCard = response.Result;
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'ByCount';
        this.summaryDashboardService.GetDashboardVocationalTrainersCardData(dashboardParams).subscribe(response => {
            if (response.Results.length == 1) {
                this.vtCard = response.Results[0];
            }
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'ByCount';
        this.summaryDashboardService.GetDashboardClassesCardData(dashboardParams).subscribe(response => {
            if (response.Results.length == 1) {
                this.classCard = response.Results[0];
            }
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        dashboardParams.DataType = 'ByCount';
        this.summaryDashboardService.GetDashboardStudentsCardData(dashboardParams).subscribe(response => {
            this.studentCard = response.Results[0];
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

        //API calling for front page graphs
        if (this.isDrillDownOpen == false) {
            //Course Materials Pie Chart
            this.onChangeCourseMaterialStatusXaxis(null, 'ByCount');

            //Tools And Equipments Pie Chart
            this.onChangeToolsAndEquipmentsXaxis(null, 'ByCount');

            //GuestLectureStatus Chart
            this.onChangeGuestLectureXaxis(null, 'ByTimeline');

            //FieldVisitStatus Chart
            this.onChangeFieldVisitXaxis(null, 'ByTimeline');

            //VT Attendance Chart
            // dashboardParams.DataType = 'ByMonth';
            this.summaryDashboardService.GetVCAndVTAttendanceReports(dashboardParams).subscribe(response => {
                this.vtAttendanceCount = response[0].Results;
                this.vcAttendanceCount = response[1].Results;

                this.xAxisDrillDownFilter = "ByMonth";
                this.vtAttendance = true;

                if (this.vtAttendanceCount.length > 0) {
                    this.vtAttendanceChart = [
                        {
                            "name": "VT Attendance",
                            "series": this.vtAttendanceCount.map(vtAttendance => ({ name: vtAttendance.Name, value: vtAttendance.Percentage }))
                        }
                    ];
                }
                else {
                    //this.vtAttendanceCount = JSON.parse('[{"name":"VT Attendance", "value":0, "series":[{"name":"", "value":0}]}]');
                }

                if (this.vcAttendanceCount.length > 0) {
                    this.vcAttendanceChart = [
                        {
                            "name": "VC Attendance",
                            "series": this.vcAttendanceCount.map(vcAttendance => ({ name: vcAttendance.Name, value: vcAttendance.Percentage }))
                        }];
                }
                else {
                    //this.vcAttendanceCount = JSON.parse('[{"name":"VC Attendance", "value":0, "series":[{"name":"", "value":0}]}]');
                }

                if (this.vtAttendanceCount.length == 0 && this.vcAttendanceCount.length > 0) {
                    this.vtAttendanceChart = [
                        {
                            "name": "VT Attendance",
                            "series": this.vcAttendanceCount.map(vcAttendance => ({ name: vcAttendance.Name, value: 0 }))
                        }
                    ];
                }

                if (this.vtAttendanceCount.length > 0 && this.vcAttendanceCount.length == 0) {
                    this.vcAttendanceChart = [
                        {
                            "name": "VC Attendance",
                            "series": this.vtAttendanceCount.map(vtAttendance => ({ name: vtAttendance.Name, value: 0 }))
                        }
                    ];
                }

                // if (this.vtAttendanceChart.length > 0 && this.vcAttendanceChart.length > 0)
                if (this.vtAttendanceChart.length > 0) {
                    this.vtVcAttendanceChart = [
                        // {
                        //     "name": "VC Attendance",
                        //     "series": this.vcAttendanceCount.map(vcAttendance => ({ name: vcAttendance.Name, value: vcAttendance.Percentage }))
                        // },
                        {
                            "name": "VT Attendance",
                            "series": this.vtAttendanceCount.map(vtAttendance => ({ name: vtAttendance.Name, value: vtAttendance.Percentage }))
                        }
                    ];
                }
                else {
                    this.vtVcAttendanceChart = [];
                }

                this.IsLoading = false;
            }, error => {
                console.log(error);
            });

            //this.onChangeVtAttendanceXaxis(null, 'ByMonth');
            //this.onChangeVcAttendanceXaxis(null, 'ByMonth');

            //StudentAttendance Chart
            this.onChangeStudentAttendanceXaxis(null, 'ByTimeline');

            //SchoolVisit Chart
            dashboardParams.DataType = 'ByCount';
            this.summaryDashboardService.GetDashboardSchoolVisitStatusChartData(dashboardParams).subscribe(response => {
                if (response.Result != null) {
                    this.schoolVisits = response.Result
                }
                this.IsLoading = false;
            }, error => {
                console.log(error);
            });

            //IssueManagementStatus Chart
            dashboardParams.DataType = 'ByTotalIssues';
            this.issueManagementService.GetDashboardIssueManagementChartData(dashboardParams).subscribe(response => {

                this.displayedIssueManagementColumns = ['Name', 'High', 'Medium', 'Low'];
                this.dataSourceIssueManagement.data = response.Results;

                this.IsLoading = false;
            }, error => {
                console.log(error);
            });
        }
        else {
            if (this.activeDrillDownGraph == "SchoolCardInfo")
                this.onChangeSchoolChartXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "VTCardInfo")
                this.onChangeVTChartXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "ClassCardInfo")
                this.onChangeClassesXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "StudentCardInfo")
                this.onChangeStudentXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "CourseMaterialStatusCardInfo")
                this.onChangeCourseMaterialStatusXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "ToolsAndEquipmentCardInfo")
                this.onChangeToolsAndEquipmentsXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "SchoolVisitStatusCardInfo")
                this.onChangeschoolVisitStatusXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "GuestLectureCardInfo")
                this.onChangeGuestLectureXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "FieldVisitCardInfo")
                this.onChangeFieldVisitXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "VTVCAttendanceCardInfo")
                this.onChangeVtAttendanceXaxis(null, this.xAxisDrillDownFilter);
            if (this.activeDrillDownGraph == "StudentAttendanceCardInfo")
                this.onChangeStudentAttendanceXaxis(null, this.xAxisDrillDownFilter);
        }
    }

    //detailed graph
    onCheck(name, e) {
        let temp = JSON.parse(JSON.stringify(this.BUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.multi));
        this.multi = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                    }
                }
            }
        }
        this.multi = temp2;
    }
    //school card detailed graph
    onChangeSchoolChartXaxis(event, filterBy) {
        this.schoolChart = JSON.parse('[{"name":"School Name", "value":0}]');
        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardSchoolChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }
            this.schoolChartData = response.Results
            this.schoolChartCount = response.Results.length;

            response.Results.forEach(schoolItem => {
                schoolItem.Count = (schoolItem.Count == null) ? 0 : schoolItem.Count;
            });

            if (this.schoolChartCount > 0) {
                this.schoolChart = response.Results.map(school => ({ name: school.Name, value: school.Count }));
            }

            this.IsLoading = false;
        }, error => {
            console.log(error);
        });
    }
    onSelectSchool(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {
            let divisionItem = this.divisionList.find(d => d.Name == evt.name);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeSchoolChartXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }
    //end school card detailed graph

    //vocational trainer card detailed graph
    onChangeVTChartXaxis(event, filterBy) {
        this.vtChkList.forEach(val => { val.checked = true });
        this.vocationalTrainerChart = JSON.parse('[{"name":"VT Name", "value":0}]');

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardVocationalTrainersCardData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }
            this.vocationalTrainerChartData = response.Results
            this.vocationalTrainerChartCount = response.Results.length;

            response.Results.forEach(vtItem => {
                vtItem.ReportedVT = (vtItem.ReportedVT == null) ? 0 : vtItem.ReportedVT;
            });

            if (this.vocationalTrainerChartCount > 0) {
                this.vocationalTrainerChart = response.Results.map(vocationalTrainer => ({ name: vocationalTrainer.Name, value: vocationalTrainer.ReportedVT }));
            }
            this.vtBUMulti = JSON.parse(JSON.stringify(this.vocationalTrainerChart));
            this.IsLoading = false;
        }, error => {
            console.log(error);
        });

    }
    onSelectVocationalTrainer(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.name);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeVTChartXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }
    onCheckVocationalTrainerView(name, e) {

        let temp = JSON.parse(JSON.stringify(this.vtBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.vocationalTrainerChart));
        this.vocationalTrainerChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {

                temp2[i].name = temp[i].name;
                temp2[i].value = temp[i].value;

            }
        }
        else {
            for (const iterator of temp2) {
                iterator.value = 0;
            }
        }
        this.vocationalTrainerChart = temp2;

    }
    //end vocational trainer card detailed graph

    //job role unit card detailed graph
    onChangeJobRoleChartXaxis(event, filterBy) {
        this.jobRoleChart = JSON.parse('[{"name":"JobRoleName", "value":0}]');
        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardJobRoleUnitsCardData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }
            this.jobRoleChartCount = response.Results.length;

            response.Results.forEach(jobRoleItem => {
                jobRoleItem.JobRoleUnits = (jobRoleItem.JobRoleUnits == null) ? 0 : jobRoleItem.JobRoleUnits;
            });

            if (this.jobRoleChartCount > 0) {
                this.jobRoleChart = response.Results.map(jobRoleUnit => ({ name: jobRoleUnit.Name, value: jobRoleUnit.JobRoleUnits }))
            }

            this.IsLoading = false;
        }, error => {
            console.log(error);
        });
    }

    onSelectJobRoleUnit(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.name);

            if (divisionItem != null) {
                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeJobRoleChartXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }
    //end job role unit card detailed graph

    //Start: Classes card detailed graph
    onChangeClassesXaxis(event, filterBy) {
        this.classChkList.forEach(val => { val.checked = true });
        this.classChart = JSON.parse('[{"name":"", "value":0, "series":[{"name":"Class9", "value":0},{"name":"Class10", "value":0},{"name":"Class11", "value":0},{"name":"Class12", "value":0}]}]');

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardClassesCardData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.classChartData = response.Results
            this.classChartCount = response.Results.length;

            response.Results.forEach(classItem => {
                classItem.Class9 = (classItem.Class9 == null) ? 0 : classItem.Class9;
                classItem.Class10 = (classItem.Class10 == null) ? 0 : classItem.Class10;
                classItem.Class11 = (classItem.Class11 == null) ? 0 : classItem.Class11;
                classItem.Class12 = (classItem.Class12 == null) ? 0 : classItem.Class12;
            });

            if (this.classChartCount > 0) {
                this.classChart = [];
                response.Results.forEach(classItem => {
                    this.classChart.push({
                        "name": classItem.Name,
                        "series": [{ "name": "Class9", "value": classItem.Class9 }, { "name": "Class10", "value": classItem.Class10 }, { "name": "Class11", "value": classItem.Class11 }, { "name": "Class12", "value": classItem.Class12 }]
                    }
                    );
                });
            }
            this.classBUMulti = JSON.parse(JSON.stringify(this.classChart));

        }, err => {
            console.log(err);
        });
    }

    onSelectClass(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.series);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeClassesXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.series);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onCheckClassView(name, e) {
        let temp = JSON.parse(JSON.stringify(this.classBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.classChart));
        this.classChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].name = temp[i].name;
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                        //iterator2.name = null;
                    }
                }
            }
        }
        this.classChart = temp2;

    }
    //End Classes card detailed graph

    //Start: Student card detailed graph
    onChangeStudentXaxis(event, filterBy) {
        this.studentChkList.forEach(val => { val.checked = true });
        this.studentChart = JSON.parse('[{"name":"Boy", "value":0, "series":[{"name":"", "value":0}]},{"name":"Girl", "value":0, "series":[{"name":"", "value":0}]}]');

        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardStudentsCardData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.studentChartData = response.Results;
            this.studentChartCount = response.Results.length;

            response.Results.forEach(studentItem => {
                studentItem.Boys = (studentItem.Boys == null) ? 0 : studentItem.Boys;
                studentItem.Girls = (studentItem.Girls == null) ? 0 : studentItem.Girls;
            });

            if (this.studentChartCount > 0) {
                this.studentChart = [];
                response.Results.forEach(studentItem => {
                    this.studentChart.push({
                        "name": studentItem.Name,
                        "series": [{ "name": "Boys", "value": studentItem.Boys }, { "name": "Girls", "value": studentItem.Girls }]
                    }
                    );
                });
            }
            this.studentBUMulti = JSON.parse(JSON.stringify(this.studentChart));

        }, err => {
            console.log(err);
        });
    }

    onSelectStudent(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.series);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeStudentXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.series);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onCheckStudentView(name, e) {
        let temp = JSON.parse(JSON.stringify(this.studentBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.studentChart));
        this.studentChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].name = temp[i].name;
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                        //iterator2.name = null;
                    }
                }
            }
        }
        this.studentChart = temp2;

    }
    //End Student card detailed graph

    //Start: Course Material Status card detailed graph
    onChangeCourseMaterialStatusXaxis(event, filterBy) {
        this.courseMaterialStatusChkList.forEach(val => { val.checked = true });
        this.courseMaterialStatusChart = JSON.parse('[{"name":"Course Materials", "value":0, "series":[{"name":"Received", "value":0}, {"name":"Not Received", "value":0}, {"name":"Not Reported", "value":0}]}]');
        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardCourseMaterialChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.courseMaterialStatusChartData = response.Results
            this.courseMaterialStatusChartCount = response.Results.length;

            response.Results.forEach(cmItem => {
                cmItem.ReportedNotReceived = (cmItem.ReportedNotReceived == null) ? 0 : cmItem.ReportedNotReceived;
                cmItem.NotReported = (cmItem.NotReported == null) ? 0 : cmItem.NotReported;
                cmItem.ReportedReceived = (cmItem.ReportedReceived == null) ? 0 : cmItem.ReportedReceived;
            });

            if (this.courseMaterialStatusChartCount > 0) {
                this.courseMaterialStatusChart = [];

                if (filterBy == 'ByCount') {
                    let courseMaterial = response.Results[0];
                    this.courseMaterialStatusChart = [{ "name": "Received", "value": courseMaterial.ReportedReceived }, { "name": "Not Received", "value": courseMaterial.ReportedNotReceived }, { "name": "Not Reported", "value": courseMaterial.NotReported }]
                }
                else {
                    response.Results.forEach(courseMaterialStatusItem => {
                        this.courseMaterialStatusChart.push({
                            "name": courseMaterialStatusItem.Name,
                            "series": [{ "name": "Received", "value": courseMaterialStatusItem.ReportedReceived }, { "name": "Not Received", "value": courseMaterialStatusItem.ReportedNotReceived }, { "name": "Not Reported", "value": courseMaterialStatusItem.NotReported }]
                        }
                        );
                    });
                }
            }
            this.courseMaterialStatusBUMulti = JSON.parse(JSON.stringify(this.courseMaterialStatusChart));

        }, err => {
            console.log(err);
        });
    }

    onSelectCourseMaterial(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.series);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeCourseMaterialStatusXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.series);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onCheckCourseMaterialStatusView(name, e) {
        let temp = JSON.parse(JSON.stringify(this.courseMaterialStatusBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.courseMaterialStatusChart));
        this.courseMaterialStatusChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].name = temp[i].name;
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                        //iterator2.name = null;
                    }
                }
            }
        }
        this.courseMaterialStatusChart = temp2;

    }
    //End Course Material Status card detailed graph

    //Start: Tools And Equipments card detailed graph
    onChangeToolsAndEquipmentsXaxis(event, filterBy) {
        this.courseMaterialStatusChkList.forEach(val => { val.checked = true });
        this.toolsAndEquipmentsChart = JSON.parse('[{"name":"Tools And Equipment", "value":0, "series":[{"name":"Received", "value":0}, {"name":"Not Received", "value":0}, {"name":"Not Reported", "value":0}]}]');

        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardToolsAndEquipmentChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.toolsAndEquipmentsChartData = response.Results
            this.toolsAndEquipmentsChartCount = response.Results.length;

            response.Results.forEach(teItem => {
                teItem.ReportedNotReceived = (teItem.ReportedNotReceived == null) ? 0 : teItem.ReportedNotReceived;
                teItem.NotReported = (teItem.NotReported == null) ? 0 : teItem.NotReported;
                teItem.ReportedReceived = (teItem.ReportedReceived == null) ? 0 : teItem.ReportedReceived;
            });

            if (this.toolsAndEquipmentsChartCount > 0) {
                this.toolsAndEquipmentsChart = [];

                if (filterBy == 'ByCount') {
                    let toolsAndEquipment = response.Results[0];
                    this.toolsAndEquipmentsChart = [{ "name": "Received", "value": toolsAndEquipment.ReportedReceived }, { "name": "Not Received", "value": toolsAndEquipment.ReportedNotReceived }, { "name": "Not Reported", "value": toolsAndEquipment.NotReported }]
                }
                else {
                    response.Results.forEach(toolsAndEquipmentItem => {
                        this.toolsAndEquipmentsChart.push({
                            "name": toolsAndEquipmentItem.Name,
                            "series": [{ "name": "Received", "value": toolsAndEquipmentItem.ReportedReceived }, { "name": "Not Received", "value": toolsAndEquipmentItem.ReportedNotReceived }, { "name": "Not Reported", "value": toolsAndEquipmentItem.NotReported }]
                        }
                        );
                    });
                }
            }

            this.toolsAndEquipmentsBUMulti = JSON.parse(JSON.stringify(this.toolsAndEquipmentsChart));

        }, err => {
            console.log(err);
        });
    }

    onSelectToolsAndEquipments(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.series);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeToolsAndEquipmentsXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.series);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onCheckToolsAndEquipmentsView(name, e) {
        let temp = JSON.parse(JSON.stringify(this.toolsAndEquipmentsBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.toolsAndEquipmentsChart));
        this.toolsAndEquipmentsChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].name = temp[i].name;
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                        //iterator2.name = null;
                    }
                }
            }
        }
        this.toolsAndEquipmentsChart = temp2;

    }
    //End Course Material Status card detailed graph

    onCompareDashboardClick() {
        this.router.navigateByUrl('/compare-dashboard');
    }

    onIssueManagementDashboardClick() {
        this.router.navigateByUrl('/issue-management-dashboard');
    }

    //Start: Guest Lecture Status detailed graph
    onChangeGuestLectureXaxis(event, filterBy) {
        this.noOfGuestLectureChkList.forEach(val => { val.checked = true });
        this.guestLectureXAxis = this.guestLectureStatusXAxis;
        this.guestLectureChart = JSON.parse('[{"name":"Guest Lecture", "value":0, "series":[{"name":"", "value":0}]}]');

        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardGuestLectureChartData(dashboardParams).subscribe(response => {

            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.guestLectureChartData = response.Results
            this.guestLectureChartCount = response.Results.length;
            response.Results.forEach(glItem => {
                glItem.Percentage = (glItem.Percentage == null) ? 0 : glItem.Percentage;
            });

            if (this.guestLectureChartCount > 0) {
                if (filterBy == 'ByTimeline') {
                    this.guestLectureChart = [
                        {
                            "name": "Guest Lecture",
                            "value": 0,
                            "series": response.Results.map(guestLecture => ({ name: guestLecture.Name, value: guestLecture.Percentage }))
                        }];
                }
                else {
                    this.guestLectureChart = response.Results.map(guestLecture => ({ name: guestLecture.Name, value: guestLecture.Percentage }));
                }
            }

            this.IsLoading = false;

        }, err => {
            console.log();

        });

    }

    onChangeNoOfGuestLectureXaxis(event, filterBy) {
        this.guestLectureXAxis = this.noOfGuestLectureXAxis;
        this.guestLectureChart = JSON.parse('[{"name":"Test", "value":0}]');

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardGuestLectureChartData(dashboardParams).subscribe(response => {
            this.guestLectureChartCount = response.Results.length;

            response.Results.forEach(glItem => {
                glItem.Count = (glItem.Count == null) ? 0 : glItem.Count;
            });

            if (this.guestLectureChartCount > 0) {
                this.guestLectureChart = response.Results.map(guestLecture => ({ name: guestLecture.Name, value: guestLecture.Count }));
            }

            this.IsLoading = false;

        }, err => {
            console.log();

        });
    }

    onSelectGuestLecture(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.name);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeGuestLectureXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onChangeGuestLectureType(glType) {
        this.guestLectureType = glType;

        if (glType == 'GLStatus') {
            this.onChangeGuestLectureXaxis(null, 'ByTimeline');
        }
        else if (glType == 'GLCount') {
            this.onChangeNoOfGuestLectureXaxis(null, 'ByTimelineForGL');
        }
    }
    //End Guest Lecture Status detailed graph

    //Start: Field Visit Status detailed graph
    onChangeFieldVisitXaxis(event, filterBy) {
        this.noOfFieldVisitChkList.forEach(val => { val.checked = true });
        this.fieldVisitXAxis = this.fieldVisitStatusXAxis;
        this.fieldStatusChart = JSON.parse('[{"name":"Field Visit Conducted", "value":0, "series":[{"name":"", "value":0}]}]');

        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardFieldVisitChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }
            this.fieldVisitChartData = response.Results
            this.fieldVisitChartCount = response.Results.length;

            response.Results.forEach(fvItem => {
                fvItem.Percentage = (fvItem.Percentage == null) ? 0 : fvItem.Percentage;
            });

            if (this.fieldVisitChartCount > 0) {
                this.fieldStatusChart = [];

                if (filterBy == 'ByTimeline') {
                    this.fieldStatusChart = [
                        {
                            "name": "Field Visit Conducted (%)",
                            "series": response.Results.map(fieldStatus => ({ name: fieldStatus.Name, value: fieldStatus.Percentage }))
                        }];
                }
                else {
                    this.fieldStatusChart = response.Results.map(fieldStatus => ({ name: fieldStatus.Name, value: fieldStatus.Percentage }));
                }
            }

            this.IsLoading = false;
        }, err => {
            console.log();

        });
    }

    onChangeNoOfFieldVisitXaxis(event, filterBy) {
        this.fieldVisitXAxis = this.noOfFieldVisitXAxis;
        this.fieldStatusChart = JSON.parse('[{"name":"Test", "value":0}]');

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardFieldVisitChartData(dashboardParams).subscribe(response => {
            this.fieldVisitChartCount = response.Results.length;

            response.Results.forEach(fvItem => {
                fvItem.Count = (fvItem.Count == null) ? 0 : fvItem.Count;
            });

            if (this.fieldVisitChartCount > 0) {
                this.fieldStatusChart = response.Results.map(fieldVisit => ({ name: fieldVisit.Name, value: fieldVisit.Count }));
            }

            this.IsLoading = false;

        }, err => {
            console.log();

        });
    }

    onChangeFieldVisitType(fvType) {
        this.fieldVisitType = fvType;

        if (fvType == 'FVStatus') {
            this.onChangeFieldVisitXaxis(null, 'ByTimeline');
        }
        else if (fvType == 'FVCount') {
            this.onChangeNoOfFieldVisitXaxis(null, 'ByTimelineForFV');
        }
    }

    onSelectFieldVisit(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.name);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeFieldVisitXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }
    //End Field Visit Status detailed graph

    //Start: Student Attendance card detailed graph
    onChangeStudentAttendanceXaxis(event, filterBy) {
        this.studentAttendanceChkList.forEach(val => { val.checked = true });
        this.schoolAttendanceChart = JSON.parse('[{"name":"Boys", "value":0, "series":[{"name":"", "value":0}]},{"name":"Girls", "value":0, "series":[{"name":"", "value":0}]}]');

        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        if (filterBy == "ByVTP") {
            this.viewGraphStudent = [950, 830];
        }
        else if (filterBy == "BySector") {
            this.viewGraphStudent = [700, 600];
        }
        else {
            this.viewGraphStudent = [500, 400];
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardStudentAttendanceChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.schoolAttendanceChartData = response.Results
            this.schoolAttendanceChartCount = response.Results.length;

            response.Results.forEach(studentAttendanceItem => {
                studentAttendanceItem.PercentageAttendanceBoys = (studentAttendanceItem.PercentageAttendanceBoys == null) ? 0 : studentAttendanceItem.PercentageAttendanceBoys;
                studentAttendanceItem.PercentageAttendanceGirls = (studentAttendanceItem.PercentageAttendanceGirls == null) ? 0 : studentAttendanceItem.PercentageAttendanceGirls;
            });

            if (this.schoolAttendanceChartCount > 0) {
                this.schoolAttendanceChart = [];

                if (filterBy == 'ByTimeline') {
                    this.schoolAttendanceChart = [
                        {
                            "name": "Boys",
                            "value": 0,
                            "series": response.Results.map(studentAttendanceStatus => ({ name: studentAttendanceStatus.Name, value: studentAttendanceStatus.PercentageAttendanceBoys }))
                        },
                        {
                            "name": "Girls",
                            "value": 0,
                            "series": response.Results.map(studentAttendanceStatus => ({ name: studentAttendanceStatus.Name, value: studentAttendanceStatus.PercentageAttendanceGirls }))
                        }];
                }
                else {
                    response.Results.forEach(studentItem => {
                        this.schoolAttendanceChart.push({
                            "name": studentItem.Name,
                            'value': 0,
                            "series": [{ "name": "Boys", "value": studentItem.PercentageAttendanceBoys }, { "name": "Girls", "value": studentItem.PercentageAttendanceGirls }]
                        }
                        );
                    });
                }
            }
            this.schoolAttendanceBUMulti = JSON.parse(JSON.stringify(this.schoolAttendanceChart));

        }, err => {
            console.log(err);
        });
    }

    onSelectStudentAttendance(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.series);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);

                this.onChangeStudentAttendanceXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.series);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }

    onCheckStudentAttendanceView(name, e, filterBy) {
        let temp = JSON.parse(JSON.stringify(this.schoolAttendanceBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.schoolAttendanceChart));
        this.schoolAttendanceChart = [];
        if (filterBy == 'ByTimeline') {
            if (e.checked) {
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].name === name) {
                        for (let j = 0; j < temp[i].series.length; j++) {

                            temp2[i].series[j].name = temp[i].series[j].name;
                            temp2[i].series[j].value = temp[i].series[j].value;

                        }
                    }
                }
            } else {

                for (const iterator of temp2) {
                    if (iterator.name === name) {
                        for (const iterator2 of iterator.series) {

                            iterator2.value = null;
                            //iterator2.name = null;
                        }
                    }
                }
            }
        }
        else {
            if (e.checked) {
                for (let i = 0; i < temp.length; i++) {
                    for (let j = 0; j < temp[i].series.length; j++) {
                        if (temp[i].series[j].name === name) {
                            temp2[i].name = temp[i].name;
                            temp2[i].series[j].value = temp[i].series[j].value;
                            break;
                        }
                    }
                }
            } else {
                for (const iterator of temp2) {
                    for (const iterator2 of iterator.series) {
                        if (iterator2.name === name) {
                            iterator2.value = 0;
                            //iterator2.name = null;
                        }
                    }
                }
            }
        }

        this.schoolAttendanceChart = temp2;

    }
    //End Student Attendance card detailed graph

    //Start: Vt Attendance Status detailed graph
    onChangeVtAttendanceXaxis(event, filterBy) {
        this.vtAttendanceChart = JSON.parse('[{"name":"VT Attendance", "value":0, "series":[{"name":"", "value":0}]}]');
        this.vtAttendance = true;
        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardVTAttendanceChartData(dashboardParams).subscribe(response => {
            if (filterBy == 'ByDistrict') {
                this.xAxisDrillDownFilter = 'ByDivision';
            }

            this.vtAttendanceChartData = response.Results
            this.vtAttendanceChartCount = response.Results.length;

            response.Results.forEach(vtAttendanceItem => {
                vtAttendanceItem.Percentage = (vtAttendanceItem.Percentage == null) ? 0 : vtAttendanceItem.Percentage;
            });

            if (this.vtAttendanceChartCount > 0) {
                this.vtAttendanceChart = [];

                if (filterBy == 'ByMonth') {
                    this.vtAttendanceChart = [
                        {
                            "name": "VT Attendance",
                            "value": 0,
                            "series": response.Results.map(vtAttendance => ({ name: vtAttendance.Name, value: vtAttendance.Percentage }))
                        }
                    ];
                }
                else {
                    this.vtAttendanceChart = response.Results.map(vtAttendance => ({ name: vtAttendance.Name, value: vtAttendance.Percentage }));
                }
            }

            this.IsLoading = false;
        }, err => {
            console.log(err);
        });
    }

    onSelectVtAttendance(evt, selectedXAxisDrillDownFilter) {
        if (selectedXAxisDrillDownFilter == 'ByDivision') {

            let divisionItem = this.divisionList.find(d => d.Name == evt.name);
            if (divisionItem != null) {

                this.summaryDashboardForm.controls["DivisionId"].setValue(divisionItem.Id);
                this.onChangeDivision(divisionItem.Id);
                this.onChangeVtAttendanceXaxis(null, 'ByDistrict');
            }
        }
        else if (selectedXAxisDrillDownFilter == 'ByDistrict') {
            let districtItem = this.districtList.find(d => d.Name == evt.name);
            this.summaryDashboardForm.controls["DistrictId"].setValue(districtItem.Id);
        }

        this.xAxisDrillDownFilter = selectedXAxisDrillDownFilter;
    }
    //Start: Vt Attendance Status detailed graph

    //Start: Vc Attendance Status detailed graph
    onChangeVcAttendanceXaxis(event, filterBy) {
        this.vcAttendanceChart = JSON.parse('[{"name":"VC Attendance", "value":0, "series":[{"name":"", "value":0}]}]');
        this.vcAttendance = true;
        if (event != null && event.value == filterBy && filterBy == 'ByDivision') {
            this.summaryDashboardForm.controls["DivisionId"].setValue(null);
        }

        this.xAxisDrillDownFilter = filterBy;

        var dashboardParams = this.getDashboardParams();
        dashboardParams.DataType = filterBy;

        this.summaryDashboardService.GetDashboardVCAttendanceChartData(dashboardParams).subscribe(response => {
            this.vcAttendanceChartCount = response.Results.length;

            response.Results.forEach(vcAttendanceItem => {
                vcAttendanceItem.Percentage = (vcAttendanceItem.Percentage == null) ? 0 : vcAttendanceItem.Percentage;
            });

            if (this.vcAttendanceChartCount > 0) {
                this.vcAttendanceChart = [];

                if (filterBy == 'ByMonth') {
                    this.vcAttendanceChart = [
                        {
                            "name": "VC Attendance",
                            "value": 0,
                            "series": response.Results.map(vcAttendance => ({ name: vcAttendance.Name, value: vcAttendance.Percentage }))
                        }
                    ];
                }
                else {
                    this.vcAttendanceChart = response.Results.map(vcAttendance => ({ name: vcAttendance.Name, value: vcAttendance.Percentage }));
                }
            }

            this.IsLoading = false;
        }, err => {
            console.log(err);
        });
    }
    //Start: Vc Attendance Status detailed graph
    onVtVcHeaderChange(vtvcHeaderValue) {
        if (vtvcHeaderValue == 'VT') {
            this.vtAttendance = true;
            this.vcAttendance = false;
            this.onChangeVtAttendanceXaxis(null, 'ByMonth');
        }
        else if (vtvcHeaderValue == 'VC') {
            this.vtAttendance = false;
            this.vcAttendance = true;
            this.onChangeVcAttendanceXaxis(null, 'ByMonth');
        }
    }
    //End Vt Vc Attendance Status detailed graph

    //Start: School visit status detailed graph
    onChangeschoolVisitStatusXaxis(event, filterBy) {
        this.schoolVisitStatusChart = JSON.parse('[{"name":"Month", "value":0, "series":[{"name":"", "value":0},{"name":"", "value":0}]}]');
        var dashboardParams = {
            DataType: filterBy,
            UserId: this.UserModel.LoginId,
            ParentId: this.UserModel.UserTypeId,
            AcademicYearId: this.summaryDashboardForm.get('AcademicYearId').value,
            MonthId: this.summaryDashboardForm.get('MonthId').value,
            DivisionId: this.summaryDashboardForm.get('DivisionId').value,
            DistrictCode: this.summaryDashboardForm.get('DistrictId').value,
            SectorId: this.summaryDashboardForm.get('SectorId').value,
            JobRoleId: this.summaryDashboardForm.get('JobRoleId').value,
            ClassId: this.summaryDashboardForm.get('ClassId').value,
            VTPId: this.summaryDashboardForm.get('VTPId').value,
            SchoolManagementId: this.summaryDashboardForm.get('SchoolManagementId').value
        }

        if (filterBy == 'ByMonth') {
            this.summaryDashboardService.GetDashboardSchoolVisitsByMonth(dashboardParams).subscribe(response => {
                this.schoolVisitStatusChartCount = response.Results.length;

                response.Results.forEach(svAttendanceItem => {
                    svAttendanceItem.SchoolVisited = (svAttendanceItem.SchoolVisited == null) ? 0 : svAttendanceItem.SchoolVisited;
                    svAttendanceItem.SchoolNotVisited = (svAttendanceItem.SchoolNotVisited == null) ? 0 : svAttendanceItem.SchoolNotVisited;
                });

                if (this.schoolVisitStatusChartCount > 0) {
                    this.schoolVisitStatusChart = [];
                    response.Results.forEach(schoolVisitStatusItem => {
                        this.schoolVisitStatusChart.push({
                            "name": schoolVisitStatusItem.ReportMonth,
                            "value": 0,
                            "series": [{ "name": "Schools Visited", "value": schoolVisitStatusItem.SchoolVisited }, { "name": "Schools Not Visited", "value": schoolVisitStatusItem.SchoolNotVisited }]
                        }
                        );
                    });
                }
                this.schoolVisitBUMulti = JSON.parse(JSON.stringify(this.schoolVisitStatusChart));


                this.IsLoading = false;
            }, error => {
                console.log(error);
            });
        }

        if (filterBy == 'ByVTP') {
            this.summaryDashboardService.GetDashboardSchoolVisitsByVTP(dashboardParams).subscribe(response => {
                this.schoolVisitStatusChartCount = response.Results.length;

                response.Results.forEach(svAttendanceItem => {
                    svAttendanceItem.VisitedSchools = (svAttendanceItem.VisitedSchools == null) ? 0 : svAttendanceItem.VisitedSchools;
                });

                if (this.schoolVisitStatusChartCount > 0) {
                    this.schoolVisitStatusChart = response.Results.map(schoolVisitStatus => ({ name: schoolVisitStatus.Name, value: schoolVisitStatus.VisitedSchools }));
                }
                this.IsLoading = false;
            }, error => {
                console.log(error);
            });
        }

    }

    onCheckSchoolVisitView(name, e) {
        let temp = JSON.parse(JSON.stringify(this.schoolVisitBUMulti)); // for deep copying variables
        let temp2 = JSON.parse(JSON.stringify(this.schoolVisitStatusChart));
        this.schoolVisitStatusChart = [];

        if (e.checked) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].series.length; j++) {
                    if (temp[i].series[j].name === name) {
                        temp2[i].name = temp[i].name;
                        temp2[i].series[j].value = temp[i].series[j].value;
                        break;
                    }
                }
            }
        } else {
            for (const iterator of temp2) {
                for (const iterator2 of iterator.series) {
                    if (iterator2.name === name) {
                        iterator2.value = 0;
                        //iterator2.name = null;
                    }
                }
            }
        }
        this.schoolVisitStatusChart = temp2;

    }
    //End: School visit status detailed graph
    //detailed graph end

    // //API calling for graphs
    // if (this.xaxis == 'ByVTP') {
    //     //this.onChangeSchoolChartXaxis(null, 'ByVTP');
    // }

    public onClassesCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "ClassCardInfo";
        this.onChangeClassesXaxis(null, this.xAxisDrillDownFilter);
    }

    public onStudentCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "StudentCardInfo";
        this.onChangeStudentXaxis(null, this.xAxisDrillDownFilter);
    }

    public onJobRoleCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "JobRoleCardInfo";
        this.onChangeJobRoleChartXaxis(null, this.xAxisDrillDownFilter);
    }

    public onVTCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "VTCardInfo";
        this.onChangeVTChartXaxis(null, this.xAxisDrillDownFilter);
    }

    public onVTPCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "VTPCardInfo";
    }

    public onSchoolCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "SchoolCardInfo";
        this.onChangeSchoolChartXaxis(null, this.xAxisDrillDownFilter);
    }

    public onStudentAttendanceCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "StudentAttendanceCardInfo";
        this.onChangeStudentAttendanceXaxis(null, this.xAxisDrillDownFilter);
    }

    public onFieldVisitCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "FieldVisitCardInfo";
        this.onChangeFieldVisitXaxis(null, this.xAxisDrillDownFilter);
    }

    public onGuestLectureCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = 'GuestLectureCardInfo';
        this.onChangeGuestLectureXaxis(null, this.xAxisDrillDownFilter);
    }

    public onCourseMaterialStatusCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "CourseMaterialStatusCardInfo";
        this.onChangeCourseMaterialStatusXaxis(null, this.xAxisDrillDownFilter);
    }

    public onToolsAndEquipmentStatusCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "ToolsAndEquipmentCardInfo";
        this.onChangeToolsAndEquipmentsXaxis(null, this.xAxisDrillDownFilter);
    }

    public OnVtVcAttandanceCardClick() {
        this.setDefaultCardStates();
        this.vtAttendance = true;
        this.vcAttendance = false;

        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = 'VTVCAttendanceCardInfo';
        this.onChangeVtAttendanceXaxis(null, this.xAxisDrillDownFilter);
    }

    public OnSchoolVisitStatusCardClick() {
        this.setDefaultCardStates();
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "SchoolVisitStatusCardInfo";
        this.onChangeschoolVisitStatusXaxis(null, this.xAxisDrillDownFilter);
    }

    public OnVcCardClick() {
        this.setDefaultCardStates();
        //this.vcCardClick = true;
        this.isDrillDownOpen = true;
        this.activeDrillDownGraph = "VCCardInfo";
    }

    public setDefaultCardStates() {
        this.activeDrillDownGraph = '';
        this.isDrillDownOpen = false;
        this.xAxisDrillDownFilter = "ByVTP";
    }

    percYAxisTickFormatting(val) {
        return val + '%';
    }

    valYAxisTickFormatting(val) {
        return val;
    }

    isShowDivIf = false;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    onResize(event) {
        //this.viewGraph = [event.target.innerWidth / 1.35, 400];
    }

    onResizeAttendanceGraph(event) {
        let graphRatio = this.viewGraphStudent[0] / this.viewGraphStudent[1];
        this.viewGraphStudent = [event.target.innerWidth / graphRatio, this.viewGraphStudent[1]];
    }

    onCardGraphResize(event) {
        //this.view = [event.target.innerWidth / 1.35, 200];
    }

    exportDrildownDataExcel(evt, exportType) {
        //evt.preventDefault();

        let excelDataSource: any = [];
        //Programme Information Graph
        if (exportType == 'Schools') {
            excelDataSource = this.schoolChartData;
        }
        else if (exportType == 'VocationalTrainers') {
            excelDataSource = this.vocationalTrainerChartData;
        }
        else if (exportType == 'Classes') {
            excelDataSource = this.classChartData;
        }
        else if (exportType == 'Students') {
            excelDataSource = this.studentChartData;
        }
        //Programme Performance Graph
        else if (exportType == 'CourseMaterialStatus') {
            excelDataSource = this.courseMaterialStatusChartData;
        }
        else if (exportType == 'ToolsAndEquipmentStatus') {
            excelDataSource = this.toolsAndEquipmentsChartData;
        }
        else if (exportType == 'StudentAttendance') {
            excelDataSource = this.schoolAttendanceChartData;
        }
        else if (exportType == 'FieldVisitStatus') {
            excelDataSource = this.fieldVisitChartData;
        }
        else if (exportType == 'GuestLectureStatus') {
            excelDataSource = this.guestLectureChartData;
        }
        else if (exportType == 'VtAndVcAttendance') {
            excelDataSource = this.vtAttendanceChartData;
        }
        // else if (exportType == 'SchoolVisitStatus') {
        //     this.exportExcelFromTable(this.vocationalTrainerChartData, "SchoolVisitStatus");
        // }

        this.exportExcelFromTable(excelDataSource, exportType).then(resp => {
            this.capturedImageFromContainer(exportType, resp);
        })
    }

    capturedImageFromContainer(containerId, respId) {

        html2canvas(document.querySelector("#" + containerId)).then(canvas => {

            // Convert the canvas to blob
            canvas.toBlob(function (blob) {
                let fileName = containerId + '-' + respId + '.png';

                // To download directly on browser default 'downloads' location
                let link = document.createElement("a");
                link.download = fileName;
                link.href = URL.createObjectURL(blob);
                link.click();

                // To save manually somewhere in file explorer
                //this.window.saveAs(blob, 'image.png');

            }, 'image/png');
        });
    }
}
