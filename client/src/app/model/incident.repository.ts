import { Injectable } from '@angular/core';
import { Incidents } from './incident.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incidents[] = [];
  private assignies: string[] = [];
  constructor(private dataSource: StaticDataSource) {
    dataSource.getIncidents().subscribe(data => {
      this.incidents = data;
      this.assignies = data.map(i => i.assigne)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
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
    this.incidents.concat(incident);
  }

  getAssignies(): string[] {
    return this.assignies;
  }
}
