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
    }

    private listen() {
        this.socket.on('room:new', (data:any) => {
            let creator = this.userRepo.getUserById(this.socket.id);
            let room = new Room(data.name, creator);
            console.log('creating room: ', room.name, room.creator.id)
            this.roomRepo.addRoom(room);
            this.socket.emit('room:created', {name: room.name, users: room.users, creator: room.creator.Name});
        })
    }

}