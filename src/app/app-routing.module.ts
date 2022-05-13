import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './users_managements/dashboard/dashboard.component';
import { LoginComponentComponent } from './users_managements/login-component/login-component.component';
import { SignUpComponentComponent } from './users_managements/sign-up-component/sign-up-component.component';

const routes: Routes = [

  {
    path: 'sign-up',
    component: SignUpComponentComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponentComponent
  }, {
    path: "dashboard"
    , component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
