import { Injectable } from '@angular/core';

//Modules
import { AlertController } from 'ionic-angular';

// Sevices
import { SaverService } from "./saver.service";
import { NotifyService } from "./notify.service";

@Injectable()
export class UtilsService {

    private newTaskContent: string;
    private newTaskPriority: string;
    private newTaskIdProject: number;

    constructor(private alertCtrl: AlertController, private notifyService: NotifyService, private saver: SaverService) {

    }


    // ============  INPUTS CHECKERS ============

    public checkPriority(priority): boolean {
        if (priority != 'important' && priority != 'absolue' && priority != 'normal') {
            this.notifyService.notify('Erreur priorité');
            return false;
        } else {
            return true;
        }
    }
    public checkTaskName(taskName): boolean {
        if (taskName != '' && taskName != null && taskName != ' ') {
            return true;
        } else {
            this.notifyService.notify('Tâche incorrecte');
            return false;
        }
    }
    public escapeQuote(value): string {
        value = new String(value);
        value = value.replace(/[']/, '\'');
        value = value.replace(/[""]/, '\"');
        value = value.replace(/\s{2,}/, ' ' );
        return value;
    }

    // ============  ADD TASK NAVBAR QUICK ============
    public addQuickTask(idProject, callback){
        this.newTaskIdProject = idProject;
        this.showContent((res)=>{
            callback(res);
        });  
    }
    public addQuickProject(callback){
        let prompt = this.alertCtrl.create({
            title: 'Ajouter un projet :',
            inputs: [
                {
                    name: 'projet',
                    placeholder: 'Nom du projet'
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ajouter',
                    handler: data => {
                        let projectName = this.escapeQuote(data.projet);
                        if (this.checkTaskName(projectName)) {
                            this.saver.addProject(projectName,0,(res)=>{
                                callback(res);
                            })
                        }
                    }
                }
            ]
        });
        prompt.present();
    }



    private showContent(callback){
        let prompt = this.alertCtrl.create({
            title: 'Ajouter une tâche :',
            inputs: [
                {
                    name: 'content',
                    placeholder: 'Contenu'
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Suivant',
                    handler: data => {
                        this.newTaskContent = this.escapeQuote(data.content);
                        if (this.checkTaskName(this.newTaskContent)){
                            this.showPriority((res) =>{
                                callback(res);
                            });
                        }                        
                    }
                }
            ]
        });
        prompt.present();
    }
    private showPriority(callback){
        let alert = this.alertCtrl.create();
        alert.setTitle('Priorité :');

        alert.addInput({
            type: 'radio',
            label: 'Normal',
            value: 'normal',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Important',
            value: 'important',
            checked: false
        });
        alert.addInput({
            type: 'radio',
            label: 'Absolue',
            value: 'absolue',
            checked: false
        });

        alert.addButton('Annuler');
        alert.addButton({
            text: 'OK',
            handler: data => {
                
                if (this.checkPriority(data) ) {
                    this.newTaskPriority = data;
                    this.saver.addTask(this.newTaskContent, this.newTaskIdProject, this.newTaskPriority, (data) => {
                        callback(data);
                    });
                }
                
            }
        });
        alert.present();
    }


}
