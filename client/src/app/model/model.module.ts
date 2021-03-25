import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IncidentRepository } from './incident.repository';

import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { AuthService } from "./auth.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [IncidentRepository, StaticDataSource, {provide: StaticDataSource, useClass: RestDataSource},
    RestDataSource,AuthService]
})
export class ModelModule { }