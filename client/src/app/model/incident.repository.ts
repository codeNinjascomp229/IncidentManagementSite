import { Injectable } from '@angular/core';
import { Incident } from './incident.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incident[] = [];
  constructor(private dataSource: StaticDataSource) {
    dataSource.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

  getIncident(id: number): Incident {
    return this.incidents.find(p => p.id === id);
  }
}