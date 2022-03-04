import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import {
  supplierDeleteAllNotificationsApi,
  supplierDeleteNotificationByIdApi,
  supplierGetNotificationsApi,
  supplierGetTotalNotificationApi,
  supplierMarkAllNotificationAsReadApi,
  supplierMarkNotificationAsReadApi,
} from './backend-api';
import { Product, TranslationProduct } from '../models/product.model';
import { ApiService } from './api.service';
import { isNullOrUndefined } from 'util';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckNullOrUndefinedOrEmpty } from '../utils/common-function';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private api: ApiService, private http: HttpClient) {}

  token = localStorage.getItem('token');

  getTotalNotifications(query: any): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    query = decodeURIComponent(JSON.stringify(query));
    let url = '';
    url = supplierGetTotalNotificationApi
      .replace(':query', query)
      .replace(':id', myId);
    return this.api.getObservable(url);
  }

  getNotifications(query: any): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    query = decodeURIComponent(JSON.stringify(query));
    let url = '';
    url = supplierGetNotificationsApi
      .replace(':query', query)
      .replace(':id', myId);

    return this.api.getObservable(url);
  }

  markNotificationAsRead(notiId): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = supplierMarkNotificationAsReadApi
      .replace(':userId', myId)
      .replace(':notiId', notiId);

    return this.api.patchObservable(url, {});
  }

  markAllNotificationsAsRead(): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = supplierMarkAllNotificationAsReadApi.replace(':userId', myId);

    return this.api.patchObservable(url, {});
  }

  deleteNotification(notiId): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = supplierDeleteNotificationByIdApi
      .replace(':userId', myId)
      .replace(':notiId', notiId);

    return this.api.deleteObservable(url);
  }

  deleteAllNotifications(): Observable<any> {
    const myId = jwt_decode(this.token).mId;
    let url = '';
    url = supplierDeleteAllNotificationsApi.replace(':userId', myId);

    return this.api.deleteObservable(url);
  }
}
