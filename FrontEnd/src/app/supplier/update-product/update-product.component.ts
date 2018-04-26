import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../administrator/shared/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  myID : any;
  supplierID : number = 0;

  constructor(private productService : ProductService,
     private toastr : ToastrService) { }

  ngOnInit() {
    this.myID = document.cookie.split("=");
    this.supplierID = this.myID[1];
    this.resetForm();
  }

  // reset the form when the product is added
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.productService.selectedProduct = {
      ProductID : 0,
      SupplierID : this.myID[1],
      ProductName : '',
      ProductDescription : '',
      CategoryName : '',
      ProductQuantity : null,
      ProductPrice : null,
      ProductImg : '',
      MinimumQuantity : null
    }
  }

  onSubmit(form : NgForm)
  {
    this.productService.updateProduct(form.value.ProductID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.productService.getProductBySupplierID(this.myID[1]) //get admin list that whill appear on the browers as a list of admins
        this.toastr.info('Record Updated Successfully!');
        location.reload();
      })
  }

}
