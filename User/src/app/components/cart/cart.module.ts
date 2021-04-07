import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../../auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourCartComponent } from './your-cart/your-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShipmentTrackingComponent } from './shipment-tracking/shipment-tracking.component';

const routes: Routes =[
  {path:"",component:YourCartComponent, canActivate:[AuthGuard]},
  {path:"checkout",component:CheckoutComponent, canActivate:[AuthGuard]},
  {path:"shipment",component:ShipmentTrackingComponent, canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [YourCartComponent, CheckoutComponent, ShipmentTrackingComponent],
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes),FormsModule,ReactiveFormsModule
  ]
})
export class CartModule { }
