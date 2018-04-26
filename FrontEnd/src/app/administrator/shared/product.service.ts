import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {

  proQuant : Subject<Array<Product>> = new BehaviorSubject<Array<Product>>([])
  p : Subject<Array<Product>> = new BehaviorSubject<Array<Product>>([])
  productBySupplier : Product[];

  productQuantity : Product;
  product : Product;
  selectedProduct : Product;
  productList : Product[];
  productCategory : Product[];

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method that ADDS a product
  addProduct(product : Product) {
    var body = JSON.stringify(product);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Product', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that UPDATES a product 
  updateProduct(id, product) {
    var body = JSON.stringify(product);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Product/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a product by product id
  getP(id : number)
  {
    this.http
    .get(this.rootUrl + 'api/Product/' + id)
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.p.next(data);
      },
      (err : any) => console.error("getP: Error"),
      () => console.log("getP: Always")
    )
  }

  // HTTP GET Method that gets a product by supplier id
  getProductBySupplierID(id : number)
  {
      this.http.get(this.rootUrl + 'api/GetProductBySupplierID?id=' + id)
      .map((data : Response) => {
        return data.json() as Product[];
      }).toPromise().then(x => {
        this.productBySupplier = x;
    })
  }

  // HTTP GET Method that gets a list of products
  getProductList() {
    this.http.get(this.rootUrl + 'api/Product')
    .map((data : Response) => {
      return data.json() as Product[];
    }).toPromise().then(x => {
      this.productList = x;
    })
  }

// HTTP GET Method that gets a product by category, response is in json format
  /*getProductByCategory(category : string) {
    this.http.get(this.rootUrl + 'api/GetProductByCategory?category=' + category)
    .map((data : Response) => {
      return data.json() as Product[];
    }).toPromise().then(x => {
      this.productCategory = x;
    })
  }*/

  // HTTP GET Method that gets a product by category
  getProCat(category : string)
  {
    this.http
    .get(this.rootUrl + 'api/GetProductByCategory?category=' + category)
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.proQuant.next(data);
      },
      (err : any) => console.error("getProCat: Error"),
      () => console.log("getProCat: Always")
    )
  }

  // HTTP GET Method that gets a product quantity by product id
  getProductQuantity(id : number)
  {
    return this.http.get(this.rootUrl + 'api/Product?id=' + id)
  }

  // HTTP DELETE Method that removes a productfrom the DB
  deleteProduct(id : number) {
    return this.http.delete(this.rootUrl + 'api/Product/' + id)
    .map(res => res.json());
  }


}
