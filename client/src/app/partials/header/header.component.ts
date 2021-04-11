import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../model/auth.service";
import { Router } from "@angular/router";
import {User} from "../../model/users.model"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn : boolean;

  constructor(private router: Router,private auth: AuthService) 
  { 

  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.authenticated;
    console.log(this.auth.authenticated);
  }



  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

}
