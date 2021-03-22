import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incidents } from '../../model/incident.model';
import { IncidentRepository } from '../../model/incident.repository';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.css']
})
export class CreateIncidentComponent implements OnInit {
  @Input() incident?: Incidents;
  public title:String;
  public id:number;


  constructor(private repository: IncidentRepository,private route: ActivatedRoute,
    private router: Router) {
  
   }

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
  
    onClickSubmit(incident) {
      this.incident = incident;
      console.log(incident);
      this.repository.addIncident(incident);
      this.router.navigate(['/incidents']);
      }
  
  
  
        
      
    
      
  

}
