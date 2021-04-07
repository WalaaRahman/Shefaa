
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerService } from './partner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient, private _partnerService:PartnerService ) {

  }

  token:any = this._partnerService.getToken()


  get(url:string){
    return this.httpClient.get(`${environment.APIURL}/${url}`,{headers:{'authorization':this.token}});
  }

  getedit(url:string){
    return this.httpClient.get(`${environment.APIURL}/${url}`);
  }

  getprescription(url:string){
    return this.httpClient.get(`${environment.APIURL}/${url}`);
  }

  post(url:string,partner:any){
    return this.httpClient.post(`${environment.APIURL}/${url}`,partner)
  }

  put(url:string,partner:any){
    return this.httpClient.put(`${environment.APIURL}/${url}`,partner,{headers:{'authorization':this.token}})
  }

  putedit(url:string,product:any){
    return this.httpClient.put(`${environment.APIURL}/${url}`,product)
  }

  delete(url:string){
    return this.httpClient.delete(`${environment.APIURL}/${url}`)
  }

}

