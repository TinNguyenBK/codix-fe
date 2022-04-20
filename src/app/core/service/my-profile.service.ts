import { myProfileApi, changePasswordApi, profileGetPreSignedUrl,} from './backend-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../environments/environment';


import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class MyProfileService {
    constructor(
        private api: ApiService,
        private http: HttpClient,
        private router: Router) { }

    getProfile() {
        return this.api.get(myProfileApi).pipe(retry(3), catchError(this.errorHandler));
    }


    getPreSignedUrl(fileName: string, fileType: string) {
        // const reqHeaders = new HttpHeaders({ Authorization: `Bearer ${this.accessToken.customer100}` });
        const bodyObj = { name: fileName, type: fileType };
        // return this.http.post<any>(`${profileGetPreSignedUrl}`, bodyObj, {
        //     headers: reqHeaders
        // }).pipe(retry(3), catchError(this.errorHandler));
        return this.api.post(profileGetPreSignedUrl, bodyObj).pipe(retry(3), catchError(this.errorHandler));

    }

    uploadProfileImage(url: string, contentType: string, file) {
        const headers = new HttpHeaders({ 'Content-Type': contentType });
        return this.http.put<any>(url, file, { headers: headers, reportProgress: true }).pipe(retry(3), catchError(this.errorHandler));
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
