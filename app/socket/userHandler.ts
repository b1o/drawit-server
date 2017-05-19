import { User } from './../models/user';
import { UserRepository } from './../repositories/user-repo';
import { AutoWired, Inject } from 'typescript-ioc'

export class UserHandler {
    private socket: SocketIO.Socket

    @Inject
    private userRepo: UserRepository;

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.registerUser()
    }

    private registerUser() {
        this.socket.on('user:new', (data: any) => {

            let user = new User(data.name, this.socket)
            console.log(user.Name, this.socket.id)
            this.userRepo.addUser(user)
        })

        this.socket.on('disconnect', () => {
            this.userRepo.removeUser(this.socket.id)
        })
    }
}