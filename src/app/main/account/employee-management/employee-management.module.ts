import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/main/angular-material/material.module';
import { AlertModule } from 'app/main/_shared/alert/alert.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleModule } from 'app/main/common-component/title/title.module';
import { EmployeeManagementComponent } from './employee-management.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from './data/employee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'
import { AgGridModule } from 'ag-grid-angular';
import { NumberDirective } from './check-number.directive';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';

const routes = [
    {
        path     : 'employee-management',
        component: EmployeeManagementComponent
    },
    {
        path     : 'add-employee',
        component: AddEmployeeComponent
    },
    {
        path     : 'employee-detail',
        component: DetailEmployeeComponent
    }
];

@NgModule({
    declarations: [
        EmployeeManagementComponent,
        AddEmployeeComponent,
        NumberDirective,
        DetailEmployeeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        // MaterialModule,
        AlertModule,
        CommonModule,
        TitleModule,
        TableModule,
        ButtonModule,
        CalendarModule,
        FormsModule,
        DropdownModule,
        AgGridModule
    ],
    exports     : [
        EmployeeManagementComponent
    ],
    // providers: [CustomerService]
})
export class EmployeeManagementModule { }