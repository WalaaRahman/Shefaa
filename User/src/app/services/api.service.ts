import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient, private _userService:UserService ) {

  }

   token:any = this._userService.getToken()

  get(url:string){
    return this.httpClient.get(`${environment.APIURL}/${url}`,{headers:{'authorization':this.token}});
  }

  post(url:string,user:any){
    return this.httpClient.post(`${environment.APIURL}/${url}`,user)
  }

  put(url:string,user:any){
    return this.httpClient.put(`${environment.APIURL}/${url}`,user,{headers:{'authorization':this.token}})
  }

  
}

// ,{headers:{'authorization':this.token}}