export class Task {

    private id: number;
    private content: string;
    private id_project: number;
    private priority: string;

    constructor(id, content, id_project, priority) {
        this.id = id;
        this.content = content;
        this.id_project = id_project;
        this.priority = priority;
    }

    public getId(){
        return this.id;
    }
    public getContent() {
        return this.content;
    }
    public getIdProject() {
        return this.id_project;
    }
    public getPriority() {
        return this.priority;
    }
}