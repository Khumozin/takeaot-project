import { Injectable } from '@angular/core';
import { AddressDetails } from './address-details.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AddressDetailsService {

  addressDetails : AddressDetails;
  addressList : AddressDetails;
  myID : any = document.cookie.split("=");

  readonly rootUrl = 'http://localhost:53657/';  

  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that a new address
  addAddress(address : AddressDetails) {
    var body = JSON.stringify(address);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Address', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that an existing address
  updateAddress(id, address) {
    var body = JSON.stringify(address);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    
    return this.http.put(this.rootUrl + 'api/Address/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP DELETE Method that removes an existing address
  deleteAddress(id : number) {
    return this.http.delete(this.rootUrl + 'api/Address/' + id)
    .map(res => res.json());
  }

  // HTTP GET Method that gets an address by customer id
  getAddress() {
    return this.http.get(this.rootUrl + 'api/Address?id=' + this.myID[1]/*localStorage.getItem('CustomerID')*/);
  }

  // HTTP GET Method that gets an address
  getAdd(id : number) {
    return this.http.get(this.rootUrl + 'api/Address?id=' + id);
  }

}
