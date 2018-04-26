import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../shared/supplier.service';
import { Supplier } from '../../shared/supplier.model';
import { ProductService } from '../../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.component.html',
  styleUrls: ['./select-supplier.component.css'],
  providers: [SupplierService,ProductService]
})
export class SelectSupplierComponent implements OnInit {

  companies : Array<Supplier> = [];
  details : Array<Supplier> = [];
  arrayLength : number = 0;
  selectedCompany : any;
  chooseCompany : string;

  constructor(private supplierService : SupplierService,
    private productService : ProductService,
    private route : Router) { }

  ngOnInit() {
    this.chooseCompany = 'Choose Company';
    localStorage.setItem('SupplierID', ''+0);
    this.supplierService.getSupplierList(); // get supplier list

    this.supplierService.getCompanyList();
    this.supplierService.companyList
    .subscribe((array : Array<Supplier>) => {

      this.details = array;
      console.log(this.details);
      if (array.length > 0)
      {
        this.arrayLength = array.length;
        this.getCompany();
      }

    })

    this.selectedCompany = this.companies[1];
    
  }

  getCompany()
  {
    for (var x = 0; x < this.arrayLength; x++)
    {
        this.companies[x] = this.details[x];
        console.log(this.companies[x].CompanyName);  
    }
  }

  onClick(company)
  {
    console.log(company.SupplierID);
    localStorage.setItem('SupplierID', company.SupplierID);
    this.chooseCompany = company.CompanyName;
    //this.route.navigate(['/add-product']);
  }


}