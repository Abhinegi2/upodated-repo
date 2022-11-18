import { FuseUtils } from '@fuse/utils';

export class SummaryDashboardModel {
    VCIssueReportingId: string;
    DateOfAllocation: Date;
    IssueReportDate: Date;
    MainIssue: string;
    SubIssue: string;
    StudentClass: string;
    Month: string;
    StudentType: string;
    NoOfStudents: 0;
    IssueDetails: string;
    ApprovalStatus: string;
    ApprovedDate: Date;
    IsActive: true

    constructor() { }
}

export class DashboardCard {
    Id: number;
    ApprovedCount: number;
    ImplementedCount: number;

    constructor() { }
};


export class DashboardSchoolCard {
    Id: number;
    Name: string;
    Count: number;
    Percentage: number;

    constructor() { }
};

export class DashboardVTCard {
    Id: number;
    Name: string;
    TotalVT: number;
    ReportedVT: number;

    constructor() { }
};

export class DashboardClassCard {
    Id: number;
    Name: string;
    Class9: number;
    Class10: number;
    Class11: number;
    Class12: number;
    Total: number;

    constructor() { }
};

export class DashboardStudentCard {
    Id: number;
    Name: string;
    Boys: number;
    Girls: number;
    Total: number;

    constructor() { }
};
