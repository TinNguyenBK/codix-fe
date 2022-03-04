
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { updateShippingApi  } from './backend-api';
import { ApiService } from './api.service'
import { Shipping } from '../models/shipping.model'
import { throwError } from 'rxjs';
import { CheckNullOrUndefinedOrEmpty } from '../utils/common-function';

@Injectable({
    providedIn: 'root'
})
export class ShippingService
{

    constructor(
        private http: HttpClient,
        private router: Router,
        private api: ApiService
    ) { }

    updateDeliveryAddress(shipping: Shipping, id: string)
    {
        var url = updateShippingApi.replace(':id', id);
        return this.api.put(url, shipping);
    }
}