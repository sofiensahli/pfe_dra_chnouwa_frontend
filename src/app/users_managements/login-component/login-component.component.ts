import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { showError } from 'src/app/utils/toast';
import { Storage } from '@capacitor/storage';
import { UserServiceAPI } from 'src/app/services/user-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  password_type: string = "password"
  icon_color: string = "none"
  password: string
  email: string
  loadingModal: HTMLIonLoadingElement
  constructor(private toastController: ToastController,
    private loadingController: LoadingController,
    private userAPI: UserServiceAPI, private router: Router) { }

  async ngOnInit() {
    this.loadingModal = await this.loadingController.create()
    const offlineData = await Storage.get({ key: "user" }).then(value => JSON.parse(value.value))
    if (offlineData) {
      this.router.navigateByUrl('/dashboard')
    }
  }
  changePasswordInputType() {
    this.password_type === "password" ? this.password_type = "text" : this.password_type = "password"
    this.password_type === "password" ? this.icon_color = "primary" : this.icon_color = "none"
  }

  login() {
    if (!this.password || !this.email) {
      showError('Veuillez remplir tous les champs', this.toastController)
    } else {
      this.loadingModal.present()
      this.userAPI.signIn(this.password, this.email).subscribe(async (value: any) => {
        console.log(value)
        if (value.error) {
          await showError("Mot de passe et/ou email incorrecte(s)", this.toastController)
        } else {
          await Storage.set({ key: "user", value: JSON.stringify(value) })
          this.router.navigateByUrl('/dashboard')

        }
        this.loadingModal.dismiss()
      }, async (e) => {
        this.loadingModal.dismiss()
        console.log(e)
        await showError("Mot de passe et/ou email incorrecte(s)", this.toastController)
      })
    }
  }
}
