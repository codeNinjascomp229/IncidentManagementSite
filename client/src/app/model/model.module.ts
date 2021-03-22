import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IncidentRepository } from './incident.repository';

import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@NgModule({
  imports: [HttpClientModule],
  providers: [IncidentRepository, StaticDataSource, {provide: StaticDataSource, useClass: RestDataSource}]
})
export class ModelModule { }