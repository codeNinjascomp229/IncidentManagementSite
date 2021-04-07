import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { IncidentDashboardModule } from './incident-dashboard/incident-dashboard.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';
import { FormsModule } from '@angular/forms';
import { EditIncidentComponent } from './pages/edit-incident/edit-incident.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BasePageComponent,
    CreateIncidentComponent,
    EditIncidentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IncidentDashboardModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
      }
      
    })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
