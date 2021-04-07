import { environment } from './../../../../../environments/environment';
import { Partner } from './../../../../models/partner';
import { Product } from './../../../../models/Product';
import { APIResponse } from './../../../../models/Api-response';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/services/partner.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // products : [{}] = [{'name':"mahmoud",'age':23,'gender':"male"}];
  partner: Partner;
  isLogged: boolean
  formGroup: FormGroup;
  token: any
  
  constructor(private _apiService: ApiService, private httpClient: HttpClient, private _partnerService: PartnerService, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _reactiveFormsModule: ReactiveFormsModule) { }

  ngOnInit(): void {
    this.token = this._partnerService.getToken()
    console.log("Token is:", this.token)
    this._apiService.get('partner/get/' + this.token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("partner Retrieved: ", obj)
      if (obj.status) {
        this.partner = obj.Data
        console.log("partner retreived is: ", this.partner)
      }
      // else {
      //   alert(obj.message)
      // }
    })
    this.isLogged = this._partnerService.isLogged()

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

  addproduct(photoURL:string,Name:string,Description:string,Title:string,Indications:string,SideEffects:string,Price:number,Quantity:number,Category:string) {
    let partner = this.partner.id
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

    this.httpClient.post(`${environment.APIURL}/product/add`,  product ).subscribe((response) => {
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