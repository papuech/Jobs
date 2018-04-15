import { Injectable } from '@angular/core';

//Modules
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotifyService {


    constructor(public toastCtrl: ToastController) {

    }

    public notify(message): void {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }
}