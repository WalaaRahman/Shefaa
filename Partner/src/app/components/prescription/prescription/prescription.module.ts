import { PrescriptionComponent } from './prescription/prescription.component';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from 'src/app/auth.guard';


const routes :Routes = [
  {path:'', component:PrescriptionComponent,canActivate:[AuthGuard]},
  
  
]

@NgModule({
  declarations: [PrescriptionComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes), FormsModule,SharedModule,ReactiveFormsModule
  ]
})
export class PrescriptionModule { }
