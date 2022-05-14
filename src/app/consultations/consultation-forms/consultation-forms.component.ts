import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ModalController } from '@ionic/angular';
import { Consultation } from 'src/app/models/Consultation.model';
import { ConsultationServiceAPI } from 'src/app/services/consultation-service.service';

@Component({
  selector: 'app-consultation-forms',
  templateUrl: './consultation-forms.component.html',
  styleUrls: ['./consultation-forms.component.scss'],
})
export class ConsultationFormsComponent implements OnInit {
  @Input() consultation: Consultation = new Consultation()

  token: string
  constructor(private modalController: ModalController, private consultationServiceAPI: ConsultationServiceAPI) { }

  async ngOnInit() {
    this.token = await Storage.get({ key: 'user' }).then(value => JSON.parse(value.value).token)
  }
  cancel() {
    this.modalController.dismiss()
  }
  confirmer() {
    this.consultationServiceAPI.insertConsultation(this.consultation, this.token).subscribe(value => console.log(value), (e) => console.log(e))
  }
  onChange(event) {
    this.consultation.file = event.target.files[0];
  }
}
