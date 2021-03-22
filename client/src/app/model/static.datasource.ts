import { Injectable } from '@angular/core';
import { Incidents } from './incident.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource {
  private incidents: Incidents[] = [
    new Incidents(1, 11, "priority 1", "description 1", "narration 1", "customer 1", "status 1", "date 1", 10, "comment 1", "assigne 1", "resolution 1"),
    new Incidents(2, 12, "priority 2", "description 2", "narration 2", "customer 2", "status 2", "date 2", 10, "comment 2", "assigne 1", "resolution 2"),
    new Incidents(3, 13, "priority 3", "description 3", "narration 3", "customer 3", "status 3", "date 3", 10, "comment 3", "assigne 2", "resolution 3"),
    new Incidents(4, 14, "priority 4", "description 4", "narration 4", "customer 4", "status 4", "date 4", 10, "comment 4", "assigne 2", "resolution 4"),
    new Incidents(5, 15, "priority 5", "description 5", "narration 5", "customer 5", "status 5", "date 5", 10, "comment 5", "assigne 3", "resolution 5")
  ];

  getIncidents(): Observable<Incidents[]> {
    return from([this.incidents]);
  }
}
