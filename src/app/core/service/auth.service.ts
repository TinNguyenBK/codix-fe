import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  checkExistApi, otpApi, verifyOtpApi, loginUserApi, registerApi, cartApi,resentEmailApi,
  verifyEmailApi, activateEmailApi, getAdvisorApi, updateAdvisorApi,
  forgotPasswordApi, verifyForgotPasswordTokenApi, resetPasswordApi, 
  changeLanguages, decryptToken, 
   changeEditEmailApi, activePhoneApi,
  getAreaApi, registerUserrApi, registerColaboratorApi, loginColaboratorApi, certificateGetPreSignedUrlSup,
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

  register(registerForm) {
    return this.http.post<any>(registerApi, registerForm);
  }

  verify(verifyEmailData) {
    return this.http.post<any>(verifyEmailApi, verifyEmailData);
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  GetOtp(phoneNumber: string) {
    let url = otpApi.replace(':phoneNumber', phoneNumber);
    return this.http.post<any>(url, '');
  }

  VerifyOTP(uuid: string, otp: string) {
    let url = verifyOtpApi.replace(':UUID', uuid).replace(':OTP', otp);
    return this.http.post<any>(url, '');
  }

  activePhone(token: string, email: string, uuid:string) : Observable<any>{
    // let param = new HttpParams();
    // param = param.append('token',token);
    // param = param.append('email',email);
    // param = param.append('uuid',uuid);
    return this.http.post(activePhoneApi,{token, email, uuid}).pipe(
      map(data=>{
     
        return data;
      })
    )
    // var url = activateEmailApi.replace(':id', token);
    // return this.http.get<any>(url);
  }

  // verifyUserEmail(token: string) {
  //   var url = activateEmailApi.replace(':id', token);
  //   return this.http.get<any>(url);
  // }

  verifyUserEmail(token: string) : Observable<any>{
    let param = new HttpParams();
    param = param.append('token',token);
    return this.http.get(activateEmailApi,{params : param}).pipe(
      map(data=>{
     
        return data;
      })
    )
    // var url = activateEmailApi.replace(':id', token);
    // return this.http.get<any>(url);
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }

  checkExist(checkExistForm) {
    return this.http.post<any>(checkExistApi, checkExistForm)
  }
  //Get Advisor
  getAdvisor(advisorId: string) {
    return this.http.get<any>(`${getAdvisorApi}/${advisorId}`);
  }

  /**
   * Update advisor
   */
  updateAdvisor(advisorId: string) {
    var url = updateAdvisorApi.replace(':id', advisorId);
    return this.api.post(url, '');
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


  changeLanguage(language): Observable<any> {
    let param = new HttpParams();
    if (!isNullOrUndefined(language)) {
      param = param.append('language', language);

      if (this.api.isEnable()) {
        return this.http.post<any>(changeLanguages, '', { headers: this.api.headers, params: param }).pipe(
          map((value) => { }), catchError(value => throwError(value))
        );
      }
    }
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



  changeEditEmail(phoneNumber, phoneDialCode):Observable<any> {
    let param = new HttpParams();
    param = param.append('phone_number', phoneNumber);
    param = param.append('phone_dial_code', phoneDialCode);

    return this.http.put(changeEditEmailApi, '', {params : param}).pipe(
      map(data =>{
        return data;
      })
    )
  }



  getArea():Observable<any> {
      return this.http.get<any>(getAreaApi).pipe(
        map(response =>{
          return response;
        })
      )
  }


  registerUser(registerForm) {
    return this.http.post<any>(registerUserrApi, registerForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  loginUser(loginForm) {
    return this.http.post<any>(loginUserApi, loginForm,{
      headers: this.api.headers,
      observe: "response",
    });
  }


  registerColaborator(registerForm) {
    return this.http.post<any>(registerColaboratorApi, registerForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  loginColaborator(loginForm) {
    return this.http.post<any>(loginColaboratorApi, loginForm,{
      headers: this.api.headers,
      observe: "response",
    });
  }

  uploadCertificate(fileName: string, fileType: string){
    // const reqHeaders = new HttpHeaders({ Authorization: `Bearer ${this.accessToken.customer100}` });
    const bodyObj = { name: fileName, ext: fileType };
    return this.api.postObservableNo(certificateGetPreSignedUrlSup, bodyObj)
  }

  uploadFiletoS3(url: string, contentType: string, file){
    const headers = new HttpHeaders({ 'Content-Type': contentType });
    return this.http.put<any>(url, file, { headers: headers, reportProgress: true, observe: 'response' }).pipe();
  }

  checkEmailExisting(data: {mEmail: string}): Observable<any> {
    return this.api.postObservable(checkEmailExistingApi ,data);
  }


}
