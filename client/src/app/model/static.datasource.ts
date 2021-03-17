import { Injectable } from '@angular/core';
import { Incident } from './incident.model';
import { Observable, from } from 'rxjs';
@Injectable()
export class StaticDataSource {
  private incidents: Incident[] = [
    new Incident(1, 11, 'major', 'Incident 1',['Incident 1','major'] ,'James Thomas', 'In Progress','15-03-2021',20,['Looking into it'],'Sally Thorn', 'Done'),
    new Incident(2, 12, 'minor', 'Incident 2',['Incident 2','minor'] ,'Olivia Thomas', 'Dispatched','18-03-2021',30,['Looking into it'],'Sherlock Homes', 'Open'),
    new Incident(3, 13, 'major', 'Incident 3',['Incident 3','major'] ,'Rachael Thomas', 'Closed','20-03-2021',15,['Looking into it'],'Jamie Mathew', 'Done')
    
   
  ];

  getIncidents(): Observable<Incident[]> {
    return from([this.incidents]);
  }
}
