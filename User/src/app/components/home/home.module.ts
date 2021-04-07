import { AuthGuard } from './../../auth.guard';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSectionComponent } from './top-section/top-section.component';
import { PharmaciesComponent } from './pharmacies/pharmacies.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';


const routes :Routes = [
  {path:'', component:IndexComponent},
  
]

@NgModule({
  declarations: [TopSectionComponent, PharmaciesComponent, BestsellerComponent, FeedbackComponent, IndexComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes), FormsModule, SharedModule
  ]
})
export class HomeModule { }
