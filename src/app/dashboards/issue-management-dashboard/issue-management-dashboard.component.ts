import { Component, OnInit, NgZone, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { IssueManagementDashboardModel } from './issue-management-dashboard.model';
import { IssueManagementDashboardService } from './issue-management-dashboard.service';
import { DropdownModel } from 'app/models/dropdown.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouteConstants } from 'app/constants/route.constant';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'data-list-view',
  templateUrl: './issue-management-dashboard.component.html',
  styleUrls: ['./issue-management-dashboard.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class IssueManagementDashboardComponent extends BaseListComponent<IssueManagementDashboardModel> implements OnInit {
  issueManagementDashboardForm: FormGroup;

  academicYearList: [DropdownModel];
  divisionList: [DropdownModel];
  districtList: DropdownModel[];
  sectorList: [DropdownModel];
  jobRoleList: DropdownModel[];
  vtpList: [DropdownModel];
  classList: [DropdownModel];
  monthList: [DropdownModel];
  blockList: [DropdownModel];
  currentAcademicYearId: any;

  totalCardClick: boolean;
  glfvIssueCardClickCardClick: boolean;
  toolsAndEquipmentsIssueCardClick: boolean;
  labIssueCardClick: boolean;
  paymentIssueCardClick: boolean;
  syllabusIssueCardClick: boolean;
  examIssueCardClick: boolean;
  certificateIssueCardClick: boolean;
  coordinatorIssueCardClick: boolean;

  @ViewChild('districtMatSelect') districtSelections: MatSelect;

  //for detailed graph
  colorScheme = {
    domain: ['#24b449d4', '#e82e25d4', '#32cfc0d4']
  };

  favoriteSeason: string;
  viewGraph: any[] = [980, 350];
  graphArray: string[] = ['SYLLABUS ISSUES', 'LAB ISSUES', 'PAYMENT ISSUES', 'GL FV ISSUES', 'TE ISSUES', 'EXAM ISSUES', 'CERTIFICATE ISSUES', 'COORDINATOR ISSUES'];
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
    domain: ['#00ca64', '#29ded8', '#ff0043']
  };


  // pie
  showLabelsGraph = true;

  viewIssueRaisedGraph: any[] = [500, 400]
  multi = [
    {
      name: 'Lab Issues',
      series: [
        {
          name: 'LOW',
          value: 10
        },
        {
          name: 'MEDIUM',
          value: 20
        },
        {
          name: 'HIGH',
          value: 240
        }
      ]
    },

    {
      name: 'TE Issues',
      series: [
        {
          name: 'LOW',
          value: 5
        },
        {
          name: 'MEDIUM',
          value: 0
        },
        {
          name: 'HIGH',
          value: 15
        }
      ]
    },

    {
      name: 'Certificate Issues',
      series: [
        {
          name: 'LOW',
          value: 3
        },
        {
          name: 'MEDIUM',
          value: 7
        },
        {
          name: 'HIGH',
          value: 40
        }
      ]
    },

    {
      name: 'Coordinator Issues',
      series: [
        {
          name: 'LOW',
          value: 0
        },
        {
          name: 'MEDIUM',
          value: 3
        },
        {
          name: 'HIGH',
          value: 17
        }
      ]
    },

    {
      name: 'Syllabus Issues',
      series: [
        {
          name: 'LOW',
          value: 3
        },
        {
          name: 'MEDIUM',
          value: 7
        },
        {
          name: 'HIGH',
          value: 96
        }
      ]
    },

    {
      name: 'Payment Issues',
      series: [
        {
          name: 'LOW',
          value: 5
        },
        {
          name: 'MEDIUM',
          value: 0
        },
        {
          name: 'HIGH',
          value: 50
        }
      ]
    },
    {
      name: 'GL FV Issues',
      series: [
        {
          name: 'LOW',
          value: 2
        },
        {
          name: 'MEDIUM',
          value: 0
        },
        {
          name: 'HIGH',
          value: 18
        }
      ]
    }


  ];
  BUMulti = [];
  raisedBy = [{ name: 'VOCATIONAL TRAINER', value: 'VT', isChecked: true }, { name: 'PRINCIPAL', value: 'HM', isChecked: true }, { name: 'COORDINATOR', value: 'VC', isChecked: true }];
  issueStatusList = [{ value: 'Open', name: 'OPEN' }, { value: 'Closed', name: 'CLOSED' }, { value: 'Hold', name: 'HOLD' }, { value: 'InProgress', name: 'IN-PROGRESS' }];
  monthViewList = [{ value: 'Low', name: 'LOW' }, { value: 'Medium', name: 'MEDIUM' }, { value: 'High', name: 'HIGH' }];
  issueStatusColor = {
    domain: ['#ff0000', '#008000', '#0000ff', '#1f77b4']
  };
  severityList = [{ name: 'LOW', value: 'LOW', isChecked: true }, { name: 'MEDIUM', value: 'MEDIUM', isChecked: true }, { name: 'HIGH', value: 'HIGH', isChecked: true }];

  schoolManagementList: any;
  currentYear: any;
  issueManagementChart: any;
  issueManagementChartCount: any;
  issueManagementTimelineChartCount: any;
  issueManagementTimelineChart: any[];
  paymentIssuesTotal: any = 0;
  teIssuesTotal: any = 0;
  coordinatorIssuesTotal: any = 0;
  syllabusIssuesTotal: any = 0;
  paymentIssuesResolved: any = 0;
  teIssuesResolved: any = 0;
  coordinatorIssuesResolved: any = 0;
  syllabusIssuesResolved: any = 0;
  totalIssues = 0;
  resolvedIssues = 0;
  glfvIssuesTotal: number = 0;
  glfvIssuesResolved: number = 0;
  labIssuesTotal: number = 0;
  labIssuesResolved: number = 0;
  examIssuesTotal: number = 0;
  examIssuesResolved: number = 0;
  certificateIssuesTotal: number = 0;
  certificateIssueResolved: number = 0;
  drillDownChartDataCount: any;
  drillDownChartData: any[];
  resultData: any;
  selectedRaisedBy = [];
  raisedByList: any;
  srveritySelected: any;
  selectedServerityList = [];
  issuesByMonth: any;
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    private issueManagementDashboardService: IssueManagementDashboardService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.totalCardClick = false;
    this.toolsAndEquipmentsIssueCardClick = false;
    this.labIssueCardClick = false;
    this.glfvIssueCardClickCardClick = false;
    this.paymentIssueCardClick = false;
    this.syllabusIssueCardClick = false;
    this.examIssueCardClick = false;
    this.certificateIssueCardClick = false;
    this.coordinatorIssueCardClick = false;

    this.favoriteSeason = 'VTP';

    this.resetDashboardFilters();
  }

  resetDashboardFilters(): void {
    this.issueManagementDashboardService.GetDropdownForReports(this.UserModel).subscribe(results => {
      if (results[0].Success) {
        this.academicYearList = results[0].Results;
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

      let currentYearItem = this.academicYearList.find(ay => ay.IsSelected == true)
      if (currentYearItem != null) {
        this.currentAcademicYearId = currentYearItem.Id;

        this.issueManagementDashboardForm.get('AcademicYearId').setValue(this.currentAcademicYearId);
        this.districtList = <DropdownModel[]>[];
        this.jobRoleList = <DropdownModel[]>[];

        if (this.UserModel.RoleCode === 'DivEO') {
          this.issueManagementDashboardForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            this.getIssueManagementDashboards();
          });
        }
        else if (this.Constants.UserRoleIds.indexOf(this.UserModel.RoleCode) > 0) {
          this.issueManagementDashboardForm.controls["DivisionId"].setValue(this.UserModel.DivisionId);

          this.onChangeDivision(this.UserModel.DivisionId).then(response => {
            let districtIds = [];
            response.forEach(districtItem => {
              districtIds.push(districtItem.Id);
            });

            this.issueManagementDashboardForm.controls["DistrictId"].setValue(districtIds);

            this.getIssueManagementDashboards();
          });
        }
        else {
          this.getIssueManagementDashboards();
        }
      }
    });

    this.issueManagementDashboardForm = this.createIssueManagementDashboardForm();
  }

  onChangeDivision(divisionId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      this.commonService.GetMasterDataByType({ DataType: 'Districts', RoleId: this.UserModel.RoleCode, UserId: this.Constants.DefaultStateId, ParentId: divisionId, SelectTitle: 'District' }, false)
        .subscribe((response: any) => {
          this.districtList = response.Results;
          this.issueManagementDashboardForm.controls['DistrictId'].setValue(null);

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
      this.issueManagementDashboardForm.controls['JobRoleId'].setValue(null);
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

  //Create IssueManagementDashboard form and returns {FormGroup}
  createIssueManagementDashboardForm(): FormGroup {
    return this.formBuilder.group({
      AcademicYearId: new FormControl(),
      MonthId: new FormControl(),
      DivisionId: new FormControl(),
      DistrictId: new FormControl(),
      SectorId: new FormControl(),
      JobRoleId: new FormControl(),
      ClassId: new FormControl(),
      VTPId: new FormControl(),
      SchoolManagementId: new FormControl()
    });
  }

  refreshIssueManagementDashboard() {
    this.router.navigate([RouteConstants.IssueManagementDashboard.IssueManagementDashboard]);
  }

  getIssueManagementDashboards(): void {
    if (!this.issueManagementDashboardForm.valid) {
      return;
    }

    this.resetSummaryIssuesCount();
    this.getIssueManagementData('ByIssueType');
    this.getIssueManagementData('ByIssueSummary');
    //this.getIssueManagementData('ByIssueId');
  }

  //Start: Student Attendance card detailed graph
  getIssueManagementData(filterBy): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      var dashboardParams = {
        DataType: filterBy,
        UserId: this.UserModel.LoginId,
        AcademicYearId: this.issueManagementDashboardForm.get('AcademicYearId').value,
        MonthId: this.issueManagementDashboardForm.get('MonthId').value,
        DivisionId: this.issueManagementDashboardForm.get('DivisionId').value,
        DistrictCode: this.issueManagementDashboardForm.get('DistrictId').value,
        SectorId: this.issueManagementDashboardForm.get('SectorId').value,
        JobRoleId: this.issueManagementDashboardForm.get('JobRoleId').value,
        ClassId: this.issueManagementDashboardForm.get('ClassId').value,
        VTPId: this.issueManagementDashboardForm.get('VTPId').value,
        SchoolManagementId: this.issueManagementDashboardForm.get('SchoolManagementId').value,
        IssueId: null
      };

      dashboardParams.DistrictCode = (dashboardParams.DistrictCode != null && dashboardParams.DistrictCode.length > 0) ? dashboardParams.DistrictCode.toString() : null;

      this.issueManagementDashboardService.GetDashboardIssueManagementChartData(dashboardParams).subscribe(response => {
        if (filterBy == 'ByIssueType') {
          this.issueManagementChartCount = response.Results.length;
          this.issueManagementChart = [];
          response.Results.forEach(issueItem => {
            this.issueManagementChart.push({
              "name": issueItem.Name,
              "series": [{ "name": "LOW", "value": issueItem.Low }, { "name": "MEDIUM", "value": issueItem.Medium }, { "name": "HIGH", "value": issueItem.High }]
            }
            );

          });
        }
        else if (filterBy == 'ByMonth') {
          this.issueManagementTimelineChartCount = response.Results.length;
          this.issuesByMonth = response.Results;
          this.issueManagementTimelineChart = [
            {
              "name": "LOW",
              "series": response.Results.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.Low }))
            },
            {
              "name": "MEDIUM",
              "series": response.Results.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.Medium }))
            },
            {
              "name": "HIGH",
              "series": response.Results.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.High }))
            }
          ];
          this.BUMulti = JSON.parse(JSON.stringify(this.issueManagementTimelineChart));
        }
        else if (filterBy == 'ByIssueSummary') {

          for (let i = 0; i < response.Results.length; i++) {
            this.totalIssues += response.Results[i].Total;
            this.resolvedIssues += response.Results[i].Closed;
          }

          response.Results.forEach(issueItem => {
            if (issueItem.Name == "GL FV Issues") {
              this.glfvIssuesTotal = issueItem.Total;
              this.glfvIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "TE Issues") {
              this.teIssuesTotal = issueItem.Total;
              this.teIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Lab Issues") {
              this.labIssuesTotal = issueItem.Total;
              this.labIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Payment Issues") {
              this.paymentIssuesTotal = issueItem.Total;
              this.paymentIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Syllabus Issues") {
              this.syllabusIssuesTotal = issueItem.Total;
              this.syllabusIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Exam Issues") {
              this.examIssuesTotal = issueItem.Total;
              this.examIssuesResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Certificate Issues") {
              this.certificateIssuesTotal = issueItem.Total;
              this.certificateIssueResolved = issueItem.Closed;
            }

            else if (issueItem.Name == "Coordinator Issues") {
              this.coordinatorIssuesTotal = issueItem.Total;
              this.coordinatorIssuesResolved = issueItem.Closed;
            }
          });
        }

        resolve(response.Results);
      }, err => {
        reject(err);
      });
    });

    return promise;
  }

  getIssueManagementDrillDownChartData(filterBy, issueId): Promise<any> {
    let promise = new Promise((resolve, reject) => {

      var dashboardParams = {
        DataType: filterBy,
        UserId: this.UserModel.LoginId,
        AcademicYearId: this.issueManagementDashboardForm.get('AcademicYearId').value,
        MonthId: this.issueManagementDashboardForm.get('MonthId').value,
        DivisionId: this.issueManagementDashboardForm.get('DivisionId').value,
        DistrictCode: this.issueManagementDashboardForm.get('DistrictId').value,
        SectorId: this.issueManagementDashboardForm.get('SectorId').value,
        JobRoleId: this.issueManagementDashboardForm.get('JobRoleId').value,
        ClassId: this.issueManagementDashboardForm.get('ClassId').value,
        VTPId: this.issueManagementDashboardForm.get('VTPId').value,
        SchoolManagementId: this.issueManagementDashboardForm.get('SchoolManagementId').value,
        IssueId: issueId
      };

      dashboardParams.DistrictCode = (dashboardParams.DistrictCode != null && dashboardParams.DistrictCode.length > 0) ? dashboardParams.DistrictCode.toString() : null;

      this.issueManagementDashboardService.GetDashboardIssueManagementChartData(dashboardParams).subscribe(response => {
        if (filterBy == 'ByIssueId') {
          this.drillDownChartDataCount = response.Results.length;
          this.resultData = response.Results;
          this.drillDownChartData = [];

          this.resultData.forEach(issueItem => {
            this.drillDownChartData.push({
              "name": issueItem.Name,
              "series": [{ "name": "OPEN", "value": issueItem.Open }, { "name": "CLOSED", "value": issueItem.Closed }, { "name": "HOLD", "value": issueItem.Hold }, { "name": "IN-PROGRESS", "value": issueItem.InProgress }]
            }
            );
          });
        }
        this.BUMulti = JSON.parse(JSON.stringify(this.drillDownChartData));

        resolve(response.Results);
      }, err => {
        reject(err);
      });

    });

    return promise;
  }

  resetSummaryIssuesCount() {
    this.totalIssues = 0;
    this.resolvedIssues = 0;
    this.glfvIssuesTotal = 0;
    this.glfvIssuesResolved = 0;
    this.teIssuesTotal = 0;
    this.teIssuesResolved = 0;
    this.labIssuesTotal = 0;
    this.labIssuesResolved = 0;
    this.paymentIssuesTotal = 0;
    this.paymentIssuesResolved = 0;
    this.syllabusIssuesTotal = 0;
    this.syllabusIssuesResolved = 0;
    this.examIssuesTotal = 0;
    this.examIssuesResolved = 0;
    this.certificateIssuesTotal = 0;
    this.certificateIssueResolved = 0;
    this.coordinatorIssuesTotal = 0;
    this.coordinatorIssuesResolved = 0;
  }

  //detailed graph
  onCheckView(name, e) {
    let temp = JSON.parse(JSON.stringify(this.BUMulti)); // for deep copying variables
    let temp2 = JSON.parse(JSON.stringify(this.drillDownChartData));
    this.drillDownChartData = [];

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
    this.drillDownChartData = temp2;
  }

  onCheckByMonthView(name, e) {
    let temp = JSON.parse(JSON.stringify(this.BUMulti)); // for deep copying variables
    let temp2 = JSON.parse(JSON.stringify(this.issueManagementTimelineChart));
    this.issueManagementTimelineChart = [];

    if (e.checked) {
      for (let i = 0; i < temp.length; i++) {

        if (temp[i].name === name) {
          temp2[i].name = temp[i].name;
          temp2[i].series = temp[i].series;
          break;
        }

      }
    } else {
      for (const iterator of temp2) {

        if (iterator.name === name) {
          iterator.series = [];
          //iterator2.name = null;
        }
      }
    }
    this.issueManagementTimelineChart = temp2;
  }

  onRaisedBySelection() {
    this.selectedRaisedBy = [];

    this.raisedByList = this.raisedBy.filter((value, index) => {
      return value.isChecked
    });
    this.raisedBy.forEach((value, index) => {
      if (value.isChecked) {
        this.selectedRaisedBy.push(value.value);
      }
    });

    let RaisedBy = this.selectedRaisedBy.toString();
    let issuesRasisedBy = this.resultData.filter(x => RaisedBy.indexOf(x.IssueRaisedBy) > -1);

    this.drillDownChartData = [];
    issuesRasisedBy.forEach(issueItem => {
      this.drillDownChartData.push({
        "name": issueItem.Name,
        "series": [{ "name": "OPEN", "value": issueItem.Open }, { "name": "CLOSED", "value": issueItem.Closed }, { "name": "HOLD", "value": issueItem.Hold }, { "name": "IN-PROGRESS", "value": issueItem.InProgress }]
      }
      );
    });
  }

  onRaisedByMonthSelection() {
    this.selectedRaisedBy = [];

    this.raisedByList = this.raisedBy.filter((value, index) => {
      return value.isChecked
    });
    this.raisedBy.forEach((value, index) => {
      if (value.isChecked) {
        this.selectedRaisedBy.push(value.value);
      }
    });
    let RaisedBy = this.selectedRaisedBy.toString();
    let issuesRasisedBy = this.issuesByMonth.filter(x => RaisedBy.indexOf(x.IssueRaisedBy) > -1);

    this.issueManagementTimelineChart = [];

    this.issueManagementTimelineChart = [
      {
        "name": "LOW",
        "series": issuesRasisedBy.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.Low }))
      },
      {
        "name": "MEDIUM",
        "series": issuesRasisedBy.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.Medium }))
      },
      {
        "name": "HIGH",
        "series": issuesRasisedBy.map(issueManagementTimeline => ({ name: issueManagementTimeline.Name, value: issueManagementTimeline.High }))
      }
    ];
  }

  onIssueSeverityCheck() {
    this.selectedServerityList = [];

    this.srveritySelected = this.severityList.filter((value, index) => {
      return value.isChecked
    });
    this.severityList.forEach((value, index) => {
      if (value.isChecked) {
        this.selectedServerityList.push(value.value);
      }
    });
    let Severity = this.selectedServerityList.toString();
    let issuesSeverity = this.resultData.filter(x => Severity.indexOf(x.IssuePriority) > -1);

    this.drillDownChartData = [];
    issuesSeverity.forEach(issueItem => {
      this.drillDownChartData.push({
        "name": issueItem.Name,
        "series": [{ "name": "OPEN", "value": issueItem.Open }, { "name": "CLOSED", "value": issueItem.Closed }, { "name": "HOLD", "value": issueItem.Hold }, { "name": "IN-PROGRESS", "value": issueItem.InProgress }]
      }
      );
    });
  }

  //detailed graph end
  public onTotalCardClick() {
    this.setDefaultCardSets();
    this.totalCardClick = true;
    this.getIssueManagementData('ByMonth');
  }

  public onGLFVIssueCardClick() {
    this.setDefaultCardSets();
    this.glfvIssueCardClickCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'c1da9ca2-cb8c-11eb-9da5-0a761174c048');
  }

  public onToolsAndEquipmentsIssueCardClick() {
    this.setDefaultCardSets();
    this.toolsAndEquipmentsIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'e716730d-cb8c-11eb-9da5-0a761174c048');
  }

  public onCertificateIssueCardClick() {
    this.setDefaultCardSets();
    this.certificateIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'f287b79a-cb8c-11eb-9da5-0a761174c048');
  }

  public onExamIssueCardClick() {
    this.setDefaultCardSets();
    this.examIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'ebd61e96-cb8c-11eb-9da5-0a761174c048');
  }

  public onSyllabusIssueCardClick() {
    this.setDefaultCardSets();
    this.syllabusIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'de49b474-cb8c-11eb-9da5-0a761174c048');
  }

  public onPaymentIssueCardClick() {
    this.setDefaultCardSets();
    this.paymentIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'd61132a7-cb8c-11eb-9da5-0a761174c048');
  }

  public onLabIssueCardClick() {
    this.setDefaultCardSets();
    this.labIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'c86e4934-cb8c-11eb-9da5-0a761174c048');
  }

  public onCoordinatorIssueCardClick() {
    this.setDefaultCardSets();
    this.coordinatorIssueCardClick = true;
    this.getIssueManagementDrillDownChartData('ByIssueId', 'b46c1e2b-cb8c-11eb-9da5-0a761174c048');
  }

  public setDefaultCardSets() {
    this.totalCardClick = false;
    this.glfvIssueCardClickCardClick = false;
    this.toolsAndEquipmentsIssueCardClick = false;
    this.labIssueCardClick = false;
    this.paymentIssueCardClick = false;
    this.syllabusIssueCardClick = false;
    this.examIssueCardClick = false;
    this.certificateIssueCardClick = false;
    this.coordinatorIssueCardClick = false;
  }

  myYAxisTickFormatting(val) {
    return val + '%';
  }
  isShowDivIf = false;

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  onResize(event) {
    this.viewIssueRaisedGraph = [event.target.innerWidth / 1.35, 400];
  }

  onTotalIssueGraphResize(event) {
    this.viewGraph = [event.target.innerWidth / 1.35, 400];
  }
}

