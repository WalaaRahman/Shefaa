import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { IndexComponent } from './index/index.component';
import { StockComponent } from './stock/stock.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { UpdateComponent } from './update/update.component';



const routes :Routes = [
  {path:'pro', component:ProductComponent},
  {path:'stock', component:StockComponent},
  {path:'', component:IndexComponent},
  {path:'update', component:UpdateComponent},
  
  
]

@NgModule({
  declarations: [ProductComponent, IndexComponent, StockComponent, UpdateComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes), FormsModule,SharedModule,ReactiveFormsModule
  ]
})
export class ProductsModule { }
