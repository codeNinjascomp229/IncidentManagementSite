import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { switchAll } from 'rxjs/operators';
import { Incidents } from './incident.model';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incidents[] = [];
  private assignies: string[] = [];
  constructor(private dataSource: RestDataSource) {
    this.initializeIncidents();
  }
  getIncidents(assigne: string = null): Incidents[] {
    return this.incidents
      .filter(i => assigne == null || assigne === i.assigne);
  }

  getIncident(id: number): Incidents{
    return this.incidents.find(i => i.id === id);
  }
  addIncident(incident: Incidents): void {
    
    this.dataSource.addIncident(incident).subscribe(data => {
      const addedIncident = data.data as Incidents;
      const error = data.error;

      if(addedIncident){
        this.initializeIncidents();
      }
    })
  }
  editIncident(incident: Incidents) {
    this.incidents.concat(incident);
  }
  
  deleteIncident(incident: Incidents) {
    console.log("delete");
    const index: number = this.incidents.indexOf(incident);
    this.incidents.splice(index, 1);
  }

  getAssignies(): string[] {
    return this.assignies;
  }

  initializeIncidents(): void {
    this.dataSource.getIncidents().subscribe(data => {
      this.incidents = data;
      this.assignies = data.map(i => i.assigne)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
    })
  }
}
