import { PartnerService } from 'src/app/services/partner.service';
import { ApiService } from './../../../../services/api.service';
import { APIResponse } from './../../../../models/Api-response';
import { StockComponent } from './../stock/stock.component';
import { Product } from './../../../../models/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  product:Product
  productId:any
  partnerId: any;
  formGroup: FormGroup;

  constructor(private _activatedRoute:ActivatedRoute , private httpClient: HttpClient,  private _apiService:ApiService , private _location: Location, private _partnerService: PartnerService , private _formBuilder: FormBuilder, private _reactiveFormsModule: ReactiveFormsModule) { }

  ngOnInit(): void {
    let token = this._partnerService.getToken()
    console.log("Token is:", token)
    this._apiService.get('partner/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.partnerId = obj.Data["id"]
    })


    this._activatedRoute.queryParams.subscribe(params=>{​​​​​

      this.productId = params['ID']
      console.log("product ID: ",  this.productId )

      this._apiService.getedit('product/edit/' + this.productId).subscribe((response)=>{​​​​​
        let obj = response as APIResponse;
        console.log("Data from server",obj);

        if(obj.status){
          this.product = obj.Data
           console.log("Product retreived is: ",this.product)
         }
         else{
           alert(obj.message)
         }
      
      }​​​​​);
    }​​​​​);

    //fromgroup validation
    this.formGroup = this._formBuilder.group({
      Photo: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Descreption: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      Indications: ['', [Validators.required]],
      Effects: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      

    })
  }

  updateproduct(id:any,photoURL:string,Name:string,Description:string,Title:string,
    Indications:string,SideEffects:string,Price:number,Quantity:number,Category:string) {
    console.log("updated")
    let partner = this.partnerId
    let product:Product = new Product;
    // product = this.formGroup.value
    product.pharmacyID=partner;
    product.photoURL=photoURL;
    product.name=Name;
    product.description=Description;
    product.title=Title;
    product.body=Indications;
    product.sideEffects=SideEffects;
    product.price=Price;
    product.quantity=Quantity;
    product.category=Category;

    console.log("partner", partner);
    console.log("product", product);
    
    this._apiService.putedit(`product/update/` + id ,  product ).subscribe((response) => {
      let obj = response as APIResponse
      console.log("product details", obj)
      if (obj.status) {
        alert(obj.message)
      } else {
        alert(obj.message)
      }
    })
  }

}
