import { Partner } from './../../../models/partner';
import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService , private _router: Router,private _partnerService:PartnerService) { }

  formGroup:FormGroup;

  newPartner:Partner[]=[]

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      name:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      email:['',[Validators.required, Validators.email,Validators.minLength(6), Validators.maxLength(50)]],
      password:['',[Validators.required]],

    })
  }

  addPartner(){
    let partner = new Partner();
    partner = this.formGroup.value
    // console.log(this.formGroup.value)

    this._apiService.post('partner/signup',partner).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
        this.newPartner.push(obj.Data)

       //add token to local storage
        console.log(obj.token)
        this._partnerService.addToken(obj.token)

        // alert(obj.message)
        this._partnerService.isLogged()
        // this._router.navigateByUrl('')
        console.log("partner stored in array",this.newPartner)
        alert(obj.message)
        this._router.navigateByUrl('')
      }
      else{
        alert(obj.message)
      }
    })
  }


 






  





}
