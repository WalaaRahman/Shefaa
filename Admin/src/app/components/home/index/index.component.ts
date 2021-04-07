import { UserService } from './../../../services/user.service';
import { selectUsers } from '../../../store/selector/user.selectors';
import { User } from './../../../models/user';
import { APIResponse } from './../../../models/Api-response';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store, Action } from '@ngrx/store';
import { userState } from 'src/app/store/reducer/user.reducer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  users:Observable<User[]>

  constructor(private _apiService:ApiService, private _userService:UserService, private _store:Store<userState>) {
    this.users = this._store.pipe(select(selectUsers))
    console.log("Users Store:",this.users)

   }

  ngOnInit(): void {


  }

// getUsers(){
//   let token = this._userService.getToken()
//   console.log("Token is:", token)
//   this._apiService.get('user/get/'+token).subscribe((response)=>{
//     let obj = response as APIResponse
//     console.log("Data from server",obj)
//     if(obj.status){
//      let userData = obj.Data
//       // this.user = userData
//       return userData

//       console.log("User retreived is: ",userData)
//     }
//     else{
//       if(obj.message == "Session expired!"){
//         alert(obj.message + "Login again!")
//         // this._router.navigateByUrl('registeration/logout')
//       }
//     }
//   })
// }









}
