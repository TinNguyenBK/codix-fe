import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpParams, } from '@angular/common/http'
import { 
    } from './backend-api';
import { Product, TranslationProduct } from './../models/product.model';
import { ApiService } from './api.service';
import { isNullOrUndefined } from 'util';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckNullOrUndefinedOrEmpty } from '../utils/common-function';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class ProductService
{

    constructor(
        private api: ApiService,
        private http: HttpClient,
    ) { }

    decoded

    
    

    renderImageIsCover(data): string{
        let storageKey = ""
        if(!isNullOrUndefined(data) && data.length > 0){
            data.forEach(element => {
                if(element.is_cover_photo === true){
                    storageKey =  element.storage_key
                }
            });
        }
        return storageKey
    }


}
