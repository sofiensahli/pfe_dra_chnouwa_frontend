import { ToastController } from "@ionic/angular";

export async function showError(message: string, toastController: ToastController) {
  await toastController.create({
    animated: true,
    color: 'danger',
    position: "top",
    message: message,
    duration: 4000
  }).then(value => value.present())
}



export async function showInfo(message: string, toastController: ToastController) {
  await toastController.create({
    animated: true,
    color: 'primary',
    position: "top",
    message: message,
    duration: 4000
  }).then(value => value.present())
}
