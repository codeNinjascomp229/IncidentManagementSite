import { Component, OnInit } from '@angular/core';
import { Incidents } from '../model/incident.model';
import { IncidentRepository } from './../model/incident.repository';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router'; 
import { Title } from '@angular/platform-browser';
import { AuthService } from "../model/auth.service";
@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css']
})
export class IncidentDashboardComponent implements OnInit {

  public selectedAssigne = null ;
  public  incidentsPerPage = 5;
  public selectedPage = 1;
  isLoggedIn : boolean;
  incident?: Incidents;
  constructor(private repository: IncidentRepository,private router: Router,private titleService : Title,private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.authenticated;
    console.log(this.auth.authenticated);
    
  }



  get incidents(): Incidents[]
  {
    const pageIndex = (this.selectedPage - 1) * this.incidentsPerPage;
    return this.repository.getIncidents(this.selectedAssigne)
    .slice(pageIndex, pageIndex + this.incidentsPerPage);
  }

  get assignies(): string[]
  {
    return this.repository.getAssignies();
  }

  setIncident(incident: Incidents) {
    this.incident = incident;
    console.log(incident);


      this.router.navigate(['/editInc'], { queryParams: { page: incident.id } });
    
  
    }
    deleteIncident(incident: Incidents) {
      this.incident = incident;
      console.log(incident);
      this.repository.deleteIncident(incident);
  
  
        this.router.navigate(['/incidents'], { queryParams: { page: incident.id } });
      
    
      }

  changeAssigne(newAssigne: string): string
  {
    return this.selectedAssigne = newAssigne;
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.incidentsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[]
  {
    return Array(Math.ceil(this.repository.getIncidents(this.selectedAssigne).length / this.incidentsPerPage))
    .fill(0).map((x,i) => i+1);
  }

  logout() {
    this.auth.clear();
    this.router.navigate(['/login'], { queryParams: { page: 3 } });
  }
}
