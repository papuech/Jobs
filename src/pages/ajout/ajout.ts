import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Modules
import { Keyboard } from '@ionic-native/keyboard';

// Sevices
import { SaverService } from "../../services/saver.service";
import { NotifyService } from "../../services/notify.service";

// Models
import { Project } from '../../models/project.model';

@Component({
  selector: 'page-ajout',
  templateUrl: 'ajout.html'
})
export class AjoutPage {

  ionViewDidEnter() {
    this.initializeProjects();
  }

  //Binding
  projectName: string;
  projectArray = new Array<Project>();

  priority: string;
  taskName: string;
  selectedProject: number;



  constructor(public navCtrl: NavController, public notifyService: NotifyService, private keyboard: Keyboard, private saver: SaverService) {
  }

  //update the project list
  private initializeProjects() {
    this.saver.getProjectsList((res) => {
      if (res == false) {
        this.notifyService.notify('unable to get projectlist');
      } else {
        this.projectArray = res;
        this.selectedProject = this.projectArray[0].getId();
      }
    });
  }

  public projectAdder(): void {
    this.keyboard.close();
    if (this.projectName != '' && this.projectName != null) {
      this.saver.addProject(this.projectName, 1, (result) => {
        if (result == true) {
          this.notifyService.notify('Projet ajouté');
          this.initializeProjects();
        }
      });
      this.projectName = '';
    } else {
      this.notifyService.notify('Nom de projet manquant');
    }
  }

  public taskAdder(): void {
    this.keyboard.close();

    if (this.checkTaskName() && this.checkPriority()) {
      this.saver.addTask(this.taskName, this.selectedProject, this.priority, (res) => {
        this.taskName = '';
      });
    } else {
      this.notifyService.notify("Tâche non valide");
    }

  }

  // Methods to check inputs
  public checkPriority(): boolean {
    if (this.priority != 'important' && this.priority != 'absolue' && this.priority != 'normal' ) {
      this.notifyService.notify('Bad priority:' + this.priority);
      return false;
    }else {
      return true;
    }
  }
  public checkTaskName(): boolean {
    if (this.taskName != '' && this.taskName != null) {
      return true;
    } else {
      this.notifyService.notify('Bad Name : ' + this.taskName);
      return false;
    }
  }


}
