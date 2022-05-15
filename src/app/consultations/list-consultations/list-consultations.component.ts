import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { IonNav, ModalController } from '@ionic/angular';
import { Consultation } from 'src/app/models/Consultation.model';
import { User } from 'src/app/models/Users.model';
import { ConsultationServiceAPI } from 'src/app/services/consultation-service.service';
import { ConsultationFormsComponent } from '../consultation-forms/consultation-forms.component';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.scss'],
})
export class ListConsultationsComponent implements OnInit {
  @Input() user: User
  @Input() nav: IonNav
  token: string
  consultations: Array<Consultation> = new Array()
  constructor(private modalController: ModalController, private consultationAPI: ConsultationServiceAPI) { }

  async ngOnInit() {
    this.token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
    this.fetchConsultation()
  }

  fetchConsultation() {
    this.consultationAPI.getConsultation(this.token).subscribe((value: any) => this.consultations = value, (e) => console.log(e))
  }

  async showConsultationFrom() {
    const modal = await this.modalController.create({ component: ConsultationFormsComponent })
    modal.present()
    await modal.onWillDismiss();
    this.fetchConsultation()

  }
}
