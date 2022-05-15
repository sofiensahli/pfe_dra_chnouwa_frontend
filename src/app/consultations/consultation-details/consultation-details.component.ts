import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Consultation } from 'src/app/models/Consultation.model';
import { ConsultationServiceAPI } from 'src/app/services/consultation-service.service';
import { showError, showInfo } from 'src/app/utils/toast';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss'],
})
export class ConsultationDetailsComponent implements OnInit {
  @Input() consultation: Consultation
  token: string
  loadingModal: HTMLIonLoadingElement
  constructor(private loadingController: LoadingController,
    private toastController: ToastController,
    private consultationAPI: ConsultationServiceAPI) { }

  async ngOnInit() {
    this.token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
    this.loadingModal = await this.loadingController.create()
  }
  updateConsultation() {
    this.loadingModal.present()
    this.consultationAPI.insertConsultation(this.consultation, this.token).subscribe((consultation: Consultation) => {
      this.consultation = consultation
      this.loadingModal.dismiss()
      showInfo('Donnée mis à jours', this.toastController)
    }, (e) => showError('Erreur interne veuillez ressayer dans quelques jours', this.toastController))
  }
}
