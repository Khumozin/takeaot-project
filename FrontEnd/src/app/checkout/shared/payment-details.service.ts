import { Injectable } from '@angular/core';
import { PaymentDetails } from './payment-details.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentDetailsService {

  paymentList : Subject<Array<PaymentDetails>> = new BehaviorSubject<Array<PaymentDetails>>([])

  readonly rootUrl = 'http://localhost:53657/'; 

  constructor(private http : Http, private httpClient : HttpClient) { }

    // HTTP GET Method that gets a payment by customer id
  getPayment() {
    this.http
    .get(this.rootUrl + 'api/Payment?id=' + localStorage.getItem('CustomerID'))
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.paymentList.next(data);
      },
      (err : any) => console.error("getCartList: Error"),
      () => console.log("getCartList: Always")
    )
  }

}
