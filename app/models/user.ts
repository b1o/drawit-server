export class User {
    private name: string;
    public socket: SocketIO.Socket;
    public id: string;
    public inRoom: string;
    public inChannel: string;

    constructor(name: string, socket: SocketIO.Socket) {
        this.Name = name;
        this.socket = socket;
        this.id = this.socket.id;
    }

    get Name() {
        return this.name;
    }

    set Name(value: string) {
        if (value.length > 0) {
            this.name = value;
        }
    }

    public joinRoom(roomName: string) {
        this.leaveRoom(this.inRoom)
        this.inRoom = roomName;
        this.socket.join(roomName);
        this.socket.to(roomName).emit('user:joined', this.toDto())
        console.log(`user: ${this.name} joined room: ${roomName}`)
    }

    public leaveRoom(roomName: string) {
        this.socket.leave(this.inRoom);
        this.socket.to(roomName).emit('user:left', this.toDto())

    }


    public toDto(): UserDTO {
        let dto = new UserDTO(this)
        return dto;
    }
}

export class UserDTO {
    public name: string;
    public id: string;
    public inRoom: string

    constructor(user: User) {
        this.name = user.Name;
        this.id = user.id;
        this.inRoom = user.inRoom
    }
}