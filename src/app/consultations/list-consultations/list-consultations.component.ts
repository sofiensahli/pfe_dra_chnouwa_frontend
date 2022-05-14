import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/Users.model';
import { ConsultationFormsComponent } from '../consultation-forms/consultation-forms.component';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.scss'],
})
export class ListConsultationsComponent implements OnInit {
  @Input() user: User
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async showConsultationFrom() {
    this.modalController.create({ component: ConsultationFormsComponent })
      .then(value => value.present())
  }
}
