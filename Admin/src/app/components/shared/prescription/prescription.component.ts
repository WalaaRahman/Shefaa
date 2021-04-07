import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/models/Api-response';
import { Prescription } from 'src/app/models/prescription';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  user: User;
  selectedFile: any;
  url: any;
  isUploadedPrescription: boolean;
  prescription: Prescription

  constructor(private _apiService: ApiService, private _router: Router, private _userService: UserService,) { }

  ngOnInit(): void {

    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server in prescription:", obj)
      if (obj.status) {
        let userData = obj.Data
        this.user = userData

      }
    })

  }


  uploadPrescription() {

    if (this.isUploadedPrescription) {
      this.onUpload()
    } else {
      alert("please, upload your prescription !")
    }
    this.isUploadedPrescription = false
  }


  onUpload() {

    const uploadData = new FormData();
    uploadData.append('prescriptionURL', this.selectedFile, this.selectedFile.name);
    console.log("uploadData", uploadData)
    this._apiService.post('prescription/' + this.user.id, uploadData).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data after upload prescription:", obj)
      this.prescription = obj.Data
      alert(obj.message + "please wait until we review your prescription and reply to you ^^ ")
      this._router.navigateByUrl('')
    })

  }



  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
    console.log("selectedFile", this.selectedFile)

    this.processFile(this.selectedFile)
    this.isUploadedPrescription = true

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
      // console.log(this.url)
    } catch (err) {
      console.log(err);
    }
  }









}



