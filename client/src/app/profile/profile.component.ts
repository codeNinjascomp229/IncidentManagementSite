import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentRepository } from '../model/incident.repository';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username = sessionStorage.getItem('username');
  constructor(private repository:IncidentRepository,private router:Router){}
  ngOnInit(): void {
  }

}
