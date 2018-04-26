import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CartDetails } from './cart-details.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {

  cart : Cart;
  selectedCart : Cart;
  cartList : CartDetails[];

  cartItemList : Subject<Array<Cart>> = new BehaviorSubject<Array<Cart>>([])

  myID : any = document.cookie.split("=");

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method that adds a new customer cart to the database
  addCart(cart: Cart) {
    var body = JSON.stringify(cart);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Cart', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates a cart
  updateCart(id, cart) {
    var body = JSON.stringify(cart);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Cart/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a customer cart by customer id
  getCartItem() {
    this.http
    .get(this.rootUrl + 'api/GetCartByCustomer?id=' + this.myID[1] /*localStorage.getItem('CustomerID')*/)
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.cartItemList.next(data);
      },
      (err : any) => console.error("getCartItem: Error"),
      () => console.log("getCartItem: Always")
    )
  }

    // HTTP GET Method that gets a customer cart by customer id
  getCartList() {
  this.http.get(this.rootUrl + 'api/Cart?id=' + this.myID[1] /*localStorage.getItem('CustomerID')*/)
    .map((data : Response) => {
      return data.json() as CartDetails[]
    }).toPromise().then(c => {
      this.cartList = c;
    })
  }

    // HTTP DELETE Method that removes a crat
  deleteCart(id : number) {
    return this.http.delete(this.rootUrl + 'api/Cart/' + id)
    .map(res => res.json());
  }

  

}
