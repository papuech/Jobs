import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Sevices
import { SaverService } from "../../services/saver.service";
import { NotifyService } from "../../services/notify.service";

// Models
import { Project } from '../../models/project.model';
import { Task } from "../../models/task.model";

@Component({
  selector: 'page-subproject',
  templateUrl: 'subproject.html'
})
export class SubProjectPage {

  ionViewDidEnter() {
    this.initializeTasks();
  }

  currentProject: Project;
  taskList = new Array<Task>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public notifyService: NotifyService, private saver: SaverService) {
    this.currentProject = this.navParams.get('project');
  }

  public initializeTasks() {
    this.saver.getTasks(this.currentProject.getId(), (res) => {
      if (res != null) {
        this.taskList = res;
      } else {
        this.notifyService.notify('fail to get tasks');
      }
    })
  }

  public removeTask(id){
    this.saver.removeTask(id, (res) => {
      this.initializeTasks();
    })
  }

  

}
