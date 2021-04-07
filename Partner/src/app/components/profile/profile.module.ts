import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../../auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { UserProfileAndPreviousOrdersComponent } from './user-profile-and-previous-orders/user-profile-and-previous-orders.component';

const routes: Routes =[
  {path:"previous",component:PreviousOrdersComponent, canActivate:[AuthGuard]},
  {path:"edit",component:UpdateProfileComponent, canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [UpdateProfileComponent, UserProfileAndPreviousOrdersComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule,FormsModule,ReactiveFormsModule
  ]
  
})
export class ProfileModule { }
