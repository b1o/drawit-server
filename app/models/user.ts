export class User {
    private name:string;
    public socket: SocketIO.Socket;
    public id:string;
    public inRoom:string;
    public inChannel:string;

    constructor(name:string, socket: SocketIO.Socket) {
        this.Name = name;
        this.socket = socket;
        this.id = this.socket.id;
    }

    get Name() {
        return this.name;
    }

    set Name(value:string) {
        if(value.length > 0) {
            this.name = value;
        }
    }

    public toDto() {
        let dto = {
            name: this.name,
            inRoom: this.inRoom,
            id: this.id,
        }
        return dto;
   }
}