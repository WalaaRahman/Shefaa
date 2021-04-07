import { MaxLengthPipe } from './../../pipes/max-length.pipe';
import { OrderItemsComponent } from './order-items/order-items.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { ProcessingOrderComponent } from './processing-order/processing-order.component';


const routes :Routes = [
  {path:'', component:OrderComponent},
  {path:'delivered', component:PreviousOrdersComponent},
  {path:'items', component:OrderItemsComponent},
  {path:'processing', component:ProcessingOrderComponent}


 
]

@NgModule({
  declarations: [OrderComponent, PreviousOrdersComponent,OrderItemsComponent, ProcessingOrderComponent,MaxLengthPipe],
  imports: [
    CommonModule,RouterModule.forChild(routes), FormsModule,SharedModule
  ]
})
export class OrdersModule { }
