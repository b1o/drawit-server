import { User } from './user';

export class Room {
    public name: string;
    public creator: User;
    public users: User[];

    constructor(name: string, creator?: User) {
        this.name = name;
        if(creator) {
            this.creator = creator;
        }
        this.users = [];
    }

    public join(user: User) {
        user.inRoom = this.name;
        this.users.push(user);
        user.socket.join(this.name);
        user.socket.emit('user:joined', user.toDto());
        user.socket.to(this.name).emit('user:joined', user.toDto(   ))
    }
}