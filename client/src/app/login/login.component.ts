import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";
import { User } from "../model/users.model";
@Component({templateUrl: "login.component.html", styleUrls: ['./login.component.css']})
export class LoginComponent {
  public username: string;
  public password: string;
  public errorMessage: string;
  
  constructor(private router: Router,private auth: AuthService) {}
  authenticate(form: NgForm) {
    var user = new User(this.username,this.password);
    if (form.valid) {// perform authentication
      this.auth.authenticate(user).subscribe(response => {
        if (response) {
        sessionStorage.setItem('username',this.username);
        this.router.navigateByUrl("/incidents");}
      })
    } else {
      this.errorMessage = "Form Data Invalid";
    }}
  }
