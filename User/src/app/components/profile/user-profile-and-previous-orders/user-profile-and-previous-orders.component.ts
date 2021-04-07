import { Order } from './../../../models/order';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-and-previous-orders',
  templateUrl: './user-profile-and-previous-orders.component.html',
  styleUrls: ['./user-profile-and-previous-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,

})
export class UserProfileAndPreviousOrdersComponent implements OnInit {
  user: User;
  // previousOrdersIDs: any[] = []
  // previousOrdersData: any[] = []
  previousOrders: any[] = [] //array of product ids for each order
  // productsData: any[] = []
  token: any

  constructor(private _apiService: ApiService, private _changeDetector: ChangeDetectorRef, private httpClient: HttpClient, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {

     this.token = this._userService.getToken()
    // console.log("Token is:", this.token)
    this._apiService.get('user/get/' + this.token).subscribe((response) => {
      let obj = response as APIResponse
      // console.log("User Retrieved: ", obj)
      if (obj.status) {
        this.user = obj.Data
      }
      else {
        console.log(obj.message)
      }
    })







    interval(20000).pipe(
      startWith(0),
      switchMap(() => this._userService.getPreviousOrders())
    ).subscribe((response) => {
      let obj = response as APIResponse
      if (obj.status) {
        this.previousOrders = obj.Data
        // console.log("previous Orders are: ", this.previousOrders);

      }
      else {
        if (obj.message == "Session expired!") {
          alert(obj.message + "Login again!")
          // this._router.navigateByUrl('registeration/logout')
        }
      }
    })







  }






  deleteOrder(id: any) {
    // console.log("id...",id);
    
    if (confirm("Are you sure you want to delete this order?!")) {
      this._apiService.put('order/delete/' + id, {}).subscribe((response) => {
        let obj = response as APIResponse
        if (obj.status) {
          alert(obj.message)

          // refresh page
          this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this._router.navigateByUrl('profile');
          });

        } else {
          console.log(obj.message);
        }
      })
    } else {
      console.log("do nothing")
    }

  }


  orderAgain(order: any) {
    let products = order.products
    let user = order.user
    let customer = order.customer
    let totalPrice = order.totalPrice
    // console.log("order...",order);
    
    if (confirm("Are you sure you want to order again")) {
      this.httpClient.post(`${environment.APIURL}/order`, {products,user,customer,totalPrice}, { headers: { 'authorization': this.token } }).subscribe((response) => {
        let obj = response as APIResponse
        // console.log("order information", obj)
        if (obj.status) {
          alert(obj.message)
        } else {
          console.log(obj.message)
        }
      })

      // rerender the component
      // this.ngOnInit()

      // refresh page
      this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this._router.navigateByUrl('profile');
      });

    } else {
      console.log("do nothing")
    }


  }





  clearOrders() {
    if (confirm("Are you sure you want to delete all orders ?!")) {
      this._apiService.put('order/delete', {}).subscribe((response) => {
        let obj = response as APIResponse
        if (obj.status) {
          alert(obj.message)

          // refresh page
          this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this._router.navigateByUrl('profile');
          });


        } else {
          alert(obj.message);

        }
      })
    } else {
      console.log("do nothing")
    }

  }















}
