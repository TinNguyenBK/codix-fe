import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { ApiService } from './api.service';
import {
  supplierGetSupplierDeptByIdApt,
  supplierGetSupplierDeptsApt,
  supplierGetTotalSupplierDeptsApt,
} from './backend-api';

@Injectable({ providedIn: 'root' })
export class DeptService {
  constructor(private api: ApiService, private http: HttpClient) {}

  getSupplierDeptById(data: string, supplierId: string): Observable<any> {
    let url = '';
    url = supplierGetSupplierDeptByIdApt
      .replace(':id', data)
      .replace(':supplierId', supplierId);
    return this.api.getObservable(url).pipe();
  }

  getTotalSupplierDepts(data: {}, supplierId: string): Observable<any> {
    const query = encodeURIComponent(JSON.stringify(data));
    let url = '';
    url = supplierGetTotalSupplierDeptsApt
      .replace(':query', query)
      .replace(':supplierId', supplierId);

    // const url = bossGetTotalCollaboratorsApi.replace(':query', query);
    return this.api.getObservable(url).pipe();
  }

  getSupplierDepts(data: any, supplierId: string): Observable<any> {
    const query = encodeURIComponent(JSON.stringify(data));
    let url = '';
    url = supplierGetSupplierDeptsApt
      .replace(':query', query)
      .replace(':supplierId', supplierId);
    return this.api.getObservable(url).pipe();
  }
}
