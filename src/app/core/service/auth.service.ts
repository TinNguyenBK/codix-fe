import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { resentEmailApi, activateEmailApi,
  forgotPasswordApi, verifyForgotPasswordTokenApi, resetPasswordApi, decryptToken, 
  checkEmailExistingApi
} from './backend-api';
import { ResetPassword } from '../../core/models/reset-password.model';
import { isNullOrUndefined } from 'util';
import { observable, Observable, throwError } from 'rxjs';
import { Advisor } from 'app/core/models/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) { }


  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }


  verifyUserEmail(token: string) : Observable<any>{
    let param = new HttpParams();
    param = param.append('token',token);
    return this.http.get(activateEmailApi,{params : param}).pipe(
      map(data=>{
     
        return data;
      })
    )
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }


  forgotPassword(mEmail: string) {
    return this.http.patch<any>(forgotPasswordApi, { mEmail }, {observe: 'response'});
  }

  verifyForgotPasswordToken(token: string) {
    return this.http.post<any>(verifyForgotPasswordTokenApi, { token });
  }

  // resetPassword(resetPassword: ResetPassword) {
  //   return this.http.post<any>(resetPasswordApi, resetPassword);
  // }

  resetPassword(data: {userId: string, token1: string, token2: string, mPassword: string}) {
    let url = '';
    url = verifyForgotPasswordTokenApi.replace(':userId', data.userId);
    url = url.replace(':token1', data.token1);
    url = url.replace(':token2', data.token2);
    return this.http.patch<any>(url, {mPassword: data.mPassword}, {observe: 'response'});
  }

  decryptTokenData(token: string) {
    let param = new HttpParams();
    if (!isNullOrUndefined(token)) {
      param = param.append('token', token);
      return this.http.get<any>(decryptToken, { headers: this.api.headers, params: param }).pipe(
        map((data) => {
          if (data.code === 200) {
            let decrypt = {
              public_id: data.decrypt.public_id,
              expired: data.decrypt.expired
            }
            return decrypt;
          }
        }), catchError(value => throwError(value))
      );
    }
  }

  

  resentEmail(email : string) :Observable<any>{
    let param = new HttpParams();
    param = param.append('email',email);
    return this.http.post(resentEmailApi,'',{params : param}).pipe(
      map(data=>{
        return data;
      })
    )
  }

  uploadFiletoS3(url: string, contentType: string, file){
    const headers = new HttpHeaders({ 'Content-Type': contentType });
    return this.http.put<any>(url, file, { headers: headers, reportProgress: true, observe: 'response' }).pipe();
  }

  checkEmailExisting(data: {mEmail: string}): Observable<any> {
    return this.api.postObservable(checkEmailExistingApi ,data);
  }


}
