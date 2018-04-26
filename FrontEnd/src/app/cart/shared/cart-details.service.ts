import { Injectable } from '@angular/core';
import { CartDetails } from './cart-details.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartDetailsService {

  cartDetailsList : Subject<Array<CartDetails>> = new BehaviorSubject<Array<CartDetails>>([])

  cartDetails : CartDetails;

  orderDetails : CartDetails;
  orderList : CartDetails[];

  myID : any = document.cookie.split("=");

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http) { }


  getCartList() {
    this.http
    .get(this.rootUrl + 'api/Cart?id=' + this.myID[1] /*localStorage.getItem('CustomerID')*/)
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.cartDetailsList.next(data);
      },
      (err : any) => console.error("getCartList: Error"),
      () => console.log("getCartList: Always")
    )
  }

  getList() {
    return this.http.get(this.rootUrl + 'api/Cart?id=' + this.myID[1] /*localStorage.getItem('CustomerID')*/)
    .map((data : Response) => {
      return data.json() as CartDetails[];
    }).toPromise().then(x => {
      this.orderList = x;
    })
  }

}
