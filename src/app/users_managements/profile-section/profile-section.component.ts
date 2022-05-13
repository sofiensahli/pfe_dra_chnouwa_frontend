import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/Users.model';
import { UserServiceAPI } from 'src/app/services/user-services.service';
import { showError, showInfo } from 'src/app/utils/toast';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
})
export class ProfileSectionComponent implements OnInit {
  @Input() user: User = new User()
  password_confirmation: string = ""
  loadingModal: HTMLIonLoadingElement
  constructor(private loadingController: LoadingController, private userAPI: UserServiceAPI, private toastController: ToastController) { }

  async ngOnInit() {
    this.loadingModal = await this.loadingController.create()
  }

  async updatePassword() {
    const token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
    if (this.user.password == this.password_confirmation) {
      this.loadingModal.present()
      const service = await this.userAPI.updatePassword(this.user.password, this.user.id, token)
      if (service) {
        service.subscribe((response: any) => {
          this.loadingModal.dismiss()
          if (!response.error) {
            this.user = response
            showInfo('Information modifié avec success', this.toastController)
            this.password_confirmation = ""
          } else {
            showError('Echec veuillez ressayer plus tard', this.toastController)

          }
        }, (e) => {
          console.log(e)
          this.loadingModal.dismiss()

        })
      }
    } else {
      showError('Les mots de passes saisient ne sont pas compatible', this.toastController)
    }
  }

  async updateUserInfo() {
    const token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
    this.loadingModal.present()
    this.userAPI.updateUserInfo(this.user, token).subscribe((response: any) => {
      this.loadingModal.dismiss()
      if (!response.error) {
        this.user = response
        showInfo('Information modifié avec success', this.toastController)
      } else {
        showError('Echec veuillez ressayer plus tard', this.toastController)

      }
    }, (e) => {
      console.log(e)
      this.loadingModal.dismiss()

    })
  }


  async saveUserToStorage() {
    const localData = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value))
    localData.user = this.user
    await Storage.set({ key: 'user', value: JSON.stringify(localData) })
  }

}
