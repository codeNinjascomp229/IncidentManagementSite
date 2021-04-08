import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/users.model';
import { AuthService } from '../model/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  validEmail: boolean;

  constructor(private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onRegisterSubmit(): void {
    this.authService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/login']);
      }
    });
  }

}
