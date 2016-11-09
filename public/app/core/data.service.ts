import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState } from '../shared/interfaces';

@Injectable()
export class DataService {
  
    baseUrl: string = '/api/customers';
    csrfToken: string = null;

    constructor(private http: Http) { 
        this.onInit();
    }

    onInit() {
        this.getCsrfToken();
    }

    getCsrfToken() {
        return this.http.get('/api/tokens/csrf')
                   .map((res: Response) => res.json().csrfToken)
                   .catch(this.handleError)
                   .subscribe((token: string) => {
                       this.csrfToken = token;
                   },
                   (err) => console.log(err));
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

    getCustomersPage(page: number, pageSize: number) {
        return this.http.get(`${this.baseUrl}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let customers = res.json();
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get(this.baseUrl + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post(this.baseUrl, customer, this.getRequestOptions())
                   .map((res: Response) => {
                       return res.json();
                   })
                   .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<boolean> {
        return this.http.put(this.baseUrl + '/' + customer._id, customer, this.getRequestOptions())
                   .map((res: Response) => res.json())
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {

        return this.http.delete(this.baseUrl + '/' + id, this.getRequestOptions())
                   .map((res: Response) => res.json())
                   .catch(this.handleError);
    }

    getRequestOptions() {
        const options = new RequestOptions({
            headers: new Headers({ 'csrf-token': this.csrfToken })
        });
        return options;
    }
    
    getStates(): Observable<IState[]> {
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
