import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { of } from "rxjs";
import { Consultation } from "../models/Consultation.model";

@Injectable()
export class ConsultationServiceAPI {
  base_url = 'http://localhost:8000/api/'

  constructor(private httpClient: HttpClient, private toastController: ToastController) { }

  insertConsultation(consultation: Consultation, token) {
    console.log(consultation.file, token)
    const formData = new FormData()
    if (consultation.id)
      formData.append('id', consultation.id.toString())

    if (consultation.file)
      formData.append('document', consultation.file, new Date().getUTCMilliseconds().toString())
    formData.append('date_ouverture', new Date(consultation.date_ouverture).toISOString().slice(0, 19).replace('T', ' '))
    formData.append('date_publication', new Date(consultation.date_publication).toISOString().slice(0, 19).replace('T', ' '))
    formData.append('numero_comission', consultation.numero_comission)
    formData.append('numero_demande_achat', consultation.numero_demande_achat)
    formData.append('titre', consultation.titre)

    return this.httpClient.post(this.base_url + 'insert_consultation', formData, { headers: { Authorization: `Bearer ${token}` } })
  }
  getConsultation(token) {
    return this.httpClient.get(this.base_url + 'get-consultations', { headers: { Authorization: `Bearer ${token}` } })
  }

}
