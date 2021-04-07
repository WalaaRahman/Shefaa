import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/models/Api-response';
import { ApiService } from 'src/app/services/api.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  orders: any[]=[];

  constructor(private _apiService: ApiService, private _router: Router, private _partnerService: PartnerService) { }

  ngOnInit(): void {

    //call to get all deliverd orders
    this._apiService.get('order/get/deliverd').subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        this.orders = obj.Data
        console.log(obj.Data);
      } else {
        console.log(obj.message)
      }
    })




  }










}
