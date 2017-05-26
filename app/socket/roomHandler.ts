import { Room } from './../models/room';
import { UserRepository } from './../repositories/user-repo';
import { RoomRepository } from './../repositories/room-repo';
import { User } from './../models/user';
import { AutoWired, Inject } from 'typescript-ioc'
import { Server } from '../server';

export class RoomHandler {
    private socket: SocketIO.Socket

    @Inject
    private roomRepo: RoomRepository;

    @Inject
    private userRepo: UserRepository;

    private global: SocketIO.Server

    constructor(socket: SocketIO.Socket, global: SocketIO.Server) {
        this.socket = socket;
        this.listen()
        this.global = global;
    }

    private listen() {
        this.socket.on('room:new', (data: any, callback:any) => {
            let creator = this.userRepo.getUserById(this.socket.id);
            let room = new Room(data.name, creator.toDto());
            let previousRoom = this.roomRepo.getRoomByName(creator.inRoom);
            previousRoom.removeUser(creator)
            console.log('creating room: ', room.name, room.creator.id)
            this.roomRepo.addRoom(room);
            creator.joinRoom(room.name);
            room.addUser(creator.toDto());
            let users = room.getUsers()
            this.global.emit('update:rooms', this.roomRepo.getAllRooms())
            this.global.to(room.name).emit('update:room-users', room.getUsers())
            this.global.to(previousRoom.name).emit('update:room-users', room.getUsers())
            
            console.log(users)
        })

        this.socket.on('user:joined', (data: any, callback: any) => {
            let user = this.userRepo.getUserByName(data.user.name);
            let room = this.roomRepo.getRoomByName(data.room);
            if(user.inRoom) {
                let previousRoom = this.roomRepo.getRoomByName(user.inRoom);
                previousRoom.removeUser(user)
                this.global.to(previousRoom.name).emit('update:room-users', previousRoom.getUsers())
            }
            user.joinRoom(room.name)
            room.addUser(user.toDto())
            this.global.to(room.name).emit('update:room-users', room.getUsers())
            this.global.emit('update:rooms', this.roomRepo.getAllRooms())
            this.global.emit('update:rooms', this.roomRepo.getAllRooms())
        })
    }

}