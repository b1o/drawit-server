import { Room } from './../models/room';
import { UserRepository } from './../repositories/user-repo';
import { RoomRepository } from './../repositories/room-repo';
import { User } from './../models/user';
import { AutoWired, Inject } from 'typescript-ioc'

export class RoomHandler {
    private socket: SocketIO.Socket

    @Inject
    private roomRepo: RoomRepository;

    @Inject
    private userRepo: UserRepository;

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.listen()
        let lobby = new Room('Lobby')
    }

    private listen() {
        this.socket.on('room:new', (data: any) => {
            let creator = this.userRepo.getUserById(this.socket.id);
            let room = new Room(data.name, creator);
            console.log('creating room: ', room.name, room.creator.id)
            this.roomRepo.addRoom(room);

            room.join(creator);
            let users = room.users.map(function (user) {
                return user.toDto()
            });
            this.socket.broadcast.emit('update:rooms', { name: room.name, users: users, creator: room.creator.toDto() });
            this.socket.emit('update:rooms', { name: room.name, users: users, creator: room.creator.toDto() })
            console.log(users)
        })

        this.socket.on('user:joined', (data:any) => {
            let user = this.userRepo.getUserByName(data.user);
            let room = this.roomRepo.getRoomByName(data.room);
            user.socket.join(room.name)
            room.join(user)
        })
    }

}