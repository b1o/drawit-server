import { User } from './user';

export class Room {
    public name:string;
    public creator: User;
    public users: User[];

    constructor(name:string, creator: User) {
        this.name = name;
        this.creator = creator;
        this.users = [];
    }
}