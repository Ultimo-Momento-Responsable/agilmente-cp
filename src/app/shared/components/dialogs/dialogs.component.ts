import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {

  constructor(public alertController: AlertController,
              private location: Location,
              public router: NavController) {}
  dialogComponentObj: any = {};

  async presentAlert(header: string, subHeader: string, message: string, url: string, reset: boolean = false, cssClass = "my-custom-class") {
    return new Promise(async (confirm) => {
      const alert = await this.alertController.create({
        cssClass: cssClass,
        header: header,
        subHeader: subHeader,
        message: message,
        buttons:     
          [
            {
              text: 'OK',
              handler: () => {
                return confirm(true);
              }
            }
          ]
        }
      );
      await alert.present();
      if (await alert.onDidDismiss()){
        if (reset) {
          this.location.back();
        }
        if (url != "") {
          this.router.navigateForward(url);
        }
      }
    })
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
