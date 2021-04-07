import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from './../../../models/partner';
import { Product } from './../../../models/Product';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _partnerService: PartnerService) { }
  partner: Partner;
  searchText: string = '';
  isLogged: boolean

  ngOnInit(): void {

    let token = this._partnerService.getToken()
    console.log("Token is:", token)
    this._apiService.get('partner/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("User Retrieved: ", obj)
      if (obj.status) {
        this.partner = obj.Data
      }
      // else {
      //   alert(obj.message)
      // }
    })
    this.isLogged = this._partnerService.isLogged()
    
  }

  updateSearchText(value: string) {
    this.searchText = value
    console.log(this.searchText)
  }

}
