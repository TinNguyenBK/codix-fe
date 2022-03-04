import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { getIndustryGroupApi, productCategoryApi, productGetPreSignedUrl, getProductCategoriesApi, getCategoryDetailApi, deleteCategoryDetailApi, 
  productInventoryApi, getProductInventoriesApi, getInventoryDetailApi, getIndustryGroupColApi, getProductInventoriesColApi,
  getProductCategoryColApi, getCategoryDetailColApi, getInventoryDetailColApi
} from './backend-api';
import { catchError, map } from 'rxjs/operators';
import { isEmptyOrNullOrUndefined } from 'app/main/account/profile/_helper/helper-fn';
import { CustomerInforAdvisor, MyContacts, MyCustomer } from '../models/my-contacts.model';
import { CheckNullOrUndefinedOrEmpty } from '../utils/common-function';
import { Injectable } from '@angular/core';
import { CustomerInformation } from '../models/my-customers';
import HelperFn from '../helper/helper-fn';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralInforService {
  
  helperFn = new HelperFn();

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }

  getIndustryGroup(supplierId): Observable<any> {
    let url = '';
    url = getIndustryGroupApi.replace(':supplierId', supplierId);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }


  getIndustryGroupCol(collaboratorId): Observable<any> {
    let url = '';
    url = getIndustryGroupColApi.replace(':collaboratorId', collaboratorId);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getProductCategoriesCol(collaboratorId,  mCommodityId): Observable<any> {
    let url = '';
    let search = {
      where: {
        mCommodityId: mCommodityId
      }
    }
    let query = encodeURIComponent(JSON.stringify(search))
    url = getProductCategoryColApi.replace(':collabId', collaboratorId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }
  

  createProductCategory(supplierId, categoryForm){
    let url = '';
    url = productCategoryApi.replace(':supplierId', supplierId);
    return this.http.post<any>(url, categoryForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  updateProductCategory(supplierId, id, categoryForm){
    let url = '';
    url = getCategoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.patch<any>(url, categoryForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  deleteProductCategory(supplierId, id){
    let url = '';
    url = deleteCategoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.delete<any>(url, {
      headers: this.api.headers,
      observe: "response",
    });
  }


  createProductInventory(supplierId, inventoryForm){
    let url = '';
    url = productInventoryApi.replace(':supplierId', supplierId);
    return this.http.post<any>(url, inventoryForm, {
      headers: this.api.headers,
      observe: "response",
    });
  }

  updateProductInventory(supplierId, id, inventoryForm){
    let url = '';
    url = getInventoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.patch<any>(url, inventoryForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  deleteProductInventory(supplierId, id){
    let url = '';
    url = getInventoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.delete<any>(url, {
      headers: this.api.headers,
      observe: "response",
    });
  }

  // getProductGroup(supplierId): Observable<any> {
  //   let url = '';
  //   url = getIndustryGroupApi.replace(':supplierId', supplierId);
  //   return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
  //     map(value => {
  //         return value;
  //     }), catchError(value => throwError(value))
  //   );
  // }


  uploadImageProduct(fileName: string, fileType: string) {
    // const reqHeaders = new HttpHeaders({ Authorization: `Bearer ${this.accessToken.customer100}` });
    const bodyObj = { name: fileName, ext: fileType };
    return this.api.postObservable(productGetPreSignedUrl, bodyObj)

  }

  uploadFiletoS3(url: string, contentType: string, file){
    const headers = new HttpHeaders({ 'Content-Type': contentType });
    return this.http.put<any>(url, file, { headers: headers, reportProgress: true, observe: 'response' }).pipe();
  }

  getListProductCategories(supplierId, mCommodityId): Observable<any> {
    let url = '';
    let search = {
      where: {
        mCommodityId: mCommodityId
      }
    }
    let query = encodeURIComponent(JSON.stringify(search))
    url = getProductCategoriesApi.replace(':supplierId', supplierId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductCategoriesQuery(supplierId, queryModel: any): Observable<any> {
    let url = '';
    
    let query = encodeURIComponent(JSON.stringify(queryModel))
    url = getProductCategoriesApi.replace(':supplierId', supplierId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductCategoriesColQuery(collabId, queryModel: any): Observable<any> {
    let url = '';
    
    let query = encodeURIComponent(JSON.stringify(queryModel))
    url = getProductCategoryColApi.replace(':collabId', collabId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductInventoriesQuery(supplierId, queryModel: any): Observable<any> {
    let url = '';
    
    let query = encodeURIComponent(JSON.stringify(queryModel))
    url = getProductInventoriesApi.replace(':supplierId', supplierId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductInventoriesQueryCol(collabId, queryModel: any): Observable<any> {
    let url = '';
    
    let query = encodeURIComponent(JSON.stringify(queryModel))
    url = getProductInventoriesColApi.replace(':collabId', collabId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductInventories(supplierId, mCommodityId): Observable<any> {
    let url = '';
    let search = {
      where: {
        mCommodityId: mCommodityId
      }
    }
    let query = encodeURIComponent(JSON.stringify(search))
    url = getProductInventoriesApi.replace(':supplierId', supplierId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getListProductInventoriesCol(collabId, mCommodityId): Observable<any> {
    let url = '';
    let search = {
      where: {
        mCommodityId: mCommodityId
      }
    }
    let query = encodeURIComponent(JSON.stringify(search))
    url = getProductInventoriesColApi.replace(':collabId', collabId).replace(':query', query);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }


  getCategoryDetail(supplierId, id): Observable<any> {
    let url = '';
    url = getCategoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getCategoryDetailCol(collabId, id): Observable<any> {
    let url = '';
    url = getCategoryDetailColApi.replace(':collabId', collabId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getInventoryDetail(supplierId, id): Observable<any> {
    let url = '';
    url = getInventoryDetailApi.replace(':supplierId', supplierId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  getInventoryDetailCol(collabId, id): Observable<any> {
    let url = '';
    url = getInventoryDetailColApi.replace(':collabId', collabId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }



}
