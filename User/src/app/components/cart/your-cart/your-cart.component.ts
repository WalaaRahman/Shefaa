import { Product } from './../../../models/Product';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/Api-response';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-your-cart',
  templateUrl: './your-cart.component.html',
  styleUrls: ['./your-cart.component.css']
})
export class YourCartComponent implements OnInit {

  quantity: string = "";
  User: User[] = [];
  userId: any;
  totalPrice: number = 0;
  products: Product[]
  cartLength: number=0;
  badgeNumber:number=0
  isDisabled:boolean=true
  constructor(private _cartService: CartService, private _apiService: ApiService, private _userService: UserService) { }

  ngOnInit(): void {


    this._apiService.get("cart").subscribe((response) => {
      let obj = response as APIResponse;
      if (obj.status) {
        // console.log("cart products for user:", obj.Data);
        this.products = obj.Data
        this.cartLength = this.products.length
        if(this.cartLength != 0){
          this.isDisabled = false
        }

        for (let index = 0; index < this.products.length; index++) {
          this.totalPrice += this.products[index].price

        }
      }
      else {
        alert(obj.message)
      }
    })



  }


  delete(id: any, price: any, index: any) {

    this._cartService.deleteFromCart(id);
    this.totalPrice = this.totalPrice - price
    this.products.splice(index, 1);
    this.cartLength = this.products.length
    this.badgeNumber--
    if(this.cartLength == 0){
      this.isDisabled = true
    }
  }


  





}
