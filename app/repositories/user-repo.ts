import { User } from './../models/user';
import { Singleton } from 'typescript-ioc';

@Singleton
export class UserRepository {
    private users: User[];

    constructor() {
        this.users = []
    }

    public addUser(user: User) {
        this.users.push(user)
        console.log(this.users.length);
    }

    public getUserById(id: string) {
        return this.users.filter((user) => {
            return user.id == id;
        })[0]
    }

    public removeUser(id: string) {
        let user = this.users.filter(user => {
            return user.id == id;
        })[0]
        if (user) {
            console.log('removed ', user.id)
            this.users.splice(this.users.indexOf(user), 1)
        }
    }
}