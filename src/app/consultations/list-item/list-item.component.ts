import { Component, Input, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { Consultation } from 'src/app/models/Consultation.model';
import { ConsultationDetailsComponent } from '../consultation-details/consultation-details.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() consultation: Consultation
  @Input() ionNav: IonNav
  constructor() { }

  async ngOnInit() {
  }

  showDetails() {
    this.ionNav.setRoot(ConsultationDetailsComponent, { nav: this.ionNav, consultation: this.consultation })
  }

  deleteItem() { }
  downloadFile() {
    window.open('http://localhost:8000' + this.consultation.peice_jointes[0].path, "_blank")
  }

}
