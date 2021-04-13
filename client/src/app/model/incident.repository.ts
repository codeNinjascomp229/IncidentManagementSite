import { Injectable } from '@angular/core';
import { Incidents } from './incident.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { User } from './users.model';

@Injectable()
export class IncidentRepository {
  private incidents: Incidents[] = [];
  private assignies: string[] = [];
  constructor(private dataSource: RestDataSource) {
    dataSource.getIncidents().subscribe(data => {
      this.incidents = data.data;
      console.log(this.incidents);
      this.assignies = this.incidents.map(i => i.assigne)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }
  initializeData(): void {
    this.dataSource.getIncidents().subscribe(data => {
      this.incidents = data.data;
    });
  }
  getIncidents(assigne: string = null): Incidents[] {
    return this.incidents
      .filter(i => assigne == null || assigne === i.assigne);
  }

  getIncident(id: number): Incidents{
    return this.incidents.find(i => i.id === id);
  }
  addIncident(incident: Incidents) {
    this.incidents.push(incident);
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
}
