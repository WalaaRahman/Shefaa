import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _partnerService:PartnerService, private _router:Router) { }

  ngOnInit(): void {
    this._partnerService.logout();
    // this._userService.setLoggedStatus(false)
    this._router.navigateByUrl("");
  }

}
