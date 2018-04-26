import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../shared/supplier.service';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.css'],
  providers: [ SupplierService ]
})
export class ManageSupplierComponent implements OnInit {

  constructor(private supplierService : SupplierService) { }

  ngOnInit() {
  }

}
