import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = '/api/customers';

    constructor(private http: Http) { 

    }

    getCustomers() : Observable<ICustomer[]> {
        return this.http.get(this.baseUrl)
                   .map((res: Response) => {
                       let customers = res.json();
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get(this.baseUrl + '/' + id)
                   .map((res: Response) => res.json())
                   .catch(this.handleError); 
    }

    getStates() : Observable<IState[]> {
        return this.http.get('/api/states')
                   .map((res: Response) => res.json())
                   .catch(this.handleError);
    }


    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: any) {
        console.error('server error:', error); 
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
