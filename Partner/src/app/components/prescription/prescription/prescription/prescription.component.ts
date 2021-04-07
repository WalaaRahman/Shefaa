import { UserService } from './../../../../services/user.service';
import { PartnerService } from './../../../../services/partner.service';
import { Partner } from './../../../../models/partner';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/Api-response';
import { Prescription } from 'src/app/models/prescription';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  prescriptions: any
  users:any[] = []
  ids: Prescription[] = []
  // user:any

  constructor(private _apiService: ApiService, private _userService: UserService, private _partnerService: PartnerService) { }

  ngOnInit(): void {
    // let token = this._partnerService.getToken()
    // console.log("Token is:", token)
    this._apiService.getprescription('prescription').subscribe((response) => {
      let obj = response as APIResponse
      // console.log("Data from server in prescription:", obj)
      if (obj.status) {
        this.prescriptions = obj.Data
        console.log("prescription:", this.prescriptions)
        // this.users = obj.Data.userData
        // console.log("user data:", this.users)
      }
    })


    // let tokenuser = this._userService.getToken()
    // console.log("Token User is:", tokenuser)
    // this._apiService.get('user/get/' + tokenuser).subscribe((response) => {
    //   let obj = response as APIResponse
    //   console.log("Data from server in update user:", obj)
    //   if (obj.status) {
    //     let userData = obj.Data
    //     this.user = userData

    //   }
    // })
  }

}
