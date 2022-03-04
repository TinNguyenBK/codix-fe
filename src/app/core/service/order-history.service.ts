import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  getOrderDetailApi,
  getTotalOrderApi,
  getOrderHistoryApi,
  updateShipFeeByOrderIdApi,
} from './backend-api';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IOrderQuery } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}

  getOrderDetail(supplierId, id): Observable<any> {
    let url = '';
    url = getOrderDetailApi
      .replace(':supplierId', supplierId)
      .replace(':id', id);
    return this.http
      .get<any>(url, { headers: this.api.headers, observe: 'response' })
      .pipe(
        map((value) => {
          return value;
        }),
        catchError((value) => throwError(value))
      );
  }

  getTotalOrder(id, data: {}): Observable<any> {
    const query = encodeURIComponent(JSON.stringify(data));
    const url = getTotalOrderApi
      .replace(':supplierId', id)
      .replace(':query', query);
    // return this.api.getObservable(url).pipe();
    return this.api.getObservable(url);
  }

  getOrderHistory(id, data: IOrderQuery): Observable<any> {
    const query = encodeURIComponent(JSON.stringify(data));
    const url = getOrderHistoryApi
      .replace(':supplierId', id)
      .replace(':query', query);
    return this.api.getObservable(url).pipe();
  }

  updateOrderDetailById(supplierId, id, data): Observable<any> {
    let url = '';
    url = getOrderDetailApi
      .replace(':supplierId', supplierId)
      .replace(':id', id);
    return this.http.patch<any>(url, data, {
      headers: this.api.headers,
      observe: 'response',
    });
  }

  updateShipFeeByOrderId(supplierId, id, data): Observable<any> {
    let url = '';
    url = updateShipFeeByOrderIdApi
      .replace(':supplierId', supplierId)
      .replace(':id', id);
    return this.http.patch<any>(url, data, {
      headers: this.api.headers,
      observe: 'response',
    });
  }
}
