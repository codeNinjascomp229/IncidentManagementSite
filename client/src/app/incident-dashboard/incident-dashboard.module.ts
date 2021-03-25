import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { IncidentDashboardComponent } from '../incident-dashboard/incident-dashboard.component';



@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [IncidentDashboardComponent],
    exports: [IncidentDashboardComponent]
})
export class IncidentDashboardModule {}