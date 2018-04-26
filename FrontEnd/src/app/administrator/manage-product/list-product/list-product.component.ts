import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Driver } from '../../shared/driver.model';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private productService : ProductService,
    private toastr : ToastrService) { }
  
    ngOnInit() {
      this.productService.getProductList(); //get product list
    }
  
    // button to populate all the text fields for updating a product
    showForEdit(product : Product) {
      this.productService.selectedProduct = Object.assign({}, product);
    }
  
    // when the delete button is click on, a product will be removed fromthe database
    onDelete(id : number) {
      if (confirm('Are you sure to delete this record?') == true)
      {
        this.productService.deleteProduct(id)
        .subscribe(x => {
          this.productService.getProductList(); //get product list
          this.toastr.warning('Deleted Successfully!');
        })
      }
    }

}
