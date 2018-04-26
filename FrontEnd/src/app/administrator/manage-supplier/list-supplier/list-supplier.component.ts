import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../shared/supplier.service';
import { Supplier } from '../../shared/supplier.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  constructor(private supplierService : SupplierService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.supplierService.getSupplierList(); // get supplier list
  }

  // button to populate all the text fields for updating the supplier
  showForEdit(supplier : Supplier) {
    this.supplierService.selectedSupplier = Object.assign({}, supplier);
  }

  // when the delete button is click on, the suppier will be removed fromthe database
  onDelete(id : number) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.supplierService.deleteSupplier(id)
      .subscribe(x => {
        this.supplierService.getSupplierList(); // get supplier list
        this.toastr.warning('Deleted Successfully!');
      })
    }
  }

}
