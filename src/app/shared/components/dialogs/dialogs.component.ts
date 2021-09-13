import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {

  constructor(public alertController: AlertController) {}
  dialogComponentObj: any = {};

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertConfirm(header: string, message: string) {
    return new Promise(async (confirm) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: header,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              return confirm(true);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              return confirm(false);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  ngOnInit() {}

}