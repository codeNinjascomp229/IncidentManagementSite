import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidents } from './incident.model';
import { map, tap } from "rxjs/operators";
import { User } from './users.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const PROTOCOL = 'http';
const PORT = 3500;


@Injectable()
export class RestDataSource
{
    baseUrl: string;
    auth_token: string;
    user:User;

    private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
    constructor(private http: HttpClient,private jwtService: JwtHelperService)
    {
        //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        this.baseUrl =`http://localhost:3000/api/`
    }

    getIncidents(): Observable<Incidents[]>
    {
        return this.http.get<Incidents[]>(this.baseUrl + 'incidents');
    }

     authenticate(user: User): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "login", {
            name: user.username, password: user.password
        }).pipe(map(response => {
            console.log(response);
            this.auth_token = response.success ? response.token : null;
            console.log(this.auth_token);
            console.log(response.username);
            return response.success;
        }
        ));
    } 
     
   /*  authenticate(user: User): Observable<any>
    {
      return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
    }
     */
    register(user:User) {
        return this.http.post<any>(this.baseUrl + "register", {name: user.username, password: user.password}).pipe(tap(res => {
        this.authenticate(user)
    }))
    }

    
  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
    //localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.auth_token = token;
    this.user = user;
  }

    loggedIn(): boolean
    {
        
      return !this.jwtService.isTokenExpired(this.auth_token);
    }
    
    logout(): Observable<any>
  {
    this.auth_token = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }
}


