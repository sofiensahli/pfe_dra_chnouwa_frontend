import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";
import { ToastController } from "@ionic/angular";
import { User } from "../models/Users.model";
import { showError } from "../utils/toast";
@Injectable()
export class UserServiceAPI {
  base_url = 'http://localhost:8000/api/'

  constructor(private httpClient: HttpClient, private toastController: ToastController) { }

  sigUp(user: User) {
    const formData = new FormData()
    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    formData.append('email', user.email)
    formData.append('phone', user.mobile_number)
    formData.append('password', user.password)
    formData.append('role', user.role)
    return this.httpClient.post(this.base_url + "sign-up", formData)
  }

  signIn(password: string, email: string) {
    const formData = new FormData()
    formData.append("password", password)
    formData.append('email', email)
    return this.httpClient.post(this.base_url + "sign-in", formData)
  }
  /*
  update-user-info
  update-user-password
  */
  updateUserInfo(user: User, token) {
    const formData = new FormData()
    formData.append('id', user.id.toString())
    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    formData.append('email', user.email)
    formData.append('mobile_number', user.mobile_number)
    formData.append('role', user.role)
    return this.httpClient.post(this.base_url + "update-user-info", formData, { headers: { Authorization: `Bearer ${token}` } })
  }

  async updatePassword(password: string, id: number, token) {

    const formData = new FormData()
    formData.append('password', password)
    formData.append('id', id.toString())
    return this.httpClient.post(this.base_url + "update-user-password", formData, { headers: { Authorization: `Bearer ${token}` } })
  }

}
