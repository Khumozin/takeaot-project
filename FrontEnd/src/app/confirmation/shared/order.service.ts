import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CartDetails } from '../../cart/shared/cart-details.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderService {

  orderDetailsList : Subject<Array<Order>> = new BehaviorSubject<Array<Order>>([])

  order : Order;
  orderStatus : Order[];
  invoice : Order[];
  lastOrder : Order[];

  selectedOrder : Order;
  orderList : Order;
  orders : Order[];
  customerOrder : Order;
  myID : any = document.cookie.split("=");
  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http : Http, private httpClient : HttpClient) { }

  // HTTP POST Method that SAVES AN ORDER
  addOrder(order : Order) {
    var body = JSON.stringify(order);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Order', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets an order BY CUSTOMER id
  getOrder()
  {
  return this.http.get(this.rootUrl + 'api/Order?id=' + this.myID[1]/*localStorage.getItem('CustomerID')*/);
  }

  // HTTP GET Method that gets a LIST OF ORDER
  getOrders() {
    this.http.get(this.rootUrl + 'api/Order')
    .map((data : Response) => {
      return data.json() as Order[];
    }).toPromise().then(x => {
      this.orders = x;
    })
  }

// HTTP GET Method that gets a LIST OF ORDER
  getO()
  {
    this.http
    .get(this.rootUrl + 'api/Order')
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.orderDetailsList.next(data);
      },
      (err : any) => console.error("getCartList: Error"),
      () => console.log("getCartList: Always")
    )
  }

  // HTTP GET Method that gets an order by cusomer id in descending order
  getCustomerOrder(id : number) {
    return this.http.get(this.rootUrl + 'api/getCustomerOrder?id=' + id);
  }

  // getting last order by customer id
  getOrderByCustomerID(id : number)
  {
    return this.http.get(this.rootUrl + 'api/GetOrderByCustomerID?id=' + id);
  }

  // HTTP GET Method that gets an order delivery status
  getOrderByStatus(status : string) 
  {
    this.http.get(this.rootUrl + 'api/GetOrderByStatus?status=' + status)
    .map((data : Response) => {
      return data.json() as Order[];
    }).toPromise().then(x => {
      this.orderStatus = x;
    })
  }

  // HTTP GET Method that gets an invoice
  getOrderByID(id : number) 
  {
    this.http.get(this.rootUrl + 'api/Invoice?id=' + id)
    .map((data : Response) => {
      return data.json() as Order[];
    }).toPromise().then(x => {
      this.invoice = x;
    })
  }

  // HTTP PUT Method that updates an order
  updateOrder(id, order) {
    var body = JSON.stringify(order);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Order/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }



}
