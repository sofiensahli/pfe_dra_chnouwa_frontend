import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponentComponent } from './users_managements/sign-up-component/sign-up-component.component';
import { UserServiceAPI } from './services/user-services.service';
import { LoginComponentComponent } from './users_managements/login-component/login-component.component';
import { DashboardComponent } from './users_managements/dashboard/dashboard.component';
import { ProfileSectionComponent } from './users_managements/profile-section/profile-section.component';
import { ConsultationFormsComponent } from './consultations/consultation-forms/consultation-forms.component';
import { ListConsultationsComponent } from './consultations/list-consultations/list-consultations.component';
import { ConsultationServiceAPI } from './services/consultation-service.service';

@NgModule({
  declarations: [AppComponent, SignUpComponentComponent
    , LoginComponentComponent, DashboardComponent, ProfileSectionComponent,
    ConsultationFormsComponent, ListConsultationsComponent],
  exports: [SignUpComponentComponent, LoginComponentComponent,
    DashboardComponent, ProfileSectionComponent, ConsultationFormsComponent, ListConsultationsComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserServiceAPI, ConsultationServiceAPI],
  bootstrap: [AppComponent],
})
export class AppModule { }
