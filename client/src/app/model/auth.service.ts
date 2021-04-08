import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { User } from './users.model';

@Injectable()
export class AuthService {
  user: User;
  constructor(private datasource: RestDataSource) {
    this.user =  new User();
  }
  
  authenticate(user: User): Observable<any>
  {
    
    return this.datasource.authenticate(user);
  }
  get authenticated(): boolean
  {
    return this.datasource.loggedIn();
  }

  
  storeUserDate(token: any, user: User): void
  {
    this.datasource.storeUserData(token, user);
  }

  
  logout(): Observable<any>
  {
    return this.datasource.logout();
  }

  clear() {
    this.datasource.auth_token = null;
  }

  registerUser(user: User): Observable<any>
  {
    return this.datasource.registerUser(user);
  }
}
