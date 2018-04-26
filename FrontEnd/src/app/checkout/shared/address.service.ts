import { Injectable } from '@angular/core';
import { Address } from './address.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AddressService {

  address : Address;
  selectedAddress : Address;
  myID : any = document.cookie.split("=");
  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http, private httpClient : HttpClient) { }

    // HTTP POST Method that a new address
  addAddress(address : Address) {
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
    
    return this.http.put(this.rootUrl + 'api/Address' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

   // HTTP GET Method that gets an address by customer id
   getAddress() {
    return this.http.get(this.rootUrl + 'api/Address?id=' +  this.myID[1] /*+localStorage.getItem('CustomerID');*/);
  }
  
}
