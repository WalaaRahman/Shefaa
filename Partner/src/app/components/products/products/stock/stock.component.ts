import { Component, OnInit } from '@angular/core';
import { Partner } from './../../../../models/partner';
import { Product } from './../../../../models/Product';
import { APIResponse } from './../../../../models/Api-response';
import { ApiService } from './../../../../services/api.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  // products : [{}] = [{'name':"mahmoud",'age':23,'gender':"male"}];

  constructor(private _apiService: ApiService, private _partnerService: PartnerService) { }
  products: Product[] = [];
  partner: Partner;
  partnerID: any;

  ngOnInit(): void {
    //---- Get User
    let token = this._partnerService.getToken()
    console.log("Token is:", token)
    this._apiService.get('partner/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("partner retreived in product component", obj)
      this.partner = obj.Data
      this.partnerID = obj.Data["id"]

    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Product retreived is:", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData

      }
      else {
        alert(obj.message)
      }
    })
  }

  delete(id: any, index: any) {
    console.log("deleted product :" , id)
    this._apiService.delete(`product/delete/${id}`).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        console.log(obj.message)
      } else {
        console.log(obj.message)
      }
    });
    // this._cartService.deleteFromCart(id);
    this.products.splice(index, 1);
    
  }

}
