import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterationHeaderComponent } from './registeration-header/registeration-header.component';
import { RegisterationFooterComponent } from './registeration-footer/registeration-footer.component';

const routes: Routes =[
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent},
  {path:"registerationheader",component:RegisterationHeaderComponent},
  {path:"registerationfooter",component:RegisterationFooterComponent},

]

@NgModule({
  declarations: [HeaderComponent, FooterComponent, RegisterationHeaderComponent, RegisterationFooterComponent,],
  imports: [
    CommonModule,RouterModule.forChild(routes),FormsModule
  ],
  exports: [HeaderComponent, FooterComponent, RegisterationHeaderComponent, RegisterationFooterComponent]
})
export class SharedModule { }
