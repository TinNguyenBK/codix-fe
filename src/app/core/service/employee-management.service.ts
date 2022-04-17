import { addEmployeeApi } from './backend-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import {
    getTotalEmployeeApi, getEmployeeHistoryApi, getEmployeeDetailApi
  } from './backend-api';
import { IEmployeeQuery } from '../models/employee-management.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeManagementService {
    constructor(
        private api: ApiService,
        private http: HttpClient,
        private router: Router) { }
    
    addEmployee(employeeInfor) {
        return this.api.post(addEmployeeApi, employeeInfor).pipe(retry(3), catchError(this.errorHandler));
    }

    getTotalEmployee(): Observable<any> {
        return this.http.get(getTotalEmployeeApi, {
            observe: "response",
        })
    }

    getEmployeeHistory(): Observable<any> {
        return this.http.get(getEmployeeHistoryApi, {
            observe: "response",
        })
    }

    getEmployeeDetail(id): Observable<any> {
        const url = getEmployeeDetailApi
                    .replace(':id', id);
        return this.http.get(url, {
            observe: "response",
        })
    }

    updateEmployee(id, generalInfor){
        let url = '';
        url = getEmployeeDetailApi.replace(':id', id);
        return this.http.patch<any>(url, generalInfor , {
          headers: this.api.headers,
          observe: "response",
        });
    }
    
    
    
    private errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occured:', error.error.message);
        }
        else {
            console.error(
                `Back-end return code: ${error.status}\n` +
                `Body content: ${error.status}`
            );
            if ( error.status == 401 ) {
                return "0"
            }
        }

        return throwError(error.message || 'Server Error');
    }
}
