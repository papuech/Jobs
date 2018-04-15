import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Modules
import { AlertController } from 'ionic-angular';
import { SubProjectPage } from "../subproject/subproject";

// Sevices
import { SaverService } from "../../services/saver.service";
import { NotifyService } from "../../services/notify.service";

// Models
import { Project } from '../../models/project.model';

@Component({
  selector: 'page-projets',
  templateUrl: 'projets.html'
})
export class ProjetsPage {

  ionViewDidEnter() {
    this.initializeProjects();
  }

  projectArray = new Array<Project>();

  constructor(public navCtrl: NavController, public notifyService: NotifyService, private saver: SaverService, public alertCtrl: AlertController) {
  }

  //update the project list
  private initializeProjects() {
    this.saver.getProjects((res) => {
      if (res != false) {
        this.projectArray = res;
      } else {
        console.log('no project found');
      }
    });
  }

  public removeProject(project) {
    let confirm = this.alertCtrl.create({
      title: 'Suppression',
      message: 'Êtes-vous sûr de vouloir supprimer le projet ' + project.name + ' ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.saver.delProject(project.id, (res) => {
              // this.notify('project deleted');
              this.initializeProjects();
            })
          }
        }
      ]
    });
    confirm.present();
  }

  public seeProject(projectSelected){
    this.navCtrl.push(SubProjectPage, { project: projectSelected});
  }

}
