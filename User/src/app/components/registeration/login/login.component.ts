import { UserService } from './../../../services/user.service';
import { APIResponse } from './../../../models/Api-response';
import { User } from './../../../models/user';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService , private _router: Router, private _userService:UserService) { }

  formGroup:FormGroup;
  // isRemembered:boolean=false;
  loggedUser:User[]=[]
  emailValue:string ="";
  // passwordValue:string;

  ngOnInit(): void {
    if(this._userService.isLogged()){
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
    let user = new User();
    user = this.formGroup.value

    //connect to database and find user
    this._apiService.post("user/login",user).subscribe((response)=>{
      let obj = response as APIResponse
      console.log("Data from server",obj)
      if(obj.status){
        this.loggedUser.push(obj.Data)

        //remember me 
        // if(this.isRemembered){
        //   this.emailValue = this.loggedUser[0].email
        // }else{
        //   this.emailValue =""
        // }

        // set token in lacal storage
        console.log(obj.token)
        this._userService.addToken(obj.token)
        
        this._router.navigateByUrl('')
        console.log("User stored in array",this.loggedUser)

      }else{
        alert(obj.message)

      }

    })
  }



  // isChecked(status:boolean){
  //  this.isRemembered = status;
  //   // console.log(this.isRemembered)
  // }




}
