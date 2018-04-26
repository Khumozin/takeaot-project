import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  providers: [ ProductService ]
})
export class ManageProductComponent implements OnInit {

  constructor(private productService : ProductService) { }

  ngOnInit() {
  }


}
