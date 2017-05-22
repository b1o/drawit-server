import { RoomRepository } from './../repositories/room-repo';
import { User } from './../models/user';
import { UserRepository } from './../repositories/user-repo';
import { AutoWired, Inject } from 'typescript-ioc'

export class UserHandler {
    private socket: SocketIO.Socket

    @Inject
    private userRepo: UserRepository;

    @Inject
    private roomRepo: RoomRepository;

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.registerUser()

    }

    private registerUser() {
        this.socket.on('user:new', (data: any, callback: any) => {
            let user = new User(data.name, this.socket)
            console.log(user.Name, this.socket.id)
            let a = this.userRepo.addUser(user)
            a.socket.join('Lobby')
            a.inRoom = 'Lobby';
            a.socket.emit('update:users', a.toDto())
            a.socket.in('Lobby').emit('update:users', a.toDto())
            if (callback) {
                callback({users: this.userRepo.getAllUsers(), me: a.toDto()})
                console.log(this.userRepo.getAllUsers())
            }

        })


        this.socket.on('message:new', (data: any, callback: any) => {
            let user = this.userRepo.getUserByName(data.from)
            if (user) {
                let room = user.inRoom;
                this.socket.in(room).emit('message', { from: data.from, text: data.message })
                if (callback) {
                    callback({ from: data.from, text: data.message })
                }
            }
        })

        this.socket.on('disconnect', () => {
            console.log('disconnected', this.socket.id)
            this.userRepo.removeUser(this.socket.id)
        })
    }
}