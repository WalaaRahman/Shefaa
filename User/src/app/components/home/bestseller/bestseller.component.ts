import { User } from 'src/app/models/user';
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
  user: User
  badgeNumber:number=0

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    // console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      // console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      // console.log("Data from server", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData

        for (let i=0; i<6; i++){
          this.best[i]=this.products[i];
        }

        // console.log("Product retreived is: ", this.products)
      }
      else {
        alert(obj.message)
      }
    })

    //---- Get Cart Products
    let token1 = this._userService.getToken()
    // console.log("Token is:", token1)
    this._apiService.get('user/get/' + token1).subscribe((response) => {
      let obj = response as APIResponse
      // console.log("User retreived in product component", obj)
      this.user = obj.Data
      this.userId = obj.Data["id"]
    })

  }

  addToCart(id: any) {
    this._cartService.addToCart(id);
    this.badgeNumber++
    
  }


  addToFavourite(id: any) {
    this._favouriteService.addToFavourite(id);
   
  }

}
