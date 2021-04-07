import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { APIResponse } from 'src/app/models/Api-response';
import { ApiService } from 'src/app/services/api.service';
import { OrderService } from 'src/app/services/order.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-processing-order',
  templateUrl: './processing-order.component.html',
  styleUrls: ['./processing-order.component.css']
})
export class ProcessingOrderComponent implements OnInit {
  orders: any[] = []

  constructor(private _apiService: ApiService, private _router: Router, private _partnerService: PartnerService, private _orderService: OrderService) { }

  ngOnInit(): void {

    interval(20000).pipe(
      startWith(0),
      switchMap(() => this._orderService.getProcessingOrders())
    ).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        this.orders = obj.Data
        console.log(obj.Data);
      } else {
        console.log(obj.message)
      }
    })



  }







  done(data: any) {
    let products = data.products
    let user = data.user
    let customer = data.customer
    let totalPrice = data.totalPrice
    let orderTime = data.createdAt

    if (confirm(" This means that order is deliverd, confirm ?!")) {

      // console.log("order:" ,order);
      this._apiService.put('order/partner/deliver/' + data._id, { products, user, customer, totalPrice, orderTime }).subscribe((response) => {
        let obj = response as APIResponse
        if (obj.status) {
          alert(obj.message)

          // refresh page
          this._router.navigateByUrl('orders/items', { skipLocationChange: true }).then(() => {
            this._router.navigateByUrl('orders/processing');
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
