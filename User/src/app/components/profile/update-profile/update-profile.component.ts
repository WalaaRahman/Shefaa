import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { User } from './../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _userService: UserService, private _formBuilder: FormBuilder, private httpClient: HttpClient) { }
  user: User;
  formGroup: FormGroup;
  selectedFile: any;
  url: any
  isUploadedPhoto: boolean = false;



  ngOnInit(): void {

    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server in update user:", obj)
      if (obj.status) {
        let userData = obj.Data
        this.user = userData

      }
    })



    this.formGroup = this._formBuilder.group({
      name: [, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email: [, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50)]],
      phone: [],
      address: [],
    })
  }

  updateUser() {
    let user = new User();
    user = this.formGroup.value
    // console.log("Form value:", user)
    this._apiService.put('user/update/' + this.user.id, user).subscribe((response) => {
      let obj = response as APIResponse
      console.log("User updated:", obj)
      if (obj.status) {
        alert(obj.message)
        this._router.navigateByUrl('profile')
      }
      else {
        alert(obj.message)
      }
    })

    if (this.isUploadedPhoto) {
      this.onUpload()
    }
    this.isUploadedPhoto=false

  }



  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
    console.log("selectedFile", this.selectedFile)

    this.processFile(this.selectedFile)
    this.isUploadedPhoto = true

  }



  onUpload() {

    const uploadData = new FormData();
    uploadData.append('photoURL', this.selectedFile, this.selectedFile.name);
    console.log("uploadData", uploadData)
    this.httpClient.post(`${environment.APIURL}/user/photo/` + this.user.id, uploadData).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data after update photo:", obj)
    })


  }



  readFileAsync(file: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    })
  }


  async processFile(file: any) {
    try {
      let contentBuffer = await this.readFileAsync(file);
      this.url = contentBuffer
    } catch (err) {
      console.log(err);
    }
  }













}
