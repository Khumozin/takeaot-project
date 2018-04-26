import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2DropdownModule } from 'ng2-material-dropdown';

import { AppComponent } from './app.component';
import { SignUpComponent } from './customer/sign-up/sign-up.component';
import { NavbarComponent } from './customer/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './customer/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PersonalDetailsComponent } from './customer/personal-details/personal-details.component';
import { ManageAdminComponent } from './administrator/manage-admin/manage-admin.component';
import { AddAdminComponent } from './administrator/manage-admin/add-admin/add-admin.component';
import { ListAdminComponent } from './administrator/manage-admin/list-admin/list-admin.component';
import { ManageDriverComponent } from './administrator/manage-driver/manage-driver.component';
import { AddDriverComponent } from './administrator/manage-driver/add-driver/add-driver.component';
import { ListDriverComponent } from './administrator/manage-driver/list-driver/list-driver.component';
import { ManageSupplierComponent } from './administrator/manage-supplier/manage-supplier.component';
import { AddSupplierComponent } from './administrator/manage-supplier/add-supplier/add-supplier.component';
import { ListSupplierComponent } from './administrator/manage-supplier/list-supplier/list-supplier.component';
import { ManageProductComponent } from './administrator/manage-product/manage-product.component';
import { AddProductComponent } from './administrator/manage-product/add-product/add-product.component';
import { ListProductComponent } from './administrator/manage-product/list-product/list-product.component';
import { DriverComponent } from './driver/driver.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/shared/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { EftPaymentComponent } from './eft-payment/eft-payment.component';
import { CreditPaymentComponent } from './credit-payment/credit-payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DetailsComponent } from './details/details.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { ManageOrderComponent } from './administrator/manage-order/manage-order.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GetScheduleComponent } from './get-schedule/get-schedule.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SelectSupplierComponent } from './administrator/manage-product/select-supplier/select-supplier.component';
import { ProductService } from './administrator/shared/product.service';
import { UpdateProductComponent } from './supplier/update-product/update-product.component';
import { ViewProductComponent } from './supplier/view-product/view-product.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavbarComponent,
    SignInComponent,
    HomeComponent,
    PersonalDetailsComponent,
    ManageAdminComponent,
    AddAdminComponent,
    ListAdminComponent,
    ManageDriverComponent,
    AddDriverComponent,
    ListDriverComponent,
    ManageSupplierComponent,
    AddSupplierComponent,
    ListSupplierComponent,
    ManageProductComponent,
    AddProductComponent,
    ListProductComponent,
    DriverComponent,
    SupplierComponent,
    CartComponent,
    CheckoutComponent,
    EftPaymentComponent,
    CreditPaymentComponent,
    ConfirmationComponent,
    DetailsComponent,
    UpdateAddressComponent,
    ManageOrderComponent,
    DeliveryDetailsComponent,
    ScheduleComponent,
    GetScheduleComponent,
    InvoiceComponent,
    SelectSupplierComponent,
    UpdateProductComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    Ng2DropdownModule, // for dropdown
    HttpClientModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'personal-details', component: PersonalDetailsComponent, canActivate: [AuthGuard]},
      { path: 'manage-admin', component: ManageAdminComponent, canActivate: [AuthGuard]},
      { path: 'manage-driver', component: ManageDriverComponent, canActivate: [AuthGuard]},
      { path: 'manage-supplier', component : ManageSupplierComponent, canActivate: [AuthGuard]},
      { path: 'manage-product', component: ManageProductComponent, canActivate: [AuthGuard]},
      { path: 'driver', component: DriverComponent, canActivate: [AuthGuard]},
      { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard]},
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      { path: 'eftPayment', component: EftPaymentComponent, canActivate: [AuthGuard]},
      { path : 'creditPayment', component: CreditPaymentComponent, canActivate: [AuthGuard]},
      { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard]},
      { path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
      { path: 'updateAddress', component: UpdateAddressComponent, canActivate: [AuthGuard]},
      { path: 'manage-order', component: ManageOrderComponent, canActivate: [AuthGuard]},
      { path: 'deliveryDetails', component: DeliveryDetailsComponent, canActivate: [AuthGuard]},
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
      { path: 'getschedule', component: GetScheduleComponent, canActivate: [AuthGuard]},
      { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard]},
      { path: 'add-product', component: AddProductComponent}
    ])
  ],
  providers: [AuthGuard, CartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
