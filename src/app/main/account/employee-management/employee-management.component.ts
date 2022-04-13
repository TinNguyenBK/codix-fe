import { Component, OnInit } from '@angular/core';
import { CustomerService } from './data/employee.service';
import { Customer } from './data/employee';
import { AllModules, GridApi, IGetRowsParams } from '@ag-grid-enterprise/all-modules';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
    modules = [ClientSideRowModelModule];
    constructor( 
      private router: Router,
    ) { }
  
    columnDefs = [
      { headerName: "Full name", field: "" , filter: 'agTextColumnFilter' },
      { headerName: "Experience level", field: "", filter: 'agTextColumnFilter' },
      { headerName: "Starting date", field: "", filter: 'agTextColumnFilter' },
      { headerName: "Salary", field: "",  filter: 'agTextColumnFilter' },
      { headerName: "Vacation days", field: "",  filter: 'agTextColumnFilter' },
      { headerName: "Status", field: "", filter: 'agTextColumnFilter' },
    ];

  ngOnInit(): void {
   
  }
  add() {
    this.router.navigate(['/add-employee']);
  }

}
