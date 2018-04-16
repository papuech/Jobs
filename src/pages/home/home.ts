import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


// Sevices
import { SaverService } from "../../services/saver.service";
import { NotifyService } from "../../services/notify.service";
import { UtilsService } from "../../services/utils.service";

// Models
import { Task } from '../../models/task.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ionViewDidEnter() {
    this.initializeTasks();
  }

  taskList = new Array<Task>();

  constructor(public navCtrl: NavController, public notifyService: NotifyService, private saver: SaverService, private utils: UtilsService) {

  }

  public initializeTasks(){
    this.saver.getTasks(1, (res) => {
      if (res != null){
        this.taskList = res;
      }
    })
  }

  public removeTask(id){
    this.saver.removeTask(id, (res)=>{
      this.initializeTasks();
    })
  }

  public addQuickTask(){
    this.utils.addQuickTask(1, (res)=>{
      this.initializeTasks();
    });
  }


  public goProjects(){
    this.navCtrl.parent.select(1);
  }
  public goAdds() {
    this.navCtrl.parent.select(2);
  }


}
