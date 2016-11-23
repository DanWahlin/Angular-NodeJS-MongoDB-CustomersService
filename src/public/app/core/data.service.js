"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.baseUrl = '/api/customers';
        this.csrfToken = null;
        this.onInit();
    }
    DataService.prototype.onInit = function () {
        this.getCsrfToken();
    };
    DataService.prototype.getCsrfToken = function () {
        var _this = this;
        return this.http.get('/api/tokens/csrf')
            .map(function (res) { return res.json().csrfToken; })
            .catch(this.handleError)
            .subscribe(function (token) {
            _this.csrfToken = token;
        }, function (err) { return console.log(err); });
    };
    DataService.prototype.getCustomers = function () {
        var _this = this;
        return this.http.get(this.baseUrl)
            .map(function (res) {
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return customers;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomersPage = function (page, pageSize) {
        var _this = this;
        return this.http.get(this.baseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return {
                results: customers,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomer = function (id) {
        return this.http.get(this.baseUrl + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.insertCustomer = function (customer) {
        return this.http.post(this.baseUrl, customer, this.getRequestOptions())
            .map(function (res) {
            var data = res.json();
            console.log('insertCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateCustomer = function (customer) {
        return this.http.put(this.baseUrl + '/' + customer._id, customer, this.getRequestOptions())
            .map(function (res) {
            var data = res.json();
            console.log('updateCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteCustomer = function (id) {
        return this.http.delete(this.baseUrl + '/' + id, this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getRequestOptions = function () {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'csrf-token': this.csrfToken })
        });
        return options;
    };
    DataService.prototype.getStates = function () {
        return this.http.get('/api/states')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.calculateCustomersOrderTotal = function (customers) {
        for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
            var customer = customers_1[_i];
            if (customer && customer.orders) {
                var total = 0;
                for (var _a = 0, _b = customer.orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map