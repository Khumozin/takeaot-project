import { Component, OnInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { ProductService } from '../administrator/shared/product.service';
import { Product } from '../administrator/shared/product.model';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [ ProductService ]
})
export class SupplierComponent implements OnInit {

  category : string = 'Cellphones'
  details : Array<Product> = [];
  arrayLength : number;
  message : string;
  pSatus : string;
  miniQuantity : number;
  productDetails : Array<Product> = [];
  myID : any;

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

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");
    //this.productService.getProductByCategory(this.category) // get products by category

    // get products by category
    /*this.productService.getProCat(this.category);
    this.productService.proQuant
    .subscribe((productArray : Array<Product>) => {
      this.details = productArray;

      if (productArray.length > 0)
      {
        this.arrayLength = productArray.length;
        this.miniQuantity = this.details[0].MinimumQuantity;
      }
    })*/
    

    this.productService.getProductBySupplierID(this.myID[1]);

  }

  onClick()
  {
    // checks if a category is selected
    /*if ((document.getElementById("computers") as HTMLInputElement).checked)
    {
      this.category = "Computers %26 Tablets";
    } 
    else if ((document.getElementById("tv") as HTMLInputElement).checked)
    {
      this.category = "TV, Audio %26 Video"
    }
    else if ((document.getElementById("cellphones") as HTMLInputElement).checked)
    {
      this.category = "Cellphones";
    }
    else if ((document.getElementById("cameras") as HTMLInputElement).checked)
    {
      this.category = "Cameras";
    }
    else if ((document.getElementById("gaming") as HTMLInputElement).checked)
    {
      this.category = "Gaming";
    }

    this.productService.getProductByCategory(this.category) // get all the products that match the selected category


    this.productService.getProCat(this.category);
    this.productService.proQuant
    .subscribe((productArray : Array<Product>) => {
      this.details = productArray;

      if (productArray.length > 0)
      {
        this.arrayLength = productArray.length;
      }

    })*/

  }

  // checks if there's enough stock available
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
