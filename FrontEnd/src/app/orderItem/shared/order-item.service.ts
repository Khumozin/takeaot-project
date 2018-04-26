import { Injectable } from '@angular/core';
import { OrderItem } from './order-item.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { OrderItemDetails } from './order-item-details.model';

@Injectable()
export class OrderItemService {

  orderItem : OrderItem;
  selectedorderItem : OrderItem;
  orderItemList : OrderItem[];

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method an order item
  addOrderItem(orderItem: OrderItem) {
    var body = JSON.stringify(orderItem);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/OrderItem', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method tHAT updates an order
  updateOrderItem(id, orderItem) {
    var body = JSON.stringify(orderItem);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/OrderItem/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP DELETE Method that REMOVES a CART
  deleteCart(id : number) {
    return this.http.delete(this.rootUrl + 'api/Cart/' + id)
    .map(res => res.json());
  }

}
