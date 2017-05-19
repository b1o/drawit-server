import { User } from './../models/user';
import {injectable} from 'inversify'

@injectable()
export class UserRepository {
    private users: Array<User>;

    public addUser(user: User) {
        this.users.push(user)
        console.log(this.users);
    }
}