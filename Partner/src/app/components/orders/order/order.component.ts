import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { APIResponse } from 'src/app/models/Api-response';
import { ApiService } from 'src/app/services/api.service';
import { PartnerService } from 'src/app/services/partner.service';
import { startWith, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersIDs: any[] = []
  userIDs: any[] = []
  orders: any[] = []
  users: any[] = [];
  constructor(private _apiService: ApiService, private _router: Router, private _partnerService: PartnerService, private _orderService: OrderService) { }

  ngOnInit(): void {

    interval(20000).pipe(
      startWith(0),
      switchMap(() => this._orderService.getOrders())
    ).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        this.orders = obj.Data

        console.log(obj.Data);
        console.log(obj.message);


      } else {
        alert(obj.message)
      }
    })


  

  }










  process(data: any) {
    let products = data.products
    let user = data.user
    let customer = data.customer
    let totalPrice = data.totalPrice
    let orderTime = data.createdAt

    if (confirm("Are you sure you want to process this order ?!")) {

      // console.log("order:" ,order);
      this._apiService.put('order/processing/' + data._id, { products, user, customer, totalPrice, orderTime }).subscribe((response) => {
        let obj = response as APIResponse
        if (obj.status) {
          alert(obj.message)

          // refresh page
          this._router.navigateByUrl('orders/items', { skipLocationChange: true }).then(() => {
            this._router.navigateByUrl('');
          });
        } else {
          alert(obj.message)
        }
      })

    } else {
      console.log("Nothing ");

    }


  }






















}
