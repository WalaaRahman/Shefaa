import { Component, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  User:User [] = [];
  cartLength:number;
  totalPrice:number=0;
  delevery:number=15;
  total:number=0;

  constructor(private _apiService:ApiService , private _router: Router,private _userService:UserService) { }
  user:User;
  ngOnInit(): void {
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/'+token).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
       let userData = obj.Data
        this.user = userData

        console.log("User retreived is: ",this.user)
      }
      else{
        alert(obj.message)
      }
    })

    this._apiService.get("cart").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server cart",obj.Data);
      if(obj.status){
        let cartData = obj.Data
         this.User = cartData
 
         console.log("Product retreived is: ",this.User)
         this.cartLength=this.User[0].cartProducts.length;
         console.log("this.User[0].cartProducts.length",this.User[0].cartProducts.length);

          for(let index = 0; index < this.User[0].cartProducts.length ; index++ )
          {
            this.totalPrice += this.User[0].cartProducts[index].price
            
            
          }
          this.total=this.delevery + this.totalPrice;
          console.log("Total Price",this.totalPrice);
        //  console.log("this.User[0].cartProducts.Price",this.User[0].cartProducts);

         
        
       }
       else{
         alert(obj.message)
       }
    })
  }

}
