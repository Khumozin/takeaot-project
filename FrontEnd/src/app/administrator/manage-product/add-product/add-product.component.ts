import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedCategory : string = '';
  imgName : string;
  supplierID : number = 0;

  product : Product;

  constructor(private productService : ProductService, 
    private toastr : ToastrService) { }

    ngOnInit() {
      this.resetForm(); // call reset form method
      this.supplierID = +localStorage.getItem('SupplierID');
    }
  
    // reset the form when the product is added
    resetForm(form? : NgForm) {
      if (form != null)
        form.reset();
      this.productService.selectedProduct = {
        ProductID : 0,
        SupplierID : this.supplierID,
        ProductName : '',
        ProductDescription : '',
        CategoryName : '',
        ProductQuantity : 0,
        ProductPrice : null,
        ProductImg : '',
        MinimumQuantity : null
      }
    }
  
    // getting the name of the selected image
    // by removing the path
    fileUpload(file : HTMLInputElement){
      this.productService.selectedProduct.ProductImg = file.value.substr(12);
    }

    // check if the product is updating a product or is addin a new product
    onSubmit(form : NgForm) {
      if (+localStorage.getItem('SupplierID') < 1)
      {
        console.log('Please select a company');
        this.toastr.warning('Please select a company name!');
      }
      else
      {
        if(form.value.ProductID == 0) // if the product id is equals to zero then the product is added to the database
        {

          this.product = {
            ProductID : form.value.ProductID,
            SupplierID : +localStorage.getItem('SupplierID'),
            ProductName : form.value.ProductName,
            CategoryName : form.value.CategoryName,
            ProductDescription : form.value.ProductDescription,
            ProductPrice : form.value.ProductPrice,
            ProductQuantity : form.value.ProductQuantity,
            ProductImg : form.value.ProductImg,
            MinimumQuantity : form.value.MinimumQuantity
          }

          this.productService.addProduct(this.product)
          .subscribe( data => {
            this.resetForm(form);
            this.productService.getProductList(); // get product list
            this.toastr.success('Product added successfully!');
            localStorage.setItem('SupplierID', ''+0);
          })
        } else { // if the product id is not equals to zero then the product is updated in the database

          this.product = {
            ProductID : form.value.ProductID,
            SupplierID : +localStorage.getItem('SupplierID'),
            ProductName : form.value.ProductName,
            CategoryName : form.value.CategoryName,
            ProductDescription : form.value.ProductDescription,
            ProductPrice : form.value.ProductPrice,
            ProductQuantity : form.value.ProductQuantity,
            ProductImg : form.value.ProductImg,
            MinimumQuantity : form.value.MinimumQuantity
          }

          this.productService.updateProduct(form.value.ProductID, this.product)
          .subscribe(data => {
            this.resetForm(form);
            this.productService.getProductList(); // get product list
            this.toastr.info('Record Updated Successfully!');
            localStorage.setItem('SupplierID', ''+0);
          })
        }
        location.reload();
      }
      
    }

}
