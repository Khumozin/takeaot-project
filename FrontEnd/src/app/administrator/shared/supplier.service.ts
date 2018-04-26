import { Injectable } from '@angular/core';
import { Supplier } from './supplier.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SupplierService {

  supplier : Supplier;
  selectedSupplier : Supplier;
  supplierList : Supplier[];

  companyList : Subject<Array<Supplier>> = new BehaviorSubject<Array<Supplier>>([])
  company : Supplier;
  
  sID : Supplier;

  readonly rootUrl = 'http://localhost:53657/';

  constructor(private http: Http) { }

  // HTTP POST Method ADDS A NEW SUPPLIER
  addSupplier(supplier : Supplier) {
    var body = JSON.stringify(supplier);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Supplier', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP PUT Method that updates an existing supplier
  updateSupplier(id, supplier) {
    var body = JSON.stringify(supplier);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Supplier/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  // HTTP GET Method that gets a list of suppliers
  getSupplierList() {
    this.http.get(this.rootUrl + 'api/Supplier')
    .map((data : Response) => {
      return data.json() as Supplier[];
    }).toPromise().then(x => {
      this.supplierList = x;
    })
  }

  // HTTP GET Method that gets a suppliers id
  getSupplierID(email : string)
  {
    return this.http.get(this.rootUrl + 'api/Supplier?email=' + email)
  }

  // HTTP GET Method that gets a suppliers id
  getSupplier(id : number)
  {
    return this.http.get(this.rootUrl + 'api/GetSupplier?id=' + id)
  }

  getCompanyList() {
    this.http
    .get(this.rootUrl + 'api/Supplier')
    .map((res : any) => {
      return res.json();
    })
    .subscribe(
      (data : any) => {
        this.companyList.next(data);
      },
      (err : any) => console.error("getCompanyList: Error"),
      () => console.log("getCompanyList: Always")
    )
  }

  // HTTP DELETE Method that REMOVES a supplier from the database
  deleteSupplier(id : number) {
    return this.http.delete(this.rootUrl + 'api/Supplier/' + id)
    .map(res => res.json());
  }

}
