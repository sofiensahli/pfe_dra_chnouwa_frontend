import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/Users.model';
import { UserServiceAPI } from 'src/app/services/user-services.service';
import { showError } from 'src/app/utils/toast';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.scss'],
})
export class SignUpComponentComponent implements OnInit {
  user: User = new User()
  password_confirmation: string
  loadingModal: HTMLIonLoadingElement
  constructor(private userAPI: UserServiceAPI,
    private toastController: ToastController,
    private loadingController: LoadingController, private router: Router) { }

  async ngOnInit() {
    this.user.role = "user"
    this.loadingModal = await this.loadingController.create()
  }
  async register() {
    if (!this.user.first_name) {
      await showError("Vueillez renseigner tous les champs", this.toastController)
    } else if (this.user.password != this.password_confirmation) {
      await showError("Les mots de passe saisie ne sont pas identiques", this.toastController)
    } else {
      this.loadingModal.present()
      this.userAPI.sigUp(this.user).subscribe(value => {
        this.loadingModal.dismiss()
        this.router.navigateByUrl('/')
      }, async (e) => {
        console.log(e)
        await showError("Erreur interne du serveur ou e-mail dupliqué", this.toastController)
        this.loadingModal.dismiss()
      })
    }
  }


}
