import { Injectable } from '@angular/core';

// Modules
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Services
import { NotifyService } from "./notify.service";

// Models
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

const DATABASE_NAME: string = "data.jobs.db";

@Injectable()   
export class SaverService {

    // DATABASE
    private db: SQLiteObject;

    constructor(private sqlite: SQLite, private notifyService: NotifyService) {
        this.createDatabaseFile();
    }

    // ------------INITIALISATION------------
    public createDatabaseFile(): void {
        this.sqlite.create({
            name: DATABASE_NAME,
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.db = db;
                console.log('bdd créée')
                this.createTable1();
            })
            .catch(e => console.log(e));
    }
    private createTable1(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `projects` (`id` INTEGER NOT NULL ,`name` TEXT NOT NULL, PRIMARY KEY (id))', {})
            .then(() => {
                this.createTable2();
            })
            .catch(e => {
                this.notifyService.notify('erreur creation table 1')
                console.log(e);
            })
    }
    private createTable2(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `tasks` (`id` intEGER NOT NULL ,`content` TEXT NOT NULL, `id_project` intEGER NOT NULL, `priority` TEXT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (id_project) REFERENCES projects(id))', {})
            .then(() => {
                this.initializeGeneral();
            })
            .catch(e => {
                this.notifyService.notify('erreur creation table 2')
                console.log(e);
            })
    }
    private initializeGeneral(): void {
        this.addProject('general', 1, (res) => {
            if (res == true) {
                this.notifyService.notify('Tout est prêt !');
            }
        });
    }

    // --------- Projects --------------
    public getProject(id, callback) {
        this.db.executeSql('SELECT id, name FROM projects WHERE id == ' + id + ';', {})
            .then((data) => {
                if (data == null) {
                    return;
                }                
                //New
                callback(new Project(data.rows.item(0).id, data.rows.item(0).name));
            })
            .catch((err) => {
                callback(false);
            });
    }
    public getProjects(callback) {
        this.db.executeSql('SELECT id, name FROM projects WHERE id <> 1;', {})
            .then((data) => {
                if (data == null) {
                    this.notifyService.notify('data null');
                    callback(null);
                }
                if (data.rows.length == 0) {
                    callback(null);
                }else{
                    var tempArray = new Array<Project>();
                    for (var i = 0; i < data.rows.length; i++) {
                        tempArray.push(
                            new Project(data.rows.item(i).id, data.rows.item(i).name)
                        )
                    }
                    callback(tempArray);
                }
                
            })
            .catch((err) => {
                this.notifyService.notify('unable to get projects');
                callback(false);
            });
    }
    public getProjectsList(callback) {
        this.db.executeSql('SELECT id, name FROM projects;', {})
            .then((data) => {
                if (data == null) {
                    return;
                }
                var tempArray = new Array<Project>();
                for (var i = 0; i < data.rows.length; i++) {
                    tempArray.push(
                        new Project(data.rows.item(i).id, data.rows.item(i).name)
                    )
                }
                callback(tempArray);
            })
            .catch((err) => {
                callback(false);
            });
    }

    public addProject(newProjet, notif, callback) {
        //notif parameter is used to trigger a toast or not
        this.db.executeSql('SELECT * FROM projects WHERE name = \'' + newProjet + '\';', {})
            .then((data) => {
                //check for existing value
                if (data.rows.length == 0) {
                    this.db.executeSql('INSERT INTO projects (name) VALUES (\'' + newProjet + '\')', {})
                        .then((res) => {
                            if (notif == 1) {
                                callback(true);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                            callback(false);
                        });
                }
                else {
                    callback(false);
                }
            });
        callback(false);
    }
    public delProject(id, callback) {
        if (id != 1) {
            this.db.executeSql('DELETE FROM tasks WHERE `id_project` == \'' + id + '\';', {})
                .then((data2) => {
                    //removing the project request
                    this.db.executeSql('DELETE FROM projects WHERE id == \'' + id + '\';', {})
                        .then((data3) => {
                            callback(data3);
                        })
                        .catch((err) => {
                            this.notifyService.notify('fail remove project' + err);
                            callback(err);
                        }
                        );
                })
                .catch((err) => {
                    this.notifyService.notify('fail remove tasks' + err);
                    callback(err);
                }
                );
        }else{
            this.notifyService.notify('cannot remove general');
        }
        
    }

    // --------- tasks --------------
    public addTask(task, project, priority, callback) {
        this.db.executeSql('INSERT INTO tasks (content, id_project, priority) VALUES (\'' + task + '\', \'' + project + '\', \'' + priority + '\')', {})
            .then((res) => {
                callback(res);
            })
            .catch((err) => {
                this.notifyService.notify(err);
                callback(err);
            }
            );
    }
    public getTasks(id_project, callback) {
        this.db.executeSql('SELECT * FROM tasks WHERE `id_project` == ' + id_project + ';', {})
            .then((data) => {
                if (data == null) {
                    return null;
                }
                var taskArray = new Array<Task>();
                for (var i = 0; i < data.rows.length; i++) {
                    taskArray.push(
                        new Task(
                            data.rows.item(i).id,
                            data.rows.item(i).content,
                            data.rows.item(i).id_project,
                            data.rows.item(i).priority
                        )
                    );
                }
                callback(taskArray);
            })
            .catch((err) => {
                callback(err);
            });
    }
    public removeTask(id, callback) {
        this.db.executeSql('DELETE FROM tasks WHERE `id` == \'' + id + '\';', {})
            .then((data) => {
                callback(data);
            })
            .catch((err) => {
                this.notifyService.notify('fail remove task' + err);
                callback(err);
            }
            );
    }

}