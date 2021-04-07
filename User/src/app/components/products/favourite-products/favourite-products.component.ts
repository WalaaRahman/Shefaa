import { Product } from './../../../models/Product';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css']
})
export class FavouriteProductsComponent implements OnInit {
  userId: any;
  favouriteProducts:Product[]=[]
  badgeNumber:number=0

  constructor(private _favouriteService:FavouriteService ,private _cartService:CartService ,  private _apiService:ApiService, private _userService: UserService) { }

  ngOnInit(): void {
  
    this._apiService.get("favourite").subscribe((response) => {
      let obj = response as APIResponse;
      if (obj.status) {
        // console.log("favourite products retrieved:", obj.Data);
        this.favouriteProducts = obj.Data
      }
      else {
        alert(obj.message)
      }
    })


    
  }

  deleteFavourite(id:any, index:any) {
    this._favouriteService.deleteFavourite(id);
    this.favouriteProducts.splice(index,1);
 
  }

  clearFavourite() {
    this._favouriteService.clearFavourite();
    this.favouriteProducts = []
    // console.log("clear list ")
  }

  addToCart(id: any) {    
    this._cartService.addToCart(id);
    this.badgeNumber++
  }





}
