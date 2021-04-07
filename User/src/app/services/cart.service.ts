import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/Api-response';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/Product';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})

export class CartService {

  products: any[];
  items: Product[] = [];
  user: User;
  isAddedToCart: boolean = false;
  length: number = 0
  constructor(private _apiService: ApiService) { }

  addToCart(id: any) {

    this._apiService.put(`cart/add/${id}`, this.items).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        alert(obj.message)
      } else {
        console.log(obj.message)
      }
    });
    this.length += 1

  }

  getItemsLength() {
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  deleteCart(index: number) {
    this.items.splice(index, 1)
  }

  deleteFromCart(id: any) {
    this._apiService.put(`cart/delete/${id}`, this.user).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        console.log(obj.message)
      } else {
        console.log(obj.message)
      }
    });

  }


  getAddToCartProducts(): Observable<any> {
    return this._apiService.get("cart")
  }





}

