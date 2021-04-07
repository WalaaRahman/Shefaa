import { APIResponse } from './../../../models/Api-response';
import { WebsiteMessage } from './../../../models/websiteMessage';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _router: Router,private httpClient:HttpClient) { }

  formGroup:FormGroup;

  ngOnInit(): void {

    this.formGroup = this._formBuilder.group({
      name:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      email:['',[Validators.required, Validators.email]],
      phone:[''],
      subject:['',[Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
      messageContent:['',[Validators.required,Validators.minLength(10), Validators.maxLength(500)]],
    })


  }




  sendMessage(){
    let message = new WebsiteMessage()
    message = this.formGroup.value

    this.httpClient.post(`${environment.APIURL}/message/`,message).subscribe((response)=>{
      let obj = response as APIResponse
      if(obj.status){
        alert(obj.message)
        // this._router.navigateByUrl('')
      }else{
        alert(obj.message)
      }
    })

    

  }









}
