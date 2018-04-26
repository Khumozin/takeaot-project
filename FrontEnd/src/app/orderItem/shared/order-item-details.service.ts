import { Injectable } from '@angular/core';
import { OrderItemDetails } from './order-item-details.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderItemDetailsService {

  oIDList : Subject<Array<OrderItemDetails>> = new BehaviorSubject<Array<OrderItemDetails>>([])
  oIDSummary : Subject<Array<OrderItemDetails>> = new BehaviorSubject<Array<OrderItemDetails>>([])
  oList : OrderItemDetails[];
  myID : any = document.cookie.split("=");
  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http) { }

  // HTTP GET Method that gets an order item by order ids
  getOrderItem(id : number)
  {
    this.http
    .get(this.rootUrl + 'api/OrderItem?id=' + id)
    .map((res : any) => {
      return res.json();
    }).subscribe(
      (data : any) => {
        this.oIDList.next(data)
      },
      (err : any) => console.log("getOrderItem : Error"),
      () => console.log("getOrderItem: Always")
    )
  }

  // HTTP GET Method that gets an order summary by order id
  getOrderSummary(id : number)
  {
    this.http
    .get(this.rootUrl + 'api/GetOrderSummary?id=' + id /*this.myID[1] localStorage.getItem('CustomerID')*/)
    .map((res : any) => {
      return res.json();
    }).subscribe(
      (data : any) => {
        this.oIDSummary.next(data)
      },
      (err : any) => console.log("getOrderItem : Error"),
      () => console.log("getOrderItem: Always")
    )
  }

  // HTTP GET Method that gets an order summary by order id in json format
  getList(id : number) {
    return this.http.get(this.rootUrl + 'api/GetOrderSummary?id=' + id/*this.myID[1] localStorage.getItem('CustomerID')*/)
    .map((data : Response) => {
      return data.json() as OrderItemDetails[];
    }).toPromise().then(x => {
      this.oList = x;
    })
  }



}
