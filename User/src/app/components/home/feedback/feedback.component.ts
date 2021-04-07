import { Component, OnInit } from '@angular/core';
import { WebsiteMessage } from './../../../models/websiteMessage';
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private _apiService: ApiService, private _userService: UserService,) { }
  websiteMessage: WebsiteMessage[] = [];
  userId: any;

  ngOnInit(): void {
    // ---- Get Mesaages
    this._apiService.get("message/message").subscribe((response) => {
      let obj = response as APIResponse;
      // console.log("Data from server", obj);
      if (obj.status) {
        let messageData = obj.Data
        this.websiteMessage = messageData

        // console.log("message retreived is: ", this.websiteMessage)
      }
      else {
        alert(obj.message)
      }
    })

  }

}
