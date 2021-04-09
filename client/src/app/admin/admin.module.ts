import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../login/auth.guard';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { EmailValidateDirective } from './email-validator';


const routing = RouterModule.forChild([
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  { path: '**', redirectTo: 'login' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [LoginComponent, RegisterComponent, EmailValidateDirective],
  exports: [EmailValidateDirective]
})
export class AdminModule {}
