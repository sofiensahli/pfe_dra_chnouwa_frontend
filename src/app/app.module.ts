import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ListItemComponent } from './consultations/list-item/list-item.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConsultationDetailsComponent } from './consultations/consultation-details/consultation-details.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../app/state-management/users';
registerLocaleData(localeFr, 'fr');

// the second parameter 'fr' is optional
@NgModule({
  declarations: [AppComponent, SignUpComponentComponent
    , LoginComponentComponent, DashboardComponent, ProfileSectionComponent,
    ConsultationFormsComponent, ListConsultationsComponent, ListItemComponent, ConsultationDetailsComponent],
  exports: [SignUpComponentComponent, LoginComponentComponent, ConsultationDetailsComponent,
    DashboardComponent, ProfileSectionComponent, ConsultationFormsComponent, ListConsultationsComponent, ListItemComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, StoreModule.forRoot({ user: counterReducer })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LOCALE_ID, useValue: 'fr' }
    , UserServiceAPI, ConsultationServiceAPI],
  bootstrap: [AppComponent],
})
export class AppModule {

}
