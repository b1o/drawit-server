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

    private global: SocketIO.Server

    private searchedWord: string;
    private gameStared = false;

    constructor(socket: SocketIO.Socket, global: SocketIO.Server) {
        this.socket = socket;
        this.registerUser()
        this.global = global;
    }

    private registerUser() {
        this.socket.on('user:new', (data: any, callback: any) => {
            console.log('adding new user - ', data.name)
            let user = new User(data.name, this.socket)
            let a = this.userRepo.addUser(user)
            let room = this.roomRepo.getRoomByName('Lobby');
            a.joinRoom('Lobby')
            room.addUser(user.toDto())

            this.global.in('Lobby').emit('update:room-users', room.getUsers())
            this.global.in('Lobby').emit('update:rooms', this.roomRepo.getAllRooms())

            if (callback) {
                callback({ users: this.userRepo.getAllUsers(), me: a.toDto(), rooms: this.roomRepo.getAllRooms() })
                console.log(this.userRepo.getAllUsers())
            }

        })

        this.socket.on('get:users', (data: any, callback: any) => {
            let user = this.userRepo.getUserById(this.socket.id);
            let room = this.roomRepo.getRoomByName(user.inRoom);

            callback(room.getUsers())
        })

        this.socket.on('get:rooms', (data: any, callback: any) => {
            callback(this.roomRepo.getAllRooms())
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

        this.socket.on('drawing', (data: any) => {
            this.global.to('Lobby').emit('drawing', data);
            console.log(data)
        })


        this.socket.on('guess-word', (data: any) => {
            if (data.word == this.searchedWord) {
                this.global.to('Lobby').emit('word-guess', { word: data.word, isRight: true })
            } else {
                this.global.to('Lobby').emit('word-guess', { word: data.word, isRight: false })
            }
        })

        this.socket.on('game-start', (data: any) => {
            if (!this.gameStared) {
                let lobby = this.roomRepo.getRoomByName('Lobby');
                let users = lobby.getUsers();
                let drawingUser = users[Math.floor(Math.random() * (users.length - 0)) + 0]

                let words = ['apple', 'horse', 'hat', 'bike'];
                let word = words[Math.floor(Math.random() * (words.length)) + 0];
                this.searchedWord = word;

                this.global.to('Lobby').emit('game-started', {drawer: drawingUser})
                this.global.to(drawingUser.id).emit('game-started', { drawer: drawingUser, word:word })
                this.gameStared = true;
            }
        })

        this.socket.on('disconnect', () => {
            console.log('disconnected', this.socket.id)
            let user = this.userRepo.getUserById(this.socket.id);
            if (user) {
                let room = this.roomRepo.getRoomByName(user.inRoom);
                room.removeUser(user);
                if (user.inRoom) {
                    user.leaveRoom(user.inRoom);
                }
                this.userRepo.removeUser(this.socket.id)
            }
        })
    }
}