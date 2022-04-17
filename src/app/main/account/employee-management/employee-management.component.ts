import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';
import {
  GridSizeChangedEvent,
  IGetRowsParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import { EmployeeManagementService } from 'app/core/service/employee-management.service';
import { EmployeeQuery, IEmployeeQuery } from 'app/core/models/employee-management.model';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
    employeeArray: Array<String> = [];
    defaultColDef;
    gridOptions;
    employees;
    gridApi;
    loadingTemplate;
    gridColumnApi;
    columnDefs;
    totalRowActive = 10;
    activeGridParams;
    query;
    cacheOverflowSize;
    maxConcurrentDatasourceRequests;
    infiniteInitialRowCount;

    constructor( 
      private router: Router,
      private employeeManagementService: EmployeeManagementService
    ) { 
      this.defaultColDef = {
        filter: 'agTextColumnFilter',
        resizable: true,
        suppressMenu: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
      };
      this.loadingTemplate = `<span class="ag-overlay-loading-center">Loading...</span>`;
      this.columnDefs = [
        { headerName: "Full name", field: "fullName" , resizable: true, },
        { headerName: "Experience level", field: "experienceLevel",  resizable: true, },
        { headerName: "Starting date", field: "startingDate", resizable: true, 
        valueFormatter: (params) => {
          return moment(params.value).format('DD/MM/YYYY HH:mm');
        },},
        { headerName: "Salary", field: "salary",   resizable: true, },
        { headerName: "Vacation days", field: "vacationDays",  resizable: true, },
        { headerName: "Status", field: "status",  resizable: true, },
      ];

      this.cacheOverflowSize = 2;
      this.maxConcurrentDatasourceRequests = 2;
      this.infiniteInitialRowCount = 2;

      this.gridOptions = {
        rowHeight: 50,
        rowStyle: { padding: '10px 0px' },
        cacheBlockSize: 10,
        paginationPageSize: 10,
        rowModelType: 'infinite',
        pagination: true,
      };
    }
  

  ngOnInit(): void {
    this.getTotalRow();
  }
  add() {
    this.router.navigate(['/add-employee']);
  }

  getTotalRow(): void {
    this.employeeManagementService.getTotalEmployee().subscribe(
      (res) => {
        if (res.status === 200) {
          this.totalRowActive = res.body.count;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEmployeeHistory(): void {
    let query: IEmployeeQuery = new EmployeeQuery(0, 10);

    this.employeeManagementService.getEmployeeHistory().subscribe(
      (res) => {
        this.employees = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onGridActiveReady(params) {
    this.activeGridParams = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        let query;
        if (this.query) {
          query = {
            offset: params.startRow,
            limit: params.endRow,
            order: 'mModified DESC',
          };
        } else {
          query = {
            offset: params.startRow,
            limit: params.endRow,
            order: 'mModified DESC',
          };
        }
        this.employeeManagementService.getEmployeeHistory().subscribe((res) => {
          console.log(res)
          params.successCallback(res.body, this.totalRowActive);
        });
      },
    };
    this.gridApi.setDatasource(datasource);
  }

  onGridReady(params){
  }
  onGridSizeChanged(params){
  }

  onRowClickedChangeToEmployee(event) {

  }

  onViewEmployeeDetail(event) {
    this.router.navigate(['/employee-detail'], {
      queryParams: {
        id: event.data.id,
      },
    });
  }

  onPaginationChanged(e) {}

}
