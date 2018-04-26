import { Component, OnInit } from '@angular/core';
import { Product } from '../../administrator/shared/product.model';
import { ProductService } from '../../administrator/shared/product.service';
import { SupplierService } from '../../administrator/shared/supplier.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  providers: [ SupplierService]
})
export class ViewProductComponent implements OnInit {

category : string = 'Cellphones'
  details : Array<Product> = [];
  arrayLength : number;
  message : string;
  pSatus : string;
  miniQuantity : number;
  productDetails : Array<Product> = [];
  myID : any;
  cName : string;
  supplierInfo : string;

  // product variables
  pID : number;
  sID : number;
  productName : string;
  categoryName : string;
  productDescription : string;
  productPrice : number;
  productQuantity : number;
  productImg : string;
  minimumQuantity : number;
  
  constructor(private productService : ProductService,
  private supplierService : SupplierService) { }

  ngOnInit() {
	  this.myID = document.cookie.split("=");
    this.productService.getProductBySupplierID(this.myID[1]);
    this.supplierService.getSupplier(this.myID[1])
    .subscribe(data => { 
      this.supplierInfo = Object.assign({}, data.json());
      this.cName = (this.supplierInfo[0].CompanyName)
    })
  }

  showForEdit(product : Product) {
    this.productService.selectedProduct = Object.assign({}, product); 
  }
  
  calculateQuantity(maxQuantity : number, minimumQ : number)
  {
      if (maxQuantity < minimumQ && maxQuantity > 0)
      {
        this.message = "Running out of stock";
      }
      else if (maxQuantity > minimumQ)
      {
        this.message = "Good";
      } 
      else if (maxQuantity == 0)
      {
        this.message = "Out of stock";
      }

      return this.message;
  }

}
