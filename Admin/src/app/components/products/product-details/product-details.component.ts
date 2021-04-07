import { Product } from './../../../models/Product';
import { ProductsComponent } from './../products/products.component';
import { APIResponse } from './../../../models/Api-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product
  productId:any
  userId: any;
  cartfake: any;
  favouritefake: any;

  constructor(private _activatedRoute:ActivatedRoute ,  private _apiService:ApiService , private _location: Location,private _cartService:CartService ,private _favouriteService:FavouriteService, private _userService: UserService ) { }

  ngOnInit(): void {
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })


    this._activatedRoute.queryParams.subscribe(params=>{​​​​​

      this.productId = params['ID']
      console.log("product ID: ",  this.productId )

      this._apiService.get('product/' + this.productId).subscribe((response)=>{​​​​​
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
     this._apiService.get("cart").subscribe((response) => {
      let obj = response as APIResponse;

      console.log("Data from server cart", obj.Data);
      if (obj.status) {
        let cartData = obj.Data
        this.cartfake = cartData

        console.log("Product retreived is faaaaaake: ", this.cartfake[0].cartProducts)


      }
      else {
        alert(obj.message)
      }
    })
    this._apiService.get("favourite").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server favourite",obj.Data);
      if(obj.status){
        let favouriteData = obj.Data
         this.favouritefake = favouriteData
         console.log("Favourite product retreived is: ",this.favouritefake[0].favouriteProducts)
       }
       else{
         alert(obj.message)
       }
    })
  }

  // backClicked() {
  //   this._location.back();
  //   console.log( 'goBack()...' );
  // }

  addToCart(product: Product) {    
    this._cartService.addToCart(product, this.userId);
  }

  addToFavourite(product: Product) {
    this._favouriteService.addToFavourite(product, this.userId);
    
  }
}
