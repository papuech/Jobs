export class Project {

    private id: number;
    private name: string;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    public getId():number{
        return this.id;
    }
    public getName(): string {
        return this.name;
    }


}