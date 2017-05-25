import { User, UserDTO } from './user';

export class Room {
    public name: string;
    public creator: User;
    public users: Array<UserDTO>

    constructor(name: string, creator?: any) {
        this.name = name;
        if(creator) {
            this.creator = creator;
        }
        this.users = [];
    }

    public addUser(user: UserDTO) {
        this.users.push(user)
    }

    public removeUser(user:User) {
        let a = this.users.filter(function(u) {
            return u.name == user.Name && u.id == user.id;
        })[0]
        this.users.splice(this.users.indexOf(a), 1);
        console.log(`removing user ${a.name} from room ${this.name}`)
    }

    public getUsers() {
        return this.users;
    }
}