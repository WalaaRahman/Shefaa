import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../../models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // cartLength:number;
  subTotal: number = 0;
  delivery: number = 25;
  total: number = 0
  user: User;
  formGroup: FormGroup;
  orderProducts: any
  token: any
  constructor(private _apiService: ApiService, private httpClient: HttpClient, private _formBuilder: FormBuilder, private _router: Router, private _userService: UserService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this._userService.getToken()
    console.log("Token is:", this.token)
    this._apiService.get('user/get/' + this.token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      if (obj.status) {
        this.user = obj.Data
        this.orderProducts = this.user.cartProducts
        console.log("this.orderProducts", this.orderProducts);
        console.log("User retreived is: ", this.user)
      }
      else {
        alert(obj.message)
      }
    })

    // get subtotal and total values
    this._activatedRoute.queryParams.subscribe(params => {
      console.log("params...: ",params)
      this.subTotal = params['subTotal']
      this.total = (+this.subTotal) + (+this.delivery)
    })


    //fromgroup validation
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern('[+]?[2]?(01)[0-9]{9}')]],

    })





  }


  confirmOrder() {
    let products = this.orderProducts
    let user = this.user
    let customer = this.formGroup.value
    let totalPrice = this.total
    console.log("products", products);
    console.log("user", user);
    console.log("customer", customer);


    this.httpClient.post(`${environment.APIURL}/order`, { products, user, customer,totalPrice }, { headers: { 'authorization': this.token } }).subscribe((response) => {
      let obj = response as APIResponse
      console.log("order information", obj)
      if (obj.status) {
        alert(obj.message)
        this.clearCart()
        this._router.navigateByUrl('products')
      } else {
        alert(obj.message)
      }
    })




  }




clearCart(){

  this._apiService.put('cart/delete',{}).subscribe((response)=>{
    let obj = response as APIResponse
    if (obj.status) {
      console.log(obj.message);
    } else {
      console.log(obj.message);
    }
  })
}












}
