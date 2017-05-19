import { UserRepository } from './../repositories/user-repo';
import { inject } from "inversify/dts/annotation/inject";
export class UserHandler {
    private socket: SocketIO.Socket
    @inject(UserRepository)
    private userRepo: UserRepository

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.registerUser()
        console.log(this.userRepo)
    }

    private registerUser() {
        this.socket.on('user:new', (data: any) => {
            console.log(data)
        })
    }
}