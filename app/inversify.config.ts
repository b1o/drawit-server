import { UserRepository } from './repositories/user-repo';
import {Container} from 'inversify'

let container = new Container()
container.bind<UserRepository>("UserRepo").to(UserRepository)