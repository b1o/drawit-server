export class User {
    private name:string;
    private socket: SocketIO.Socket;

    constructor(name:string, socket: SocketIO.Socket) {
        this.Name = name;
        this.socket = socket;
    }

    get Name() {
        return this.name;
    }

    set Name(value:string) {
        if(value.length > 0) {
            this.name = value;
        }
    }
}