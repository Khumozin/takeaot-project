import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

  customer: Customer;
  cID : Customer;
  readonly rootUrl = 'http://localhost:53657/';
  
  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that registers the customer
  registerCustomer(customer: Customer) {
    var body = JSON.stringify(customer);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Customer', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates the customer's data
  updateCustomer(id, customer) {
    var body = JSON.stringify(customer);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    
    return this.http.put(this.rootUrl + 'api/Customer/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  
  // user authentication method(get a token by passing valid email and password)
  authentication(email, password)
  {
    var data = "username=" + email + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.httpClient.post(this.rootUrl + 'token', data, {headers : reqHeader});
  }

  // HTTP GET Method that get the customer's details
  getCustomerClaims()
  {
    return this.httpClient.get(this.rootUrl + 'api/GetCustomerClaims', 
    {headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('token')})});
  }

  // HTTP GET Method that gets the customer's data by an email
  getCustomer(email : String)
  {
    return this.http.get(this.rootUrl + 'api/Customer?email=' + email);
  }
  
  // method that chescks if the user is authenticated or not
  get isAuthenticated() {
    if (localStorage.getItem('token') != null)
    {
      return true;
    } else {
      return false;
    }
  }

  // check if the user is an admin
  get adminType(){
    if (localStorage.getItem('type') === 'Admin')
    {
      return true;
    } else {
      return false;
    }
  }

  // check if the user is an customer
  get customerType(){
    if (localStorage.getItem('type') === 'Customer')
    {
      return true;
    } else {
      return false;
    }
  }

  // check if the user is an driver
  get driverType(){
    if (localStorage.getItem('type') === 'Driver')
    {
      return true;
    } else {
      return false;
    }
  }

  // check if the user is an supplier
  get supplierType(){
    if (localStorage.getItem('type') === 'Supplier')
    {
      return true;
    } else {
      return false;
    }
  }

}
