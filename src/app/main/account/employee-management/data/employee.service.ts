import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './employee';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('data/employee.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }
}