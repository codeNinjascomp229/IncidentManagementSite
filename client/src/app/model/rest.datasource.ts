import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidents } from './incident.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource
{
    baseUrl: string;

    constructor(private http: HttpClient)
    {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getIncidents(): Observable<Incidents[]>
    {
        return this.http.get<Incidents[]>(this.baseUrl + 'incidents');
    }

    
}