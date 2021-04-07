import { UserService } from './../../../services/user.service';
import { APIResponse } from './../../../models/Api-response';
import { User } from './../../../models/user';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient, private _apiService: ApiService, private _router: Router, private _userService: UserService) { }

  formGroup: FormGroup;

  newUser: User[] = []
  // googleUsers:User[]=[]

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50)]],
      password: ['', [Validators.required]],

    })
  }

  addUser() {
    let user = new User();
    user = this.formGroup.value
    // console.log(this.formGroup.value)

    this._apiService.post('user/signup', user).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      if (obj.status) {
        user = obj.Data
        this.newUser.push(user)

        //add token to local storage
        console.log(obj.token)
        this._userService.addToken(obj.token)

        // alert(obj.message)
        this._userService.isLogged()
        this._router.navigateByUrl('')
        console.log("User stored in array", this.newUser)
      }
      else {
        alert(obj.message)
      }
    })
  }


  googleSignup() {

    let user = new User();
    //connect to our api and call google api from server
    this.httpClient.get('auth/google').subscribe((response) => {
      let obj = response as APIResponse
      console.log(obj)
      if (obj.status) {
        user = obj.Data
        this.newUser.push(user)

        //add token to local storage
        console.log(obj.token)
        this._userService.addToken(obj.token)
        // alert(obj.message)
        this._userService.isLogged()
        this._router.navigateByUrl('')
        console.log("User stored in array", this.newUser)

      } else {
        alert(obj.message)
      }

    })

  }





}
