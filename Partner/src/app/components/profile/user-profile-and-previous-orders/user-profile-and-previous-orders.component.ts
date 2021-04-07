import { PartnerService } from './../../../services/partner.service';
import { Partner } from './../../../models/partner';
import { Component, Input, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-and-previous-orders',
  templateUrl: './user-profile-and-previous-orders.component.html',
  styleUrls: ['./user-profile-and-previous-orders.component.css']
})
export class UserProfileAndPreviousOrdersComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _partnerService: PartnerService) { }
  partner: Partner;
  ngOnInit(): void {


    let token = this._partnerService.getToken()
    console.log("Token is:", token)
    this._apiService.get('partner/get/'+token).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
       let partnerData = obj.Data
        this.partner = partnerData

        console.log("partner retreived is: ",this.partner)
      }
      else{
        if(obj.message == "Session expired!"){
          alert(obj.message + "Login again!")
          this._router.navigateByUrl('registeration/logout')
        }
      }
    })
  }

}
