import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController,
    public toastController: ToastController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      
       message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'top', 
      message,
      duration: 1500
    });
    toast.present();
  }
}
