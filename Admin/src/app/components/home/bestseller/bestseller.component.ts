import { Component, OnInit } from '@angular/core';
import { Product } from "./../../../models/Product";
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.css']
})
export class BestsellerComponent implements OnInit {

  cartfake: any;
  favouritefake: any;
  
  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService,private _favouriteService:FavouriteService ) { }
  products: Product[] = [];
  userId: any;
  best:any[]=[];

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Data from server", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData

        for (let i=0; i<6; i++){
          this.best[i]=this.products[i];
        }

        console.log("Product retreived is: ", this.products)
      }
      else {
        alert(obj.message)
      }
    })

    //---- Get Cart Products
    let token1 = this._userService.getToken()
    console.log("Token is:", token1)
    this._apiService.get('user/get/' + token1).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })

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

    //---- Get FavouriteProducts
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

  addToCart(product: Product) {
    this._cartService.addToCart(product, this.userId);
    
  }


  addToFavourite(product: Product) {
    this._favouriteService.addToFavourite(product, this.userId);
   
  }

}
