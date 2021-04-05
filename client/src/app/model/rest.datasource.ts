import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidents } from './incident.model';
import { map, tap } from "rxjs/operators";

const PROTOCOL = 'http';
const PORT = 3500;


@Injectable()
export class RestDataSource
{
    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient)
    {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getIncidents(): Observable<Incidents[]>
    {
        return this.http.get<Incidents[]>(this.baseUrl + 'incidents');
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
        }).pipe(map(response => {
            console.log(response);
            this.auth_token = response.success ? response.token : null;
            console.log(this.auth_token);
            return response.success;
        }
        ));
    }
     
    //modify accordingly
    register(email:string, password:string) {
        return this.http.post<any>(this.baseUrl + "register", {email, password}).pipe(tap(res => {
        this.authenticate(email, password)
    }))
    }
    
}