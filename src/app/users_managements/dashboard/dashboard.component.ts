import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonNav, ToastController } from '@ionic/angular';
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
  @ViewChild("nav") nav: IonNav
  constructor(private toastController: ToastController, private router: Router) { }

  async ngOnInit() {
    const offlineData = await Storage.get({ key: "user" }).then(value => JSON.parse(value.value))
    if (!offlineData) {
      await showError("Vueillez vous connecter avant de pouvoir utiliser l'applicaiton", this.toastController)
      this.router.navigateByUrl('/')
    } else {
      this.user = offlineData.user
      this.nav.setRoot(ListConsultationsComponent, { user: this.user , nav : this.nav })

    }
  }

  ngAfterViewInit(): void {

  }

  async logOut() {
    await Storage.clear()
    this.router.navigateByUrl('/')
  }

  async profil() {
    this.nav.setRoot(ProfileSectionComponent, { user: this.user , nav : this.nav})
  }
  consultation(){
    this.nav.setRoot(ListConsultationsComponent, { user: this.user , nav : this.nav })

  }
}
