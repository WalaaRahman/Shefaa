import { Partner } from './../../../models/partner';
import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService , private _router: Router, private _partnerService:PartnerService) { }

  formGroup:FormGroup;
  // isRemembered:boolean=false;
  loggedPartner:Partner[]=[]
  emailValue:string ="";
  // passwordValue:string;

  ngOnInit(): void {
    if(this._partnerService.isLogged()){
      alert("You are already logged in ")
      // console.log("Logged is: ",this._userService.getLoggedStatus())
      this._router.navigateByUrl('')
    }
    // console.log("Email value: ",this.emailValue)
    // console.log("Logged user:", this.loggedUser)
    // console.log("is remembered", this.isRemembered)

    this.formGroup = this._formBuilder.group({
      email:['',[Validators.required, Validators.email,Validators.minLength(10), Validators.maxLength(50)]],
      password:['',[Validators.required]],
    })
  }



  login(){
    let partner = new Partner();
    partner = this.formGroup.value

    //connect to database and find user
    this._apiService.post("partner/login",partner).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
        this.loggedPartner.push(obj.Data)

        // set token in lacal storage
        console.log(obj.token)
        this._partnerService.addToken(obj.token)
        
        console.log("partner stored in array",this.loggedPartner)
        alert(obj.message)
        this._router.navigateByUrl('')

      }else{
        alert(obj.message)

      }

    })
  }








  


}
