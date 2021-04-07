import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from '../../../models/user';
import { Product } from "./../../../models/Product";




@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {
  userId: any;
  favouriteProducts:User [] = [];
  cartfake: any;
  length: any=0;

  constructor(private _favouriteService:FavouriteService ,private _cartService:CartService ,  private _apiService:ApiService, private _userService: UserService) { }
  // length = this._favouriteService.getItemsLength();
  ngOnInit(): void {
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
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
    this._apiService.get("favourite").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server favourite",obj.Data);
      if(obj.status){
        let favouriteData = obj.Data
         this.favouriteProducts = favouriteData
         this.length = this.favouriteProducts[0].favouriteProducts.length
         console.log("Favourite product retreived is: ",this.favouriteProducts)
       }
       else{
         alert(obj.message)
       }
    })
    
  }

  deleteFavourite(productId:any ,index:any) {
    this.favouriteProducts[0].favouriteProducts.splice(index,1);
    this._favouriteService.deleteFavourite(this.userId , productId ,index);
    console.log("delete from Favourite Function "+index)
    console.log("Prodact "+index)
  }

  // clearFavourite() {
  //   this._favouriteService.clearFavourite();
  //   console.log("clear list ")
  // }

  addToCart(product: Product) {    
    this._cartService.addToCart(product, this.userId);
  }

}
