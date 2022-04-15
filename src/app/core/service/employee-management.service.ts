import { myProfileApi, changePasswordApi, profileGetPreSignedUrl, supplierProfileApi, userProfileApi,
    colaboratorProfileApi, changePasswordColApi, changePasswordSupApi, profileGetPreSignedUrlSup, profileGetPreSignedUrlCol} from './backend-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ChangePassword } from '../models/change-password.model';
import { UpdateProfile } from '../models/update-profile.model';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class EmployeeManagementService {
    constructor(
        private api: ApiService,
        private http: HttpClient,
        private router: Router) { }
    
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
