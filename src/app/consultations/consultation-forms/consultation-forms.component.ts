import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ModalController, ToastController } from '@ionic/angular';
import { Consultation } from 'src/app/models/Consultation.model';
import { ConsultationServiceAPI } from 'src/app/services/consultation-service.service';
import { showError } from 'src/app/utils/toast';

@Component({
  selector: 'app-consultation-forms',
  templateUrl: './consultation-forms.component.html',
  styleUrls: ['./consultation-forms.component.scss'],
})
export class ConsultationFormsComponent implements OnInit {
  @Input() consultation: Consultation = new Consultation()
  @Input() showFooter : boolean = true
  token: string
  constructor(private modalController: ModalController,
    private consultationServiceAPI: ConsultationServiceAPI, private toastController: ToastController) { }

  async ngOnInit() {
    this.token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
  }

  cancel() {
    this.modalController.dismiss()
  }
  confirmer() {
    this.consultationServiceAPI.insertConsultation(this.consultation, this.token)
      .subscribe(value => {
        this.modalController.dismiss()
      }, (e) => {
        showError('Erreur intern servenu, veuillier vous reconnecter', this.toastController)
        this.modalController.dismiss()

      })
  }
  onChange(event) {
    this.consultation.file = event.target.files[0];
  }

}
