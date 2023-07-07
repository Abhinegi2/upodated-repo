import { Injectable, OnInit, Component, ViewChild, ElementRef, NgZone } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BaseComponent } from '../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { SearchFilterModel } from 'app/models/search.filter.model';
import * as XLSX from 'xlsx';

@Component({
    templateUrl: './base.list.component.html',
    styleUrls: ['./base.list.component.scss']
})
@Injectable()
export class BaseListComponent<T> extends BaseComponent<T> implements OnInit {
    tableDataSource: MatTableDataSource<Element>;
    displayedColumns: string[];
    SearchBy: SearchFilterModel;
    IsShowFilter: boolean = false;

    @ViewChild(MatPaginator, { static: true })
    ListPaginator: MatPaginator;

    @ViewChild(MatSort, { static: true })
    ListSort: MatSort;

    @ViewChild('filter', { static: true })
    ListFilter: ElementRef;

    AcademicYearId: string

    constructor(
        public commonService: CommonService,
        public router: Router,
        public routeParams: ActivatedRoute,
        public snackBar: MatSnackBar,
        public zone: NgZone
    ) {
        super(commonService, router, routeParams, snackBar);
        this.tableDataSource = new MatTableDataSource<Element>();

        this.SearchBy = new SearchFilterModel(this.UserModel);

        // Force reload/refresh current route with RouteReuseStrategy
        // Override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() { }

    applySearchFilter(filterValue: string) {
        this.tableDataSource.filter = filterValue.trim().toLowerCase();
        this.zone.run(() => {
            if (this.tableDataSource.filteredData.length == 0) {
                this.showNoDataFoundSnackBar();
            }
        });
    }

    getCurrentPageRows(): any {
        const startIndex = this.tableDataSource.paginator.pageIndex * this.tableDataSource.paginator.pageSize
        const endIndex = startIndex + this.tableDataSource.paginator.pageSize;

        return this.tableDataSource.filteredData.slice(startIndex, endIndex);
    }

    exportExcelFromTable(dataSource: any, dataType: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            console.log("Inside exportExcel function");
            let currentDateTime = this.DateFormatPipe.transform(Date.now(), 'yyyyMMdd-HHmmss');

            //converts a DOM TABLE element to a worksheet
            //const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(dataTable.nativeElement);
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataSource);

            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, dataType);
            console.log("Not append data into excel");

            /* save to file */
            let fileName = dataType + '-' + currentDateTime + '.xlsx';
            XLSX.writeFile(wb, fileName);

            console.log("Excel file saved with the name:", fileName);

            resolve(currentDateTime);
        });

        return promise;
    }
}
