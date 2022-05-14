import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";
import { ToastController } from "@ionic/angular";
import { Consultation } from "../models/Consultation.model";
import { User } from "../models/Users.model";
import { showError } from "../utils/toast";
@Injectable()
export class ConsultationServiceAPI {
  base_url = 'http://localhost:8000/api/'

  constructor(private httpClient: HttpClient, private toastController: ToastController) { }

  insertConsultation(consultation: Consultation, token) {
    console.log(consultation, token)
    const formData = new FormData()
    formData.append('document', consultation.file, new Date().getUTCMilliseconds().toString())
    formData.append('date_ouverture', new Date(consultation.date_ouverture).toISOString().slice(0, 19).replace('T', ' '))
    formData.append('date_publication', new Date(consultation.date_publication).toISOString().slice(0, 19).replace('T', ' '))
    formData.append('numero_comission', consultation.numero_comission)
    formData.append('numero_demande_achat', consultation.numero_demande_achat)

    return this.httpClient.post(this.base_url + 'insert_consultation', formData, { headers: { Authorization: `Bearer ${token}` } })
  }
}
