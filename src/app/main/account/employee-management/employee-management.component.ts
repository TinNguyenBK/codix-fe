import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IGetRowsParams,
} from 'ag-grid-community';
import { EmployeeManagementService } from 'app/core/service/employee-management.service';
import { EmployeeQuery, IEmployeeQuery } from 'app/core/models/employee-management.model';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import * as moment from 'moment';
import { ButtonModule } from 'primeng/button';

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

}
