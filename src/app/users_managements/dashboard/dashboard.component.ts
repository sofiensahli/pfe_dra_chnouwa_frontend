import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonNav, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ListConsultationsComponent } from 'src/app/consultations/list-consultations/list-consultations.component';
import { User } from 'src/app/models/Users.model';
import { showError } from 'src/app/utils/toast';
import { ProfileSectionComponent } from '../profile-section/profile-section.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: User
  user$: Observable<User>

  @ViewChild("nav") nav: IonNav
  constructor(private toastController: ToastController, private router: Router, private store: Store<{ user: User }>) {
    this.user$ = store.select('user')

  }

  async ngOnInit() {
    const offlineData = await this.user$.toPromise().then(value => value)
    // await Storage.get({ key: "user" }).then(value => JSON.parse(value.value))
    console.log(offlineData)
    if (!offlineData) {
      await showError("Vueillez vous connecter avant de pouvoir utiliser l'applicaiton", this.toastController)
      this.router.navigateByUrl('/')
    } else {
      this.user = offlineData
      this.nav.setRoot(ListConsultationsComponent, { user: this.user, nav: this.nav })

    }
  }

  async ngAfterViewInit() {
    console.log(await this.user$.toPromise().then(value => value))

  }

  async logOut() {
    await Storage.clear()
    this.router.navigateByUrl('/')
  }

  async profil() {
    this.nav.setRoot(ProfileSectionComponent, { user: this.user, nav: this.nav })
  }
  consultation() {
    this.nav.setRoot(ListConsultationsComponent, { user: this.user, nav: this.nav })

  }
}
