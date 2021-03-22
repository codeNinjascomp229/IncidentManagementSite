import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IncidentDashboardComponent } from './incident-dashboard/incident-dashboard.component';
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';
import { FormsModule } from '@angular/forms';
import { EditIncidentComponent } from './pages/edit-incident/edit-incident.component';
const routes: Routes = [

  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'incidents', component: IncidentDashboardComponent, data: {title: 'Incidents'}},
  {path: 'createInc', component: CreateIncidentComponent, data: {title: 'Create Incidents'}},
  {path: 'editInc', component: EditIncidentComponent, data: {title: 'Edit Incident'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
