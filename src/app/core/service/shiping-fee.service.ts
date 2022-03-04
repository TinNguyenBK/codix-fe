import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { getShipingFeeApi, setShipingFeeApi } from './backend-api';

@Injectable({
  providedIn: 'root',
})
export class ShipingFeeService {
  constructor(private api: ApiService, private http: HttpClient) {}

  token = localStorage.getItem('token');

  getShipingFee(data: any): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = getShipingFeeApi.replace(':supplierId', myId);
    return this.api.getObservable(url);
  }

  setShipingFee(data: any): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = setShipingFeeApi.replace(':supplierId', myId);
    return this.api.postObservable(url, { ...data, mSupplierId: myId });
  }
}
