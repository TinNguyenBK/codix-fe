import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders;
  token: string;
  constructor(private httpClient: HttpClient, private router: Router) {}

  isEnable() {
    // get token localstorege in localstorage
    this.token = 'Bearer ' + (localStorage.getItem('token') || sessionStorage.getItem('token')) ;
    console.log( this.token )
    // User had logged but profile in localstorage had delete
    if (isNullOrUndefined(this.token) || this.token === 'Bearer null') {
      this.router.navigate(['/employee-management']);
      return false;
    } else {
      this.headers = new HttpHeaders({
        Authorization: 'Bearer ' + (localStorage.getItem('token') || sessionStorage.getItem('token')),
      });
      return true;
    }
  }

  get(resource) {
    if (this.isEnable()) {
      return this.httpClient.get<any>(resource, { headers: this.headers });
    }
  }

  post(resource, data) {
    if (this.isEnable()) {
      return this.httpClient.post<any>(resource, data, {
        headers: this.headers,
      });
    }
  }

  put(resource, data) {
    if (this.isEnable()) {
      return this.httpClient.put<any>(resource, data, {
        headers: this.headers,
      });
    }
  }

  delete(resource) {
    if (this.isEnable()) {
      return this.httpClient.delete<any>(resource, { headers: this.headers });
    }
  }

  getObservable(resource) {
    if (this.isEnable()) {
      return this.httpClient.get<any>(resource, {
        headers: this.headers,
        observe: 'response',
      });
    }
  }

  postObservableNo(resource, data) {
    return this.httpClient.post<any>(resource, data, {
      observe: 'response',
    });
  }

  postObservable(resource, data) {
    if (this.isEnable()) {
      return this.httpClient.post<any>(resource, data, {
        headers: this.headers,
        observe: 'response',
      });
    }
  }

  patchObservableNo(resource, data) {
    return this.httpClient.patch<any>(resource, data, {
      observe: 'response',
    });
  }

  patchObservable(resource, data) {
    if (this.isEnable()) {
      return this.httpClient.patch<any>(resource, data, {
        headers: this.headers,
        observe: 'response',
      });
    }
  }

  deleteObservable(resource) {
    if (this.isEnable()) {
      return this.httpClient.delete<any>(resource, {
        headers: this.headers,
        observe: 'response',
      });
    }
  }
}
