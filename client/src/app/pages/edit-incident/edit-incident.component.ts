import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incidents } from 'src/app/model/incident.model';
import { IncidentRepository } from 'src/app/model/incident.repository';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {

  @Input() incident?: Incidents;
  public title:String;
  public id:number;

  constructor(private repository: IncidentRepository,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.id = +params['page'] || 0;
      this.title = this.route.snapshot.data['title'];
      console.log(this.id);
      this.setIncident(this.repository.getIncident(this.id));
    });
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  setIncident(incident: Incidents) {
  this.incident = incident;
  console.log(this.incident.status);

  }

  addIncident(incident: Incidents) {
    this.incident = incident;
    console.log(incident);
    this.repository.editIncident(incident);
    this.router.navigate(['/incidents'], { queryParams: { page: incident.id } });
    }
}
