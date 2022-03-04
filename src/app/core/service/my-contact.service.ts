import { customer } from './../models/list_recruit.model';
import { forEach, isEmpty } from 'lodash';
import { isNullOrUndefined } from 'util';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import {  createContactApi, getCustomerListApi, getCustomerDetailApi,
        updateContactApi, checkUpdateContactApi, searchCustomerByTelApi, createContactHaveTelApi, 
        customerGetPreSignedUrl, deleteContactHaveTelApi} from './backend-api';
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
export class MyContactsService {
  
  helperFn = new HelperFn();

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }

  

  getCustomerlist(searchContact, collaboratorId): Observable<any> {
    let listCustomer = [];
    let url = '';
    let search = {
      include: [
        {
          relation: "mCustomer",
          order: "mModified DESC",
          scope: {
            include: [
              {
                  relation: 'mArea'
              }
            ],
            where: {
                or: [
                  {
                    mDisplayName: {
                    like: `%${searchContact}%`
                    }
                  },
                  {
                    mTelNumber1: {
                      like: `%${searchContact}%`
                    }
                  },
                  {
                    mTelNumber2: {
                      like: `%${searchContact}%`
                    }
                  },
                  {
                    mAddress: {
                      like: `%${searchContact}%`
                    }
                  }
                ]
              }
          }
        }
      ]
    }
    // if(!searchContact) {
    //     delete search.include
    // }
    let query = encodeURIComponent(JSON.stringify(search))
    url = getCustomerListApi.replace(':collaboratorId', collaboratorId).replace(':query', query)
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
        if (value.status === 200 && !CheckNullOrUndefinedOrEmpty(value.body)) {
          value.body.forEach(element => {
            if(element.mCustomer) {
              let customer = new MyCustomer();
              customer.mAddress = element.mCustomer.mAddress;
              customer.mCreated = element.mCustomer.mCreated;
              customer.mDisplayName = element.mCustomer.mDisplayName;
              customer.mEmail1 = element.mCustomer.mEmail1;
              customer.mEmail2 = element.mCustomer.mEmail2;
              customer.mId = element.mCustomer.mId;
              customer.mModified = element.mCustomer.mModified;
              customer.mRepresentative1 = element.mCustomer.mRepresentative1;
              customer.mRepresentative2 = element.mCustomer.mRepresentative2;
              customer.mStatus = element.mCustomer.mStatus;
              customer.mTelNumber1 = element.mCustomer.mTelNumber1;
              customer.mTelNumber2 = element.mCustomer.mTelNumber2;
              customer.mIsReceipt = element.mCustomer.mIsReceipt
              listCustomer.push(customer)
            }
          });
        }
          return listCustomer;
      }), catchError(value => throwError(value))
    );
  }

  getCustomerDetail(collaboratorId, id): Observable<any> {
    let listCustomer = [];
    let url = '';
    url = getCustomerDetailApi.replace(':collaboratorId', collaboratorId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  
  
  aggregateGifts(gifts: any[]): GiftDisplay[] {
    const giftDisplayArr: GiftDisplay[] = [];
    for (const gift of gifts) {
      const giftId = (gift.single_paymt_gift_product_id) ? gift.single_paymt_gift_product_id : gift.online_bank_transfer_gift_product_id;
      const giftObj = giftDisplayArr.find(obj => obj.id === giftId);
      if (!giftObj) {
        const giftName = (gift.single_paymt_gift_product_name) ? gift.single_paymt_gift_product_name : gift.online_bank_transfer_gift_product_name;
        const giftDisplay: GiftDisplay = {
          id: giftId,
          name: giftName,
          quantity: 1
        };
        giftDisplayArr.push(giftDisplay);
      }
      else {
        giftObj.quantity += 1;
      }
    }
    return giftDisplayArr;
  }

  renderAttachment(data): string {
    let coverPhotoKey = '';
    if (!isNullOrUndefined(data) && data.length > 0) {
        data.forEach(element => {
            if (element.is_cover_photo === true) {
                coverPhotoKey = element.storage_key;

            }
        });
    }
    return coverPhotoKey;
  }

  

  createContact(contactForm, collaboratorId){
    let url = '';
    url = createContactApi.replace(':collaboratorId', collaboratorId);
    return this.http.post<any>(url, contactForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  createContactHaveTel(collaboratorId, telNumber){
    let url = '';
    url = createContactHaveTelApi.replace(':collaboratorId', collaboratorId).replace(':telNumber', telNumber);
    return this.http.post<any>(url, telNumber , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  deleteContactByTel(collaboratorId, telNumber){
    let url = '';
    url = deleteContactHaveTelApi.replace(':collaboratorId', collaboratorId).replace(':telNumber', telNumber);
    return this.http.post<any>(url, telNumber , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  updateContact(contactForm, collaboratorId, id){
    let url = '';
    url = updateContactApi.replace(':collaboratorId', collaboratorId).replace(':id', id);
    return this.http.patch<any>(url, contactForm , {
      headers: this.api.headers,
      observe: "response",
    });
  }

  // checkUpdateContact(collaboratorId, id){
  //   let url = '';
  //   url = checkUpdateContactApi.replace(':collaboratorId', collaboratorId).replace(':id', id);
  //   return this.http.get<any>(url,{
  //     headers: this.api.headers,
  //     observe: "response",
  //   });
  // }

  checkUpdateContact(collaboratorId, id): Observable<any> {
    let url = '';
    url = checkUpdateContactApi.replace(':collaboratorId', collaboratorId).replace(':id', id);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  searchCustomerByTel(collaboratorId, telNumber): Observable<any> {
    let url = '';
    url = searchCustomerByTelApi.replace(':collaboratorId', collaboratorId).replace(':telNumber', telNumber);
    return this.http.get<any>(url, { headers: this.api.headers, observe: "response"}).pipe(
      map(value => {
          return value;
      }), catchError(value => throwError(value))
    );
  }

  uploadAvataCus(fileName: string, fileType: string) {
    // const reqHeaders = new HttpHeaders({ Authorization: `Bearer ${this.accessToken.customer100}` });
    const bodyObj = { name: fileName, ext: fileType };
    return this.api.postObservable(customerGetPreSignedUrl, bodyObj)

}

uploadFiletoS3(url: string, contentType: string, file){
    const headers = new HttpHeaders({ 'Content-Type': contentType });
    return this.http.put<any>(url, file, { headers: headers, reportProgress: true, observe: 'response' }).pipe();
  }


}


interface GiftDisplay {
  id: string;
  name: string;
  quantity: number;
}