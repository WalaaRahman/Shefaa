import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'Prescription',
    loadChildren: () => import('../app/components/prescription/prescription/prescription.module').then(m => m.PrescriptionModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../app/components/products/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../app/components/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'registeration',
    loadChildren: () => import('../app/components/registeration/registeration.module').then(m => m.RegisterationModule)
  },
  {
    path: '',
    loadChildren: () => import('../app/components/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/components/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'shared', 
    loadChildren: () => import('../app/components/shared/shared.module').then(m => m.SharedModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
